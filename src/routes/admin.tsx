import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type DragEvent, useRef, useEffect } from "react";
import {
  ArrowRight,
  Check,
  UploadCloud,
  LogOut,
  Plus,
  FileSpreadsheet,
  User,
  FileText,
  Calendar,
  Lock,
  Shield,
  Award,
  AlertTriangle,
  Loader2,
  ChevronRight,
  Printer,
  Search,
  Download,
  Archive,
  CheckSquare
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useT, LanguageToggle } from "@/lib/i18n";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// Configure API base URL (Change this to your direct production path if needed)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost/Project-seal-ssh/api";



const getCertificateHtml = (data: any, logoSrc: string) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const safeCertNumber = data.nomor_sertifikat.replace(/[^A-Za-z0-9_\-]/g, '_');
  const trainerSignatureImg = data.nama_trainer
    ? `<img src="${API_BASE_URL}/signatures/${safeCertNumber}.png" style="height:55px;max-width:150px;object-fit:contain;" onerror="this.style.display='none'" />`
    : `<div style="height:55px;"></div>`;

  const verificationUrl = `${window.location.origin}/?nomor=${encodeURIComponent(data.nomor_sertifikat)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verificationUrl)}`;

  return `
    <html>
      <head>
        <title>Sertifikat SEAL - ${data.nama_peserta}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
          @page { size: A4 landscape; margin: 0; }
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 0;
            font-family: 'Inter', Arial, sans-serif;
            background: #fff;
            width: 297mm; height: 210mm;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cert-wrap {
            width: 297mm; height: 210mm;
            padding: 14px;
            background: #fff;
            position: relative;
          }
          .cert-inner {
            border: 2.5px solid #111;
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            overflow: hidden; position: relative;
            background: #fff;
          }
          /* ===== TOP HEADER ===== */
          .header {
            background-color: #0d7377;
            background-image: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 30px,
              rgba(255,255,255,0.04) 30px,
              rgba(255,255,255,0.04) 32px
            );
            border-bottom: 2.5px solid #111;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
            position: relative;
          }
          .header-stc-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden; pointer-events: none;
          }
          .header-stc-text {
            position: absolute; top: 0; left: 0;
            font-size: 9px; font-weight: 900;
            color: rgba(255,255,255,0.07);
            white-space: nowrap;
            letter-spacing: 3px;
            line-height: 1.8;
            width: 200%; height: 200%;
          }
          .qr-box {
            border: 2px solid rgba(255,255,255,0.5);
            padding: 3px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            z-index: 1;
          }
          .cert-title-banner {
            flex-grow: 1;
            margin: 0 28px;
            text-align: center;
            z-index: 1;
          }
          .cert-title-top {
            font-size: 13px;
            font-weight: 700;
            color: rgba(255,255,255,0.85);
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 4px;
          }
          .cert-title-main {
            font-size: 34px;
            font-weight: 900;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          }
          .logo-box {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1;
          }
          .logo-img { height: 55px; width: auto; }
          .logo-text {
            display: flex; flex-direction: column; align-items: flex-start;
          }
          .logo-name {
            font-size: 22px; font-weight: 900; color: #fff;
            letter-spacing: 1px; line-height: 1;
          }
          .logo-tagline {
            font-size: 7px; font-weight: 600; color: rgba(255,255,255,0.8);
            letter-spacing: 1.5px; margin-top: 3px;
            text-transform: uppercase;
          }
          .logo-sub {
            font-size: 6.5px; font-weight: 500; color: rgba(255,255,255,0.7);
            font-style: italic; margin-top: 1px; white-space: nowrap;
          }
          /* ===== BODY ===== */
          .cert-body {
            flex-grow: 1;
            background: #fff;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="380" height="52"><text x="5" y="18" fill="rgba(10,90,100,0.03)" font-size="8" font-family="Arial" font-weight="900" letter-spacing="2">SEAL TRAINING CENTER  SEAL TRAINING CENTER  SEAL TRAINING CENTER</text><text x="40" y="38" fill="rgba(10,90,100,0.03)" font-size="8" font-family="Arial" font-weight="900" letter-spacing="2">SEAL TRAINING CENTER  SEAL TRAINING CENTER  SEAL TRAINING CENTER</text></svg>');
            background-repeat: repeat;
            padding: 16px 30px 50px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
          }
          .cert-main {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex-grow: 1;
            gap: 6px;
          }
          .org-name {
            font-size: 18px; font-weight: 800;
            color: #0d7377; letter-spacing: 1.5px;
            text-transform: uppercase;
          }
          .certifies-line {
            font-size: 13px; font-style: italic;
            color: #555; margin-top: 1px;
          }
          .divider {
            width: 80px; height: 2px;
            background: #0d7377;
            margin: 4px auto;
          }
          .participant-name {
            font-size: 40px; font-weight: 900;
            color: #111;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0;
            line-height: 1;
          }
          .nik-line {
            font-size: 12px; font-weight: 700;
            color: #333; font-family: 'Courier New', monospace;
            margin-top: 4px;
          }
          .completed-label {
            font-size: 13px; font-weight: 800;
            color: #333; text-transform: uppercase;
            letter-spacing: 1px;
          }
          .program-name {
            font-size: 26px; font-weight: 900;
            color: #8e1c1c;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 2px 0;
          }
          .date-line {
            font-size: 13px; font-weight: 700; color: #333;
          }
          .date-val { font-weight: 900; }
          .validity-line {
            font-size: 11px; font-weight: 700;
            font-style: italic; color: #555; margin-top: 2px;
          }
          /* ===== SIGNATURES ===== */
          .sigs {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 20px;
            margin-top: 8px;
          }
          .sig-box {
            text-align: center;
            width: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .sig-img-wrap {
            height: 55px;
            display: flex; align-items: center; justify-content: center;
          }
          .sig-underline {
            width: 100%;
            border-top: 1.5px solid #222;
            margin-top: 3px;
            padding-top: 4px;
            font-size: 10.5px; font-weight: 800;
            color: #000; text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .sig-title {
            font-size: 9px; color: #555;
            font-weight: 600; margin-top: 2px;
            line-height: 1.3;
          }
          /* ===== FOOTER ===== */
          .footer {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
          }
          .cert-num-tag {
            background: #8e1c1c;
            color: #fff;
            padding: 7px 18px;
            font-size: 12.5px; font-weight: 800;
            font-family: 'Courier New', monospace;
            letter-spacing: 0.5px;
            border-top: 2px solid #111;
            border-right: 2px solid #111;
          }
          .footer-verify {
            padding-right: 28px; padding-bottom: 7px;
            font-size: 8.5px; font-weight: 700;
            color: #333; text-align: right; line-height: 1.4;
          }
          .footer-url { color: #0d7377; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="cert-wrap">
          <div class="cert-inner">

            <!-- HEADER -->
            <div class="header">
              <div class="header-stc-bg">
                <div class="header-stc-text">
                  STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp;<br/>
                  STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp;<br/>
                  STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp; STC &nbsp;
                </div>
              </div>

              <!-- QR Code -->
              <div class="qr-box">
                <img src="${qrUrl}" style="width:72px;height:72px;display:block;" />
              </div>

              <!-- Title Banner -->
              <div class="cert-title-banner">
                <div class="cert-title-top">SEAL Training Center Presents</div>
                <div class="cert-title-main">Certificate of Completion</div>
              </div>

              <!-- Logo -->
              <div class="logo-box">
                <img src="${logoSrc}" class="logo-img" onerror="this.style.display='none'" />
                <div class="logo-text">
                  <span class="logo-name">SEAL</span>
                  <span class="logo-tagline">Training &amp; Consulting</span>
                  <span class="logo-sub">Suryasegarahana Evaluation Analysis &amp; Learning</span>
                </div>
              </div>
            </div>

            <!-- BODY -->
            <div class="cert-body">
              <div class="cert-main">
                <div>
                  <div class="org-name">SEAL Training Center</div>
                  <div class="certifies-line">Certifies that</div>
                  <div class="divider"></div>
                  <div class="participant-name">${data.nama_peserta}</div>
                  <div class="nik-line">NIK : ${data.nik || '-'}</div>
                </div>
                <div>
                  <div class="completed-label">Has successfully completed of</div>
                  <div class="program-name">${data.nama_program}</div>
                </div>
                <div>
                  <div class="date-line">Date of Completion <span style="font-size:11px;font-weight:600;">(dd/mm/yyyy)</span> : <span class="date-val">${formatDate(data.tanggal_terbit)}</span></div>
                  <div class="validity-line">Valid for 2 (two) years from date attended</div>
                </div>
              </div>

              <!-- Signatures -->
              <div class="sigs">
                <div class="sig-box">
                  <div class="sig-img-wrap">${trainerSignatureImg}</div>
                  <div class="sig-underline">${data.nama_trainer || 'INSTRUCTOR'}</div>
                  <div class="sig-title">Trainer</div>
                </div>
                <div class="sig-box">
                  <div class="sig-img-wrap">
                    <svg width="130" height="48" viewBox="0 0 130 50">
                      <path d="M 10 38 C 25 28, 38 10, 44 10 C 50 10, 52 38, 60 38 C 68 38, 76 20, 82 20 C 88 20, 92 35, 100 30 C 108 24, 112 10, 120 10" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M 18 32 C 40 32, 62 30, 90 28" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div class="sig-underline">SURYADINATA, SE, CPRM</div>
                  <div class="sig-title">Direktur SEAL Training Center<br/>PT SURYA SEGARA HANA</div>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <div class="cert-num-tag">Certificate Number : ${data.nomor_sertifikat}</div>
                <div class="footer-verify">
                  Check your certificate number registration on our website<br/>
                  <span class="footer-url">www.sealtrainingcenter.com/certificate</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </body>
    </html>
  `;
};

