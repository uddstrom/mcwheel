import { updateItemsList } from "./itemsList";
import { addToStore } from "./store";
import { getRandomColor } from "./utils";

export function setupInputControl(canvas, wheel) {
    function add() {
        var inputEl = document.getElementById("item");
        var text = inputEl.value;
        inputEl.value = "";
        addToStore(text);
        wheel.addItem({ text, color: getRandomColor() });
        updateItemsList(wheel);
    }

    document.getElementById("item").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            add();
        }
    });

    document.getElementById("add-btn").addEventListener("click", add);

    canvas.addEventListener("mousedown", (event) => {
        if (event.buttons === 1) {
            wheel.speed = 100;
        }
    });

    canvas.addEventListener("contextmenu", event => {
        event.preventDefault();
    });
}



