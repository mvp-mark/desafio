const express = require("express");
const { Router } = require("express");

const DesafioController = require("./controllers/desafio");

const routes = Router();

routes.get("/template.html", DesafioController.index);

routes.post("/certificado", DesafioController.certificado);

module.exports = routes;
