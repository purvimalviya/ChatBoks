//node server handling socket io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  })

const users = {}

io.on('connection', socket =>{
    console.log("itsworkingtesttest")
    socket.on('new-user-joined', xname=>{
        console.log("New User", xname)
        users[socket.id]=xname
        socket.broadcast.emit('user-joined',xname)
    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, xname: users[socket.id]})
    })

    
})






//bug fixes
/*
To the ones getting a cors error,  replace  const io = require('socket.io')(8000)  by :

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  })

and next, for the name is deprecated, replace all the 'name'  by something else... like xname or name_ or anything
*/