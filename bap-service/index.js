var express = require('express');
var path = require('path');
var logger = require('morgan');

require("dotenv").config();

var cors = require("cors");
var app = express();

const httpserver = require("http").createServer(app);

const io = require("socket.io")(httpserver, {
    cors: {
        origin: process.env.FRONTEND,
        credentials: true,
    },
    transports: ["websocket"],
});

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


const { mobility } = require("./routes")

app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true,
}));

app.use(logger('dev'));

app.use(express.json({
    limit: '50mb'
}));

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/bap', mobility)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
