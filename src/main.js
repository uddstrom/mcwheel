import Wheel from "./Wheel.js";
import gl from "gamelib";
import { setupInputControl } from "./input.js";
import { updateItemsList } from "./itemsList.js";
import { getFromStore } from "./store.js";

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.3;

var center = { x: canvas.width / 2, y: canvas.height / 2 };
var wheel = new Wheel(center, canvas.width * 0.45, getFromStore());
setupInputControl(canvas, wheel);
updateItemsList(wheel);

function update(deltaTime) {
    wheel.update(deltaTime);
    wheel.draw(ctx);
}

var timer = new gl.Timer(update);
timer.listenTo(window);
timer.start();
