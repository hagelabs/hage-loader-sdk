# Unity WebGL Setup

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### Prerequisites

- Unity **2021.3 LTS** or newer.
- Build target set to **WebGL** (Build Settings → WebGL → Switch Platform).

### Step-by-step (Method A — Zip drop-in)

1. Download `hage-loader-unity-v0.1.0.zip` from [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Unzip. You will get a folder named `HAGEGames/`.
3. In your Unity project, locate the `Assets/` folder.
4. Create the folder `Assets/WebGLTemplates/` if it does not exist.
5. Move the `HAGEGames/` folder into `Assets/WebGLTemplates/`. Final path:
   ```
   Assets/WebGLTemplates/HAGEGames/index.html
   Assets/WebGLTemplates/HAGEGames/TemplateData/hage-loader.js
   Assets/WebGLTemplates/HAGEGames/TemplateData/logo.png
   ```
6. Back in Unity Editor: **Edit → Project Settings → Player → WebGL tab → Resolution and Presentation**.
7. Under **WebGL Template**, click the **HAGEGames** card (it should appear next to Default and Minimal).
8. Set the canvas size in **Default Canvas Width / Height** if you want a non-1080×720 resolution.
9. **File → Build Settings → Build**, choose an output folder, and wait for the build to finish.
10. Open the build output `index.html` in a browser (preferably via `python3 -m http.server` to avoid file:// CORS issues).

### Step-by-step (Method B — UPM git URL)

1. Open your project in Unity.
2. **Window → Package Manager**.
3. Click the **➕** button at the top-left → **Add package from git URL...**.
4. Paste this URL:
   ```
   https://github.com/hagelabs/hage-loader-sdk.git?path=adapters/unity
   ```
5. Click **Add**. Unity will fetch the package.
6. With the package selected, click the **Samples** dropdown on the right panel.
7. Click **Import** next to **HAGEGames Template**.
8. Unity copies the sample to `Assets/Samples/HAGE Games Web Loader/0.1.0/HAGEGames Template/`.
9. Move the inner `HAGEGames/` folder into `Assets/WebGLTemplates/`.
10. Continue from step 6 of Method A.

### Customizing branding

Edit `Assets/WebGLTemplates/HAGEGames/index.html`:

| Want to change | Edit this line                                |
| -------------- | --------------------------------------------- |
| Brand color    | `brandColor: "#ff005a"`                       |
| Subtitle       | `subText: "Loading game"`                     |
| Logo           | Replace `TemplateData/logo.png`               |
| Min show time  | `minDisplayMs: 600`                           |
| Status stages  | Pass `statusStages: [{at, text}, ...]`        |

The `{{{ PRODUCT_NAME }}}`, `{{{ WIDTH }}}`, `{{{ HEIGHT }}}`, etc. are Unity build-time macros — leave them alone.

### Verification

After build:

1. Loader screen appears immediately on page open (no flash of unstyled content).
2. Progress bar animates 0 → 100%.
3. Status text rotates: `Initializing...` → `Loading assets...` → `Compiling shaders...` → `Almost ready...`.
4. Loader fades out within 0.55s after Unity reports ready.
5. Game canvas fits the viewport, scaled with aspect ratio preserved.

### Troubleshooting

- **HAGEGames template doesn't appear**: confirm folder is exactly `Assets/WebGLTemplates/HAGEGames/`. Capitalization matters.
- **Logo not visible**: confirm `TemplateData/logo.png` exists and is referenced from `index.html` as `TemplateData/logo.png`.
- **Loader stuck at 0%**: open browser DevTools → Console. Look for errors loading `Build/<game>.loader.js`. Usually a path or compression mismatch (gzip/Brotli vs server config).
- **Loader never hides**: Unity build error during `createUnityInstance`. Check Console for `.then`/`.catch` errors.

---

## Bahasa Indonesia

### Prasyarat

- Unity **2021.3 LTS** atau lebih baru.
- Build target sudah set ke **WebGL** (Build Settings → WebGL → Switch Platform).

### Langkah-langkah (Cara A — Zip drop-in)

1. Download `hage-loader-unity-v0.1.0.zip` dari [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Extract. Dapat folder `HAGEGames/`.
3. Buka project Unity, cari folder `Assets/`.
4. Bikin folder `Assets/WebGLTemplates/` kalau belum ada.
5. Pindah `HAGEGames/` ke dalam `Assets/WebGLTemplates/`. Path final:
   ```
   Assets/WebGLTemplates/HAGEGames/index.html
   Assets/WebGLTemplates/HAGEGames/TemplateData/hage-loader.js
   Assets/WebGLTemplates/HAGEGames/TemplateData/logo.png
   ```
6. Balik ke Unity Editor: **Edit → Project Settings → Player → tab WebGL → Resolution and Presentation**.
7. Di **WebGL Template**, klik card **HAGEGames** (muncul di samping Default dan Minimal).
8. Set ukuran canvas di **Default Canvas Width / Height** kalau mau bukan 1080×720.
9. **File → Build Settings → Build**, pilih folder output, tunggu build selesai.
10. Buka `index.html` hasil build di browser (lebih aman pakai `python3 -m http.server` biar gak kena file:// CORS).

### Langkah-langkah (Cara B — UPM git URL)

1. Buka project di Unity.
2. **Window → Package Manager**.
3. Klik tombol **➕** di kiri-atas → **Add package from git URL...**.
4. Paste URL:
   ```
   https://github.com/hagelabs/hage-loader-sdk.git?path=adapters/unity
   ```
5. Klik **Add**. Unity akan fetch package.
6. Setelah package terpilih, klik dropdown **Samples** di panel kanan.
7. Klik **Import** di sebelah **HAGEGames Template**.
8. Unity copy sample ke `Assets/Samples/HAGE Games Web Loader/0.1.0/HAGEGames Template/`.
9. Pindah folder `HAGEGames/` di dalamnya ke `Assets/WebGLTemplates/`.
10. Lanjut dari langkah 6 Cara A.

### Custom branding

Edit `Assets/WebGLTemplates/HAGEGames/index.html`:

| Mau ganti      | Edit baris ini                                |
| -------------- | --------------------------------------------- |
| Warna brand    | `brandColor: "#ff005a"`                       |
| Subtitle       | `subText: "Loading game"`                     |
| Logo           | Ganti `TemplateData/logo.png`                 |
| Min show time  | `minDisplayMs: 600`                           |
| Status stages  | Pass `statusStages: [{at, text}, ...]`        |

`{{{ PRODUCT_NAME }}}`, `{{{ WIDTH }}}`, `{{{ HEIGHT }}}`, dst. adalah macro Unity yang otomatis di-replace pas build — biarkan.

### Verifikasi

Setelah build:

1. Loader screen langsung muncul saat page open (gak ada flash).
2. Progress bar animasi 0 → 100%.
3. Status text ganti: `Initializing...` → `Loading assets...` → `Compiling shaders...` → `Almost ready...`.
4. Loader fade-out 0.55s setelah Unity ready.
5. Canvas game fit viewport, aspect ratio preserved.

### Troubleshooting

- **HAGEGames template gak muncul**: pastikan folder persis `Assets/WebGLTemplates/HAGEGames/`. Case-sensitive.
- **Logo gak kelihatan**: pastikan `TemplateData/logo.png` ada dan direferensiin di `index.html` sebagai `TemplateData/logo.png`.
- **Loader stuck di 0%**: buka DevTools browser → Console. Cari error load `Build/<game>.loader.js`. Biasanya masalah path atau gzip/Brotli vs server config.
- **Loader gak hilang**: Unity build error pas `createUnityInstance`. Cek Console untuk `.then`/`.catch` error.
