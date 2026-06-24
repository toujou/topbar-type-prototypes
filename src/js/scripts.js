import { initOptionsPanel } from "./elements/_options-panel.js";
import { initMainNav } from "./elements/_main-nav.js";

function init() {
    initOptionsPanel();
    initMainNav();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init);
} else {
    document.addEventListener("DOMContentLoaded", init);
}
