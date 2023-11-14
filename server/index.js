const fs = require("fs");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(
  {
    key: fs.readFileSync("C:/Users/guilh/chave-privada.pem"),
    cert: fs.readFileSync("C:/Users/guilh/certificado.pem"),
  },
  app
);

const io = socketIO(server, { cors: { origin: "*" } });

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado!", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  console.log("Usuário:", socket.data.username);

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
