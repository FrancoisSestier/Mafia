import { GameSetting } from "./GameSetting";

export enum Time {
    Day = "Day",
    Night = "Night"
}

export class Game {
    private gameSetting:GameSetting = new GameSetting()
    private time : Time = Time.Day;
    private tickCount : number = 0;
    private roomOwner : string;
    constructor(room : string) {
        this.roomOwner = room
    }
}