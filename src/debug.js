export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ["mousedown", "mousemove"].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1 && lastEvent && lastEvent.buttons === 1 && lastEvent.type === "mousemove") {
                camera.pos.x -= event.x - lastEvent.x;
                camera.pos.y -= event.y - lastEvent.y;
            }
            lastEvent = event;
        });
    });

    canvas.addEventListener("contextmenu", event => {
        event.preventDefault();
    });
}
