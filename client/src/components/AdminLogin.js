import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Debugging : On check ce qu'on envoie 🔍
    console.log("Tentative de connexion pour :", email);

    try {
      // ⚠️ VERIFIE LE PORT : 5000 ou 3000 selon ton serveur Node !
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Réponse du serveur :", data); 

      if (res.ok) {
        localStorage.setItem("adminToken", JSON.stringify(data.admin));
        
        alert("Connexion réussie ! 🔥");
        navigate("/admin/dashboard");
      } else {
        console.log("Erreur de connexion :", data.msg);
        alert(data.msg || "Erreur de connexion ");
      }
    } catch (err) {
      console.error("Erreur Fetch :", err);
      alert("Le serveur ne répond pas... Est-il bien lancé sur le port 5000 ? 💀");
    }
  };

  return (
    <div className="admin-login" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>🔒 Connexion Admin</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Email</label>
        <input 
          type="email" 
          placeholder="admin@example.com"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <label>Mot de passe</label>
        <input 
          type="password" 
          placeholder="••••••••"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Se connecter 🚀
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;