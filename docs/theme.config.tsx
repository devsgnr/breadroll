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
    key: "breadroll-0.5-release",
    dismissible: false,
    text: (
      <a href="/changelog">
        🎉 breadroll 0.5.0 is released. <b>We're in public beta</b> →
      </a>
    ),
  },
  head: (
    <>
      <meta name="twitter:site" content="@breadrolljs" />
    </>
  ),
  footer: {
    text: (
      <div className="flex flex-col gap-y-2">
        <div>Released under the MIT License</div>
        <div>
          <small>&copy; {new Date().getFullYear()} breadroll</small>
        </div>
      </div>
    ),
  },
  useNextSeoProps() {
    const { frontMatter } = useConfig();

    return {
      titleTemplate: frontMatter.title
        ? "%s - breadroll"
        : "breadroll - Type safe processing in TypeScript, built for Bun",
      description: frontMatter.description ?? "breadroll - Type safe processing in TypeScript, built for Bun",
      openGraph: {
        siteName: "breadroll",
        title: frontMatter.title ?? "breadroll - Type safe processing in TypeScript, built for Bun",
        description: frontMatter.description ?? "breadroll - Type safe processing in TypeScript, built for Bun",
        images: [
          {
            url: "https://breadrolljs.vercel.app/png/social-card.png",
            alt: "breadroll - Type safe processing in TypeScript, built for Bun",
            width: 800,
            height: 600,
            type: "image/png",
          },
        ],
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
