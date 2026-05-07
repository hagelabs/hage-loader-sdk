# Defold Setup

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### Prerequisites

- Defold **1.4** or newer (older versions don't expose `Progress.addListener`; the regex fallback still works).
- A Defold project that can bundle to **HTML5**.

### Step-by-step

1. Download `hage-loader-defold-v0.1.0.zip` from [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).

2. Unzip. You will get a folder named `HAGEGames/` containing:
   ```
   HAGEGames/engine_template.html
   HAGEGames/hage-loader.js
   HAGEGames/logo.png
   ```

3. Place the entire `HAGEGames/` folder inside your Defold project root (next to `game.project`).

4. Open `game.project` (Defold editor or text editor).

5. Find the `[html5]` section. Set:
   ```ini
   [html5]
   htmlfile = /HAGEGames/engine_template.html
   splash_image =
   ```
   - The leading `/` matters — Defold uses absolute paths from project root.
   - Clearing `splash_image` prevents Defold's built-in splash from layering on top of the HAGE loader.

6. Find or add the `[project]` section. Append the loader files to `custom_resources` (comma-separated):
   ```ini
   [project]
   custom_resources = /HAGEGames/hage-loader.js,/HAGEGames/logo.png
   ```
   - This tells Defold to copy these files into the bundle output, so the engine HTML can reference them.

7. Save `game.project`.

8. Bundle:
   - **Project → Bundle → HTML5...**
   - Pick an output folder.
   - Defold builds and writes `index.html`, `dmloader.js`, `archive_files.json`, your wasm/asm.js, plus `hage-loader.js` and `logo.png`.

9. Serve the bundle output directory:
   ```bash
   cd <bundle-output>
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in a browser.

### Customizing branding

Open `HAGEGames/engine_template.html`. Edit the `HAGELoader.init({...})` call near the top of the body script:

```html
var __hageLoader = HAGELoader.init({
  productName: "{{project.title}}",     // pulled from game.project
  logoUrl: "logo.png",
  gameWidth: {{display.width}},          // pulled from [display]
  gameHeight: {{display.height}},
  brandColor: "#ff005a",                 // ← change me
  canvasId: "canvas",
  skipCanvas: true,
  minDisplayMs: 600                      // ← change me for longer floor
});
```

The `{{...}}` are Defold mustache macros — leave them.

To change the logo image, replace `HAGEGames/logo.png` and re-bundle.

### Verification

1. On page load, the HAGE loader (logo + bar) renders **immediately**.
2. Status text rotates: `Initializing...` → `Loading assets...` → `Compiling shaders...` → `Almost ready...`.
3. Progress bar fills from 0% → 100% as the wasm/asm.js + game archive download.
4. After download finishes and the engine boots, the loader fades out (~0.55s) and your game canvas is visible.
5. Open DevTools Console — no `Progress is not defined` errors. If `Progress` is undefined on your Defold version, the `Module.setStatus` regex fallback engages automatically.

### Troubleshooting

- **Loader bar stuck at 0%**: Defold's progress hook didn't fire. Open Console; check whether `Progress.addListener` exists. If not, the regex fallback should kick in — confirm `Module.setStatus` is being called by adding `console.log` next to `__hageParseStatus`.
- **Both Defold splash and HAGE loader show**: `splash_image` not cleared. Re-check `game.project` `[html5] splash_image =` is empty.
- **Loader CSS clashes with Defold canvas**: edit `engine_template.html` and add custom `<style>` to constrain canvas size, or set `skipCanvas: true` (already set).
- **Bundle outputs but loader files missing**: `custom_resources` paths are wrong. They must start with `/` and be exact filenames. Double-check the comma-separated list.

---

## Bahasa Indonesia

### Prasyarat

- Defold **1.4** atau lebih baru (versi lama gak ekspos `Progress.addListener`; regex fallback masih jalan).
- Project Defold yang bisa bundle ke **HTML5**.

### Langkah-langkah

1. Download `hage-loader-defold-v0.1.0.zip` dari [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).

2. Extract. Dapat folder `HAGEGames/` isi:
   ```
   HAGEGames/engine_template.html
   HAGEGames/hage-loader.js
   HAGEGames/logo.png
   ```

3. Taruh seluruh folder `HAGEGames/` di root project Defold (sebelahan `game.project`).

4. Buka `game.project` (Defold editor atau text editor).

5. Cari section `[html5]`. Set:
   ```ini
   [html5]
   htmlfile = /HAGEGames/engine_template.html
   splash_image =
   ```
   - `/` di depan penting — Defold pakai absolute path dari project root.
   - `splash_image` dikosongkan biar splash bawaan Defold gak nimpa loader HAGE.

6. Cari atau tambah section `[project]`. Append file loader ke `custom_resources` (pisah koma):
   ```ini
   [project]
   custom_resources = /HAGEGames/hage-loader.js,/HAGEGames/logo.png
   ```
   - Ini suruh Defold copy file-file ini ke output bundle, biar engine HTML bisa reference.

7. Save `game.project`.

8. Bundle:
   - **Project → Bundle → HTML5...**
   - Pilih folder output.
   - Defold build dan write `index.html`, `dmloader.js`, `archive_files.json`, wasm/asm.js kamu, plus `hage-loader.js` + `logo.png`.

9. Serve folder output bundle:
   ```bash
   cd <bundle-output>
   python3 -m http.server 8000
   ```
   Buka `http://localhost:8000` di browser.

### Custom branding

Buka `HAGEGames/engine_template.html`. Edit panggilan `HAGELoader.init({...})` di body script:

```html
var __hageLoader = HAGELoader.init({
  productName: "{{project.title}}",     // ambil dari game.project
  logoUrl: "logo.png",
  gameWidth: {{display.width}},          // ambil dari [display]
  gameHeight: {{display.height}},
  brandColor: "#ff005a",                 // ← ganti ini
  canvasId: "canvas",
  skipCanvas: true,
  minDisplayMs: 600                      // ← ganti ini buat floor lebih lama
});
```

`{{...}}` adalah mustache macro Defold — biarkan.

Ganti gambar logo dengan replace `HAGEGames/logo.png` lalu re-bundle.

### Verifikasi

1. Saat page load, loader HAGE (logo + bar) render **langsung**.
2. Status text rotasi: `Initializing...` → `Loading assets...` → `Compiling shaders...` → `Almost ready...`.
3. Progress bar fill 0% → 100% seiring wasm/asm.js + game archive download.
4. Setelah download selesai dan engine boot, loader fade out (~0.55s) dan canvas game keliatan.
5. Buka DevTools Console — gak ada error `Progress is not defined`. Kalau `Progress` undefined di versi Defold kamu, regex fallback `Module.setStatus` otomatis aktif.

### Troubleshooting

- **Loader bar stuck di 0%**: hook progress Defold gak fire. Buka Console; cek apakah `Progress.addListener` ada. Kalau enggak, regex fallback harusnya kick in — confirm dengan tambah `console.log` di sebelah `__hageParseStatus`.
- **Splash Defold + loader HAGE muncul dua-duanya**: `splash_image` belum dikosongin. Re-check `game.project` `[html5] splash_image =` kosong.
- **CSS loader bentrok dengan canvas Defold**: edit `engine_template.html`, tambah `<style>` custom buat constrain canvas size, atau pastiin `skipCanvas: true` (udah default).
- **Bundle output tapi loader file ilang**: path `custom_resources` salah. Harus mulai dengan `/` dan exact nama file. Double-check list comma-separated.
