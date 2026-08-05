const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("joinCommunity", (community) => {
      socket.join(community);

      console.log(socket.id, "joined", community);
      console.log(socket.rooms);
    });

    socket.on("leaveCommunity", (community) => {
      socket.leave(community);
      console.log(`User ${socket.id} left community ${community}`);
    });

    socket.on("message", (message) => {
      io.to(message.community).emit("receiveMessage", message);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketHandler;