const printCertificate = async (data: any) => {
  // Remove any existing print iframe
  const oldIframe = document.getElementById("print-certificate-iframe");
  if (oldIframe) {
    oldIframe.remove();
  }

  try {
    const pdfBlob = await generateCertificatePDF(data);
    const url = window.URL.createObjectURL(pdfBlob);

    // Create a new hidden iframe
    const iframe = document.createElement("iframe");
    iframe.id = "print-certificate-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.visibility = "hidden";

    document.body.appendChild(iframe);

    iframe.src = url;
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 500);
    };
  } catch (err) {
    console.error("Gagal mencetak PDF:", err);
    alert("Gagal mencetak sertifikat.");
  }
};

const handleDownloadPdf = async (cert: any) => {
  try {
    const pdfBlob = await generateCertificatePDF(cert);
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cert.nama_peserta.replace(/[^a-zA-Z0-9]/g, "_")}_${cert.nomor_sertifikat.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Gagal mendownload PDF:", err);
    alert("Gagal mendownload PDF sertifikat.");
  }
};

// Load pdf-lib from CDN
const loadPdfLib = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).PDFLib) {
      resolve((window as any).PDFLib);
      return;
    }
    const script = document.createElement("script");
    script.id = "cdn-pdflib";
    script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
    script.async = true;
    script.onload = () => resolve((window as any).PDFLib);
    script.onerror = () => reject(new Error("Gagal memuat pdf-lib dari CDN"));
    document.head.appendChild(script);
  });
};

