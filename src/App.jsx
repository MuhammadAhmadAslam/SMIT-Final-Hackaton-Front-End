import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { HomePage } from "./Pages/HomePage";
import LoginPage from "./Pages/Auth/login";
import SignUpPage from "./Pages/Auth/SignUp";

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
