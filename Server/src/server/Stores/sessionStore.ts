import Session from "../Session"



interface SessionStore {
    findSession(id:string):Session|undefined
    saveSession(id:string, session:Session):void
    findAllSessions():Session[]|undefined
}

export default class InMemorySessionStore implements SessionStore {
    constructor() {
        this.sessions = new Map<string,Session>();
    }

    findSession(id:string):Session|undefined {
        return this.sessions.get(id);
    }

    saveSession(id:string, session:Session):void {
        this.sessions.set(id, session);
    }

    findAllSessions():Session[]|undefined {
        return [...this.sessions.values()];
    }

    sessions:Map<string,Session>
}