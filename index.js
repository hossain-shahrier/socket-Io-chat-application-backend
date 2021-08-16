const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  console.log("Connected");
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${PORT}`)
);
