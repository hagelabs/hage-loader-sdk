#!/usr/bin/env node
// Sync core → adapters. ESM is source of truth; UMD generated for <script src> consumers.

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CORE_SRC = resolve(ROOT, "core/src/hage-loader.js");
const CORE_LOGO = resolve(ROOT, "core/assets/logo.png");
const DIST_DIR = resolve(ROOT, "core/dist");

const UMD_HEAD =
`(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.HAGELoader = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
`;

const UMD_TAIL =
`
  return { init: init };
});
`;

function esmToUmdBody(esm) {
  let body = esm
    .replace(/^"use strict";\s*\n?/, "")
    .replace(/^export\s+function\s+/gm, "function ")
    .replace(/^export\s+default\s+\{[^}]*\};?\s*\n?/gm, "")
    .replace(/^export\s+\{[^}]*\};?\s*\n?/gm, "");
  return UMD_HEAD + '  "use strict";\n' + body + UMD_TAIL;
}

const TARGETS = [
  // [destinationPath, format ('umd' | 'esm')]
  ["adapters/unity/Samples~/HAGEGamesTemplate/HAGEGames/TemplateData/hage-loader.js", "umd"],
  ["adapters/defold/HAGEGames/hage-loader.js", "umd"],
  ["adapters/phaser/src/hage-loader.js", "esm"]
];

const LOGO_TARGETS = [
  "adapters/unity/Samples~/HAGEGamesTemplate/HAGEGames/TemplateData/logo.png",
  "adapters/defold/HAGEGames/logo.png",
  "adapters/construct/HAGEGames/logo.png",
  "examples/phaser/logo.png"
];

async function ensureDir(p) {
  const d = dirname(p);
  if (!existsSync(d)) await mkdir(d, { recursive: true });
}

async function main() {
  const esm = await readFile(CORE_SRC, "utf8");
  const umd = esmToUmdBody(esm);

  await ensureDir(resolve(DIST_DIR, "x"));
  await writeFile(resolve(DIST_DIR, "hage-loader.esm.js"), esm);
  await writeFile(resolve(DIST_DIR, "hage-loader.umd.js"), umd);
  console.log("✓ core/dist/hage-loader.esm.js");
  console.log("✓ core/dist/hage-loader.umd.js");

  for (const [rel, fmt] of TARGETS) {
    const dest = resolve(ROOT, rel);
    await ensureDir(dest);
    await writeFile(dest, fmt === "umd" ? umd : esm);
    console.log(`✓ ${rel}  [${fmt}]`);
  }

  for (const rel of LOGO_TARGETS) {
    const dest = resolve(ROOT, rel);
    await ensureDir(dest);
    await copyFile(CORE_LOGO, dest);
    console.log(`✓ ${rel}  [logo]`);
  }

  console.log("\nbuild done.");
}

main().catch(err => {
  console.error("build failed:", err);
  process.exit(1);
});
