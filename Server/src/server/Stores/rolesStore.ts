import { Role } from "../Role"
import { Affiliation } from "../Role"
import { Categories } from "../Role"

const roles: Map<string, Role> = new Map<string, Role>([
    [
        "Mayor",
        {
            name: 'Mayor',
            affiliation: Affiliation.Town,
            summary: "The governor of the town.",
            categories: [Categories.TownGovernment],
            goal: "Lynch every criminal and evildoer",
            description: "The Mayor is a role that gets huge power late in the game as he can choose to almost single-handedly lynch someone when there are few people left to vote. A Mayor can reveal their role to the entire town during the day with . This will send a global message revealing their role, but then makes them unhealable if the cannot be healed option is enabled. However, he can still be guarded by a Bodyguard.",
            abilities: "May reveal himself during the day and thereafter, have additional votes"
        }
    ]
])
export { }