// Load JSZip from CDN
const loadJSZip = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).JSZip) { resolve((window as any).JSZip); return; }
    const script = document.createElement("script");
    script.id = "cdn-jszip";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    script.async = true;
    script.onload = () => resolve((window as any).JSZip);
    script.onerror = () => reject(new Error("Gagal memuat JSZip"));
    document.head.appendChild(script);
  });
};

const loadCDNLibraries = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).JSZip && (window as any).html2canvas && (window as any).jspdf) {
      resolve({
        JSZip: (window as any).JSZip,
        html2canvas: (window as any).html2canvas,
        jsPDF: (window as any).jspdf.jsPDF
      });
      return;
    }

    const scripts = [
      { id: "cdn-jszip", url: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" },
      { id: "cdn-html2canvas", url: "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" },
      { id: "cdn-jspdf", url: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" }
    ];

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === scripts.length) {
        resolve({
          JSZip: (window as any).JSZip,
          html2canvas: (window as any).html2canvas,
          jsPDF: (window as any).jspdf.jsPDF
        });
      }
    };

    const onError = (e: any) => {
      reject(new Error("Failed to load libraries from CDN: " + e.target.src));
    };

    scripts.forEach((s) => {
      if (document.getElementById(s.id)) {
        const isLoaded = (s.id === "cdn-jszip" && (window as any).JSZip) ||
          (s.id === "cdn-html2canvas" && (window as any).html2canvas) ||
          (s.id === "cdn-jspdf" && (window as any).jspdf);
        if (isLoaded) {
          onLoad();
        } else {
          const el = document.getElementById(s.id);
          el?.addEventListener("load", onLoad);
          el?.addEventListener("error", onError);
        }
        return;
      }

      const script = document.createElement("script");
      script.id = s.id;
      script.src = s.url;
      script.async = true;
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
      document.head.appendChild(script);
    });
  });
};

