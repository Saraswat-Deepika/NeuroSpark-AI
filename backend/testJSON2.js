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

    return JSON.parse(jsonString);
}


let badLlamaOutput = `
{
  "feedback": "Good job! \n Note something.",
  "conceptExplanation": "A React Hook is...",
  "example": "useState(0)"
}
Here is some extra text { } 
And more objects { }
`;
try {
    let res = extractJSON(badLlamaOutput);
    console.log('SUCCESS:', res);
} catch (e) {
    console.error("FAIL:", e);
}
