import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await API.get("/learning/dashboard");
      setProgressData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startDiagnostic = () => {
    if (!topic) return alert("Enter a topic");
    navigate("/diagnostic", { state: { topic } });
  };

  // Group progress by topic
  const grouped = progressData.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = [];
    acc[item.topic].push(item);
    return acc;
  }, {});

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2 style={{ marginBottom: "30px", marginTop: 0 }}>Dashboard</h2>

      {/* Start New Topic */}
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={startDiagnostic}>
          Start Diagnostic
        </button>
      </div>

      {/* Progress Cards */}
      <div style={{ display: "grid", gap: "20px" }}>
        {Object.keys(grouped).map((topicName, index) => {
          const attempts = grouped[topicName];
          const latest = attempts[attempts.length - 1];
          const best = Math.max(...attempts.map(a => a.score));

          return (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#1e1e1e",
                borderRadius: "8px",
                cursor: "pointer"
              }}
              onClick={() => setSelectedTopic({ name: topicName, attempts })}
            >
              <h3>{topicName}</h3>
              <p>Latest Score: {latest.score}%</p>
              <p>Best Score: {best}%</p>
              <p>Total Attempts: {attempts.length}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Popup */}
      {selectedTopic && (() => {
        const attempts = selectedTopic.attempts;
        const initial = attempts[0];
        const latest = attempts[attempts.length - 1];
        const improvement = latest.score - initial.score;

        return (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div style={{
              backgroundColor: "#2e2e2e", padding: "30px", borderRadius: "8px", width: "400px", color: "white", textAlign: "left"
            }}>
              <h3 style={{ marginTop: 0, borderBottom: "1px solid #555", paddingBottom: "10px" }}>
                {selectedTopic.name} Progress
              </h3>
              <p><strong>Total Tests Given:</strong> {attempts.length}</p>
              <p><strong>Initial Diagnostic Score:</strong> {initial.score}%</p>
              <p><strong>Latest Evaluation Score:</strong> {latest.score}%</p>
              <p>
                <strong>Overall Improvement:</strong>{" "}
                <span style={{ color: improvement > 0 ? "lightgreen" : improvement < 0 ? "lightcoral" : "white" }}>
                  {improvement > 0 ? `+${improvement}%` : `${improvement}%`}
                </span>
              </p>

              <button
                onClick={() => setSelectedTopic(null)}
                style={{
                  marginTop: "20px", width: "100%", padding: "10px",
                  backgroundColor: "#4f46e5", color: "white", border: "none",
                  borderRadius: "5px", cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default Dashboard;