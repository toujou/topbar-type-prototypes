module.exports = [
    {
        id: "scenario-a",
        title: "General-purpose websites",
        description: "Render the mobile topbar with the logo on the left and the actions and burger button on the right, using a drawer navigation. On desktop, use the single-line topbar with dropdown navigation.",
        uses: "A versatile, compact header pattern for websites with a clear navigation structure and a moderate number of actions.",
        goodFor: [
            'Corporate websites',
            'Service websites',
            'Universities and educational institutions',
            'Content-focused websites',
            'Small to medium-sized websites'
        ],
        limitations: [
            'Less suitable when the mobile navigation contains many items',
            'Additional actions have limited space on smaller screens',
            'Less distinctive for strongly brand-focused websites'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "logo-actions-burger",
            navigationType: "drawer"
        },
        desktop: {
            topbarType: "single-line",
            navigationType: "dropdown"
        }
    },

    {
        id: "scenario-b",
        title: "Action-focused websites",
        description: "Render the mobile topbar with the logo on the left and the actions and burger button on the right, using a full-height navigation. On desktop, use the extra-actions-bar topbar with dropdown navigation.",
        uses: "Websites where important actions such as contact, booking, search, login or language selection need strong visibility alongside the main navigation.",
        goodFor: [
            'Travel and tourism websites',
            'Booking platforms',
            'Hotels',
            'E-commerce websites',
            'Service companies',
            'Websites with prominent CTAs',
            'Websites with login, search, contact or booking actions'
        ],
        limitations: [
            'Requires enough horizontal space for the additional actions',
            'Can feel visually busy when many actions are included',
            'Less suitable for minimal or highly editorial websites'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "logo-actions-burger",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "extra-actions-bar",
            navigationType: "dropdown"
        }
    },

    {
        id: "scenario-c",
        title: "Brand-focused websites",
        description: "Render the mobile topbar with the burger button on the left, a centered logo and actions on the right, using a drawer navigation. On desktop, use the logo-on-top topbar with panel navigation.",
        uses: "Brand-focused websites where the logo should remain a strong, central element while the navigation stays compact on mobile.",
        goodFor: [
            'Cultural institutions',
            'Museums',
            'Hotels and resorts',
            'Tourism brands',
            'Editorial websites',
            'Premium brands',
            'Organisations with a strong visual identity'
        ],
        limitations: [
            'Requires a logo that works well in a centered position',
            'Less suitable when many actions need to be displayed on mobile',
            'The larger branding area may be unnecessary for simple websites'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-logo-actions",
            navigationType: "drawer"
        },
        desktop: {
            topbarType: "logo-on-top",
            navigationType: "panel"
        }
    },

    {
        id: "scenario-d",
        title: "Balanced websites",
        description: "Render the mobile topbar with the burger button on the left, a centered logo and actions on the right, using a full-height navigation. On desktop, use the split topbar with dropdown navigation.",
        uses: "Websites that want a distinctive, balanced header with a strong brand presence and a more prominent mobile navigation experience.",
        goodFor: [
            'Boutique businesses',
            'Restaurants',
            'Hotels',
            'Creative agencies',
            'Portfolio websites',
            'Lifestyle brands',
            'Smaller corporate websites'
        ],
        limitations: [
            'Works best with a small to medium-sized number of actions',
            'Can become visually busy with many navigation or action items',
            'Less suitable for websites with very complex navigation structures'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-logo-actions",
            navigationType: "full-height"
        },
        desktop: {
            topbarType: "split",
            navigationType: "dropdown"
        }
    },

    {
        id: "scenario-e",
        title: "Playful and modern websites",
        description: "Render the mobile topbar with the logo on the left and the actions and burger button on the right, using a drawer navigation. On desktop, use the bubbles topbar with dropdown navigation.",
        uses: "Modern, playful and brand-driven websites that want to give navigation, actions and language selection strong visual prominence.",
        goodFor: [
            'Tourism and travel websites',
            'Lifestyle brands',
            'Creative agencies',
            'Children or family-oriented websites',
            'Modern startups',
            'Hospitality websites',
            'Campaign and marketing websites',
            'Brands with a playful visual identity'
        ],
        limitations: [
            'The playful visual style may not suit conservative or highly formal brands',
            'Can become visually busy when many actions are present',
            'Requires careful visual hierarchy to avoid competing elements'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "logo-actions-burger",
            navigationType: "drawer"
        },
        desktop: {
            topbarType: "bubbles",
            navigationType: "dropdown"
        }
    },

    {
        id: "scenario-f",
        title: "Complex content websites",
        description: "Render the mobile topbar with the burger button on the left, a centered logo and actions on the right, using a drawer navigation. On desktop, use the single-line topbar with panel navigation.",
        uses: "Websites with a strong brand presence and a larger or more complex navigation structure that benefits from a spacious desktop navigation panel.",
        goodFor: [
            'Corporate websites',
            'Universities and educational institutions',
            'Cultural institutions',
            'Large organisations',
            'Content-heavy websites',
            'Websites with complex navigation structures'
        ],
        limitations: [
            'The centered mobile logo leaves less room for additional actions',
            'Panel navigation requires more screen space than a dropdown',
            'May be unnecessarily elaborate for smaller websites'
        ],
        breakpoint: "1024",
        mobile: {
            topbarType: "burger-logo-actions",
            navigationType: "drawer"
        },
        desktop: {
            topbarType: "single-line",
            navigationType: "panel"
        }
    }
];
