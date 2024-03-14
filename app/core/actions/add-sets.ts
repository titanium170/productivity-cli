import SetList from "../models/set-list";

export default function addSetsAction(setList: SetList, n: number = 1) {
    addSets(setList, n);
}

function addSets(setList: SetList, n: number): void {
    for (let i = 0; i < n; i++) {
        setList.add();
    }
}