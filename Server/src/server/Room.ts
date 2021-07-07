
export default class Room {
    readonly name: string;
    public usernames: Set<string>;

    constructor(name: string) {
        this.name = name;
        this.usernames = new Set<string>();
    }
}