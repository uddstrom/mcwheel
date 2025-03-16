import { getRandomColor } from "./utils.js";

var STORE_KEY = "McWheel";

export function addToStore(value) {
    var items = localStorage.getItem(STORE_KEY)?.split(";") ?? [];
    items.push(value);
    localStorage.setItem(STORE_KEY, items.join(";"));
}

export function getFromStore() {
    var items = localStorage.getItem(STORE_KEY)?.split(";") ?? [];
    return items.map((i) => ({ text: i, color: getRandomColor() }));
}

export function removeFromStore(val) {
    var items = localStorage.getItem(STORE_KEY)?.split(";") ?? [];
    var items = items.filter((item) => item !== val);
    localStorage.setItem(STORE_KEY, items.join(";"));
}

