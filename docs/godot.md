# Godot 4.x Setup

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### Prerequisites

- Godot **4.x**
- Web export support enabled
- A Web export preset

### Step-by-step

#### Option A — Zip release

1. Download `hage-loader-godot-vX.Y.Z.zip` from [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Extract `HAGEGames/` into your Godot project folder.
3. In Godot, open **Project -> Export...** and select your **Web** preset.
4. Under **Html**, set **Custom Html Shell** to `HAGEGames/engine_template.html`.
5. Export the project to HTML5.
6. Copy `HAGEGames/hage-loader.js` and `HAGEGames/logo.png` next to the exported `index.html`.
7. Serve the export folder.

#### Option B — Manual setup

1. Copy `adapters/godot/HAGEGames/engine_template.html` into your Godot project.
2. Copy `adapters/godot/HAGEGames/hage-loader.js` and `adapters/godot/HAGEGames/logo.png` too.
3. In the **Web** export preset, set **Html -> Custom Html Shell** to that `engine_template.html`.
4. Export to HTML5.
5. Copy `hage-loader.js` and `logo.png` next to the exported `index.html`.

### How it works

- Godot replaces `$GODOT_URL`, `$GODOT_CONFIG`, and `$GODOT_PROJECT_NAME` during export.
- The custom shell starts `new Engine($GODOT_CONFIG)` and calls `engine.startGame(...)`.
- Progress is driven by Godot's `onProgress(current, total)` callback.
- When startup finishes, the HAGE overlay fades out.

### Configuration

The Godot adapter uses these loader options inside the shell:

| Field          | Default          | Notes                                                  |
| -------------- | ---------------- | ------------------------------------------------------ |
| `productName`  | `$GODOT_PROJECT_NAME` | Sets the page title and logo `alt`.                |
| `logoUrl`      | `"logo.png"`     | Must exist next to the exported `index.html`.         |
| `subText`      | `"Loading game"` | Caption under the logo.                                |
| `brandColor`   | `"#ff005a"`      | Progress bar + accent color.                           |
| `minDisplayMs` | `600`            | Anti-flash floor for fast loads.                       |
| `skipCanvas`   | `true`           | Godot owns the `<canvas>` element.                     |

To customize color/text/logo, edit `HAGEGames/engine_template.html` before export.

### Verification

1. Open browser DevTools -> Network tab -> throttle **Slow 3G**.
2. Hard reload (`Ctrl + Shift + R` / `Cmd + Shift + R`).
3. Confirm the HAGE loader appears before the game is ready.
4. Confirm the progress bar advances during download.
5. Confirm the loader reaches `100%`, fades out, then game starts.
6. Confirm the console shows no `Engine is not defined` or missing-file errors.

### Troubleshooting

- **Loader does not appear**: confirm the Web export preset uses `HAGEGames/engine_template.html` as **Custom Html Shell**.
- **Blank page / `Engine is not defined`**: `$GODOT_URL` was not processed, which usually means the file was opened directly instead of exported through Godot's Web preset.
- **Logo missing**: `logo.png` is not next to the exported `index.html`, or path was changed.
- **Loader JS missing**: `hage-loader.js` must be copied next to the exported `index.html`.
- **Progress jumps from 0% to 100%**: small exports can finish too fast for many intermediate callbacks. This is normal; raise `minDisplayMs` if needed.

---

## Bahasa Indonesia

### Prasyarat

- Godot **4.x**
- Dukungan export Web aktif
- Sudah ada preset export Web

### Langkah-langkah

#### Opsi A — Zip release

1. Download `hage-loader-godot-vX.Y.Z.zip` dari [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).
2. Extract `HAGEGames/` ke folder project Godot kamu.
3. Di Godot, buka **Project -> Export...** lalu pilih preset **Web**.
4. Di bagian **Html**, set **Custom Html Shell** ke `HAGEGames/engine_template.html`.
5. Export project ke HTML5.
6. Copy `HAGEGames/hage-loader.js` dan `HAGEGames/logo.png` ke folder hasil export, sejajar dengan `index.html`.
7. Serve folder hasil export.

#### Opsi B — Setup manual

1. Copy `adapters/godot/HAGEGames/engine_template.html` ke project Godot kamu.
2. Copy juga `adapters/godot/HAGEGames/hage-loader.js` dan `adapters/godot/HAGEGames/logo.png`.
3. Di preset export **Web**, set **Html -> Custom Html Shell** ke file `engine_template.html` tadi.
4. Export ke HTML5.
5. Copy `hage-loader.js` dan `logo.png` ke folder hasil export, sejajar dengan `index.html`.

### Cara kerja

- Godot mengganti `$GODOT_URL`, `$GODOT_CONFIG`, dan `$GODOT_PROJECT_NAME` saat export.
- Custom shell membuat `new Engine($GODOT_CONFIG)` lalu memanggil `engine.startGame(...)`.
- Progress diambil dari callback `onProgress(current, total)` milik Godot.
- Setelah startup selesai, overlay HAGE fade out.

### Konfigurasi

Adapter Godot memakai opsi loader ini di dalam shell:

| Field          | Default               | Catatan                                               |
| -------------- | --------------------- | ----------------------------------------------------- |
| `productName`  | `$GODOT_PROJECT_NAME` | Set judul halaman dan `alt` logo.                     |
| `logoUrl`      | `"logo.png"`          | Harus ada sejajar dengan `index.html` hasil export.   |
| `subText`      | `"Loading game"`      | Caption di bawah logo.                                |
| `brandColor`   | `"#ff005a"`           | Warna progress bar + aksen.                           |
| `minDisplayMs` | `600`                 | Floor anti-flash buat load cepat.                     |
| `skipCanvas`   | `true`                | `<canvas>` dikelola Godot, bukan loader.              |

Kalau mau ubah warna/teks/logo, edit `HAGEGames/engine_template.html` sebelum export.

### Verifikasi

1. Buka DevTools browser -> tab Network -> throttle **Slow 3G**.
2. Hard reload (`Ctrl + Shift + R` / `Cmd + Shift + R`).
3. Pastikan loader HAGE muncul sebelum game siap.
4. Pastikan progress bar naik selama download.
5. Pastikan loader mencapai `100%`, fade out, lalu game mulai.
6. Pastikan console tidak ada error `Engine is not defined` atau file hilang.

### Troubleshooting

- **Loader tidak muncul**: pastikan preset export Web memakai `HAGEGames/engine_template.html` sebagai **Custom Html Shell**.
- **Blank page / `Engine is not defined`**: placeholder `$GODOT_URL` tidak diproses; biasanya file dibuka langsung, bukan lewat export Web Godot.
- **Logo hilang**: `logo.png` belum dicopy sejajar dengan `index.html`, atau path-nya diubah.
- **Loader JS hilang**: `hage-loader.js` harus dicopy sejajar dengan `index.html`.
- **Progress lompat dari 0% ke 100%**: export kecil bisa selesai terlalu cepat. Normal; naikkan `minDisplayMs` kalau perlu.
