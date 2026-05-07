# HAGE Loader SDK

Branded web game loading screen. Drop-in for **Unity WebGL**, **Phaser**, **Defold**, and **Construct 3**.

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

**Detailed step-by-step guides per engine** (bilingual EN + ID):

- 🎮 [Unity WebGL](docs/unity.md)
- 🕹️ [Phaser](docs/phaser.md)
- 🎯 [Defold](docs/defold.md)
- 🧩 [Construct 3](docs/construct.md)

---

## English

### What it is

A single, polished loading screen (logo, animated progress bar, percent counter, status text, responsive canvas) packaged so the same look-and-feel works across four major web game engines. Edit the engine-agnostic core once, every adapter inherits.

### Repository layout

```
hage-loader-sdk/
├── core/                 ESM source of truth + generated UMD bundle
├── adapters/
│   ├── unity/            UPM package (Samples~ pattern)
│   ├── phaser/           npm package @hagegames/phaser-loader
│   ├── defold/           Custom engine_template.html
│   └── construct/        Import script for Construct 3
├── examples/             Live demos
└── scripts/
    ├── build.mjs         Sync core → adapters
    └── pack.mjs          Build release zips + npm tgz
```

### Quick start by engine

#### Unity WebGL

**Option A — Zip release**

1. Download `hage-loader-unity-vX.Y.Z.zip` from Releases.
2. Extract `HAGEGames/` into `<UnityProject>/Assets/WebGLTemplates/`.
3. Player Settings → Resolution and Presentation → WebGL Template → select **HAGEGames**.
4. Build & Run.

**Option B — UPM git URL**

1. Package Manager → ➕ → Add package from git URL → `https://github.com/<user>/WebGLTemplates.git?path=hage-loader-sdk/adapters/unity`
2. Package Manager → Samples → Import **HAGEGames Template**.
3. Move imported `HAGEGames/` from `Assets/Samples/.../` into `Assets/WebGLTemplates/`.
4. Select template in Player Settings.

#### Phaser

```bash
npm install @hagegames/phaser-loader
```

```js
import { createHAGEBootScene } from "@hagegames/phaser-loader";

const Boot = createHAGEBootScene({
  productName: "My Game",
  logoUrl: "assets/logo.png",
  gameWidth: 1080,
  gameHeight: 720,
  brandColor: "#ff005a",
  minDisplayMs: 600,
  nextScene: "Main",
  preload: (scene) => {
    scene.load.image("hero", "assets/hero.png");
    // ... add the rest of your assets here
  }
});

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  scene: [Boot, MainScene]
});
```

#### Defold

1. Download `hage-loader-defold-vX.Y.Z.zip`. Extract `HAGEGames/` into your project root.
2. Edit `game.project`:
   ```ini
   [html5]
   htmlfile = /HAGEGames/engine_template.html
   splash_image =

   [project]
   custom_resources = /HAGEGames/hage-loader.js,/HAGEGames/logo.png
   ```
3. Bundle for HTML5 and serve.

#### Construct 3

1. Download `hage-loader-construct-vX.Y.Z.zip`. Extract `hage-construct.js` and `logo.png`.
2. In Construct 3: Project tree → Files → **Add → Import Script**. Pick `hage-construct.js`. Set type to **Module**.
3. Add `logo.png` as a project file too.
4. Project Properties → **Loader style** → set to **Nothing** (avoid double loaders).
5. (Optional) Override defaults via another import script that sets `globalThis.HAGE_CONFIG = { brandColor, productName, subText, minDisplayMs }` before `hage-construct.js` runs.
6. Export HTML5.

### Configuration reference

All engines accept the same options:

