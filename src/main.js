import gl from "gamelib";

class Wheel {
    constructor(center, radius, colors) {
        this.center = center;
        this.radius = radius;
        this.colors = colors;
        this.angle = 0;
        this.speed = 0;
    }

    update(deltaTime) {
        this.speed = this.speed > 0.1 ? this.speed - this.speed * 0.01 : 0;
        this.angle += this.speed * deltaTime;
    }

    draw(ctx) {
        var sliceSize = Math.PI * 2 / this.colors.length;
        this.colors.forEach((color, idx) => {
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
        });
    }
}



var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

function setupMouseControl(canvas, wheel) {
    ["mousedown", "mousemove"].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                wheel.speed = 100;
            }
        });
    });

    canvas.addEventListener("contextmenu", event => {
        event.preventDefault();
    });
}

var center = { x: canvas.width / 2, y: canvas.height / 2 };
var colors = ["red", "green", "blue"];
var wheel = new Wheel(center, canvas.width * 0.4, colors);
setupMouseControl(canvas, wheel);

function update(deltaTime) {
    var speed = document.getElementById("speed").value;
    document.getElementById("speedDisplay").innerHTML = speed;
    wheel.update(deltaTime, speed);
    wheel.draw(ctx);
}

var timer = new gl.Timer(update);
timer.listenTo(window);
timer.start();
