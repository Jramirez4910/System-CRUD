require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

db.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL correctamente");
  }
});

// TEST
app.get("/api/test", (req, res) => {
  res.json({ ok: true, msg: "API funcionando" });
});

// GET empleados
app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log("Error al obtener empleados:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// POST create
app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    "INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log("Error al insertar datos:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Empleado registrado exitosamente", id: result.insertId });
    }
  );
});

// LISTEN AL FINAL
app.listen(5000, () => console.log("Server running on http://localhost:5000"));