const express = require("express");
const cors = require("cors");
const http = require('http');
const {Server} = require("socket.io");
var fs = require("fs")
var vm = require('vm')

const app = express();
const port = 3000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

let score = "0";

// Middleware
app.use(express.json());
app.use(cors());

// Sockets
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("/evenementRoute", (d) => {
        console.log(d);
    })
});

// Routes
app.get('/', (req, res) => {
    console.log(req.query.year);
    res.json({msg: "test"});
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.get('/school', (req, res) => {
    res.send({
    "scoredata": score,
    });
    });

app.post('/school', (req,res) => {
        score = req.body.scoredata
        res.send({"msg":"ok",
                  "score":req.body.scoredata,})

    })  


app.post('/api', (req, res) => {
    var data = req.body;
    console.log(data);
    res.send({ message: 'Données reçues' });
  });

app.get('/game', (req, res) => {
    console.log(req.params);
    res.sendFile(__dirname + "/game.html");
});

// Ecoute du server
httpServer.listen(port, () => {
    console.log(`On écoute sur le port ${port}`);
});