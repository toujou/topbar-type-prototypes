module.exports = function (eleventyConfig) {
    // Copy CSS/JS as-is, no processing
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets");

    eleventyConfig.addFilter("slugify", (str) => {
        return String(str)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        },
        pathPrefix: process.env.PATH_PREFIX || "/"
    };
};
