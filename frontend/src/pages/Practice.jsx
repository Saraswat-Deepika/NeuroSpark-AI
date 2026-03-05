import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  .prac-bg {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #0A0E1A, #050811, #0f172a);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
    color: #FCFEFC;
  }

  .prac-container {
    max-width: 780px;
    margin: 0 auto;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 9px 18px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 28px;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .back-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #e2e8f0;
    transform: translateX(-2px);
  }

  .prac-header { margin-bottom: 36px; }

  .prac-badge {
    display: inline-block;
    background: rgba(4, 86, 172, 0.18);
    border: 1px solid rgba(4, 86, 172, 0.4);
    color: #0A7AE8;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 14px;
    font-family: 'Sora', sans-serif;
  }

  .prac-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .prac-subtitle { color: #94a3b8; font-size: 14.5px; }

  .progress-bar-wrap {
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    height: 6px;
    margin-bottom: 32px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #0456AC, #0A7AE8);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  .progress-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 8px;
    text-align: right;
    font-family: 'Sora', sans-serif;
  }

  /* Question Cards */
  .question-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px 30px;
    margin-bottom: 18px;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s;
  }

  .question-card.answered { border-color: rgba(10, 122, 232, 0.35); }

  .question-num {
    font-size: 11px;
    font-weight: 600;
    color: #0A7AE8;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Sora', sans-serif;
    margin-bottom: 10px;
  }

  .question-text {
    font-size: 15.5px;
    font-weight: 500;
    color: #e2e8f0;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 520px) {
    .options-grid { grid-template-columns: 1fr; }
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255,255,255,0.03);
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.4;
  }

  .option-label:hover {
    border-color: rgba(10, 122, 232, 0.5);
    background: rgba(4, 86, 172, 0.08);
    color: #e2e8f0;
  }

  .option-label.selected {
    border-color: #0A7AE8;
    background: rgba(4, 86, 172, 0.15);
    color: #fff;
  }

  .option-label input[type="radio"] { display: none; }

  .option-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .option-label.selected .option-dot { border-color: #0A7AE8; background: #0A7AE8; }

  .option-dot-inner {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .option-label.selected .option-dot-inner { opacity: 1; }

  .option-key {
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #0A7AE8;
    min-width: 16px;
  }

  .submit-area {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .answered-count { font-size: 13px; color: #64748b; font-family: 'Sora', sans-serif; }
  .answered-count span { color: #FCFEFC; font-weight: 600; }

  .submit-btn {
    background: linear-gradient(135deg, #0456AC, #0A7AE8);
    color: #fff;
    border: none;
    border-radius: 13px;
    padding: 14px 36px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 18px rgba(4, 86, 172, 0.35);
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(4, 86, 172, 0.45); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

function Practice() {
  const location = useLocation();
  const navigate = useNavigate();
  // Expect topic and questions to be passed from Learn/Evaluation page
  const { topic, questions } = location.state || {};

  // If we navigated here manually without state, redirect to dashboard
  if (!topic || !questions || questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "white" }}>
        <h2>No questions available for practice.</h2>
        <button onClick={() => navigate("/dashboard")} style={{
          marginTop: "20px", padding: "10px 20px", background: "#0456AC",
          color: "white", border: "none", borderRadius: "8px", cursor: "pointer"
        }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(""));
  const [submitting, setSubmitting] = useState(false);

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
      // Redirect to evaluation page with the results
      navigate("/evaluation", {
        state: { topic, result: res.data, questions, type: "practice" },
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
      setSubmitting(false);
    }
  };

  const answeredCount = userAnswers.filter(a => a !== "").length;
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="prac-bg">
        <div className="prac-container">

          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="prac-header">
            <div className="prac-badge">Practice Session</div>
            <h1 className="prac-title">{topic || "Practice Topic"}</h1>
            <p className="prac-subtitle">Test yourself with these questions</p>
          </div>

          <div className="progress-label">{answeredCount} / {questions.length} answered</div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {questions.map((q, index) => (
            <div key={index} className={`question-card${userAnswers[index] ? " answered" : ""}`}>
              <div className="question-num">Question {index + 1} of {questions.length}</div>
              <p className="question-text">{q.question}</p>
              <div className="options-grid">
                {Object.entries(q.options).map(([key, value]) => (
                  <label key={key} className={`option-label${userAnswers[index] === key ? " selected" : ""}`}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      checked={userAnswers[index] === key}
                      onChange={() => handleOptionChange(index, key)}
                    />
                    <div className="option-dot">
                      <div className="option-dot-inner" />
                    </div>
                    <span className="option-key">{key}.</span>
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="submit-area">
            <p className="answered-count">
              <span>{answeredCount}</span> of <span>{questions.length}</span> questions answered
            </p>
            <button
              className="submit-btn"
              onClick={submitPractice}
              disabled={submitting || answeredCount < questions.length}
            >
              {submitting ? "Submitting…" : "Submit Practice"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Practice;