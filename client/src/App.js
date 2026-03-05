import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ReportSection from "./components/ReportSection";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin"; 
import AdminDashboard from "./components/AdminDashboard"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ACCUEIL */}
        <Route path="/" element={
          <>
            <Home />
            <ReportSection />
          </>
        } />
        {/* LOGIN ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* DASHBOARD */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;