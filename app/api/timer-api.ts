import TimerManager, { type TimerState } from "@core/timer/timer-manager";
import Timer from "@core/timer/timer";
import type { ITimerActions } from ".";
import notifier from 'node-notifier';

export class TimerAPI implements ITimerActions {
    private timer: TimerManager;

    constructor() {
        this.timer = new TimerManager(() => { });
    }

    public skipTimer(): TimerState {
        this.timer.skipTimer();
        return this.timer.timerState();
    }

    public play(): TimerState {
        this.timer.play();
        return this.timer.timerState();
    }

    public pause(): TimerState {
        this.timer.pause();
        return this.timer.timerState();
    }

    public reset(): TimerState {
        this.timer.reset();
        return this.timer.timerState();
    }

    public timerState(): TimerState {
        return this.timer.timerState();
    }

}