# LAPORAN AUDIT KEAMANAN V3
## SEAL Training Center Website — Scan Terkini

| Detail | Keterangan |
|--------|------------|
| **Tanggal Audit** | 24 Juni 2026 |
| **Codebase Commit** | Terkini (post-fix) |
| **Auditor** | Claude Code (Automated Security Audit) |
| **Skor Keamanan** | **6.5 / 10 — Ada regresi dan celah baru** |

---

## Ringkasan

Dari scan ulang menyeluruh terhadap kode terkini, ditemukan **11 temuan** — campuran antara regresi (perbaikan sebelumnya yang dikembalikan) dan celah baru.

| Severity | Jumlah |
|----------|--------|
| KRITIS | 2 |
| TINGGI | 3 |
| SEDANG | 4 |
| RENDAH | 2 |

---

## KRITIS

### 1. Error Stack Trace Ditampilkan ke User di Production
**File:** `src/start.ts` baris 15-23

Error middleware meng-inject full stack trace ke halaman error HTML yang dikirim ke browser:

```typescript
let errStr = "Unknown SSR Error";
if (error instanceof Error) { errStr = error.stack || error.message; }
const html = renderErrorPage().replace(
  "Something went wrong on our end.",
  `...${errStr}</pre>`
);
```

**Risiko:** Attacker bisa sengaja memicu error (malformed URL, invalid input) untuk mendapatkan stack trace yang mengekspos file paths internal, versi library, dan struktur server.

**Solusi:** Tampilkan stack trace hanya di development:
```typescript
const displayError = import.meta.env.DEV ? errStr : "Something went wrong on our end.";
```

---

### 2. Security Middleware Tidak Aktif
**File:** `src/start.ts` baris 73-75

`securityMiddleware` sudah didefinisikan tapi **tidak digunakan** di `requestMiddleware`:

```typescript
export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
  // ❌ securityMiddleware tidak disertakan!
}));
```

**Risiko:** Semua security headers (X-Frame-Options, HSTS, CSP, Permissions-Policy, dll.) **tidak aktif** — seolah tidak pernah dikonfigurasi. Website rentan clickjacking, MIME sniffing, dan XSS.

**Solusi:**
```typescript
requestMiddleware: [securityMiddleware, errorMiddleware],
```

---

## TINGGI

### 3. API URL Fallback ke localhost (Regresi)
**File:** `src/routes/admin.tsx` baris 30, `src/routes/index.tsx` baris 45

API base URL kembali menggunakan hardcoded localhost:

```typescript
// admin.tsx:30
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1/Project-seal-ssh/api";

// index.tsx:45
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1/Project-seal-ssh/api";
```

**Risiko:**
- Mengekspos nama project internal (`Project-seal-ssh`)
- Menggunakan HTTP tanpa enkripsi
- Tidak akan berfungsi di production

**Solusi:** Gunakan path relatif sebagai fallback:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
```

---

### 4. Polling API Setiap 500ms — Self-DoS & Token Exposure
**File:** `src/routes/admin.tsx` baris 140-144

```typescript
// Polling setiap 0.5 detik (500ms) secara diam-diam (silent)
const intervalId = setInterval(() => {
  fetchCertificates(searchCertRef.current, true);
  fetchRequests(searchReqRef.current, true);
}, 500);
```

**Risiko:**
- **Self-DoS:** 4 HTTP requests per detik per admin yang login — jika 5 admin online = 20 req/detik ke backend
- **Token exposure:** Setiap request mengirim Bearer token, meningkatkan window serangan jika jaringan tidak aman (HTTP)
- **Resource waste:** Baterai, bandwidth, dan server resources terbuang

**Solusi:** Naikkan interval ke 15-30 detik, atau gunakan WebSocket/SSE untuk real-time updates:
```typescript
const intervalId = setInterval(() => {
  fetchCertificates(searchCertRef.current, true);
  fetchRequests(searchReqRef.current, true);
}, 30_000); // 30 detik
```

---

### 5. Error Message Mengekspos Detail Internal
**File:** `src/routes/admin.tsx` baris 227, 324

Error messages menyertakan URL API dan detail error ke user:

```typescript
// baris 227 — login error
setLoginError(t(
  `Terjadi kesalahan koneksi ke server. (URL: ${API_BASE_URL}/login.php, Error: ${err instanceof Error ? err.message : String(err)})`,
  `A server connection error occurred. (URL: ${API_BASE_URL}/login.php, Error: ${String(err)})`
));

