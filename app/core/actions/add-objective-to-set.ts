import Objective from "../models/objective";
import type WorkSet from "../models/work-set";

export default function AddObjectiveToSet(set: WorkSet, objectiveName: string) {
    return set.addObjective(CreateObjective(objectiveName));
}

function CreateObjective(name: string) {
    return new Objective(name);
}