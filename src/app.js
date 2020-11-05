const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

// app.use();

// const DesafioController = desafio
app.use(express.json());
app.use(cors());

app.use(routes);

// app.listen(3333);

module.exports = app;
