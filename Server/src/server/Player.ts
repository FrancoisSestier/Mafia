import { Role } from "./Role";

export default class Player {
    username:string|undefined;
    room:string|undefined;
    role:Role|undefined;
    ready:boolean = false;
    connected:boolean = true;

    constructor(username:string|undefined,room:string|undefined,role:Role|undefined =undefined ) {
        this.username=username
        this.room = room
        this.role = role
        this.ready = false
    }
}
