export default class Objective {
    name: string;
    complete: boolean;

    constructor(name: string = 'New Objective') {
        this.name = name;
        this.complete = false;
    }
}