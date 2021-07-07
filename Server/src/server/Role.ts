export enum Affiliation {
    Town = "Town",
    Mafia = "Mafia",
    Triad = "Triad"
}

export enum Categories {
    TownProtective = "Town Protective",
    TownKilling = "Town Killing",
    TownGovernment = "Town Government"
}

export class Role {
    readonly name: string;
    readonly affiliation: Affiliation;
    readonly summary: string;
    readonly categories: Array<Categories>;
    readonly goal: string;
    readonly description: string;
    readonly abilities: string;

    constructor(name: string, affiliation: Affiliation, summary: string, categories: Array<Categories>, goal: string, description: string, abilities :string) {
        this.name = name;
        this.affiliation = affiliation;
        this.summary = summary;
        this.categories = categories;
        this.goal = goal;
        this.description = description;
        this.abilities = abilities;
    }
}