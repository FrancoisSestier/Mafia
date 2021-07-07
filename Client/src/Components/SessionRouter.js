import { useToast } from "@chakra-ui/react"
import { useContext, useEffect,useState } from "react"
import { useNavigate } from "react-router";
import { MainContext } from "../mainContext";
import { SocketContext } from "../socketContext";
import { UsersContext } from "../usersContext";



export function SessionRouter() {

    const toast = useToast();
    const socket = useContext(SocketContext);
    const {mainUser,setMainUser, name,setName,room,setRoom} = useContext(MainContext);
    const { setUsers } = useContext(UsersContext)
    const navigate = useNavigate();

    function ensureConnection() {
        if(!socket.connected){
            const sessionID = sessionStorage.getItem("sessionID");
            if (sessionID) {
                socket.auth = { sessionID };
            }
            socket.on("game-started", (game) => {
                socket.session.inLobby = false
                socket.session.inGame = true
                socket.emit("save-session",socket.session)
                navigate("/game")
            })
            socket.on("players", users => {
                //console.log(users)
                setUsers(users)
                const user = users.find(user =>  user.username === socket.session.username)
                if(user){
                    setMainUser(user)
                }
            })
            socket.on("session", (session) => {
                // attach the session ID to the next reconnection attempts
                console.log("New session : " + session.sessionID)
                
                socket.auth = {sessionID :session.sessionID};
                // store it in the localStorage
                socket.session = session
                setName(session.username)
                setRoom(session.room)
                sessionStorage.setItem("sessionID", session.sessionID);
                console.table(socket.session)
                if(session.inLobby){
                    return navigate("/lobby")
                }
                if(session.inGame){
                    return navigate("/game")
                }
                navigate('/')
            });

            socket.connect();
        }
    }

    useEffect(() => {
        ensureConnection()
    }, [])

    return null
}