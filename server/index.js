const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  io.emit("user_count", io.engine.clientsCount);

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

server.listen(PORT, () => console.log("Server running..."));
