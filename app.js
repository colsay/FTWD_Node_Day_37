var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


app.use(express.static(__dirname))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/hkHikers", (req, res) => {
    res.sendFile(__dirname + "/hkHikers.html");
});

io.on("connection", (socket) => {
    console.log("A user has joined.");
    io.emit("welcome-message");


    socket.on("disconnect", () => {
        console.log("A user has left.");
        io.emit("byemessage");
    });

    socket.on("frontendMessage", (msg) => {
        io.emit("backendMessage", msg);
    });
});

const nameSpaceTwo = io.of("/hkHikers");

nameSpaceTwo.on("connection", (socket) => {
    console.log("Someone has joined and is looking for some hiking assistance");
    socket.emit(
        "backendMessage",
        "Someone has joined and is looking for some hiking assistance"
    );
    socket.emit(
        "backendMessage",
        "You can search for maps in this chatroom with /search <location> (hyphenated searches please)"
    );
    socket.on("frontendMessage", (message, name) => {
        console.log("current message reads: " + message + " from " + name);

        io.of("/hkHikers").emit("backendMessage", message, name);
    });

    socket.on("frontendHikeSearch", (area, name) => {
        io.of("/hkHikers").emit("backendHikeSearch", area, name);
    });

    socket.on("disconnect", () => {
        console.log("Another user has abandoned us");
        io.of("/hkHikers").emit("byebyeMessage");

    });
});




server.listen((3030), () => {
    console.log('listening on 3030')
});