import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

function Learn() {
  const location = useLocation();
  const navigate = useNavigate();

  const { topic, weakConcepts, explanation, example } = location.state || {};

  const generateTest = async () => {
    const res = await API.post("/learning/generate-practice", {
      topic,
      weakConcepts,
    });

    navigate("/practice", {
      state: {
        topic,
        questions: res.data.questions,
      },
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", color: "white" }}>
      <h2>Concept Learning: {topic}</h2>

      <h3>Explanation</h3>
      <p>{explanation}</p>

      <h3>Example</h3>
      <p>{example}</p>

      <button onClick={generateTest}>
        Now Take 10 MCQ Test
      </button>
    </div>
  );
}

export default Learn;