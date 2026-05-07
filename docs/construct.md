# Construct 3 Setup

🇬🇧 [English](#english) · 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### Prerequisites

- Construct 3 (browser version) — `editor.construct.net`.
- A Construct 3 project (any template will do).

### Step-by-step

1. Download `hage-loader-construct-v0.1.0.zip` from [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).

2. Unzip. You will get a folder `HAGEGames/` with two files:
   ```
   HAGEGames/hage-construct.js
   HAGEGames/logo.png
   ```

3. In Construct 3, open your project.

4. In the **Project Bar** (left sidebar), find the **Files** node.
   - Right-click **Files** → **Add → Import script...**.
   - Pick `hage-construct.js` from the unzipped folder.
   - Construct shows a dialog. Set **Type** to **Module**. Click OK.

5. Right-click **Files** → **Add → Import file...**.
   - Pick `logo.png` from the unzipped folder.
   - Construct adds it as a project file (defaults are fine — it gets copied to the export root).

6. Disable the default Construct loader (otherwise you'll see two loaders briefly):
   - Click the **Project** node at the top of the Project Bar.
   - In the **Properties** panel: find **Loader style**.
   - Set it to **Nothing**.

7. (Optional) Customize branding by adding **another** import script BEFORE `hage-construct.js`:
   - Right-click **Files** → **Add → Script** → call it `hage-config.js` (Type: Module).
   - Open it and paste:
     ```js
     globalThis.HAGE_CONFIG = {
       productName: "My Construct Game",
       brandColor: "#00d4ff",
       subText: "Loading...",
       minDisplayMs: 800
     };
     ```
   - In the Project Bar, drag `hage-config.js` ABOVE `hage-construct.js` so it loads first.

8. Export the game: **Menu → Project → Export project... → HTML5**.
   - Pick a folder. Construct exports `index.html`, `c3runtime.js`, `data.js`, `style.css`, plus `hage-construct.js` and `logo.png`.

9. Serve the export folder:
   ```bash
   cd <export-folder>
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000`.

### Configuration

The available options on `globalThis.HAGE_CONFIG`:

| Field          | Default            | Notes                                          |
| -------------- | ------------------ | ---------------------------------------------- |
| `productName`  | `"Game"`           | Sets `<title>`.                                |
| `logoUrl`      | `"logo.png"`       | Path relative to export root.                  |
| `subText`      | `"Loading game"`   | Caption.                                       |
| `brandColor`   | `"#ff005a"`        | Bar fill + accent.                             |
| `statusStages` | default 4 stages   | `[{at:0..1, text:"..."}, ...]`.                |
| `minDisplayMs` | `600`              | Anti-flash floor.                              |

### Verification

1. Open exported `index.html` in browser.
2. The HAGE loader renders **immediately** — Construct's normal "Powered by Construct" splash should NOT appear (because Loader Style is set to **Nothing**).
3. Progress bar fills as Construct downloads `c3runtime.js`, `data.js`, etc.
4. Once project starts, loader fades out and the game appears.
5. DevTools Console: no errors about `runOnStartup` undefined or `HAGELoader.init` failing.

### Troubleshooting

- **Loader doesn't appear**: confirm `hage-construct.js` is type **Module** in the Project Bar. Plain Script type doesn't expose `runOnStartup`.
- **Loader appears AND Construct's loader appears**: Loader style not set to **Nothing**. Re-do step 6.
- **Logo missing**: `logo.png` not added as a project file. Re-do step 5. Or `logoUrl` in config doesn't match the filename.
- **Loader hangs at high percentage**: `afterprojectstart` event didn't fire. This is rare — open Console and look for runtime errors during your project's first layout startup.
- **Progress jumps from 0% to 100%**: very small game, loading completes before the listener attaches. Increase `minDisplayMs` so the loader is visible long enough to look intentional.

### Why a script, not a `.c3addon` plugin?

Construct rewrites `index.html` on every export, so injecting via the HTML file breaks on re-export. A `.c3addon` plugin would work but requires significantly more boilerplate (editor + runtime sides) and is harder to maintain. The import-script approach uses Construct's official scripting API (`runOnStartup` + `IRuntime.addEventListener`), survives re-export, and is one file. A proper `.c3addon` is on the roadmap but not required for full functionality.

---

## Bahasa Indonesia

### Prasyarat

- Construct 3 (versi browser) — `editor.construct.net`.
- Project Construct 3 (template apa aja boleh).

### Langkah-langkah

1. Download `hage-loader-construct-v0.1.0.zip` dari [Releases](https://github.com/hagelabs/hage-loader-sdk/releases).

2. Extract. Dapat folder `HAGEGames/` isi dua file:
   ```
   HAGEGames/hage-construct.js
   HAGEGames/logo.png
   ```

3. Di Construct 3, buka project.

4. Di **Project Bar** (sidebar kiri), cari node **Files**.
   - Klik kanan **Files** → **Add → Import script...**.
   - Pilih `hage-construct.js` dari folder yang udah di-extract.
   - Construct nampilin dialog. Set **Type** ke **Module**. Klik OK.

5. Klik kanan **Files** → **Add → Import file...**.
   - Pilih `logo.png` dari folder.
   - Construct tambah sebagai project file (default OK — auto copy ke export root).

6. Disable loader default Construct (biar gak keliatan dua loader):
   - Klik node **Project** di paling atas Project Bar.
   - Di panel **Properties**: cari **Loader style**.
   - Set ke **Nothing**.

7. (Opsional) Custom branding via import script TAMBAHAN sebelum `hage-construct.js`:
   - Klik kanan **Files** → **Add → Script** → kasih nama `hage-config.js` (Type: Module).
   - Buka, paste:
     ```js
     globalThis.HAGE_CONFIG = {
       productName: "Game Construct Saya",
       brandColor: "#00d4ff",
       subText: "Loading...",
       minDisplayMs: 800
     };
     ```
   - Di Project Bar, drag `hage-config.js` ke ATAS `hage-construct.js` biar load duluan.

8. Export game: **Menu → Project → Export project... → HTML5**.
   - Pilih folder. Construct export `index.html`, `c3runtime.js`, `data.js`, `style.css`, plus `hage-construct.js` + `logo.png`.

9. Serve folder export:
   ```bash
   cd <export-folder>
   python3 -m http.server 8000
   ```
   Buka `http://localhost:8000`.

### Konfigurasi

Opsi yang tersedia di `globalThis.HAGE_CONFIG`:

| Field          | Default            | Catatan                                       |
| -------------- | ------------------ | --------------------------------------------- |
| `productName`  | `"Game"`           | Set `<title>`.                                |
| `logoUrl`      | `"logo.png"`       | Path relatif ke export root.                  |
| `subText`      | `"Loading game"`   | Caption.                                      |
| `brandColor`   | `"#ff005a"`        | Bar fill + aksen.                             |
| `statusStages` | default 4 stages   | `[{at:0..1, text:"..."}, ...]`.               |
| `minDisplayMs` | `600`              | Floor anti-flash.                             |

### Verifikasi

1. Buka `index.html` hasil export di browser.
2. Loader HAGE render **langsung** — splash "Powered by Construct" bawaan TIDAK boleh muncul (karena Loader Style = **Nothing**).
3. Progress bar fill seiring Construct download `c3runtime.js`, `data.js`, dst.
4. Setelah project start, loader fade out dan game keliatan.
5. DevTools Console: gak ada error `runOnStartup undefined` atau `HAGELoader.init` failing.

### Troubleshooting

- **Loader gak muncul**: pastiin `hage-construct.js` type **Module** di Project Bar. Plain Script type gak ekspos `runOnStartup`.
- **Loader HAGE + loader Construct dua-duanya muncul**: Loader style belum set ke **Nothing**. Ulangi langkah 6.
- **Logo ilang**: `logo.png` belum di-add sebagai project file. Ulangi langkah 5. Atau `logoUrl` di config gak match nama file.
- **Loader stuck di percentage tinggi**: event `afterprojectstart` gak fire. Jarang — cek Console buat runtime error pas first layout startup.
- **Progress lompat 0% → 100%**: game kecil, loading selesai sebelum listener attach. Naikin `minDisplayMs` biar loader keliatan cukup lama.

### Kenapa import-script, bukan `.c3addon` plugin?

Construct rewrite `index.html` tiap export, jadi inject via file HTML rusak pas re-export. Plugin `.c3addon` bisa work tapi butuh boilerplate banyak (editor + runtime side) dan lebih ribet maintain. Pendekatan import-script pakai API scripting resmi Construct (`runOnStartup` + `IRuntime.addEventListener`), survive re-export, dan cuma satu file. Plugin `.c3addon` proper ada di roadmap tapi gak wajib buat full functionality.
