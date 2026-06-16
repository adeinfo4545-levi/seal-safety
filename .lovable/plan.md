## Perubahan Warna & Tambah Toggle Bahasa

### 1. Palet Warna Baru (Swiss Style)
Ganti Safety Orange dengan skema baru di `src/styles.css`:
- **Primary / Turquoise**: `#6EDFE1` (CTA utama, aksen, garis)
- **Secondary / Lime Green**: `#7EF22A` (highlight, badge, hover state, indikator aktif)
- **Background**: `#FFFFFF` (clean white, dominan)
- **Charcoal**: `#1F2937` (teks utama, header bar)
- **Gray**: `#6B7280` (teks sekunder), `#F5F7FA` (surface)

Token yang diubah:
- `--color-safety` → diganti `--color-primary` (turquoise)
- Tambah `--color-accent` (lime)
- Update semua referensi: tombol CTA, counter, ikon, border aktif, full-bleed CTA band, floating WhatsApp, link hover, focus ring.

Catatan kontras: lime `#7EF22A` di atas putih kontrasnya rendah untuk teks → hanya dipakai sebagai blok latar / aksen grafis, bukan teks. Teks tetap charcoal.

### 2. Toggle Bahasa ID / EN
- Buat `src/lib/i18n.tsx`: React Context + hook `useT()` dengan dictionary `{ id: {...}, en: {...} }`. Default `id`. Simpan pilihan di `localStorage` (`seal.lang`).
- Wrap `RootComponent` di `src/routes/__root.tsx` dengan `<LanguageProvider>`.
- Pindahkan seluruh string copy landing page (hero, nav, programs, schedule, certification, testimonials, blog, contact form labels, footer) ke dictionary dengan key bermakna (mis. `hero.title`, `nav.programs`).
- Tambah `<LanguageToggle />` di sticky nav (pojok kanan, sebelum CTA): dua pill `ID | EN`, aktif = background turquoise, charcoal text.
- Update `<html lang>` via root saat bahasa berubah.

### 3. File yang Disentuh
- `src/styles.css` — token warna
- `src/routes/__root.tsx` — provider + lang attribute
- `src/routes/index.tsx` — pakai `useT()` untuk semua string, ganti class warna, tambah toggle di nav
- `src/lib/i18n.tsx` — baru

### Tidak Diubah
Struktur layout, gambar, ikon, animasi, font Inter, grid 12 kolom, sudut tajam — semua tetap Swiss Style.
