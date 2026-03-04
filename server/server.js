const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();




const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

app.post('/signalement', upload.single('photo'), async (req, res) => {
  try {
    // CORRECTION : On extrait bien mot_de_passe du corps de la requête
    const { nom, email, mot_de_passe, type_signalement, description, latitude, longitude } = req.body;
    const url_image = req.file ? `/uploads/${req.file.filename}` : '';

    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    let userId;
    
    if (rows.length > 0) {
      userId = rows[0].id;
    } else {
    
      const [newUser] = await pool.execute(
        'INSERT INTO users (nom, email, mot_de_passe) VALUES (?, ?, ?)', 
        [nom, email, mot_de_passe]
      );
      userId = newUser.insertId;
    }

    await pool.execute(
      'INSERT INTO signalements (user_id, type_signalement, description, latitude, longitude, url_image) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, type_signalement, description, latitude || 0, longitude || 0, url_image]
    );

    res.json({ msg: 'Signalement ajouté avec succès !' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur interne : ' + err.message });
  }
});

app.get('/tous-signalements', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM signalements ORDER BY date_heure DESC');
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur' });
  }
});

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length === 0 || password !== rows[0].password) {
      return res.status(401).json({ msg: 'Erreur' });
    }
    res.json({ msg: "OK", admin: rows[0] });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Port ${PORT} - Connecté à la BDD`));