import { initOptionsPanel } from "./elements/_options-panel.js";
import { initMainNav } from "./elements/_main-nav.js";
import { BreakpointReactor } from "./elements/breakpoint-reactor.js";

import "./webcomponents/toujou-burger-button.js"
import "./webcomponents/toujou-topbar.js"
import "./webcomponents/breakpoint-controller.js"

function init() {
    const navTypesData = JSON.parse(
        document.getElementById('navigation-types-data')?.textContent || '[]'
    );

    initOptionsPanel(navTypesData);
    initMainNav();

    // new BreakpointReactor(document.querySelector('.topbar'));
    // new BreakpointReactor(document.querySelector('.main-nav'));
    const topbar = document.querySelector('[data-breakpoint-attribute="topbar-type"]');
    const mainNav = document.querySelector('[data-breakpoint-attribute="main-nav-type"]');

    if (topbar) new BreakpointReactor(topbar);
    if (mainNav) new BreakpointReactor(mainNav);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init);
} else {
    document.addEventListener("DOMContentLoaded", init);
}
