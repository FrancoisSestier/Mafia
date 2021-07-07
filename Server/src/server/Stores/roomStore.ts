import Room from "../Room"

export interface RoomStore {
    findRoom(roomId:string):Room|undefined
    getUsernames(roomId:string):Array<string>|undefined
    addPlayerToRoom(roomId:string,username:string):void
    removePlayerFromRoom(roomId:string,username:string):void
}

export default class InMemoryRoomStore implements RoomStore {

    findRoom(roomId:string):Room|undefined {
        return this.rooms.get(roomId);
    }

    addPlayerToRoom(roomId:string,username:string):void {
        if(!this.rooms.get(roomId)){
            this.createRoom(roomId)
        }
        this.rooms.get(roomId)?.usernames.add(username)
    }

    getUsernames(roomId:string):Array<string>{
        if(!this.rooms.get(roomId)){
            return []
        }
        const room = this.rooms.get(roomId) as Room
        return Array.from(room.usernames)
    }


    removePlayerFromRoom(roomId:string,username:string):void {
        if(!this.rooms.get(roomId) || !this.rooms.get(roomId)?.usernames.has(username)){
            return
        }
        this.rooms.get(roomId)?.usernames.delete(username)
        if(this.rooms.get(roomId)?.usernames.size == 0){
            this.deleteRoom(roomId)
        }
    }

    
    private createRoom(roomId:string):void {
        this.rooms.set(roomId,new Room(roomId))
    }

    private deleteRoom(roomId:string):void {
        this.rooms.delete(roomId)
    }

    rooms = new Map<string, Room>();
}