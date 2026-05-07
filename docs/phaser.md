# Phaser Setup

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### Prerequisites

- Phaser **3.60** or newer.
- Node.js project with a bundler (Vite, Webpack, esbuild, Parcel, Rollup all work).

### Step-by-step (npm install)

> ⚠️ The npm package is not yet on the registry. Use the tarball workflow below until publish.

#### Option A — Install from tarball

1. Download `hagegames-phaser-loader-0.1.0.tgz` from [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Drop the `.tgz` into your project's root.
3. Install:
   ```bash
   npm install ./hagegames-phaser-loader-0.1.0.tgz
   ```

#### Option B — Install from GitHub (no download needed)

```bash
npm install github:hagelabs/hage-loader-sdk#main --legacy-peer-deps
```

This pulls the whole SDK; import via:
```js
import { createHAGEBootScene } from "hage-loader-sdk/adapters/phaser/src/index.js";
```

> Once `@hagegames/phaser-loader` ships on npm, switch to:
> ```bash
> npm install @hagegames/phaser-loader
> ```

### Step-by-step (wiring into your game)

1. Create a logo file at `public/logo.png` (or wherever your bundler serves static files).

2. Open your `main.js` (or whatever bootstraps Phaser) and add:

   ```js
   import Phaser from "phaser";
   import { createHAGEBootScene } from "@hagegames/phaser-loader";
   import MainScene from "./scenes/MainScene.js";

   const Boot = createHAGEBootScene({
     productName: "My Awesome Game",
     logoUrl: "logo.png",
     gameWidth: 1080,
     gameHeight: 720,
     brandColor: "#ff005a",
     minDisplayMs: 600,
     nextScene: "Main",
     preload: (scene) => {
       scene.load.image("hero", "assets/hero.png");
       scene.load.atlas("ui", "assets/ui.png", "assets/ui.json");
       scene.load.audio("bgm", "assets/bgm.mp3");
       // Add the rest of your assets here.
     }
   });

   new Phaser.Game({
     type: Phaser.AUTO,
     width: 1080,
     height: 720,
     scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
     backgroundColor: "#0a0a0a",
     scene: [Boot, MainScene]
   });
   ```

3. In `MainScene.js`, just write your game as usual. By the time `create()` runs, every asset declared in the boot scene's `preload` is loaded.

4. Run `npm run dev` (or your bundler's dev command). The loading screen should appear instantly, fill 0→100%, then fade out into your scene.

### Configuration

| Field          | Default            | Notes                                                      |
| -------------- | ------------------ | ---------------------------------------------------------- |
| `productName`  | `"Game"`           | Sets `<title>` and logo `alt`.                             |
| `logoUrl`      | `""`               | Static URL. Use the path relative to your `index.html`.    |
| `subText`      | `"Loading game"`   | Caption under the logo.                                    |
| `gameWidth`    | `1080`             | Match your `Phaser.Game` config width.                     |
| `gameHeight`   | `720`              | Match your `Phaser.Game` config height.                    |
| `brandColor`   | `"#ff005a"`        | Progress bar + accent color.                               |
| `minDisplayMs` | `600`              | Anti-flash floor for fast loads.                           |
| `nextScene`    | `null`             | Scene key to start after load. Skip if you handle yourself.|
| `preload`      | `null`             | Function `(scene) => { scene.load.image(...) }`.           |

### Verification

1. Open browser DevTools → Network tab → throttle to **Slow 3G**.
2. Hard reload (Cmd/Ctrl + Shift + R).
3. Check the loader screen renders **before** any of your assets download.
4. Watch the progress bar advance as files arrive.
5. Verify status text rotates through the four stages.
6. After all assets load, loader fades out and `MainScene` becomes visible.

### Troubleshooting

- **Loader doesn't appear**: confirm `createHAGEBootScene(...)` is the **first** entry in your `scene` array. If `MainScene` is first, Phaser starts it instead of the boot scene.
- **Loader appears blank, no logo**: `logoUrl` path is wrong. Check the Network tab — should be 200, not 404.
- **Loader stays open forever**: your `preload` callback throws or never resolves. Check Console for asset load errors. Add `scene.load.on('loaderror', e => console.error(e))` to debug.
- **Two loaders visible**: you're using Phaser's built-in loader UI on top. Phaser doesn't show one by default — check no other plugin is rendering one.

---

## Bahasa Indonesia

### Prasyarat

- Phaser **3.60** atau lebih baru.
- Project Node.js dengan bundler (Vite, Webpack, esbuild, Parcel, Rollup OK).

### Langkah-langkah (npm install)

> ⚠️ Package npm belum publish ke registry. Pakai tarball dulu.

#### Opsi A — Install dari tarball

1. Download `hagegames-phaser-loader-0.1.0.tgz` dari [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Taruh `.tgz` di root project.
3. Install:
   ```bash
   npm install ./hagegames-phaser-loader-0.1.0.tgz
   ```

#### Opsi B — Install dari GitHub (gak perlu download)

```bash
npm install github:hagelabs/hage-loader-sdk#main --legacy-peer-deps
```

Ini pull seluruh SDK; import via:
```js
import { createHAGEBootScene } from "hage-loader-sdk/adapters/phaser/src/index.js";
```

> Nanti pas `@hagegames/phaser-loader` udah di npm:
> ```bash
> npm install @hagegames/phaser-loader
> ```

### Langkah-langkah (wiring ke game)

1. Bikin file logo di `public/logo.png` (atau lokasi static file bundler kamu).

2. Buka `main.js` (atau file bootstrap Phaser) dan tambahin:

   ```js
   import Phaser from "phaser";
   import { createHAGEBootScene } from "@hagegames/phaser-loader";
   import MainScene from "./scenes/MainScene.js";

   const Boot = createHAGEBootScene({
     productName: "Game Keren Saya",
     logoUrl: "logo.png",
     gameWidth: 1080,
     gameHeight: 720,
     brandColor: "#ff005a",
     minDisplayMs: 600,
     nextScene: "Main",
     preload: (scene) => {
       scene.load.image("hero", "assets/hero.png");
       scene.load.atlas("ui", "assets/ui.png", "assets/ui.json");
       scene.load.audio("bgm", "assets/bgm.mp3");
       // Taruh asset preload kamu di sini.
     }
   });

   new Phaser.Game({
     type: Phaser.AUTO,
     width: 1080,
     height: 720,
     scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
     backgroundColor: "#0a0a0a",
     scene: [Boot, MainScene]
   });
   ```

3. Di `MainScene.js`, tulis game seperti biasa. Saat `create()` jalan, semua asset di `preload` boot scene udah loaded.

4. Run `npm run dev` (atau dev command bundler kamu). Loading screen langsung muncul, fill 0→100%, lalu fade out ke scene.

### Konfigurasi

| Field          | Default            | Catatan                                                       |
| -------------- | ------------------ | ------------------------------------------------------------- |
| `productName`  | `"Game"`           | Set `<title>` dan `alt` logo.                                 |
| `logoUrl`      | `""`               | URL statis. Pakai path relatif ke `index.html`.               |
| `subText`      | `"Loading game"`   | Caption di bawah logo.                                        |
| `gameWidth`    | `1080`             | Sesuain dengan width `Phaser.Game` config.                    |
| `gameHeight`   | `720`              | Sesuain dengan height `Phaser.Game` config.                   |
| `brandColor`   | `"#ff005a"`        | Warna progress bar + aksen.                                   |
| `minDisplayMs` | `600`              | Floor anti-flash buat load cepat.                             |
| `nextScene`    | `null`             | Key scene yang dijalanin setelah load. Skip kalau handle sendiri. |
| `preload`      | `null`             | Function `(scene) => { scene.load.image(...) }`.              |

### Verifikasi

1. Buka DevTools browser → tab Network → throttle **Slow 3G**.
2. Hard reload (Cmd/Ctrl + Shift + R).
3. Cek loader screen render **sebelum** asset di-download.
4. Lihat progress bar maju seiring file masuk.
5. Verifikasi status text rotasi melalui 4 stages.
6. Setelah semua asset loaded, loader fade out dan `MainScene` keliatan.

### Troubleshooting

- **Loader gak muncul**: pastikan `createHAGEBootScene(...)` ada di **paling atas** array `scene`. Kalau `MainScene` duluan, Phaser start scene itu, skip boot.
- **Loader muncul tapi logo kosong**: path `logoUrl` salah. Cek Network tab — harus 200, bukan 404.
- **Loader gak hilang**: callback `preload` throw atau gak resolve. Cek Console untuk error asset load. Tambah `scene.load.on('loaderror', e => console.error(e))` buat debug.
- **Dua loader keliatan**: ada loader UI bawaan Phaser di atas. Phaser default gak nge-render loader — cek plugin lain yang mungkin nampilin.
