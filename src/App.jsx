import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { HomePage } from "./Pages/HomePage";
import LoginPage from "./Pages/Auth/Login";
import SignUpPage from "./Pages/Auth/SignUp";
import { UserDashboard } from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import LoanRequestsPageUser from "./components/App Components/LoanRequest";

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/user" element={<UserDashboard />} />
       <Route path="/admin" element={<AdminDashboard />} />
       <Route path="/user/userRequest" element={<LoanRequestsPageUser />}/>
       {/* <Route path="/register" element={<SignUpPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
