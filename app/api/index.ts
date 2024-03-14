import SetList from "@core/models/set-list"
import { SetListAPI } from "./set-list-api";
import { TimerAPI } from "./timer-api";

export interface IPDC {
    setList: ISetListActions,
    timer: ITimerActions
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
    public setList: ISetListActions = new SetListAPI();
    public timer: ITimerActions = new TimerAPI();

}



