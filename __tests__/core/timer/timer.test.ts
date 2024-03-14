import { test, expect, mock } from 'bun:test';
import Timer from '@core/timer/timer';
import { sleep } from 'bun';

test('plays timer', () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });
    expect(() => timer.play()).not.toThrow();
});

test('tracks remaining time', async () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });
    timer.play();

    // hack so I don't need to add jest
    // (bun hasn't implemented fakeTimers)
    await sleep(100);

    expect(timer.getRemainingTime()).toBe(900);
});


test('pauses timer', async () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });
    timer.play();
    timer.pause();

    // hack so I don't need to add jest
    // (bun hasn't implemented fakeTimers)
    await sleep(100);

    expect(timer.getRemainingTime()).toBe(1000);
});

test('resets timer', async () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });
    timer.play();

    // hack so I don't need to add jest
    // (bun hasn't implemented fakeTimers)
    await sleep(100);

    timer.reset();
    expect(timer.getRemainingTime()).toBe(1000);
    expect(timer.isRunning()).toBe(false);
});

test('tracks timer status', () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });

    timer.play();
    expect(timer.isRunning()).toBe(true);
    timer.pause();
    expect(timer.isRunning()).toBe(false);
});

test('skips timer', () => {
    const timer = new Timer(() => { }, { duration: 1000, blockId: 1, type: 'focus' });
    timer.skip();

    expect(timer.complete).toBe(true);
    expect(timer.isRunning()).toBe(false);
    expect(timer.getRemainingTime()).toBe(0);
});


test('signals when complete', async () => {
    const callback = mock(() => { });
    const timer = new Timer(callback, { duration: 1000, blockId: 1, type: 'focus' });
    timer.play();
    await sleep(1100);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});


