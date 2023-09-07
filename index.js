const http = require("http");
const path = require("path");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (m) => {
    console.log(m.toString());
    webSocketServer.clients.forEach((client) => client.send(m));
  });

  ws.on("error", (e) => ws.send(e));
});

server.listen(8999, () => console.log("Server started"));

app.use(express.static(path.resolve(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});
