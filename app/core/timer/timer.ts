// timer.ts
interface TimerOptions {
    duration: number;
    blockId: number;
    type: TimerType;
}

export type TimerType = "focus" | "break";

export class Timer {
    private remainingTime: number;
    private timerId?: globalThis.Timer;
    private readonly blockId: number;
    public readonly type: TimerType;

    constructor({ duration, blockId, type }: TimerOptions) {
        this.remainingTime = duration;
        this.blockId = blockId;
        this.type = type;
    }

    private notifyExternalAPI(): void {
        // Mocking external API call
        console.log(`API call for ${this.type} timer completed for block ${this.blockId}`);
    }

    public play(): void {
        if (this.timerId) {
            return;
        }

        this.startTimer();
    }

    public pause(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
            console.log(`Timer paused for block ${this.blockId}`);
        }
    }

    public reset(): void {
        this.pause();
        this.remainingTime = this.type === "focus" ? 25 * 60 * 1000 : 5 * 60 * 1000;
        console.log(`Timer reset for block ${this.blockId}`);
    }

    public skip(): void {
        this.onComplete();
    }

    private startTimer(): void {
        this.timerId = setInterval(() => {
            this.remainingTime -= 1000;

            if (this.remainingTime <= 0) {
                this.onComplete();
            }
        }, 1000);
    }


    private onComplete(): void {
        this.pause();
        this.remainingTime = 0;
        this.notifyExternalAPI();

        if (this.type === "focus") {
            // Focus timer completed, start the break timer
            const breakTimer = new Timer({
                duration: 5 * 60 * 1000,
                blockId: this.blockId,
                type: "break",
            });
            breakTimer.play();
            clearInterval(this.timerId);
        }
    }


}

