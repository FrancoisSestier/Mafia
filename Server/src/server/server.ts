import InMemoryPlayerStore from "./Stores/playerStore";
import InMemoryRoomStore from "./Stores/roomStore";
import InMemorySessionStore from "./Stores/sessionStore"
import InMemoryGameStore from "./Stores/gameStore";
import Session from "./Session";


const sessionStore = new InMemorySessionStore()
const playerStore = new InMemoryPlayerStore()
const roomStore = new InMemoryRoomStore()
const gameStore = new InMemoryGameStore(roomStore,playerStore)

var app = require('express')()
const PORT = process.env.PORT || 5000
const server = require('http').createServer(app)
const cryptoR = require("crypto")

const randomId = (): string => cryptoR.randomBytes(8).toString("hex");

app.set('trust proxy', true)

const io = require('socket.io')(server)

io.use(async (socket: any, next: any) => {
  const sessionID: string = socket.handshake.auth.sessionID
  console.log(sessionID)
  if (sessionID) {
    const session = await sessionStore.findSession(sessionID);
    if (session) {
      socket.session = session;
      return next();
    }
  }
  socket.session = new Session(randomId());
  await sessionStore.saveSession(socket.session.sessionID, socket.session);
  next();
});


io.on('connection', (socket: any) => {

  console.log(socket.session)
  socket.emit('session', socket.session);

  if (socket.session.room) {
    try {
      const player = playerStore.addPlayer(socket.session.username, socket.session.room)
      roomStore.addPlayerToRoom(socket.session.room,socket.session.username)
      socket.join(player.room)
      socket.in(socket.session.room).emit('notification', { title: 'Someone\'s here', description: `${player.username} just entered the room` })
      io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
    } catch(error){
      if(error instanceof Error){
        console.log(error.message)
        return {error : error.message}
      }
    }    
  }

  socket.on('save-session',(session:any) =>{
    console.log("savingSession ")
    console.table(session)
    sessionStore.saveSession(socket.session.sessionID, session);
  })

  socket.on('login', ({ name, room }: any, callback: any) => {
    try {
      const player = playerStore.addPlayer(name, room) 
      roomStore.addPlayerToRoom(room,name)
      socket.session.username = name;
      socket.session.room = room;
      socket.session.inLobby = true;
      sessionStore.saveSession(socket.session.sessionID, socket.session);
      console.log(socket.session)
      socket.join(player.room)
      socket.emit('session', socket.session);
      socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${player.username} just entered the room` })
      io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
      callback()
    } catch(error){
      if(error instanceof Error){
        console.log(error.message)
        callback(error.message);
      }
    }

  })

  socket.on('getPlayers', () => {
    io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
  })

  socket.on('leave-lobby', () => {
    try{
    const player = playerStore.findPlayer(socket.session.username)
    socket.leave(player?.room)
    playerStore.deletePlayer(socket.session.username)
    roomStore.removePlayerFromRoom(socket.session.room,socket.session.username)
    io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
    socket.session.username = undefined
    socket.session.room = undefined
    socket.session.inLobby = false
    }
    catch (e){
      console.log(e);
    }
  })

  socket.on('disconnect', () => {
    try {
    console.log("deconnection : " + socket.id)
    playerStore.deletePlayer(socket.session.username)
    roomStore.removePlayerFromRoom(socket.session.username,socket.session.room)
    io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
    } catch(e) {
      console.log(e)
    }
  })

  socket.on('voice',(blob:any) => {

  })

  socket.on('toogle-ready',()=>{
    playerStore.toogleReady(socket.session.username)
    io.in(socket.session.room).emit('players', playerStore.getPlayers(roomStore.getUsernames(socket.session.room)))
  })

  socket.on('start-game',()=>{
    console.log("starting game " + socket.session.room)
    gameStore.createGame(socket.session.room)
    io.in(socket.session.room).emit("game-started",gameStore.findGame(socket.session.room))
  })
  //socket.on("logout", () => {
  //  if (socket.request.session.user) {
  //    console.log("Player disconnected : " + socket.request.session.user.username);
  //    const player = deletePlayer(socket.request.session.user.username)
  //    if (player) {
  //      io.in(player.room).emit('notification', { title: 'Someone just left', description: `${player.name} just left the room` })
  //      io.in(player.room).emit('players', getPlayers(player.room))
  //    }
  //  }
  //})
})



const port = process.env.PORT || 5000;
server.listen(port, () => console.log('server listening on port ' + port));
