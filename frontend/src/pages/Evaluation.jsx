import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

function Evaluation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);

  const { topic, result, questions, type } = location.state || {};

  if (!result) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h3>No evaluation data found.</h3>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const generatePractice = async () => {
    try {
      setGenerating(true);
      const res = await API.post("/learning/generate-practice", {
        topic,
        weakConcepts: result.weakConcepts || [],
      });

      navigate("/practice", {
        state: {
          topic,
          questions: res.data.questions,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Practice generation failed.");
      setGenerating(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <h2>Evaluation: {topic}</h2>

      <p>
        <strong>Score:</strong> {result.score}%
      </p>

      {result.improvement !== undefined && (
        <p>
          <strong>Improvement:</strong>{" "}
          {result.improvement > 0
            ? `+${result.improvement}%`
            : `${result.improvement}%`}
        </p>
      )}

      <h3>Weak Concepts</h3>
      {result.weakConcepts.length === 0 ? (
        <p>None 🎉 Excellent performance!</p>
      ) : (
        <ul>
          {result.weakConcepts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        {type === "diagnostic" && (
          <>
            <button
              onClick={() => navigate("/learn", {
                state: {
                  topic,
                  weakConcepts: result.weakConcepts,
                  explanation: result.conceptExplanation,
                  example: result.example
                }
              })}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                marginBottom: "10px",
                backgroundColor: "#059669",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Explore Concept
            </button>
            <button
              onClick={generatePractice}
              disabled={generating}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                marginBottom: "10px",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: generating ? 0.7 : 1
              }}
            >
              {generating ? "Loading..." : "Take Practice Test"}
            </button>
          </>
        )}

        {type === "practice" && (
          <button
            onClick={generatePractice}
            disabled={generating}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              marginBottom: "10px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: generating ? 0.7 : 1
            }}
          >
            {generating ? "Generating..." : "Test Again"}
          </button>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #555",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Evaluation;