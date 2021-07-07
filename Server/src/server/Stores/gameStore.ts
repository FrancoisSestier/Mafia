
import {Game} from "../Game"
import InMemoryRoomStore, {RoomStore} from "./roomStore"
import InMemoryPlayerStore, {PlayerStore} from "./playerStore"

interface GameStore {
    findGame(gameId:string):Game|undefined
    createGame(roomId:string):void
    deleteGame(roomId:string):void
    }

export default class InMemoryGameStore implements GameStore {

    findGame(gameId:string):Game|undefined {
        return this.games.get(gameId);
    }
    
    createGame(roomId:string):void {
        this.games.set(roomId,new Game(roomId))
        console.log(this.games)
    }

    deleteGame(roomId:string):void {
        this.games.delete(roomId)
    }

    private updateAll(){
       this.games?.forEach((game:Game)=>(update(game)))
    }
    
    constructor(roomStore:RoomStore,playerStore:PlayerStore){
        this.roomStore = roomStore
        this.playerStore = playerStore
        this.games = new Map<string, Game>();
        setInterval(this.updateAll.bind(this),17)
    }

    games = new Map<string, Game>();
    roomStore:RoomStore
    playerStore:PlayerStore
}


const update = (game:Game) => {
    /////////////////
    /// Game Loop ///
    /////////////////   
    
    return game;
}