| Option         | Type     | Default              | Description                                                  |
| -------------- | -------- | -------------------- | ------------------------------------------------------------ |
| `productName`  | string   | `"Game"`             | Sets `document.title` and image `alt`.                       |
| `logoUrl`      | string   | `""`                 | Path to logo image. Hidden if empty.                         |
| `subText`      | string   | `"Loading game"`     | Caption under the logo.                                      |
| `gameWidth`    | number   | `1080`               | Native canvas width (engine renders at this resolution).     |
| `gameHeight`   | number   | `720`                | Native canvas height.                                        |
| `brandColor`   | string   | `"#ff005a"`          | Progress bar fill + accent text color.                       |
| `statusStages` | array    | see below            | `[{at: 0..1, text: "..."}]` — text shown when progress < at. |
| `minDisplayMs` | number   | `0` (Phaser: `600`)  | Anti-flash floor for fast loads.                             |
| `canvasId`     | string   | `"hage-canvas"`      | ID of the engine canvas (Unity uses `"unity-canvas"`).       |
| `skipCanvas`   | boolean  | `false`              | Don't create canvas (Phaser/Construct manage their own).     |
| `skipStyles`   | boolean  | `false`              | Don't inject `<style>` tag (use external CSS instead).       |
| `skipTitle`    | boolean  | `false`              | Don't override `document.title`.                             |

Default `statusStages`:
```js
[
  { at: 0.30, text: "Initializing..." },
  { at: 0.60, text: "Loading assets..." },
  { at: 0.85, text: "Compiling shaders..." },
  { at: 1.01, text: "Almost ready..." }
]
```

### Loader instance API

`HAGELoader.init(opts)` returns:

```ts
{
  setProgress(p: number): void   // 0..1, clamped
  hide(): void                   // fade out + remove
  error(msg?: string): void      // freeze bar, show message
  canvas: HTMLCanvasElement | null
  overlay: HTMLDivElement
}
```

### Development

```bash
npm install              # workspace root
npm run build            # sync core → adapters
npm run pack             # build + create release zips
```

The ESM at `core/src/hage-loader.js` is the source of truth. The build script wraps it as UMD for `<script src>` consumers and copies both formats into the appropriate adapters.

### License

MIT.

---

## Bahasa Indonesia

### Apa ini

Loading screen game web yang sudah jadi (logo, progress bar animasi, persen, status text, canvas responsif), dipaket biar tampilan sama bisa dipakai di empat engine populer. Edit core sekali, semua adapter ikut.

### Struktur repo

```
hage-loader-sdk/
├── core/                 Source ESM utama + UMD hasil build
├── adapters/
│   ├── unity/            UPM package (pola Samples~)
│   ├── phaser/           npm package @hagegames/phaser-loader
│   ├── defold/           engine_template.html khusus
│   └── construct/        Import script untuk Construct 3
├── examples/             Demo siap jalan
└── scripts/
    ├── build.mjs         Sync core → adapters
    └── pack.mjs          Bikin zip release + npm tgz
```

### Cara pakai per engine

#### Unity WebGL

**Cara A — Zip release**

1. Download `hage-loader-unity-vX.Y.Z.zip` dari Releases.
2. Extract `HAGEGames/` ke `<UnityProject>/Assets/WebGLTemplates/`.
3. Player Settings → Resolution and Presentation → WebGL Template → pilih **HAGEGames**.
4. Build & Run.

**Cara B — UPM git URL**

1. Package Manager → ➕ → Add package from git URL → `https://github.com/<user>/WebGLTemplates.git?path=hage-loader-sdk/adapters/unity`
2. Package Manager → Samples → Import **HAGEGames Template**.
3. Pindahin folder `HAGEGames/` dari `Assets/Samples/.../` ke `Assets/WebGLTemplates/`.
4. Pilih template di Player Settings.

#### Phaser

```bash
npm install @hagegames/phaser-loader
```

