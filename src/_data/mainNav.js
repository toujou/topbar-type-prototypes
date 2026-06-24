// module.exports = [
//     {
//         uid: 1,
//         label: "Recipes",
//         url: "#",
//         children: [
//             {
//                 uid: 514,
//                 label: "Weitere Unterseite",
//                 url: "/musterseite/weitere-unterseite/",
//                 children: [
//                     {
//                         uid: 538,
//                         label: "Weitere Unterseite Level 3 auch mit sehr langen Titel",
//                         url: "/musterseite/weitere-unterseite/weitere-unterseite-level-3/",
//                         children: []
//                     },
//                     {
//                         uid: 616,
//                         label: "Weitere Unterseite Level 3 2",
//                         url: "/musterseite/weitere-unterseite/weitere-unterseite-level-3-2/",
//                         children: []
//                     }
//                 ]
//             },
//             {
//                 uid: 515,
//                 label: "Unterseite mit wesentlich längerem Titel",
//                 url: "/musterseite/unterseite-mit-wesentlich-laengerem-titel/",
//                 children: []
//             },
//             {
//                 uid: 617,
//                 label: "Unterseite Level 2",
//                 url: "/musterseite/unterseite-level-2/",
//                 children: []
//             }
//         ]
//     },
//     { uid: 2, label: "Explore", url: "#", children: [] },
//     { uid: 3, label: "Products", url: "#", children: [] },
//     { uid: 4, label: "About", url: "#", children: [] }
// ];

module.exports = [
    {
        uid: 1,
        label: "Missions",
        url: "#",
        children: []
    },
    {
        uid: 2,
        label: "Explore",
        url: "#",
        children: [
            {
                uid: 514,
                label: "The Solar System",
                url: "/explore/solar-system/",
                children: [
                    {
                        uid: 538,
                        label: "Inner Planets: Mercury, Venus, Earth and Mars",
                        url: "/explore/solar-system/inner-planets/",
                        children: []
                    },
                    {
                        uid: 616,
                        label: "Outer Planets and Gas Giants",
                        url: "/explore/solar-system/outer-planets/",
                        children: []
                    }
                ]
            },
            {
                uid: 515,
                label: "Galaxies and Deep Space",
                url: "/explore/galaxies-and-deep-space/",
                children: []
            },
            {
                uid: 617,
                label: "Black Holes",
                url: "/explore/black-holes/",
                children: []
            },
            {
                uid: 618,
                label: "Exoplanets",
                url: "/explore/exoplanets/",
                children: []
            },
            {
                uid: 619,
                label: "The James Webb Telescope",
                url: "/explore/james-webb-telescope/",
                children: []
            },
            {
                uid: 620,
                label: "Astrobiology",
                url: "/explore/astrobiology/",
                children: []
            }
        ]
    },
    {
        uid: 3,
        label: "Technology",
        url: "#",
        children: []
    },
    {
        uid: 4,
        label: "About Us",
        url: "#",
        children: []
    }
];
