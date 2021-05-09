const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();
app.use(express.static('./', { extensions: ['html'] }));

const server = app.listen(8000);