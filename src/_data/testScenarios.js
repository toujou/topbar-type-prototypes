module.exports = [
    {
        id: "scenario-a",
        title: "Burger menu | single line",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'single-line' topbar with the 'mega menu' navigation",
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "single-line",
            navigationType: "panel"
        }
    },
    {
        id: "scenario-b",
        title: "Burger menu | actions bar",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'extra-actions-bar' topbar with the 'dropdown' navigation",
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "extra-actions-bar",
            navigationType: "dropdown"
        }
    }
];
