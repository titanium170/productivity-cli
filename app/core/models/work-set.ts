import Objective from "./objective";

export default class WorkSet {
    id: number;
    tasks: Objective[];

    constructor(id: number = 0) {
        this.tasks = [];
        this.id = id;
    }

    addObjective(objective: Objective) {
        this.tasks.push(objective);
    }
}