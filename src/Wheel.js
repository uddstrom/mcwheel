export default class Wheel {
    constructor(center, radius, items) {
        this.center = center;
        this.radius = radius;
        this.items = items;
        this.angle = 0;
        this.speed = 0;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        console.log("removing item", item);
        this.items = this.items.filter(({ text }) => text !== item);
    }

    update(deltaTime) {
        this.speed = this.speed > 0.1 ? this.speed - this.speed * 0.01 : 0;
        this.angle += this.speed * deltaTime;
    }

    draw(ctx) {
        var sliceSize = Math.PI * 2 / this.items.length;
        this.items.forEach(({ color, text }, idx) => {
            ctx.beginPath();
            ctx.moveTo(this.center.x, this.center.y);
            ctx.arc(
                this.center.x,
                this.center.y,
                this.radius,
                this.angle + idx * sliceSize,
                this.angle + (idx + 1) * sliceSize)
            ctx.fillStyle = color;
            ctx.fill();

            // ctx.stokeStyle = "white";
            // ctx.lineWidth = 0;
            // ctx.stroke();

            ctx.save();
            ctx.translate(this.center.x, this.center.y);
            ctx.rotate(this.angle + (idx + 0.5) * sliceSize);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(text, this.radius / 4, 10, this.radius * 0.65);
            ctx.restore();

            this.#drawIndicator(ctx);
        });
    }

    #drawIndicator(ctx) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(this.center.x, this.center.y - 15);
        ctx.lineTo(this.center.x + 35, this.center.y);
        ctx.lineTo(this.center.x, this.center.y + 15);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

