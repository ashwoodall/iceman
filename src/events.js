let clients = {}

const events = (io) => {
  io.on('connection', (socket) => {

    socket.on('user-connected', user => {
      clients[user] = socket.id
    })

    socket.emit('connected', { connected: true })

    socket.on('conversation mounted', () => {
      socket.emit('receive socket', socket.id)
    })

    socket.on('join conversation', conversation => {
      socket.join(conversation)
    })

    socket.on('new message', data => {
      io.to(data.message.convo_id).emit('new socket message', data.message)

      if (clients[data.recipient]) {
        io.sockets.connected[clients[data.recipient]].emit('new notification', { type: 'message', data: data.message })
      } else {
        console.log('User not connected')
      }
    })

    socket.on('new conversation', conversation => {
      socket.broadcast.emit('new socket conversation', conversation)
    })

    socket.on('disconnect', function() {
      for (var user in clients) {
        if (clients[user] === socket.id) {
          delete clients[user]

          break
        }
      } 
    })
  })
}

export default events
