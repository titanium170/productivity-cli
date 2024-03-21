import Timer, { type TimerType } from './timer';

export type TimerState = {
    /** Remaining time in milliseconds */
    remaining: number,
    paused: boolean,
    type: TimerType
}


export default class TimerManager {
    private currentTimer: Timer;
    private focusTimer: Timer;
    private breakTimer: Timer;
    private timerCompleteCallback: (timer: Timer) => void;

    constructor(onTimerComplete: (timer: Timer) => void) {
        this.timerCompleteCallback = onTimerComplete;
        this.focusTimer = this.createTimer('focus');
        this.breakTimer = this.createTimer('break');
        this.currentTimer = this.focusTimer;
        this.pause();
    }

    public skipTimer(): void {
        if (this.currentTimer) {
            this.currentTimer.skip();
            this.nextTimer();
            return;
        }

        console.warn('No timer available!');
    }

    public play(): void {
        if (this.currentTimer) {
            this.currentTimer.play();
            return;
        }

        console.warn('No timer to play');
    }

    public pause(): void {
        if (this.currentTimer) {
            this.currentTimer.pause();
            return;
        }

        console.warn('No timer to pause');
    }

    public reset(): void {
        if (this.currentTimer) {
            this.currentTimer.reset();
            return;
        }

        console.warn('No timer to reset');
    }

    public onTimerComplete(type: TimerType): void {
        this.timerCompleteCallback(this.currentTimer);
        this.nextTimer();
    }

    public timerState(): TimerState {
        return {
            remaining: this.currentTimer.getRemainingTime(),
            paused: !this.currentTimer.isRunning(),
            type: this.currentTimer.type
        };
    }

    private nextTimer(): void {
        if (!this.currentTimer || this.currentTimer.type === 'break') {
            this.currentTimer = this.focusTimer;
        } else {
            this.currentTimer = this.breakTimer;
        }

        this.currentTimer.reset();
        this.currentTimer!.play()
    }

    private createTimer(type: TimerType): Timer {
        const timer = new Timer(
            () => this.onTimerComplete(type),
            {
                duration: type === "focus" ? 25 * 60 * 1000 : 5 * 60 * 1000,
                type,
            });

        return timer;
    }
}
