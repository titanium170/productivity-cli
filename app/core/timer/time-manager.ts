// timerManager.ts
import { Timer, type TimerType } from './timer';

type Block = {
    id: number;
    focusTimer: Timer;
    breakTimer: Timer;
    current: TimerType | null;
}

export class TimerManager {
    private blocks: Map<number, Block> = new Map();
    private currentBlockId: number = 1;
    private currentTimer: Timer | undefined;

    constructor() {
        this.addBlock(this.currentBlockId);
        this.startBlock();
        this.pause();
    }


    // block methods 
    public addBlock(id: number): void {
        if (this.blocks.has(id)) {
            console.error(`Block with id ${id} already exists`);
        }

        const newBlock = {
            id,
            focusTimer: this.createTimer('focus'),
            breakTimer: this.createTimer('break'),
            current: null
        };

        this.blocks.set(newBlock.id, newBlock);
    }

    public skipBlock(): void {
        const block = this.currentBlock();
        block.focusTimer.skip();
        block.breakTimer.skip();
        // does this get gc'd?
        this.blocks.delete(this.currentBlockId);
        this.startNextBlock();
    }


    private currentBlock(): Block {
        return this.blocks.get(this.currentBlockId)!;
    }

    private startNextBlock(): void {
        this.currentBlockId++;
        if (this.blocks.has(this.currentBlockId)) {
            this.startBlock();
        } else {
            console.log(`All blocks finished! ${this.blocks.size + '/' + this.blocks.size}`)
        }
    }

    private startBlock(): void {
        const block = this.currentBlock();
        block.current = 'focus';
        this.currentTimer = block.focusTimer;
        this.play();
    }


    // timer methods

    public skipTimer(): void {
        if (!this.currentTimer) {
            console.warn('No timer available!');
        }

        this.currentTimer!.skip();

        if (this.currentTimer!.type === 'break') {
            this.startNextBlock();
        } else {
            this.currentTimer = this.currentBlock().breakTimer;
        }

        this.currentTimer!.play()
    }

    public play(): void {
        if (!this.currentTimer) {
            console.warn('No timer available!');
        }
        this.currentTimer!.play();
    }

    public pause(): void {
        if (!this.currentTimer) {
            console.warn('No timer available!');
        }
        this.currentTimer!.play();
    }

    public reset(): void {
        if (!this.currentTimer) {
            console.warn('No timer available!');
        }
        this.currentTimer!.play();
    }

    private createTimer(type: TimerType): Timer {
        const timer = new Timer({
            duration: type === "focus" ? 25 * 60 * 1000 : 5 * 60 * 1000,
            blockId: this.currentBlockId,
            type,
        });

        return timer;
    }
}

// main.ts
const timeManager = new TimerManager();

// Start the timer
timeManager.play();
