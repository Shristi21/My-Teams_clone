const express = require('express');       
const app = express();
//const { ExpressPeerServer } = require('peer');
const server= require('http').Server(app)
const io = require("socket.io")(server);
const {v4:uuidv4} = require('uuid');

/*const { ExpressPeerServer } = require("peer");   //added
const peerServer = ExpressPeerServer(server, {
  debug: true,
  
}); */  

app.set('view engine', 'ejs');   //it tells how we are going to render our views (through ejs template engine)

app.use(express.static('public')); //to use static files(css,js files etc) we use express.static and folder name

//app.use("/peerjs", peerServer);  //added

app.get('/', (req,res)=>{
res.redirect(`/${uuidv4()}`)  // redirecting to random roomId generated by uuid
});

app.get('/:room', (req, res)=>{
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket =>{     //fired upon connection from client and socket connection with client
    socket.on('join-room' ,(roomId, userId)=>{
    socket.join(roomId)   //a new user joined the room  (add the socket to generated roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId) //telling users in the room that new user have joined

    socket.on('disconnect',() =>{
       
        socket.broadcast.to(roomId).emit('user-disconnected',userId)
    });

    });
});


server.listen(process.env.PORT || 3000);
