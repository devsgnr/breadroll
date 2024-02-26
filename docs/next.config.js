const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
});

module.exports = withNextra({
  reactStrictMode: true,
  images: {
    domains: ["badgen.net"],
  },
});
