const express = require("express");
const auth = require("../middleware/authMiddleware");
const Progress = require("../models/Progress");
const callLlama = require("../utils/bedrock");

const router = express.Router();

/* =====================================================
   🔹 Utility: Safe JSON Extractor
===================================================== */
function extractJSON(output) {
  let cleaned = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  if (firstBrace === -1) {
    throw new Error("No JSON detected");
  }

  let braceCount = 0;
  let lastBrace = -1;
  let inString = false;
  let escapeNext = false;

  for (let i = firstBrace; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
    }

    if (!inString) {
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;

      if (braceCount === 0) {
        lastBrace = i;
        break;
      }
    }
  }

  if (lastBrace === -1) {
    throw new Error("Incomplete JSON");
  }

  let jsonString = cleaned.substring(firstBrace, lastBrace + 1);

  // Fix common Llama JSON hallucination issues (unescaped newlines)
  jsonString = jsonString.replace(/\n/g, " ").replace(/\r/g, "");

  // Try parsing safely, and use an eval-based fallback if it crashes due to keys missing quotes, or quotes missing inside strings
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    try {
      // Create a sandbox execution of object extraction if strict JSON fails (e.g. LLM provides ' "A": (2/3, 1/3) ' without quotes or invalid formatting
      const evalSafe = new Function("return " + jsonString + ";");
      return evalSafe();
    } catch (err2) {
      throw new Error("Invalid format received from AI.");
    }
  }
}

/* =====================================================
   1️⃣ GENERATE 5 MCQ DIAGNOSTIC
===================================================== */
router.post("/generate-diagnostic", auth, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ message: "Valid topic is required" });
    }

    const prompt = `
Generate 5 multiple choice diagnostic questions about ${topic}.

Return ONLY valid JSON.
Do NOT include markdown, explanation, python code, or extra text.

Strict format:
{
  "questions": [
    {
      "question": "string",
      "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
      },
      "correctAnswer": "A",
      "concept": "${topic}"
    }
  ]
}
`;

    const output = await callLlama(prompt);
    const parsed = extractJSON(output);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Invalid diagnostic structure");
    }

    res.json(parsed);

  } catch (err) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' Diagnostic Gen Error: ' + err.stack + '\n');
    console.error("Diagnostic Error:", err.message);
    res.status(500).json({ message: "Diagnostic generation failed" });
  }
});

/* =====================================================
   2️⃣ SUBMIT DIAGNOSTIC (Score + AI Feedback)
===================================================== */
router.post("/submit-diagnostic", auth, async (req, res) => {
  try {
    const { topic, questions, userAnswers } = req.body;

    if (!questions || !userAnswers) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    let correctCount = 0;
    let wrongConcepts = [];

    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      } else {
        wrongConcepts.push(q.concept);
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const weakConcepts = [...new Set(wrongConcepts)];

    /* If perfect score */
    if (weakConcepts.length === 0) {
      await Progress.create({
        userId: req.user.id,
        topic,
        type: "diagnostic",
        score,
        weakConcepts: [],
        improvement: 0,
      });

      return res.json({
        score,
        weakConcepts: [],
        feedback: "Excellent understanding!",
        conceptExplanation: "",
        example: "",
      });
    }

    /* AI Feedback */
    const prompt = `
You are an AI learning assistant.

Topic: ${topic}
Weak Concepts: ${weakConcepts.join(", ")}

Tasks:
1. Provide short performance feedback (2–3 sentences).
2. Explain weak concepts clearly in simple language.
3. Give one simple example.

Return ONLY JSON:
{
  "feedback": "string",
  "conceptExplanation": "string",
  "example": "string"
}
`;

    const output = await callLlama(prompt);
    const parsed = extractJSON(output);

    await Progress.create({
      userId: req.user.id,
      topic,
      type: "diagnostic",
      score,
      weakConcepts,
      improvement: 0,
    });

    res.json({
      score,
      weakConcepts,
      feedback: parsed.feedback,
      conceptExplanation: parsed.conceptExplanation,
      example: parsed.example,
    });

  } catch (err) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' Diagnostic Submit Error: ' + err.stack + '\n');
    console.error("Diagnostic Evaluation Error:", err.message);
    res.status(500).json({ message: "Diagnostic evaluation failed" });
  }
});

