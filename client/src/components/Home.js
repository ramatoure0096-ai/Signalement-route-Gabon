import "./Home.css";

function Home() {
  return (
    <section id="home" className="home">
      <h1>Signalez les problèmes au Gabon 🇬🇦</h1>

      <p>
        Routes dégradées, coupures d'eau et d'électricité.
        Aidez à améliorer votre ville.
      </p>

      <div className="stats">
        <img src="./Capture d'écran 2026-03-04 142320.png" alt="" style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }} />
        <div>🚧 Routes</div>
        <div>💡 Électricité</div>
        <div>💧 Eau</div>
      </div>
    </section>
  );
}

export default Home;