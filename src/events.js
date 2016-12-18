let clients = {}

const events = (io) => {
  io.on('connection', (socket) => {

    socket.on('user-connected', user => {
      console.log('user connected')

      clients[user] = socket.id

      console.log(clients)
    })

    socket.emit('connected', { connected: true })

    socket.on('conversation mounted', () => {
      socket.emit('receive socket', socket.id)
    })

    socket.on('join conversation', conversation => {
      socket.join(conversation)
    })

    socket.on('new message', message => {
      io.to(message.convo_id).emit('new socket message', message)
    })

    socket.on('new conversation', conversation => {
      socket.broadcast.emit('new socket conversation', conversation)
    })

    socket.on('disconnect', function() {
      for (var user in clients) {
        if (clients[user] === socket.id) {
          delete clients[name]

          break
        }
      } 
    })
  })
}

export default events
