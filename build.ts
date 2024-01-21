await Bun.build({
  entrypoints: ["./src/index.ts"],
  format: "esm",
  outdir: "dist",
  minify: true,
  target: "bun",
  sourcemap: "external",
});

export {};
