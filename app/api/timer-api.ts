import TimerManager, { type TimerState } from "@core/timer/timer-manager";
import type { ITimerActions } from ".";

export class TimerAPI implements ITimerActions {
    private timer: TimerManager = new TimerManager();

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
}