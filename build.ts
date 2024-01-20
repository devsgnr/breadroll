await Bun.build({
  entrypoints: ["./index.ts"],
  outdir: "./dist/bun",
  minify: true,
  target: "bun",
  sourcemap: "external",
});

export {};
