import Objective from "./objective";
import WorkSet from "./work-set";

export default class SetList {
    private sets: Map<number, WorkSet>;
    private activeSet: number;

    constructor() {
        this.sets = new Map();
        this.activeSet = 0;
    }

    active(): WorkSet | undefined {
        return this.sets.get(this.activeSet);
    }

    changeActive(id: number): WorkSet | undefined {
        const selectedSet = this.get(id);
        if (!selectedSet) {
            return undefined;
        }
        this.activeSet = id;
        return selectedSet;
    }

    next() {
        this.activeSet++;
    }

    prev() {
        this.activeSet--;
    }

    add(): WorkSet {
        const id = this.sets.size ?? 1;
        const set = new WorkSet(id);
        if (this.sets.size === 0) {
            this.activeSet = id;
        }
        this.sets.set(id, set);
        return set;
    }

    get(id: number): WorkSet | undefined {
        return this.sets.get(id);
    }

    remove(id: number): boolean {
        return this.sets.delete(id);
    }

    list(): WorkSet[] {
        return [...this.sets.values()];
    }

    removeSets(n: number): boolean {
        const size = this.sets.size;
        if (this.activeSet >= size) {
            return false;
        }

        const setArr = Array.from(this.sets);
        const removeAmount = Math.min(n, size - this.activeSet);

        const newArr = setArr.slice(0, size - removeAmount);

        this.sets = new Map<number, WorkSet>(newArr);

        return true;
    }

    addSets(n: number): WorkSet[] {
        const newSets = [];
        for (let i = 0; i < n; i++) {
            newSets.push(this.add());
        }

        return newSets;
    }


    // arguably could remove these two
    toJson(): string {
        return JSON.stringify({ activeSet: this.activeSet, sets: [...this.sets] });
    }

    fromJson(json: string): SetList {
        const parsedSetList = JSON.parse(json);
        this.activeSet = parsedSetList.activeSet;
        this.sets = this.parseJsonSets(parsedSetList.sets);
        return this;
    }

    parseJsonSets(jsonSets: [number, WorkSet][]): Map<number, WorkSet> {
        const parsedSets = new Map(jsonSets);
        for (let [id, set] of parsedSets) {
            const parsedSet = new WorkSet(id);
            parsedSet.tasks = set.tasks.map(task => new Objective(task.name));
            parsedSets.set(id, parsedSet);
        }

        return parsedSets;
    }
}