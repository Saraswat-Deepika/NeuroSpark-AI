import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await API.post("/auth/signup", { name, email, password });
        alert("Signup successful. Please login.");
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        credential: credentialResponse.credential
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Google Login failed");
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed");
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isSignup ? "Create Account" : "Login"}
      </button>

      <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer", marginBottom: "20px" }}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}

export default Login;