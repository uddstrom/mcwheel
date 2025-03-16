export default class Timer {
    constructor(updateFn, deltaTime = 1 / 60) {
        this.updateFn = updateFn;
        this.deltaTime = deltaTime;
        this.accumulatedTime = 0;
        this.lastTime = null;
        this.window = null;
    }

    updateProxy(time) {
        if (this.lastTime !== null) {
            this.accumulatedTime += (time - this.lastTime) / 1000;
            while (this.accumulatedTime > this.deltaTime) {
                this.updateFn(this.deltaTime);
                this.accumulatedTime -= this.deltaTime;
            }
        }
        this.lastTime = time;
        this.enqueue();
    }

    enqueue() {
        this.requestId = this.window.requestAnimationFrame((time) => this.updateProxy(time));
    }

    start() {
        if (this.window === null) {
            throw new Error("Timer must listen to a window. Call listenTo with a window object.");
        }
        this.enqueue();
    }

    stop() {
        this.lastTime = null;
        this.window.cancelAnimationFrame(this.requestId);
    }

    listenTo(window) {
        this.window = window;
        this.window.addEventListener("focus", () => this.start());
        this.window.addEventListener("blur", () => this.stop());
    }
}

