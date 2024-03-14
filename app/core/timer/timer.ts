type Milliseconds = number;

interface TimerOptions {
    duration: Milliseconds;
    type: TimerType;
}

// doesnt handle case where timer is lost
interface ITimer {
    kill: () => Milliseconds,
    remainingTime: () => Milliseconds
};

export type TimerType = "focus" | "break";

export default class Timer {
    private remainingTime: Milliseconds;
    private duration: Milliseconds;
    private timer: ITimer | null = null;
    private callback: () => void;
    public readonly type: TimerType;
    public complete: boolean = false;


    constructor(callback: () => void, options: TimerOptions) {
        this.duration = options.duration;
        this.remainingTime = options.duration;
        this.type = options.type;
        this.callback = callback;
    }


    public play(): void {
        if (this.complete) {
            throw new Error('Trying to play complete timer')
        }

        this.startTimer();
    }

    public pause(): void {
        if (this.timer) {
            this.remainingTime = this.timer.kill();
            this.timer = null;
        }
    }

    public reset(): void {
        this.pause();
        this.remainingTime = this.duration;
        this.complete = false;
    }

    public skip(): void {
        this.onComplete();
    }

    public isRunning(): boolean {
        return !!this.timer;
    }

    public getRemainingTime(): Milliseconds {
        if (this.complete) {
            return 0;
        }

        if (this.timer) {
            return this.timer.remainingTime();
        }

        return this.remainingTime;
    }

    private startTimer(): void {
        this.timer = new IntervalTimer(this.remainingTime, () => this.onComplete());
    }

    private onComplete(): void {
        this.pause();
        this.remainingTime = 0;
        this.complete = true;
        this.callback();
    }
}


// should not exist unless timer is running
class IntervalTimer implements ITimer {
    internalTime: Milliseconds;
    interval: globalThis.Timer;
    tickRate: Milliseconds = Bun.env.NODE_ENV == 'test' ? 100 : 1000;
    onComplete: () => void;

    constructor(duration: Milliseconds, onComplete: () => void) {
        this.internalTime = duration;
        this.onComplete = onComplete;
        this.interval = setInterval(() => { this.onTick() }, this.tickRate);
    }

    public kill(): Milliseconds {
        clearInterval(this.interval);
        return this.internalTime;
    }

    public remainingTime(): Milliseconds {
        return this.internalTime;
    }

    private onTick(): void {
        this.internalTime -= this.tickRate;
        if (this.internalTime <= 0) {
            clearInterval(this.interval);
            this.onComplete();
        }
    }
}