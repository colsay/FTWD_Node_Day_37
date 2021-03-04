var socket = io();


$('form').submit(function () {
    socket.emit("frontendMessage", $('#m').val());
    $('#m').val('');
    return false;
});

socket.on("backendMessage", (msg) => {
    $("#messages").append($("<li>").text(msg));
});

socket.on("welcome-message", () => {
    $("#messages").append($("<li>").text('A new user has joined'));
});

socket.on("byemessage", () => {
    $("#messages").append($("<li>").text('898'));
});