import Image from "next/image";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <Image alt="breadroll-logo" width={40} height={40} src="/png/breadroll_brand.png" />,
  logoLink: "/",
  project: {
    link: "https://github.com/devsgnr/breadroll",
  },
  docsRepositoryBase: "https://github.com/devsgnr/breadroll/tree/main/docs",
  darkMode: true,
  banner: {
    key: "breadroll-0.4-release",
    dismissible: false,
    text: <a href="/changelog/breadroll-v0.4.0">🎉 breadroll 0.4.0 is released. Read more →</a>,
  },
  useNextSeoProps() {
    const { frontMatter } = useConfig();

    return {
      titleTemplate: frontMatter.title ? "%s - breadroll" : "breadroll - Data processing in Javascript, built on Bun",
      description: frontMatter.description ?? "breadroll - Data processing in Javascript",
      openGraph: {
        siteName: "breadroll",
        title: "breadroll - Data processing in Javascript",
        description: "breadroll - Data processing in Javascript",
        images: [{ url: "/png/social-card.png", alt: "breadroll - Data processing in Javascript", width: 800, height: 600, type: "image/png" }],
      },
      twitter: {
        handle: "@breadrolljs",
        site: "@breadrolljs",
        cardType: "summary_large_image",
      },
    };
  },
  faviconGlyph: "🥟",
};

export default config;
