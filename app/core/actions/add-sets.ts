import SetList from "../models/set-list";
import type { TimerManager } from "../timer/time-manager";

export default function addSetsAction(setList: SetList, n: number = 1, timer?: TimerManager) {
    addSets(setList, n, timer);
}

function addSets(setList: SetList, n: number, timer?: TimerManager): void {
    for (let i = 0; i < n; i++) {
        const newSet = setList.add();

        if (timer) {
            timer.addBlock(newSet.id);
        }
    }
}