```js
import { createHAGEBootScene } from "@hagegames/phaser-loader";

const Boot = createHAGEBootScene({
  productName: "Game Saya",
  logoUrl: "assets/logo.png",
  gameWidth: 1080,
  gameHeight: 720,
  brandColor: "#ff005a",
  minDisplayMs: 600,
  nextScene: "Main",
  preload: (scene) => {
    scene.load.image("hero", "assets/hero.png");
    // ... taruh asset preload kamu di sini
  }
});

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  scene: [Boot, MainScene]
});
```

#### Defold

1. Download `hage-loader-defold-vX.Y.Z.zip`. Extract `HAGEGames/` ke root project.
2. Edit `game.project`:
   ```ini
   [html5]
   htmlfile = /HAGEGames/engine_template.html
   splash_image =

   [project]
   custom_resources = /HAGEGames/hage-loader.js,/HAGEGames/logo.png
   ```
3. Bundle HTML5, serve.

#### Construct 3

1. Download `hage-loader-construct-vX.Y.Z.zip`. Extract `hage-construct.js` + `logo.png`.
2. Di Construct 3: Project tree → Files → **Add → Import Script**. Pilih `hage-construct.js`. Set type **Module**.
3. Tambah `logo.png` sebagai project file juga.
4. Project Properties → **Loader style** → set ke **Nothing** (cegah double loader).
5. (Opsional) Override default lewat import script lain yang set `globalThis.HAGE_CONFIG = { brandColor, productName, subText, minDisplayMs }` sebelum `hage-construct.js` jalan.
6. Export HTML5.

### Daftar konfigurasi

Semua engine pakai opsi yang sama:

| Opsi           | Tipe     | Default              | Keterangan                                                         |
| -------------- | -------- | -------------------- | ------------------------------------------------------------------ |
| `productName`  | string   | `"Game"`             | Set `document.title` dan `alt` logo.                               |
| `logoUrl`      | string   | `""`                 | Path gambar logo. Disembunyikan kalau kosong.                      |
| `subText`      | string   | `"Loading game"`     | Caption di bawah logo.                                             |
| `gameWidth`    | number   | `1080`               | Lebar native canvas (engine render di resolusi ini).               |
| `gameHeight`  | number    | `720`                | Tinggi native canvas.                                              |
| `brandColor`   | string   | `"#ff005a"`          | Warna fill progress bar + teks aksen.                              |
| `statusStages` | array    | lihat bawah          | `[{at: 0..1, text: "..."}]` — text yang muncul saat progress < at. |
| `minDisplayMs` | number   | `0` (Phaser: `600`)  | Floor anti-flash buat loading cepat.                               |
| `canvasId`     | string   | `"hage-canvas"`      | ID canvas engine (Unity pakai `"unity-canvas"`).                   |
| `skipCanvas`   | boolean  | `false`              | Skip bikin canvas (Phaser/Construct manage sendiri).               |
| `skipStyles`   | boolean  | `false`              | Skip inject tag `<style>` (pakai CSS eksternal).                   |
| `skipTitle`    | boolean  | `false`              | Jangan override `document.title`.                                  |

Default `statusStages`:
```js
[
  { at: 0.30, text: "Initializing..." },
  { at: 0.60, text: "Loading assets..." },
  { at: 0.85, text: "Compiling shaders..." },
  { at: 1.01, text: "Almost ready..." }
]
```

### API instance loader

`HAGELoader.init(opts)` mengembalikan:

```ts
{
  setProgress(p: number): void   // 0..1, di-clamp
  hide(): void                   // fade out + hilangkan
  error(msg?: string): void      // freeze bar, tampilkan pesan
  canvas: HTMLCanvasElement | null
  overlay: HTMLDivElement
}
```

### Development

```bash
npm install              # root workspace
npm run build            # sync core → adapters
npm run pack             # build + bikin zip release
```

ESM di `core/src/hage-loader.js` adalah satu-satunya sumber utama. Build script wrap jadi UMD untuk konsumen `<script src>` dan copy kedua format ke adapter masing-masing.

### Lisensi

MIT.