// baris 324 — manual submit error
setManualMessage(t(
  "Error sistem: " + (err instanceof Error ? err.message : String(err)),
  "System error: " + String(err)
));
```

**Risiko:** Mengekspos URL backend lengkap, pesan error internal, dan tipe exception ke semua user — membantu attacker melakukan reconnaissance.

**Solusi:** Tampilkan pesan generik ke user, log detail hanya di DEV:
```typescript
setLoginError(t("Terjadi kesalahan koneksi ke server.", "A server connection error occurred."));
```

---

## SEDANG

### 6. `rel="noreferrer"` Tidak Konsisten pada External Links
**File:** `src/routes/index.tsx`

WhatsApp FAB menggunakan `rel="noreferrer"`:
```tsx
<a href={WA} target="_blank" rel="noreferrer" ...>
```

Tapi link WhatsApp lain (di section "Thank you") tidak:
```tsx
<a href={WA} target="_blank" className="font-semibold ...">
```

**Risiko:** Link `target="_blank"` tanpa `rel="noreferrer noopener"` memberi halaman tujuan akses ke `window.opener`, memungkinkan tab phishing.

**Solusi:** Tambahkan `rel="noreferrer noopener"` ke semua external links.

---

### 7. Footer Links Mengarah ke `href="#"` (Broken Links)
**File:** `src/routes/index.tsx` baris 1567, 1459-1467

```tsx
<a href="#" className="hover:text-safety">LinkedIn</a>
<a href="#" className="hover:text-safety">Instagram</a>
<a href="#" className="hover:text-safety">YouTube</a>
```

Dan navigasi footer:
```tsx
<a href="#" className="hover:text-safety">{x}</a>
```

**Risiko:** Bukan celah keamanan langsung, tapi broken links di footer mempengaruhi SEO dan credibility. Links `#` juga bisa dimanfaatkan untuk clickjacking jika dikombinasikan dengan kelemahan lain.

**Solusi:** Arahkan ke URL sosial media yang benar, atau hapus jika belum tersedia.

---

### 8. CSP Policy Terlalu Permissive untuk Development
**File:** `src/start.ts` baris 53

```
connect-src 'self' http://localhost http://127.0.0.1 ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*;
```

**Risiko:** CSP mengizinkan koneksi ke localhost di semua port — ini memang dibutuhkan untuk development, tapi **harus dihapus di production** karena memungkinkan halaman terhubung ke service lokal user.

**Solusi:** Pisahkan CSP untuk development dan production:
```typescript
const connectSrc = import.meta.env.DEV
  ? "connect-src 'self' http://localhost http://127.0.0.1 ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*;"
  : "connect-src 'self';";
```

---

### 9. Nama File Peserta Ditampilkan Tanpa Escape di Tabel
**File:** `src/routes/admin.tsx` baris 927-929

```tsx
<td className="p-3 font-bold text-charcoal uppercase">{cert.nama_peserta}</td>
<td className="p-3 font-mono text-darkgray">{cert.nomor_sertifikat}</td>
<td className="p-3 text-darkgray font-medium">{cert.nama_program}</td>
```

**Catatan:** React secara default meng-escape string di JSX, jadi ini **bukan XSS vulnerability**. Namun jika data API mengandung karakter khusus atau teks sangat panjang tanpa word-break, bisa menyebabkan UI break.

**Risiko:** Rendah — React sudah handle escaping, tapi validasi data dari API tetap direkomendasikan.

**Solusi:** Tambahkan `max-w-*` dan `truncate` class untuk mencegah layout break.

---

## RENDAH

### 10. Token Dikirim di Body saat Logout
**File:** `src/routes/admin.tsx` baris 236-243

```typescript
await fetch(`${API_BASE_URL}/logout.php`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ token }) // Token dikirim ganda
});
```

**Risiko:** Token dikirim dua kali (header + body) — redundan dan memperbesar attack surface jika body ter-log di server.

**Solusi:** Kirim token hanya di header Authorization:
```typescript
body: JSON.stringify({}) // atau hapus body
```

---

### 11. `import.meta.env.DEV` Check di Error Page Tidak Konsisten
**File:** `src/start.ts` baris 15-23

Stack trace diinjeksi ke HTML error page tanpa mengecek `import.meta.env.DEV`:

```typescript
// console.error dibungkus DEV check ✅
if (import.meta.env.DEV) { console.error(error); }

// Tapi HTML injection TIDAK dibungkus ❌
const html = renderErrorPage().replace(
  "Something went wrong on our end.",
  `...${errStr}</pre>`
);
```

**Solusi:** Bungkus HTML injection dengan DEV check (lihat temuan #1).

---

## Checklist Perbaikan

### KRITIS (Harus segera)
- [ ] **#1** — Jangan tampilkan stack trace di production error page
- [ ] **#2** — Aktifkan `securityMiddleware` di `requestMiddleware` array

### TINGGI (Prioritas tinggi)
- [ ] **#3** — Ganti API URL fallback dari `http://127.0.0.1/Project-seal-ssh/api` ke `/api`
- [ ] **#4** — Ubah polling interval dari 500ms ke minimal 15000ms (15 detik)
- [ ] **#5** — Hapus detail URL/error dari pesan error yang ditampilkan ke user

### SEDANG (Dijadwalkan)
- [ ] **#6** — Tambahkan `rel="noreferrer noopener"` ke semua external links
- [ ] **#7** — Ganti `href="#"` di footer dengan URL yang benar atau hapus
- [ ] **#8** — Pisahkan CSP `connect-src` untuk dev vs production
- [ ] **#9** — Tambahkan class truncate/max-width pada kolom tabel sertifikat

### RENDAH (Opsional)
- [ ] **#10** — Hapus token dari body request logout
- [ ] **#11** — Konsistenkan DEV check di error handling

---

*Laporan Audit V3 — Generated by Claude Code Security Audit*
