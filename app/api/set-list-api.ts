import SetList from "@core/models/set-list";
import type { ISetListActions } from ".";
import addObjectiveToSetAction from "@core/actions/add-objective-to-set";
import removeSetsAction from "@core/actions/remove-sets";
import addSetsAction from "@core/actions/add-sets";
import changeActiveSetAction from "@core/actions/change-active-set";

export class SetListAPI implements ISetListActions {
    private setList: SetList;

    constructor(setList?: SetList) {
        this.setList = setList ?? new SetList();
    }

    addSet(): SetList {
        addSetsAction(this.setList, 1)
        return this.setList;
    }

    addSets(n: number): SetList {
        addSetsAction(this.setList, n);
        return this.setList;
    }

    removeSet(): SetList {
        removeSetsAction(this.setList, 1);
        return this.setList;
    }

    removeSets(n: number): SetList {
        removeSetsAction(this.setList, n);
        return this.setList;
    }

    addTask(name: string): SetList {
        const activeSet = this.setList.active() ?? this.setList.add();
        addObjectiveToSetAction(activeSet, name);
        return this.setList;
    }

    next(): SetList {
        this.setList.next();
        return this.setList;
    }

    previous(): SetList {
        this.setList.prev();
        return this.setList;
    }

    setActive(id: number): SetList {
        changeActiveSetAction(this.setList, id);
        return this.setList;
    }

    list(): SetList {
        return this.setList;
    }
}