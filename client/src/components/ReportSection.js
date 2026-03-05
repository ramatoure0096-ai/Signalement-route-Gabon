import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : <Marker position={position} />;
}

function ReportSection() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [type_signalement, setTypeSignalement] = useState("nid_poule");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [position, setPosition] = useState([0.4162, 9.4673]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("mot_de_passe", mot_de_passe);
    formData.append("type_signalement", type_signalement);
    formData.append("description", description);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch("http://localhost:5000/signalements", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signalement envoyé avec succès !");
        setNom(""); setEmail(""); setMotDePasse(""); setDescription(""); setPhoto(null);
      } else {
        alert("Erreur : " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <section id="report" className="report-section" style={{ padding: "50px 20px" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>Signaler un problème</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="user-info" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
          <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} required />
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Mot de passe" type="password" value={mot_de_passe} onChange={e => setMotDePasse(e.target.value)} required />
        </div>
        <select value={type_signalement} onChange={e => setTypeSignalement(e.target.value)} style={{ marginBottom: "15px", width: "100%", padding: "10px" }}>
          <option value="nid_poule">Nid de poule </option>
          <option value="eau">Coupure d'eau </option>
          <option value="electricite">Coupure d'électricité </option>
          <option value="effondrement">Effondrement </option>
        </select>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required style={{ width: "100%", height: "100px", marginBottom: "15px" }} />
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "white", display: "block", marginBottom: "5px" }}>Photo</label>
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
        </div>
        <div className="map-container" style={{ marginBottom: "20px" }}>
          <MapContainer center={[0.4162, 9.4673]} zoom={13} style={{ height: "300px", borderRadius: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        <button type="submit" style={{ width: "100%", padding: "15px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          ENVOYER LE SIGNALEMENT
        </button>
      </form>
    </section>
  );
}

export default ReportSection;