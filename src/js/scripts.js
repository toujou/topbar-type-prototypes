import { initOptionsPanel } from "./elements/_options-panel.js";

function init() {
    initOptionsPanel();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init);
} else {
    document.addEventListener("DOMContentLoaded", init);
}
