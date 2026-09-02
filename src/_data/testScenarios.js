module.exports = [
    {
        id: "scenario-a",
        title: "Burger menu | single line",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'single-line' topbar with the 'mega menu' navigation",
        uses: "Corporate websites, service websites, institutions and content-heavy websites with a clear visual hierarchy and a larger navigation structure.",
        goodFor: ['Corporate websites', 'Universities and educational institutions', 'Tourism websites', 'Large service websites', 'Content-heavy websites', 'Websites with complex navigation structures'],
        limitations: [
            'Can become crowded with very large navigation structures',
            'Additional actions have less visual prominence',
            'Less distinctive for strongly brand-focused websites'
        ],
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
        uses: "Websites that need to highlight additional actions or utilities, such as contact options, booking, search, login or language selection.",
        goodFor: ['Travel and tourism websites', 'Booking platforms', 'Hotels', 'E-commerce websites', 'Service companies', 'Websites with prominent CTAs', 'Websites with login, search, contact or booking actions'],
        limitations: [
            'Requires enough horizontal space for the additional actions',
            'Can feel visually busy when many actions are included',
            'Less suitable for minimal or highly editorial websites'
        ],
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
        uses: "Brand-focused websites, cultural institutions and editorial websites where the logo or brand identity should have a stronger visual presence.",
        goodFor: ['Cultural institutions', 'Museums', 'Hotels and resorts', 'Tourism brands', 'Editorial websites', 'Premium brands', 'Organisations with a string visual identity'],
        limitations: [
            'Requires more vertical space than a single-line topbar',
            'Less suitable when navigation and actions need to remain very compact',
            'The larger branding area may be unnecessary for simple websites'
        ],
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
        title: "Burger menu | split",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'split' topbar with the 'dropdown' navigation",
        uses: "Websites with a small to medium-sized navigation that benefit from a balanced, symmetrical header layout with the brand as a central visual element.",
        goodFor: ['Boutique business', 'Restaurants', 'Hotels', 'Creative agencies', 'Portfolio websites', 'Lifestyle brands', 'Smaller corporate websites'],
        limitations: [
            'Works best with a small to medium-sized navigation',
            'Can become unbalanced when there are many navigation items or actions',
            'Less suitable for websites with complex navigation structures'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "split",
            navigationType: "dropdown"
        }
    },
    {
        id: "scenario-e",
        title: "Burger menu | bubbles",
        description: "Render mobile topbar with the 'burger button' design and the 'full-height' navigation and the desktop 'bubbles' topbar with the 'dropdown' navigation",
        uses: "Modern, playful and brand-driven websites that want to give navigation, actions and language selection equal visual prominence.",
        goodFor: ['Tourism and travel websites', 'Lifestyle brands', 'Creative agencies', 'Children or family-oriented websites', 'Modern startups', 'Hospitality websites', 'Campaign and marketing websites', 'Brands with a playful visual identify'],
        limitations: [
            'The playful visual style may not suit conservative or highly formal brands',
            'Can become visually busy when many actions or navigation items are present',
            'Requires careful visual hierarchy to avoid competing elements'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-button",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "bubbles",
            navigationType: "dropdown"
        }
    }
];
