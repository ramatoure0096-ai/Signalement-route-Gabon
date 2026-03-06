import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [signalements, setSignalements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const admin = localStorage.getItem("adminToken");
    if (!admin) {
      alert("Oups ! Connecte-toi d'abord 🛑");
      navigate("/admin/login");
      return;
    }

   
    fetchSignalements();
  }, [navigate]);

  const fetchSignalements = async () => {
    try {
      
      const res = await fetch("http://localhost:5000/tous-signalements");
      const data = await res.json();
      setSignalements(data);
    } catch (err) {
      console.error("Erreur dashboard :", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📊 Tableau de Bord Admin</h1>
        <button onClick={logout} style={{ background: "red", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>
          Déconnexion 🚪
        </button>
      </div>

      <p>Il y a actuellement {signalements.length} signalements en cours. </p>

      <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Type</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {signalements.map((s) => (
            <tr key={s.id}>
              <td style={{ padding: "10px" }}>{s.type_signalement || "Non spécifié"}</td>
              <td style={{ padding: "10px" }}>{s.description}</td>
              <td style={{ padding: "10px" }}>
                {s.url_image ? (
                  <img 
                    src={`http://localhost:5000${s.url_image}`} 
                    alt="Preuve" 
                    style={{ width: "80px", borderRadius: "5px" }} 
                  />
                ) : "Pas de photo"}
              </td>
              <td style={{ padding: "10px" }}>{new Date(s.date_heure).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;