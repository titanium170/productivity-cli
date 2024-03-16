import SetList from '@core/models/set-list'
import { SetListAPI } from './set-list-api';
import { TimerAPI } from './timer-api';

export interface IPDC {
    setList: ISetListActions,
    timerManager: ITimerActions
}

export interface ISetListActions {
    addSet: () => SetList,
    removeSet: () => SetList,
    removeSets: (n: number) => SetList,
    addTask: (name: string) => SetList,
    next: () => SetList,
    previous: () => SetList,
    setActive: (id: number) => SetList,
    list: () => SetList,
}

export interface ITimerActions {
    skipTimer: () => void,
    play: () => void,
    pause: () => void,
    reset: () => void,
}


export default class API implements IPDC {
    public setList: ISetListActions;
    public timerManager: ITimerActions;

    constructor(setList?: SetList) {
        this.setList = new SetListAPI(setList);
        this.timerManager = new TimerAPI();
    }

    public addSet(): SetList {
        return this.setList.addSet();
    }

    public removeSet(): SetList {
        return this.setList.removeSet();
    }

    public removeSets(n: number): SetList {
        return this.setList.removeSets(n);
    }

    public addTask(name: string): SetList {
        return this.setList.addTask(name);
    }

    public next(): SetList {
        return this.setList.next();
    }

    public previous(): SetList {
        return this.setList.previous();
    }

    public setActive(id: number): SetList {
        return this.setList.setActive(id);
    }

    public list(): SetList {
        return this.setList.list();
    }

    public play(): void {
        this.timerManager.play();
    }

    public pause(): void {
        this.timerManager.pause();
    }

    public reset(): void {
        this.timerManager.reset();
    }

    public skipTimer(): void {
        this.timerManager.skipTimer();
    }
}



