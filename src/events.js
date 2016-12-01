const events = (io) => {
  io.on('connection', (socket) => {
    socket.emit('connected', { connected: true })

    socket.on('join conversation', (conversation) => {
      socket.join(conversation)
    })

    socket.on('new message', (message) => {
      socket.broadcast.to(message.convo_id).emit('new message', message)
    })

    socket.on('new conversation', (conversation) => {
      socket.broadcast.emit('new conversation', conversation)
    })
  })
}

export default events
