#!/usr/bin/env node
// Build release zips per engine. Requires `zip` CLI on PATH.

import { execSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "dist/release");

const PKG = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
const VERSION = PKG.version;

function sh(cmd, cwd) {
  execSync(cmd, { stdio: "inherit", cwd });
}

function zip(name, cwd, includes) {
  const out = resolve(OUT, name);
  if (existsSync(out)) rmSync(out);
  const args = includes.map(p => `'${p}'`).join(" ");
  sh(`zip -r '${out}' ${args} -x '*.DS_Store'`, cwd);
  console.log(`✓ ${name}`);
}

function main() {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  // Unity: the HAGEGames template folder, ready for Assets/WebGLTemplates/.
  zip(
    `hage-loader-unity-v${VERSION}.zip`,
    resolve(ROOT, "adapters/unity/Samples~/HAGEGamesTemplate"),
    ["HAGEGames"]
  );

  // Defold: HAGEGames folder for project root drop.
  zip(
    `hage-loader-defold-v${VERSION}.zip`,
    resolve(ROOT, "adapters/defold"),
    ["HAGEGames"]
  );

  // Construct 3: import-script + logo.
  zip(
    `hage-loader-construct-v${VERSION}.zip`,
    resolve(ROOT, "adapters/construct"),
    ["HAGEGames"]
  );

  // Phaser: npm pack -> tgz.
  console.log("\npacking phaser via npm pack...");
  const phaserDir = resolve(ROOT, "adapters/phaser");
  sh(`npm pack --pack-destination '${OUT}'`, phaserDir);
  console.log("✓ phaser tgz");

  console.log(`\npack done -> ${OUT}`);
}

main();
