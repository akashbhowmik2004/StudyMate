const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  });
};

export default socketHandler;