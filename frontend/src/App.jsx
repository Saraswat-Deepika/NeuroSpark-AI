import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Diagnostic from "./pages/Diagnostic";
import Evaluation from "./pages/Evaluation";
import Practice from "./pages/Practice"
import Learn from "./pages/Learn";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/learn" element={<Learn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;