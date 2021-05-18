let users = []
const SocketServer = (socket) => {
  socket.on('joinUsers', (user) => {
    users.push({ id: user._id, socketId: socket.id })
    console.log('users', users)
  })
  socket.on('disconnect', () => {
    const data = users.find((user) => user.socketId === socket.id)
    users = users.filter((user) => user.socketId !== socket.id)
  })
  socket.on('addMessage', (msg) => {
    console.log('hello', msg)
    const user = users.find((user) => user.id === msg.recipient)
    user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
  })
}

module.exports = SocketServer
