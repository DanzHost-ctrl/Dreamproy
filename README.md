# Dreamproy_Mc Website

Website katalog dan download resource **Minecraft Bedrock** dengan desain dark futuristic, responsive mobile-first, search, filter, sorting, halaman detail, gallery lightbox, dan link download eksternal.

## Menjalankan website

Website ini tidak memakai build tool atau dependency. Buka `index.html` langsung di browser, atau jalankan static server lokal:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Struktur penting

```text
index.html       halaman utama
addon.html       katalog addons
map.html         katalog maps
shader.html      katalog shaders
texture.html     katalog textures
skin.html        katalog skins
detail.html      detail resource berdasarkan query ?id=
search.html      pencarian resource
about.html       informasi Dreamproy_Mc
404.html         halaman fallback
css/             style, responsive override, dan animasi
js/              logika katalog, detail, dan pencarian
data/            data resource per kategori
assets/          thumbnail, favicon, dan asset visual lokal
```

## Menambahkan addon

1. Buka `data/addons.js`.
2. Tambahkan object baru ke dalam array `window.ADDONS`.
3. Pastikan `id` unik, tanpa spasi, misalnya `my-new-addon`.
4. Isi `title`, `category`, `thumbnail`, `author`, `version`, `date`, `downloads`, deskripsi, informasi file, dan `downloadUrl`.
5. Simpan file. Tidak perlu mengubah HTML.

Kategori lain menggunakan cara yang sama:

- `data/maps.js` → `window.MAPS`
- `data/shaders.js` → `window.SHADERS`
- `data/textures.js` → `window.TEXTURES`
- `data/skins.js` → `window.SKINS`

## Mengganti thumbnail

1. Simpan gambar di folder kategori terkait, misalnya `assets/images/addons/`.
2. Gunakan path relatif dari halaman utama, contohnya:
   `assets/images/addons/my-addon.webp`
3. Ubah nilai `thumbnail` pada object resource.

SVG placeholder bawaan bisa diganti kapan saja dengan JPG, PNG, atau WebP milikmu. Untuk performa mobile, WebP direkomendasikan.

## Menambahkan screenshot

1. Simpan screenshot di folder kategori terkait.
2. Tambahkan path-nya ke array `screenshots`:

```js
screenshots: [
  "assets/images/addons/my-addon-1.webp",
  "assets/images/addons/my-addon-2.webp"
]
```

Screenshot akan muncul otomatis di halaman detail dan bisa dibuka memakai lightbox.

## Mengganti link download

Ubah nilai `downloadUrl` dengan URL asli dari MediaFire, Google Drive, Pixeldrain, Mega, MCPEDL, atau layanan eksternal lain:

```js
downloadUrl: "https://contoh-domain.com/file-download"
```

Template awal menggunakan `MASUKKAN_LINK_DOWNLOAD_DI_SINI` agar tidak ada fake download. Ganti nilai itu sebelum resource dipublikasikan.

## Menambahkan resource baru

Gunakan template ini:

```js
{
  id: "unique-resource-id",
  title: "Nama Resource",
  category: "Addon",
  thumbnail: "assets/images/addons/resource.webp",
  author: "Nama Author",
  version: "1.21.x",
  date: "2026-09-09",
  downloads: 0,
  shortDescription: "Deskripsi singkat.",
  description: "Penjelasan lengkap resource.",
  features: ["Feature 1", "Feature 2"],
  screenshots: ["assets/images/addons/resource-1.webp"],
  fileName: "Resource.mcaddon",
  fileSize: "25 MB",
  fileFormat: ".mcaddon",
  installGuide: ["Download file.", "Buka dengan Minecraft.", "Aktifkan pack."],
  downloadUrl: "MASUKKAN_LINK_DOWNLOAD_DI_SINI",
  keywords: ["keyword", "minecraft", "bedrock"]
}
```

## Mengganti link sosial

Cari `TIKTOK_URL` dan `WHATSAPP_CHANNEL_URL` di file HTML, lalu ganti dengan URL akun dan channel milikmu. Placeholder sengaja tidak diisi agar website tidak mengarang URL.

## Catatan

- Website tidak memiliki upload, login, database, pembayaran, atau hosting file.
- Tombol download selalu membuka `downloadUrl` yang kamu isi di data.
- Visual hero menggunakan planet/bulan futuristik berbasis CSS sehingga tidak membutuhkan file `.glb` atau library 3D dan tidak akan menghasilkan asset rusak.