// SOCKET stuff

let io;
let users = [];

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const addUser = (userId, socketId) => {
  // add user if already not present
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const initializeSocketServer = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    // io.emit("welcome", "hello and welcome to socket server 8900");

    // take from client
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      // console.log(users);
      // io.emit("getUsers", users); // no need to send users to each user
    });

    // nego
    socket.on("sendNego", ({ sender_id, receiver_id, nego }) => {
      const user = getUser(receiver_id);
      io.to(user?.socketId).emit("getNego", {
        sender_id,
        nego,
      });
    });

    // chatting
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    // on disconnection (in-built... don't have to call from frontend)
    socket.on("disconnect", () => {
      console.log("user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  return io;
};

module.exports = {
  initializeSocketServer,
};