const generateCertificatePDF = async (cert: any): Promise<Blob> => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  // Load pdf-lib
  const PDFLib = await loadPdfLib();
  const { PDFDocument, rgb, StandardFonts } = PDFLib;

  // Fetch the original PDF template
  const templateUrl = "/template_sertifikat_seal.pdf";
  const templateBytes = await fetch(templateUrl).then(res => {
    if (!res.ok) throw new Error("Gagal memuat template PDF: " + res.status);
    return res.arrayBuffer();
  });

  // Load the template
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize(); // 1583.04 x 1095.96 pt

  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ── Helper: draw centered text ──────────────────────────────────────────
  const drawCentered = (
    text: string,
    yFromBottom: number,
    fontSize: number,
    font: any,
    colorRgb: [number, number, number] = [0, 0, 0],
    xCenter: number = 824.4 // Exact center axis of text content in the template
  ) => {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: xCenter - textWidth / 2,
      y: yFromBottom,
      size: fontSize,
      font,
      color: rgb(colorRgb[0], colorRgb[1], colorRgb[2]),
    });
  };

  // ── Find QR Code placement coordinates and clean placeholder texts in Content Streams ─────────────────
  let qrCoords = { x: 27, y: 779, width: 170, height: 170 };

  try {
    const contents = page.node.normalizedEntries().Contents;
    if (contents) {
      const streamRefs = contents instanceof PDFArray ? contents.asArray() : [contents];
      for (const ref of streamRefs) {
        const stream = pdfDoc.context.lookup(ref);
        if (stream && typeof stream.getUncompressedContents === 'function') {
          const uncompressed = stream.getUncompressedContents();
          // losslessly decode latin1 binary string
          const decoder = new TextDecoder('latin1');
          const encoder = new TextEncoder();
          let contentStr = decoder.decode(uncompressed);

          // 1. Locate template's pre-existing QR code coordinates
          const imgRegex = /([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+cm[\s\S]*?\/(\w+)\s+Do/g;
          let match;
          while ((match = imgRegex.exec(contentStr)) !== null) {
            const w = Math.abs(parseFloat(match[1]));
            const h = Math.abs(parseFloat(match[4]));
            const imgX = parseFloat(match[5]);
            const imgY = parseFloat(match[6]);

            console.log("Ditemukan image di PDF template:", { x: imgX, y: imgY, width: w, height: h, name: match[7] });

            // The QR code is a square on the top left
            if (Math.abs(w - h) < 5 && imgX < 200 && imgY > 600) {
              qrCoords = { x: imgX, y: imgY, width: w, height: h };
              console.log("QR Code disesuaikan dengan template:", qrCoords);
              break;
            }
          }

          // 2. Replace static text placeholders with spaces of the same length to make them invisible
          contentStr = contentStr.replace(/nama_peserta/g, "            ");
          contentStr = contentStr.replace(/nik_peserta/g, "           ");
          contentStr = contentStr.replace(/nama_pelatihan/g, "              ");
          contentStr = contentStr.replace(/tanggal_pelatihan/g, "                 ");
          contentStr = contentStr.replace(/nomor_sertifikat/g, "                ");
          contentStr = contentStr.replace(/nama_trainer/g, "            ");

          // Write back clean stream content
          stream.setContent(encoder.encode(contentStr));
        }
      }
    }
  } catch (err) {
    console.error("Gagal mendeteksi QR code / membersihkan stream:", err);
  }

  // ── Draw dynamic certificate values at exact placeholder coordinates ────

  // 1. Participant Name (centered around x = 824.4, bold, black, uppercase)
  const nama = (cert.nama_peserta || "").toUpperCase();
  drawCentered(nama, 584.62, 44, helveticaBold, [0, 0, 0], 824.4);

  // 2. NIK value (left-aligned next to static label "NIK :")
  const nikVal = cert.nik || "-";
  page.drawText(nikVal, {
    x: 795.53,
    y: 551.38,
    size: 20,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  // 3. Training Program Name (centered, bold, maroon, uppercase)
  const program = (cert.nama_program || "").toUpperCase();
  drawCentered(program, 437.59, 36, helveticaBold, [0.557, 0.110, 0.110], 824.4);

  // 4. Date of Completion value (bold, black)
  const dateVal = formatDate(cert.tanggal_terbit);
  page.drawText(dateVal, {
    x: 762.53,
    y: 339.53,
    size: 22,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  // 5. Trainer Name (centered around trainer column axis x = 945.7, bold, black, uppercase)
  const trainerName = (cert.nama_trainer || "INSTRUCTOR").toUpperCase();
  drawCentered(trainerName, 88.872, 20, helveticaBold, [0, 0, 0], 945.7);

  // 6. Certificate Number (bold, white, inside maroon footer)
  page.drawText(cert.nomor_sertifikat, {
    x: 361.63,
    y: 36.648,
    size: 26,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // 7. QR Code - embed as image on top of pre-existing template QR
  try {
    const verificationUrl = `${window.location.origin}/?nomor=${encodeURIComponent(cert.nomor_sertifikat)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationUrl)}&format=png`;
    const qrResponse = await fetch(qrUrl);
    if (qrResponse.ok) {
      const qrBytes = await qrResponse.arrayBuffer();
      const qrImage = await pdfDoc.embedPng(qrBytes);

      // Draw a white background rectangle exactly fitting the QR code to mask the old one
      page.drawRectangle({
        x: qrCoords.x,
        y: qrCoords.y,
        width: qrCoords.width,
        height: qrCoords.height,
        color: rgb(1, 1, 1),
      });

      // Draw the new QR code exactly on top
      page.drawImage(qrImage, {
        x: qrCoords.x,
        y: qrCoords.y,
        width: qrCoords.width,
        height: qrCoords.height,
      });
    }
  } catch (err) {
    console.error("Gagal menggambar QR code:", err);
  }

  // 8. Trainer Signature Image (placed directly above trainer name)
  try {
    const safeCertNumber = cert.nomor_sertifikat.replace(/[^A-Za-z0-9_\-]/g, '_');
    const sigUrl = `${API_BASE_URL}/signatures/${safeCertNumber}.png`;
    const sigResponse = await fetch(sigUrl);
    if (sigResponse.ok) {
      const sigBytes = await sigResponse.arrayBuffer();
      const sigImage = await pdfDoc.embedPng(sigBytes);
      // Dynamically scale signature while preserving its original aspect ratio
      const maxBoxWidth = 400;
      const maxBoxHeight = 210;
      
      const imgWidth = sigImage.width;
      const imgHeight = sigImage.height;
      const scaleRatio = Math.min(maxBoxWidth / imgWidth, maxBoxHeight / imgHeight);
      
      const drawWidth = imgWidth * scaleRatio;
      const drawHeight = imgHeight * scaleRatio;
      
      // Center horizontally on trainer name (xCenter = 945.7) and vertically in the signature space
      const drawX = 945.7 - (drawWidth / 2);
      const drawY = 120 + (maxBoxHeight - drawHeight) / 2;

      page.drawImage(sigImage, {
        x: drawX,
        y: drawY,
        width: drawWidth,
        height: drawHeight,
      });
    }
  } catch {
    // Tanda tangan tidak tersedia
  }

  // Serialize the PDF
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};


function AdminPage() {
  const { t } = useT();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("seal_admin_auth") === "true";
    }
    return false;
  });

  // Login Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Manual Input Form States
  const [nama, setNama] = useState("");
  const [nomorSertifikat, setNomorSertifikat] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [bidangKeahlian, setBidangKeahlian] = useState("");
  const [nik, setNik] = useState("");
  const [namaTrainer, setNamaTrainer] = useState("");
  const [manualStatus, setManualStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [manualMessage, setManualMessage] = useState("");

  const [trainerSigBase64, setTrainerSigBase64] = useState("");

  // Handle signature image file selection
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

  // Certificate Database states
  const [certificates, setCertificates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Multi-select and ZIP packaging states
  const [selectedCertNumbers, setSelectedCertNumbers] = useState<string[]>([]);
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadZip = async () => {
    if (selectedCertNumbers.length === 0) return;
    setIsZipping(true);
    try {
      const JSZip = await loadJSZip();
      const zip = new JSZip();

      const selectedCerts = certificates.filter(c => selectedCertNumbers.includes(c.nomor_sertifikat));

      for (const cert of selectedCerts) {
        const pdfBlob = await generateCertificatePDF(cert);
        const safeFilename = `${cert.nama_peserta.replace(/[^a-zA-Z0-9]/g, "_")}_${cert.nomor_sertifikat.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
        zip.file(safeFilename, pdfBlob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sertifikat_SEAL_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal membuat zip:", err);
      alert(t("Terjadi kesalahan saat membuat file ZIP.", "An error occurred while creating the ZIP file."));
    } finally {
      setIsZipping(false);
    }
  };

  // Fetch certificates list from database
  const fetchCertificates = async (searchVal: string = "") => {
    setIsLoadingList(true);
    try {
      const response = await fetch(`${API_BASE_URL}/list_sertifikat.php?search=${encodeURIComponent(searchVal)}`);
      const result = await response.json();
      if (result.success && result.data) {
        setCertificates(result.data);
        setSelectedCertNumbers([]); // Reset checked list on data updates
      }
    } catch (err) {
      console.error("Gagal mengambil list sertifikat:", err);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Load certificates on mount (when logged in)
  useEffect(() => {
    if (isLoggedIn) {
      fetchCertificates();
    }
  }, [isLoggedIn]);

  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBatchSig, setSelectedBatchSig] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchSigInputRef = useRef<HTMLInputElement>(null);

  const formatDateForTable = (dateStr: string) => {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const shortYear = year.slice(-2);
      return `${day}/${month}/${shortYear}`;
    }
    return dateStr;
  };

  // Handle Login
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple authentication logic (adjustable)
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("seal_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError(t("Username atau password salah!", "Invalid username or password!"));
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("seal_admin_auth");
  };

  // Handle Manual Form Submit
  const handleSubmitManual = async (e: FormEvent) => {
    e.preventDefault();
    if (!nama || !nomorSertifikat || !tanggalTerbit || !bidangKeahlian) {
      setManualStatus("error");
      setManualMessage(t("Semua kolom wajib harus diisi!", "All required fields must be filled!"));
      return;
    }

    setManualStatus("loading");
    setManualMessage("");

    try {
      // Use trainer signature photo base64
      let signatureBase64 = trainerSigBase64;

      const response = await fetch(`${API_BASE_URL}/simpan_sertifikat.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          nomor_sertifikat: nomorSertifikat,
          tanggal_terbit: tanggalTerbit,
          bidang_keahlian: bidangKeahlian,
          nik,
          nama_trainer: namaTrainer,
          tanda_tangan: signatureBase64
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setManualStatus("success");
        setManualMessage(data?.message || t("Sertifikat berhasil disimpan!", "Certificate saved successfully!"));
        // Reset form
        setNama("");
        setNomorSertifikat("");
        setTanggalTerbit("");
        setBidangKeahlian("");
        setNik("");
        setNamaTrainer("");
        setTrainerSigBase64("");
        fetchCertificates(searchQuery);
      } else {
        setManualStatus("error");
        setManualMessage(data?.message || t("Gagal menyimpan sertifikat.", "Failed to save certificate."));
      }
    } catch (err) {
      console.error(err);
      setManualStatus("error");
      setManualMessage(t("Terjadi kesalahan koneksi ke server.", "A server connection error occurred."));
    }
  };

  // Drag & Drop File Handlers
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = [".csv", ".xlsx", ".xls"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setUploadMessage("");
    } else {
      setUploadStatus("error");
      setUploadMessage(t("Format file tidak didukung! Gunakan .csv atau .xlsx", "Unsupported file format! Use .csv or .xlsx"));
      setSelectedFile(null);
    }
  };

  // Handle File Upload Submit
  const handleUploadFile = async () => {
    if (!selectedFile) {
      setUploadStatus("error");
      setUploadMessage(t("Pilih file terlebih dahulu!", "Please select a file first!"));
      return;
    }

    setUploadStatus("loading");
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (selectedBatchSig) {
      formData.append("signature", selectedBatchSig);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/upload_sertifikat.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setUploadStatus("success");
        setUploadMessage(data?.message || t("File excel berhasil diunggah dan diproses!", "Excel file uploaded and processed successfully!"));
        setSelectedFile(null);
        setSelectedBatchSig(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (batchSigInputRef.current) batchSigInputRef.current.value = "";
        fetchCertificates(searchQuery);
      } else {
        setUploadStatus("error");
        setUploadMessage(data?.message || t("Gagal memproses file upload.", "Failed to process uploaded file."));
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
      setUploadMessage(t("Terjadi kesalahan saat mengunggah file.", "An error occurred while uploading file."));
    }
  };

  // RENDER: LOGIN PAGE (If not logged in)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightgray p-4 font-sans select-none">
        <div className="w-full max-w-md bg-white border border-border shadow-xl p-8 relative">
          <div className="absolute top-4 right-4">
            <LanguageToggle />
          </div>

          <div className="flex flex-col items-center mb-8">
            <img src={logoImg} alt="SEAL Training Center" className="h-12 w-auto object-contain mb-4" />
            <h2 className="text-xl font-black uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Shield className="text-safety" size={20} />
              {t("ADMIN CONTROL PANEL", "ADMIN CONTROL PANEL")}
            </h2>
            <p className="text-xs text-midgray mt-1 tracking-wide">{t("Pintu Masuk Verifikasi & Data Sertifikat", "BNSP Certificate Entry & Verification Portal")}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Username", "Username")}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Kata Sandi", "Password")}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                />
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border-l-2 border-destructive p-3 flex items-start gap-2.5 text-xs text-destructive font-medium">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-charcoal hover:bg-safety hover:text-charcoal text-white font-bold uppercase tracking-widest text-xs py-3.5 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {t("Masuk Panel", "Access Panel")}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-4 text-center">
            <p className="text-[10px] text-midgray leading-relaxed uppercase tracking-wider font-semibold">
              Tip: {t("Gunakan username", "Use username")} <span className="text-charcoal font-black">admin</span> & password <span className="text-charcoal font-black">admin123</span>
            </p>
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-charcoal hover:text-safety font-bold uppercase tracking-wider mt-4 transition-colors">
              &larr; {t("Kembali Ke Beranda", "Back to Home")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: ADMIN DASHBOARD (If logged in)
  return (
    <div className="min-h-screen bg-lightgray font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-white backdrop-blur shadow-sm">
        <div className="container-swiss flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="SEAL Training Center" className="h-10 w-auto object-contain" />
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block"></div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-charcoal text-white px-2.5 py-1">
              <Shield size={12} className="text-safety" />
              {t("Admin Panel", "Admin Panel")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-lightgray transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">{t("Keluar", "Logout")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="container-swiss py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-charcoal sm:text-3xl">
              {t("Verifikasi & Input Sertifikat", "Certificate Management & Input")}
            </h1>
            <p className="mt-2 text-sm text-darkgray leading-relaxed max-w-2xl">
              {t(
                "Kelola basis data sertifikasi BNSP SEAL Training Center. Anda dapat menginputkan data secara manual satu per satu atau mengunggah data masal melalui template spreadsheet.",
                "Manage the SEAL Training Center BNSP certification database. Input individual records manually or batch upload data using spreadsheet templates."
              )}
            </p>
          </div>
        </div>

        {/* Action Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Form: Manual Input */}
          <div className="lg:col-span-7 bg-white border border-border shadow-md p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6 border-b border-border pb-4">
              <div className="bg-charcoal text-safety p-2">
                <Plus size={18} />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm">
                  {t("Input Sertifikat Manual", "Manual Certificate Entry")}
                </h3>
                <p className="text-xs text-midgray mt-0.5">{t("Tambahkan data sertifikat baru satu per satu", "Add new certificate record individually")}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitManual} className="space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Nama Lengkap", "Full Name")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder={t("e.g. John Doe", "e.g. John Doe")}
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Nomor Sertifikat", "Certificate Number")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <FileText size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={nomorSertifikat}
                        onChange={(e) => setNomorSertifikat(e.target.value)}
                        placeholder="e.g. Reg. 12345/HSE/2026"
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Tanggal Terbit", "Issue Date")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <Calendar size={16} />
                      </span>
                      <input
                        type="date"
                        required
                        value={tanggalTerbit}
                        onChange={(e) => setTanggalTerbit(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Bidang Keahlian", "Field of Expertise")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <Award size={16} />
                      </span>
                      <select
                        required
                        value={bidangKeahlian}
                        onChange={(e) => setBidangKeahlian(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none bg-white transition-colors appearance-none"
                      >
                        <option value="">-- {t("Pilih Bidang Keahlian", "Select Expertise")} --</option>
                        <option value="H2S Awareness & Safety">H2S Awareness & Safety</option>
                        <option value="Confined Space Entry">Confined Space Entry</option>
                        <option value="Authorized Gas Tester">Authorized Gas Tester</option>
                        <option value="Basic Sea Survival">Basic Sea Survival</option>
                        <option value="Working at Height">Working at Height</option>
                        <option value="Fire Fighting Officer">Fire Fighting Officer</option>
                        <option value="Security Management">Security Management</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-charcoal">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("NIK Peserta", "Participant NIK")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="e.g. 3276021809760009"
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">{t("Nama Trainer", "Trainer Name")}</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        value={namaTrainer}
                        onChange={(e) => setNamaTrainer(e.target.value)}
                        placeholder="e.g. HIDAYAT TUROCHMAN"
                        className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray mb-1.5">
                      {t("Unggah Tanda Tangan Trainer (Foto/Gambar)", "Upload Trainer Signature (Photo/Image)")}
                    </label>
                    <div className="border border-border p-4 bg-lightgray/20 flex flex-col sm:flex-row gap-4 items-center justify-between rounded-none">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureFileChange}
                        className="text-xs text-charcoal file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-white file:text-xs file:font-bold file:uppercase file:tracking-wider hover:file:bg-lightgray file:cursor-pointer"
                      />
                      {trainerSigBase64 && (
                        <div className="flex items-center gap-3 border border-border bg-white p-2 shrink-0">
                          <img src={trainerSigBase64} alt="Signature Preview" className="h-10 max-w-[120px] object-contain" />
                          <button
                            type="button"
                            onClick={() => setTrainerSigBase64("")}
                            className="text-[10px] font-bold text-destructive hover:underline cursor-pointer"
                          >
                            {t("Hapus", "Remove")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-4">
                {manualStatus !== "idle" && manualMessage && (
                  <div className={`p-4 flex items-start gap-3 border-l-2 text-xs font-semibold ${manualStatus === "loading" ? "bg-lightgray border-midgray text-charcoal" :
                    manualStatus === "success" ? "bg-green-50 border-emerald-500 text-emerald-800" :
                      "bg-red-50 border-destructive text-destructive"
                    }`}>
                    {manualStatus === "loading" ? (
                      <Loader2 size={16} className="animate-spin shrink-0 mt-0.5" />
                    ) : manualStatus === "success" ? (
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span>{manualMessage}</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={manualStatus === "loading"}
                    className="bg-charcoal text-white hover:bg-safety hover:text-charcoal font-bold uppercase tracking-wider text-xs px-8 py-3.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {manualStatus === "loading" && <Loader2 size={14} className="animate-spin" />}
                    {t("Simpan Data", "Save Record")}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Form: Dropzone File Upload */}
          <div className="lg:col-span-5 bg-white border border-border shadow-md p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6 border-b border-border pb-4">
              <div className="bg-charcoal text-safety p-2">
                <UploadCloud size={18} />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm">
                  {t("Unggah Data Masal", "Batch Certificate Upload")}
                </h3>
                <p className="text-xs text-midgray mt-0.5">{t("Upload file .csv / .xlsx untuk input masal", "Upload .csv / .xlsx files for batch imports")}</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Dropzone Container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center ${isDragActive
                    ? "border-safety bg-safety/5"
                    : selectedFile
                      ? "border-charcoal bg-lightgray"
                      : "border-border hover:border-charcoal bg-lightgray/30"
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    className="hidden"
                  />

                  {selectedFile ? (
                    <>
                      <FileSpreadsheet className="text-charcoal mb-3 animate-bounce" size={40} />
                      <p className="text-sm font-bold text-charcoal break-all px-4">{selectedFile.name}</p>
                      <p className="text-xs text-midgray mt-1 font-mono">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setUploadStatus("idle");
                          setUploadMessage("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="mt-4 text-[10px] font-bold uppercase tracking-wider text-destructive hover:underline"
                      >
                        {t("Hapus File", "Remove File")}
                      </button>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="text-midgray mb-3" size={40} />
                      <p className="text-sm font-bold text-charcoal px-2">
                        {t("Tarik & Letakkan File di Sini", "Drag & Drop Spreadsheet Here")}
                      </p>
                      <p className="text-xs text-midgray mt-1">
                        {t("atau klik untuk memilih file dari komputer Anda", "or click to select a file from your computer")}
                      </p>
                      <p className="text-[10px] text-midgray font-mono uppercase mt-4 tracking-wider bg-border px-2 py-0.5">
                        CSV, XLSX, XLS
                      </p>
                    </>
                  )}
                </div>

                {/* Template Download Link (Mock / Professional detail) */}
                <div className="flex justify-between items-center bg-lightgray p-3.5 border border-border">
                  <div className="flex items-center gap-2 text-charcoal">
                    <FileSpreadsheet size={16} />
                    <span className="text-xs font-semibold">{t("Template Excel", "Excel Template")}</span>
                  </div>
                  <a
                    href="/template_sertifikat.csv"
                    download="template_sertifikat.csv"
                    className="text-[10px] font-black uppercase tracking-wider text-charcoal hover:text-safety transition-colors"
                  >
                    {t("Unduh Template ↓", "Download ↓")}
                  </a>
                </div>

                {/* Trainer Signature for Batch */}
                <div className="border border-border p-3.5 bg-lightgray/30 space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-midgray">
                    {t("Unggah Tanda Tangan Trainer untuk Batch Ini (Opsional)", "Upload Trainer Signature for this Batch (Optional)")}
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={batchSigInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedBatchSig(e.target.files[0]);
                        }
                      }}
                      className="text-xs text-charcoal file:mr-3 file:py-1 file:px-2.5 file:border file:border-border file:bg-white file:text-[10px] file:font-bold file:uppercase file:tracking-wider hover:file:bg-lightgray file:cursor-pointer"
                    />
                    {selectedBatchSig && (
                      <div className="flex items-center justify-between bg-white px-2.5 py-1.5 border border-border text-[10px] text-charcoal font-semibold">
                        <span className="truncate max-w-[200px]">{selectedBatchSig.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBatchSig(null);
                            if (batchSigInputRef.current) batchSigInputRef.current.value = "";
                          }}
                          className="text-destructive hover:underline cursor-pointer"
                        >
                          {t("Hapus", "Remove")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {uploadStatus !== "idle" && uploadMessage && (
                  <div className={`p-4 flex items-start gap-3 border-l-2 text-xs font-semibold ${uploadStatus === "loading" ? "bg-lightgray border-midgray text-charcoal" :
                    uploadStatus === "success" ? "bg-green-50 border-emerald-500 text-emerald-800" :
                      "bg-red-50 border-destructive text-destructive"
                    }`}>
                    {uploadStatus === "loading" ? (
                      <Loader2 size={16} className="animate-spin shrink-0 mt-0.5" />
                    ) : uploadStatus === "success" ? (
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span>{uploadMessage}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleUploadFile}
                  disabled={!selectedFile || uploadStatus === "loading"}
                  className="w-full bg-charcoal hover:bg-safety hover:text-charcoal text-white font-bold uppercase tracking-wider text-xs py-3.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploadStatus === "loading" && <Loader2 size={14} className="animate-spin" />}
                  {t("Proses Unggah Masal", "Process Batch Upload")}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Certificate List & Print Section */}
        <section className="mt-12 bg-white border border-border shadow-md p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="bg-charcoal text-safety p-2">
                <Search size={18} />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm">
                  {t("Daftar & Cetak Sertifikat", "Certificate List & Print")}
                </h3>
                <p className="text-xs text-midgray mt-0.5">{t("Cari, verifikasi, dan cetak sertifikat terdaftar", "Search, verify, and print registered certificates")}</p>
              </div>
            </div>

            {/* Search Input & Action ZIP Button */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto sm:justify-end">
              {selectedCertNumbers.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="inline-flex items-center gap-1.5 bg-safety text-safety-foreground hover:bg-charcoal hover:text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isZipping ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      {t("Memproses ZIP...", "Creating ZIP...")}
                    </>
                  ) : (
                    <>
                      <Archive size={14} />
                      {t(`ZIP Terpilih (${selectedCertNumbers.length})`, `ZIP Selected (${selectedCertNumbers.length})`)}
                    </>
                  )}
                </button>
              )}

              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchCertificates(e.target.value);
                  }}
                  placeholder={t("Cari Nama / No. Sertifikat...", "Search Name / Certificate No...")}
                  className="w-full pl-10 pr-4 py-2.5 border border-border text-xs focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                />
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray pointer-events-none">
                  <Search size={14} />
                </span>
              </div>
            </div>
          </div>

          {isLoadingList ? (
            <div className="flex flex-col items-center justify-center py-12 text-midgray gap-2">
              <Loader2 className="animate-spin text-charcoal" size={24} />
              <p className="text-xs font-semibold uppercase tracking-wider">{t("Memuat data sertifikat...", "Loading certificates...")}</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border">
              <p className="text-sm font-semibold text-charcoal">{t("Tidak ada data sertifikat ditemukan", "No certificates found")}</p>
              <p className="text-xs text-midgray mt-1">{t("Coba ubah kata kunci pencarian atau tambah sertifikat baru.", "Try changing search query or add a new certificate.")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-charcoal bg-lightgray text-[10px] font-bold uppercase tracking-wider text-charcoal">
                    <th className="p-3 w-10">
                      <input
                        type="checkbox"
                        checked={certificates.length > 0 && selectedCertNumbers.length === certificates.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCertNumbers(certificates.map(c => c.nomor_sertifikat));
                          } else {
                            setSelectedCertNumbers([]);
                          }
                        }}
                        className="h-4 w-4 rounded-none border-border accent-charcoal cursor-pointer"
                      />
                    </th>
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">{t("Nama Peserta", "Participant Name")}</th>
                    <th className="p-3">{t("Nomor Sertifikat", "Certificate No.")}</th>
                    <th className="p-3">{t("Bidang Keahlian / Program", "Field of Expertise / Program")}</th>
                    <th className="p-3">{t("Tanggal Terbit", "Issue Date")}</th>
                    <th className="p-3">{t("Masa Berlaku", "Validity")}</th>
                    <th className="p-3 text-right">{t("Aksi", "Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert, idx) => {
                    const todayStr = new Date().toISOString().split("T")[0];
                    const isActive = !cert.tanggal_expired || cert.tanggal_expired >= todayStr;
                    const isChecked = selectedCertNumbers.includes(cert.nomor_sertifikat);
                    return (
                      <tr key={cert.nomor_sertifikat} className={`border-b border-border hover:bg-lightgray/40 align-middle ${isChecked ? "bg-safety/5" : ""}`}>
                        <td className="p-3 w-10">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCertNumbers(prev => [...prev, cert.nomor_sertifikat]);
                              } else {
                                setSelectedCertNumbers(prev => prev.filter(num => num !== cert.nomor_sertifikat));
                              }
                            }}
                            className="h-4 w-4 rounded-none border-border accent-charcoal cursor-pointer"
                          />
                        </td>
                        <td className="p-3 w-12 text-center font-bold text-midgray font-mono">{idx + 1}</td>
                        <td className="p-3 font-bold text-charcoal uppercase">{cert.nama_peserta}</td>
                        <td className="p-3 font-mono text-darkgray">{cert.nomor_sertifikat}</td>
                        <td className="p-3 text-darkgray font-medium">{cert.nama_program}</td>
                        <td className="p-3 text-darkgray">{formatDateForTable(cert.tanggal_terbit)}</td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] ${isActive ? "bg-safety text-safety-foreground" : "bg-red-600 text-white"}`}>
                            {isActive ? t("Aktif", "Active") : t("Expired", "Expired")}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => printCertificate(cert)}
                              className="inline-flex items-center gap-1.5 border border-charcoal bg-white px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors cursor-pointer text-[10px]"
                            >
                              <Printer size={12} />
                              {t("Cetak", "Print")}
                            </button>
                            <button
                              onClick={() => handleDownloadPdf(cert)}
                              className="inline-flex items-center gap-1.5 border border-charcoal bg-white px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors cursor-pointer text-[10px]"
                            >
                              <Download size={12} />
                              {t("Unduh", "Download")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Documentation & Template Guide Section */}
        <section className="mt-12 bg-white border border-border shadow-md p-6 sm:p-8">
          <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm mb-4 flex items-center gap-2 border-b border-border pb-3">
            <FileSpreadsheet size={16} className="text-safety" />
            {t("Panduan Format Spreadsheet (Excel/CSV)", "Spreadsheet Format Guide (Excel/CSV)")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-darkgray leading-relaxed">
                {t(
                  "Untuk mengunggah data masal, pastikan file spreadsheet Anda memiliki nama kolom yang sesuai di baris pertama (header). Kolom-kolom yang dapat digunakan:",
                  "To upload batch records, ensure your spreadsheet file contains the correct column names in the first row (headers). Available columns:"
                )}
              </p>
              <ul className="mt-3 space-y-2 pl-4 list-disc text-xs text-darkgray font-medium">
                <li><span className="font-bold text-charcoal">nama</span> - {t("Nama lengkap pemilik sertifikat (wajib)", "Full name of the certificate holder (required)")}</li>
                <li><span className="font-bold text-charcoal">nomor_sertifikat</span> - {t("Nomor registrasi sertifikat unik (wajib)", "Unique certificate registration number (required)")}</li>
                <li><span className="font-bold text-charcoal">tanggal_terbit</span> - {t("Format tanggal YYYY-MM-DD, e.g. 2026-06-19 (wajib)", "Date format YYYY-MM-DD, e.g. 2026-06-19 (required)")}</li>
                <li><span className="font-bold text-charcoal">bidang_keahlian</span> - {t("Nama bidang pelatihan / kompetensi (wajib)", "Name of training course / competency field (required)")}</li>
                <li><span className="font-bold text-charcoal">nik</span> - {t("Nomor Induk Kependudukan peserta (opsional)", "Participant NIK number (optional)")}</li>
                <li><span className="font-bold text-charcoal">nama_trainer</span> - {t("Nama lengkap instruktur/trainer (opsional)", "Full name of the trainer (optional)")}</li>
              </ul>
            </div>
            <div className="border border-border p-4 bg-lightgray/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-midgray uppercase tracking-widest">{t("Contoh Format CSV", "CSV Format Example")}</span>
                <pre className="mt-2 text-xs font-mono text-darkgray bg-white p-3 border border-border overflow-x-auto leading-relaxed select-text">
                  {`nama,nomor_sertifikat,tanggal_terbit,bidang_keahlian,nik,nama_trainer
"Ade Kusnandar",Reg. 1290/CSE/2026,2026-06-19,Confined Space Entry,3276021809760001,HIDAYAT TUROCHMAN
"Bayu Saputra",Reg. 1432/H2S/2026,2026-06-15,H2S Awareness & Safety,3276021809760002,HIDAYAT TUROCHMAN`}
                </pre>
              </div>
              <p className="text-[10px] text-midgray mt-3">
                * {t("Pastikan tidak ada karakter aneh pada baris pertama pemisah kolom. Delimiter disarankan menggunakan koma (,) atau titik koma (;).", "Make sure there are no malformed characters in the header row. Delimiter should be comma (,) or semicolon (;).")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

}
