import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

function Practice() {
  const location = useLocation();
  const navigate = useNavigate();

  const { topic, questions } = location.state || {};

  const [userAnswers, setUserAnswers] = useState(
    questions ? new Array(questions.length).fill("") : []
  );
  const [submitting, setSubmitting] = useState(false);

  if (!questions) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h3>No practice data found.</h3>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleOptionChange = (qIndex, option) => {
    const updated = [...userAnswers];
    updated[qIndex] = option;
    setUserAnswers(updated);
  };

  const submitPractice = async () => {
    try {
      setSubmitting(true);
      const res = await API.post("/learning/submit-practice", {
        topic,
        questions,
        userAnswers,
      });

      navigate("/evaluation", {
        state: {
          topic,
          result: res.data,
          type: "practice",
        },
      });
    } catch (err) {
      console.error(err);
      alert("Practice submission failed.");
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", color: "white" }}>
      <h2>Practice Test: {topic}</h2>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "25px" }}>
          <p>
            <strong>
              Q{index + 1}. {q.question}
            </strong>
          </p>

          {Object.entries(q.options).map(([key, value]) => (
            <div key={key}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={key}
                  checked={userAnswers[index] === key}
                  onChange={() => handleOptionChange(index, key)}
                />
                {key}. {value}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitPractice} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Practice"}
      </button>
    </div>
  );
}

export default Practice;