const http = require("http");
const path = require("path");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (m) => {
    // console.log(JSON.parse(m));
    webSocketServer.clients.forEach((client) => client.send(m));
  });

  ws.on("error", (e) => ws.send(e));

//   ws.send("Hi there, I am a WebSocket server");
});

server.listen(8999, () => console.log("Server started"));

app.use(express.static(path.resolve(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);
    switch (json.event) {
        case "chat-message": webSocketServer.clients.forEach(client => client.send(message));
        default: ws.send((new Error("Wrong query")).message);
    }
 }