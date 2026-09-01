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
    },
    {
        id: "scenario-c",
        title: "Burger menu | logo on top",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'logo on top' topbar with the 'panel' navigation",
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "logo-on-top",
            navigationType: "panel"
        }
    },
    {
        id: "scenario-d",
        title: "Burger menu | logo on top",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'split' topbar with the 'dropdown' navigation",
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "split",
            navigationType: "dropdown"
        }
    }
];
