const events = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected')

    socket.emit('connected', { connected: true })

    socket.on('conversation mounted', function(user) {
      socket.emit('receive socket', socket.id)
    })

    socket.on('join conversation', (conversation) => {
      console.log(conversation)
      socket.join(conversation)
    })

    socket.on('new message', (message) => {
      console.log(message.convo_id)
      socket.broadcast.to(message.convo_id).emit('new socket message', message)
    })

    socket.on('new conversation', (conversation) => {
      socket.broadcast.emit('new socket conversation', conversation)
    })
  })
}

export default events
