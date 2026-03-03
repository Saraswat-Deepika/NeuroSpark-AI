const callLlama = require('./utils/bedrock');
(async () => {
    try {
        const prompt = `Generate 10 intermediate difficulty scenario-based MCQs.

Topic: React Hooks
Focus more on: useState, useEffect

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
}`;
        console.log('Calling Llama (Testing 10 MCQs)...');
        const out = await callLlama(prompt);
        console.log('--- OUTPUT LENGTH ---', out.length);
        console.log('--- END OF OUTPUT ---', out.slice(out.length - 200));

        let cleaned = out.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        const jsonString = cleaned.substring(firstBrace, lastBrace + 1).replace(/\n/g, ' ').replace(/\r/g, '');
        const data = JSON.parse(jsonString);
        console.log('SUCCESSFULLY PARSED JSON! Found', data.questions.length, 'questions.');
    } catch (e) { console.error('FAILED:', e); }
})();
