import type SetList from "../models/set-list";

export default function RemoveSets(setList: SetList, numberOfSets: number) {
    return setList.removeSets(numberOfSets);
}