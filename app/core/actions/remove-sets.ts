import type SetList from "../models/set-list";

export default function removeSetsAction(setList: SetList, numberOfSets: number) {
    return setList.removeSets(numberOfSets);
}