/* =====================================================
   3️⃣ GENERATE 10 MCQ PRACTICE
===================================================== */
router.post("/generate-practice", auth, async (req, res) => {
  try {
    const { topic, weakConcepts } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic required" });
    }

    const concepts = weakConcepts && weakConcepts.length
      ? weakConcepts.join(", ")
      : topic;

    const prompt = `
Generate 10 intermediate difficulty scenario-based MCQs.

Topic: ${topic}
Focus more on: ${concepts}

Requirements:
- 4 options
- One correct answer
- Avoid repetition
- Include "concept" field per question

Return ONLY JSON:
{
  "questions": [
    {
      "question": "string",
      "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
      },
      "correctAnswer": "A",
      "concept": "string"
    }
  ]
}
`;

    const output = await callLlama(prompt);
    const parsed = extractJSON(output);

    res.json(parsed);

  } catch (err) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' Practice Gen Error: ' + err.stack + '\n');
    console.error("Practice Generation Error:", err.message);
    res.status(500).json({ message: "Practice generation failed" });
  }
});

/* =====================================================
   4️⃣ SUBMIT PRACTICE
===================================================== */
router.post("/submit-practice", auth, async (req, res) => {
  try {
    const { topic, questions, userAnswers } = req.body;

    if (!questions || !userAnswers || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    let conceptStats = {};
    let correctCount = 0;

    questions.forEach((q, index) => {
      const concept = q.concept || "General";

      if (!conceptStats[concept]) {
        conceptStats[concept] = { correct: 0, total: 0 };
      }

      conceptStats[concept].total++;

      if (userAnswers[index]?.toUpperCase() === q.correctAnswer) {
        correctCount++;
        conceptStats[concept].correct++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    // Create breakdown
    const conceptBreakdown = Object.keys(conceptStats).map(concept => {
      const data = conceptStats[concept];
      const accuracy = Math.round((data.correct / data.total) * 100);

      return {
        concept,
        correct: data.correct,
        total: data.total,
        accuracy
      };
    });

    const weakConcepts = conceptBreakdown
      .filter(c => c.accuracy < 60)
      .map(c => c.concept);

    const strengthConcepts = conceptBreakdown
      .filter(c => c.accuracy >= 80)
      .map(c => c.concept);

    // Performance Level
    let performanceLevel = "Beginner";
    if (score >= 80) performanceLevel = "Advanced";
    else if (score >= 50) performanceLevel = "Intermediate";

    // Get latest diagnostic for improvement comparison
    const previousDiagnostic = await Progress.findOne({
      userId: req.user.id,
      topic,
      type: "diagnostic"
    }).sort({ createdAt: -1 });

    const improvement = previousDiagnostic
      ? score - previousDiagnostic.score
      : 0;

    // Store result
    await Progress.create({
      userId: req.user.id,
      topic,
      type: "practice",
      score,
      weakConcepts,
      improvement,
    });

    res.json({
      score,
      performanceLevel,
      improvement,
      conceptBreakdown,
      weakConcepts,
      strengthConcepts
    });

  } catch (err) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' Practice Submit Error: ' + err.stack + '\n');
    console.error("Practice Evaluation Error:", err.message);
    res.status(500).json({ message: "Practice evaluation failed" });
  }
});

/* =====================================================
   5️⃣ DASHBOARD DATA
===================================================== */
router.get("/dashboard", auth, async (req, res) => {
  try {
    const data = await Progress.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    console.error("Dashboard Error:", err.message);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

module.exports = router;