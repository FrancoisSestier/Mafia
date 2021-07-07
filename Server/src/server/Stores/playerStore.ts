
import Player from "../Player"

export interface PlayerStore {
    findPlayer(username: string): Player | undefined
    addPlayer(username: string, room: string): Player
    deletePlayer(username: string): void
    getPlayers(usernames: Array<string>): Array<Player> 
}

export default class InMemoryPlayerStore implements PlayerStore {
    findPlayer(username: string): Player | undefined {
        if (!this.players.has(username)) throw new Error("trying to retrieve non existing player")

        return this.players.get(username)
    }

    addPlayer(username: string, room: string): Player {

        if (this.players.has(username)) throw new Error("Playername has already been taken")
        if (!username && !room) throw new Error("Playername and room are required")
        if (!username) throw new Error("Playername is required")
        if (!room) throw new Error("Room is required")



        const player: Player = new Player(username, room)

        this.players.set(username, player)

        return player
    }

    toogleReady(username:string):void{
        this.players.get(username)!.ready = !this.players.get(username)?.ready;
    }

    deletePlayer(username: string): void {
        if (!this.players.has(username)) throw new Error("Trying to Delete nonExisting Player")
        this.players.delete(username)
        console.log("delPlayer")
    }

    getPlayers(usernames: Array<string>): Array<Player> {

        return usernames
            .filter(id => this.players.has(id))
            .map(id => this.players.get(id) as Player )

    }

    players = new Map<string, Player>()
}


