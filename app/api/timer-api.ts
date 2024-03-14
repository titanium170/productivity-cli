import TimerManager from "@core/timer/timer-manager";
import type { ITimerActions } from ".";

export class TimerAPI implements ITimerActions {
    private timer: TimerManager = new TimerManager();

    public skipTimer(): void {
        this.timer.skipTimer();
    }

    public play(): void {
        this.timer.play();
    }

    public pause(): void {
        this.timer.pause();
    }

    public reset(): void {
        this.timer.reset();
    }
}