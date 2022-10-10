require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const port = 9000;

app.use(express.json());
app.use(cors());

const publicDir = require('path').join(__dirname, '/images');
app.use(express.static(publicDir));
app.use(require('./router/routes'));

app.listen(port,()=>{
    console.log("Servidor iniciado en el puerto 9000")
})
