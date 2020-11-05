const { text, json } = require("express");
const express = require("express");
const DesafioController = require("./controllers/desafio");
const app = express();
// app.use();

// const DesafioController = desafio
app.use(express.json());

app.get("/template.html", DesafioController.index);

app.post("/certificado", DesafioController.certificado);

app.listen(3333);
