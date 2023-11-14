const fs = require("fs");
const https = require("https");
const express = require("express");
const { Server: IOServer } = require("socket.io");

const app = express();
const server = https.createServer(
  {
    key: fs.readFileSync("./certs/chave-privada.pem"),
    cert: fs.readFileSync("./certs/certificado.pem"),
  },
  app
);
const PORT = 3001;

const io = new IOServer(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado!", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
      time: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
    });
  });
});

server.listen(PORT, () => console.log("Server running on port", PORT));
