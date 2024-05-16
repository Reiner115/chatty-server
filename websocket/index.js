function onConnection(socket) {
  socket.on("message", (data) => {
    console.log(data);
    socket.emit("message", data);
  });
  const session = socket.request.session;
  //console.log(socket);
  if (socket.handshake.auth.token === "123") {
    //socket.disconnect(true);
  }
  io.on("message", () => {
    req.session.reload((err) => {
      if (err) {
        return socket.disconnect();
      }
      req.session.count++;
      req.session.save();
    });
  });
}

module.exports = onConnection;
