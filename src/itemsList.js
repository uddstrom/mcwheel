import { getFromStore, removeFromStore } from "./store.js";

export function updateItemsList(wheel) {
    var list = document.getElementById("items");
    list.innerHTML = "";
    getFromStore().map(({ text }, idx) => {
        var item = document.createElement("li");
        item.innerHTML = `${text} &nbsp;&nbsp;`;
        var delBtn = document.createElement("button");
        delBtn.className = "del-btn";
        delBtn.innerText = "x";
        delBtn.onclick = () => {
            wheel.removeItem(text);
            removeFromStore(text);
            updateItemsList(wheel);
        }
        item.appendChild(delBtn);
        list.appendChild(item);
    });
}
