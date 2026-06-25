import { initOptionsPanel } from "./elements/_options-panel.js";
import { initMainNav } from "./elements/_main-nav.js";

import "./webcomponents/toujou-burger-button.js"
import "./webcomponents/toujou-topbar.js"

function init() {
    const navTypesData = JSON.parse(
        document.getElementById('navigation-types-data')?.textContent || '[]'
    );

    initOptionsPanel(navTypesData);
    initMainNav();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init);
} else {
    document.addEventListener("DOMContentLoaded", init);
}
