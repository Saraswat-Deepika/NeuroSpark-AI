import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }

  .practice-bg {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
  }

  .practice-container { max-width: 780px; margin: 0 auto; }

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
  }
  .back-btn:hover { background: rgba(255,255,255,0.1); color: #e2e8f0; transform: translateX(-2px); }

  /* Header */
  .practice-badge {
    display: inline-block;
    background: rgba(99,102,241,0.18);
    border: 1px solid rgba(99,102,241,0.4);
    color: #a5b4fc;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 14px;
    font-family: 'Sora', sans-serif;
  }

  .practice-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .practice-subtitle { color: #94a3b8; font-size: 14.5px; margin-bottom: 28px; }

  /* Sticky progress bar */
  .sticky-progress {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(15,12,41,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 14px 0;
    margin-bottom: 28px;
  }

  .progress-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .progress-label-text {
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }

  .progress-count { color: #a5b4fc; font-weight: 700; }

  .progress-bar-wrap {
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    height: 5px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #a78bfa);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* Question Card */
  .question-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px 30px;
    margin-bottom: 18px;
    backdrop-filter: blur(10px);
    transition: border-color 0.25s, box-shadow 0.25s;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .question-card.answered {
    border-color: rgba(99,102,241,0.35);
    box-shadow: 0 0 0 1px rgba(99,102,241,0.1);
  }

  .question-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .question-num {
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Sora', sans-serif;
  }

  .answered-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.25);
    color: #34d399;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    font-family: 'Sora', sans-serif;
  }

  .question-text {
    font-size: 15.5px;
    font-weight: 500;
    color: #e2e8f0;
    margin-bottom: 20px;
    line-height: 1.65;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 540px) {
    .options-grid { grid-template-columns: 1fr; }
    .practice-title { font-size: 22px; }
    .submit-area { flex-direction: column; }
    .submit-btn { width: 100%; justify-content: center; }
    .loader-box { padding: 40px 28px; min-width: unset; width: 90vw; }
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
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.08);
    color: #e2e8f0;
  }

  .option-label.selected {
    border-color: #6366f1;
    background: rgba(99,102,241,0.15);
    color: #a5b4fc;
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

  .option-label.selected .option-dot { border-color: #6366f1; background: #6366f1; }

  .option-dot-inner {
    width: 7px; height: 7px;
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
    color: #6366f1;
    min-width: 16px;
  }

  /* Submit area */
  .submit-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: 22px 28px;
  }

  .submit-info { }

  .submit-info-title {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 4px;
  }

  .submit-info-sub { font-size: 13px; color: #64748b; }
  .submit-info-sub span { color: #a5b4fc; font-weight: 600; }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 13px;
    padding: 14px 32px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
    box-shadow: 0 4px 18px rgba(99,102,241,0.35);
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.45); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* No data */
  .no-data-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 60px 40px;
    text-align: center;
  }
  .no-data-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700; color: #e2e8f0; margin-bottom: 10px; }
  .no-data-sub   { color: #64748b; font-size: 14px; margin-bottom: 28px; }
  .ghost-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
    padding: 12px 24px; border-radius: 12px; cursor: pointer; transition: all 0.2s;
  }
  .ghost-btn:hover { background: rgba(255,255,255,0.1); color: #e2e8f0; }

  /* Loading Overlay */
  .loading-overlay {
    position: fixed; inset: 0;
    background: rgba(15,12,41,0.92);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    z-index: 999;
  }

  .loader-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 28px;
    padding: 52px 56px;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 22px;
    min-width: 300px;
  }

  .brain-pulse { font-size: 52px; animation: pulse 1.4s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.18);opacity:0.7;} }

  .dots-row { display: flex; gap: 10px; justify-content: center; }
  .dot { width:10px; height:10px; border-radius:50%; background:#6366f1; animation: dotBounce 1.2s ease-in-out infinite; }
  .dot:nth-child(2){animation-delay:0.2s;background:#818cf8;}
  .dot:nth-child(3){animation-delay:0.4s;background:#a78bfa;}
  @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:0.4;} 40%{transform:translateY(-10px);opacity:1;} }

  .loading-title { font-family:'Sora',sans-serif; font-size:18px; font-weight:700; color:#e2e8f0; }
  .loading-sub   { font-size:13.5px; color:#64748b; }
  .loading-bar-track { width:220px; height:4px; background:rgba(255,255,255,0.08); border-radius:99px; overflow:hidden; }
  .loading-bar-fill  { height:100%; width:40%; background:linear-gradient(90deg,#6366f1,#a78bfa); border-radius:99px; animation:shimmer 1.6s ease-in-out infinite; }
  @keyframes shimmer { 0%{transform:translateX(-180%);} 100%{transform:translateX(420%);} }
`;

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loader-box">
        <div className="brain-pulse">📝</div>
        <div>
          <div className="loading-title">Submitting Your Answers</div>
          <div className="loading-sub" style={{ marginTop: 6 }}>Evaluating your performance…</div>
        </div>
        <div className="dots-row">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}

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
      <>
        <style>{styles}</style>
        <div className="practice-bg">
          <div className="practice-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
            <div className="no-data-card">
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div className="no-data-title">No practice data found.</div>
              <div className="no-data-sub">There's nothing to display here yet.</div>
              <button className="ghost-btn" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </>
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
        state: { topic, result: res.data, type: "practice" },
      });
    } catch (err) {
      console.error(err);
      alert("Practice submission failed.");
      setSubmitting(false);
    }
  };

  const answeredCount = userAnswers.filter(a => a !== "").length;
  const progressPct = (answeredCount / questions.length) * 100;
  const allAnswered = answeredCount === questions.length;

  return (
    <>
      <style>{styles}</style>
      {submitting && <LoadingOverlay />}

      <div className="practice-bg">
        <div className="practice-container">

          {/* Back */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="practice-badge">Practice Test</div>
          <h1 className="practice-title">{topic}</h1>
          <p className="practice-subtitle">Answer all {questions.length} questions to complete the test</p>

          {/* Sticky Progress */}
          <div className="sticky-progress">
            <div className="progress-top-row">
              <span className="progress-label-text">
                Progress — <span className="progress-count">{answeredCount}/{questions.length}</span> answered
              </span>
              <span className="progress-label-text">
                <span className="progress-count">{Math.round(progressPct)}%</span> complete
              </span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, index) => (
            <div
              key={index}
              className={`question-card${userAnswers[index] ? " answered" : ""}`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="question-top-row">
                <div className="question-num">Question {index + 1} of {questions.length}</div>
                {userAnswers[index] && (
                  <div className="answered-badge">
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Answered
                  </div>
                )}
              </div>

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

          {/* Submit */}
          <div className="submit-area">
            <div className="submit-info">
              <div className="submit-info-title">
                {allAnswered ? "All questions answered! 🎉" : "Almost there…"}
              </div>
              <div className="submit-info-sub">
                <span>{answeredCount}</span> of <span>{questions.length}</span> questions completed
              </div>
            </div>
            <button
              className="submit-btn"
              onClick={submitPractice}
              disabled={submitting || !allAnswered}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {submitting ? "Submitting…" : "Submit Practice"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Practice;