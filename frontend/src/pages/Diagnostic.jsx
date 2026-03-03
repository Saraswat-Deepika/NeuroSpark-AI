import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

function Diagnostic() {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const generateDiagnostic = async () => {
    try {
      setLoading(true);
      const res = await API.post("/learning/generate-diagnostic", { topic });

      setQuestions(res.data.questions);
      setUserAnswers(new Array(res.data.questions.length).fill(""));
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to generate diagnostic.");
      setLoading(false);
    }
  };

  const handleOptionChange = (qIndex, option) => {
    const updated = [...userAnswers];
    updated[qIndex] = option;
    setUserAnswers(updated);
  };

  const submitDiagnostic = async () => {
    try {
      setSubmitting(true);
      const res = await API.post("/learning/submit-diagnostic", {
        topic,
        questions,
        userAnswers,
      });

      navigate("/evaluation", {
        state: {
          topic,
          result: res.data,
          questions,
          type: "diagnostic"
        },
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", color: "white" }}>
      <h2>Diagnostic: {topic}</h2>

      {!questions.length && (
        <button onClick={generateDiagnostic}>
          {loading ? "Generating..." : "Start Diagnostic"}
        </button>
      )}

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "25px" }}>
          <p><strong>Q{index + 1}. {q.question}</strong></p>

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

      {questions.length > 0 && (
        <button onClick={submitDiagnostic} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Diagnostic"}
        </button>
      )}
    </div>
  );
}

export default Diagnostic;