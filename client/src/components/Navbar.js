import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🚧 Signalement Gabon</h2>
      <div>
        <Link to="/">Accueil</Link>
        <a href="#report" style={{ marginLeft: "1rem", color: "white", textDecoration: "none" }}>Signaler</a>
        <Link to="/admin/login" style={{ marginLeft: "1rem" }}>Admin </Link>
      </div>
    </nav>
  );
}

export default Navbar;