export default class Session{
    sessionID:string;
    username:string|undefined;
    room:string|undefined;
    inLobby:boolean=false;
    constructor(sessionID:string){
        this.sessionID =sessionID;
    }
}
