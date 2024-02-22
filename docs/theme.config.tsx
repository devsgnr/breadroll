import Image from "next/image";
import { DocsThemeConfig } from "nextra-theme-docs";

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
    return {
      titleTemplate: "%s - breadroll",
    };
  },
};

export default config;
