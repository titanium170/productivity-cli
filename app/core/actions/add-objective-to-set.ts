import Objective from "../models/objective";
import type WorkSet from "../models/work-set";

export default function addObjectiveToSetAction(set: WorkSet, objectiveName: string) {
    return set.addObjective(createObjective(objectiveName));
}

function createObjective(name: string) {
    return new Objective(name);
}