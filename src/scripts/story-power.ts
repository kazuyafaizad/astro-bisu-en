import ScrollHint from "scroll-hint";

window.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    const element = document.querySelector(".glycan");

    if (!element) return;

    element.insertAdjacentElement("afterend", container);
    container.append(element);

    const nodelist = document.createDocumentFragment().childNodes;
    const list = Object.create(nodelist, { "0": { value: container }, length: { value: 1 } });
    new ScrollHint(list, { offset: 0, suggestiveShadow: true });
});
