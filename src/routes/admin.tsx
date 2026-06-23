import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type DragEvent, useRef, useEffect } from "react";
import { z } from "zod";
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
  Shield,
  Award,
  AlertTriangle,
  Loader2,
  Search,
  Lock,
  Mail,
  Phone
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useT, LanguageToggle } from "@/lib/i18n";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function AdminPage() {
  const { t } = useT();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("seal_admin_token");
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
  const [manualStatus, setManualStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [manualMessage, setManualMessage] = useState("");

  // Certificate Database states
  const [certificates, setCertificates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Fetch certificates list from database
  const fetchCertificates = async (searchVal: string = "") => {
    setIsLoadingList(true);
    try {
      const token = sessionStorage.getItem("seal_admin_token") || "";
      const response = await fetch(`${API_BASE_URL}/list_sertifikat.php?search=${encodeURIComponent(searchVal)}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }
      const result = await response.json();
      if (result.success && result.data) {
        setCertificates(result.data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Gagal mengambil list sertifikat:", err);
      }
    } finally {
      setIsLoadingList(false);
    }
  };

  // Training Requests States
  const [requests, setRequests] = useState<any[]>([]);
  const [searchQueryRequests, setSearchQueryRequests] = useState("");
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [activeTab, setActiveTab] = useState<"certificates" | "requests">("certificates");

  // Fetch training requests list from database
  const fetchRequests = async (searchVal: string = "") => {
    setIsLoadingRequests(true);
    try {
      const token = sessionStorage.getItem("seal_admin_token") || "";
      const response = await fetch(`${API_BASE_URL}/list_permintaan.php?search=${encodeURIComponent(searchVal)}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }
      const result = await response.json();
      if (result.success && result.data) {
        setRequests(result.data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Gagal mengambil list permintaan pelatihan:", err);
      }
    } finally {
      setIsLoadingRequests(false);
    }
  };

  // Load certificates and requests on mount (when logged in)
  useEffect(() => {
    if (isLoggedIn) {
      fetchCertificates();
      fetchRequests();
    }
  }, [isLoggedIn]);

  // Session timeout: auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!isLoggedIn) return;

    let lastActivity = Date.now();
    const resetActivity = () => { lastActivity = Date.now(); };
    const checkTimeout = () => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT_MS) {
        handleLogout();
      }
    };

    const timer = setInterval(checkTimeout, 60_000);
    window.addEventListener("click", resetActivity);
    window.addEventListener("keydown", resetActivity);

    return () => {
      clearInterval(timer);
      window.removeEventListener("click", resetActivity);
      window.removeEventListener("keydown", resetActivity);
    };
  }, [isLoggedIn]);

  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const loginSchema = z.object({
      username: z.string().min(3, t("Username minimal 3 karakter", "Username must be at least 3 characters")),
      password: z.string().min(6, t("Kata sandi minimal 6 karakter", "Password must be at least 6 characters")),
    });

    const parsed = loginSchema.safeParse({ username, password });
    if (!parsed.success) {
      setLoginError(parsed.error.issues[0].message);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) {
        sessionStorage.setItem("seal_admin_token", data.token);
        setIsLoggedIn(true);
        setLoginError("");
      } else {
        setLoginError(data?.message || t("Username atau password salah!", "Invalid username or password!"));
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err);
      }
      setLoginError(t("Terjadi kesalahan koneksi ke server.", "A server connection error occurred."));
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("seal_admin_token");
  };

  // Handle Manual Form Submit
  const handleSubmitManual = async (e: FormEvent) => {
    e.preventDefault();

    const certSchema = z.object({
      nama: z.string()
        .min(2, t("Nama minimal 2 karakter", "Name must be at least 2 characters"))
        .max(100, t("Nama maksimal 100 karakter", "Name must be at most 100 characters"))
        .regex(/^[a-zA-Z\s'.]+$/, t("Nama hanya boleh mengandung huruf, spasi, tanda kutip, atau titik", "Name can only contain letters, spaces, quotes, or periods")),
      nomorSertifikat: z.string()
        .min(3, t("Nomor sertifikat minimal 3 karakter", "Certificate number must be at least 3 characters"))
        .max(100, t("Nomor sertifikat maksimal 100 karakter", "Certificate number must be at most 100 characters")),
      tanggalTerbit: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("Format tanggal tidak valid (YYYY-MM-DD)", "Invalid date format (YYYY-MM-DD)")),
      bidangKeahlian: z.string().min(1, t("Silakan pilih bidang keahlian", "Please select a field of expertise")),
    });

    const parsed = certSchema.safeParse({ nama, nomorSertifikat, tanggalTerbit, bidangKeahlian });
    if (!parsed.success) {
      setManualStatus("error");
      setManualMessage(parsed.error.issues[0].message);
      return;
    }

    setManualStatus("loading");
    setManualMessage("");

    try {
      const token = sessionStorage.getItem("seal_admin_token") || "";
      const response = await fetch(`${API_BASE_URL}/simpan_sertifikat.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nama,
          nomor_sertifikat: nomorSertifikat,
          tanggal_terbit: tanggalTerbit,
          bidang_keahlian: bidangKeahlian,
        }),
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setManualStatus("success");
        setManualMessage(data?.message || t("Sertifikat berhasil disimpan!", "Certificate saved successfully!"));
        // Reset form
        setNama("");
        setNomorSertifikat("");
        setTanggalTerbit("");
        setBidangKeahlian("");
        fetchCertificates(searchQuery);

        // Clear success notification after 3 seconds
        setTimeout(() => {
          setManualStatus("idle");
          setManualMessage("");
        }, 3000);
      } else {
        setManualStatus("error");
        setManualMessage(data?.message || t("Gagal menyimpan sertifikat.", "Failed to save certificate."));
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err);
      }
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
    const validMimeTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];

    if (!validExtensions.includes(fileExtension)) {
      setUploadStatus("error");
      setUploadMessage(t("Format file tidak didukung! Gunakan .csv atau .xlsx", "Unsupported file format! Use .csv or .xlsx"));
      setSelectedFile(null);
      return;
    }

    // Check MIME type (if browser provides it)
    if (file.type && !validMimeTypes.includes(file.type)) {
      setUploadStatus("error");
      setUploadMessage(t("MIME type file tidak valid!", "Invalid file MIME type!"));
      setSelectedFile(null);
      return;
    }

    // Check file size (max 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadStatus("error");
      setUploadMessage(t("Ukuran file terlalu besar! Maksimal 5MB", "File is too large! Maximum 5MB"));
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadStatus("idle");
    setUploadMessage("");
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

    try {
      const token = sessionStorage.getItem("seal_admin_token") || "";
      const response = await fetch(`${API_BASE_URL}/upload_sertifikat.php`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setUploadStatus("success");
        setUploadMessage(data?.message || t("File excel berhasil diunggah dan diproses!", "Excel file uploaded and processed successfully!"));
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchCertificates(searchQuery);

        // Clear success notification after 3 seconds
        setTimeout(() => {
          setUploadStatus("idle");
          setUploadMessage("");
        }, 3000);
      } else {
        setUploadStatus("error");
        setUploadMessage(data?.message || t("Gagal memproses file upload.", "Failed to process uploaded file."));
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err);
      }
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
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-charcoal sm:text-3xl">
              {activeTab === "certificates"
                ? t("Verifikasi & Input Sertifikat", "Certificate Management & Input")
                : t("Permintaan Pelatihan", "Training Requests")
              }
            </h1>
            <p className="mt-2 text-sm text-darkgray leading-relaxed max-w-2xl">
              {activeTab === "certificates"
                ? t(
                  "Kelola basis data sertifikasi BNSP SEAL Training Center. Anda dapat menginputkan data secara manual satu per satu atau mengunggah data masal melalui template spreadsheet.",
                  "Manage the SEAL Training Center BNSP certification database. Input individual records manually or batch upload data using spreadsheet templates."
                )
                : t(
                  "Kelola daftar permintaan dan pengajuan pelatihan keselamatan kerja yang dikirimkan oleh calon peserta melalui formulir di website.",
                  "Manage training and safety course requests submitted by potential participants through the website form."
                )
              }
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-8 gap-6">
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${activeTab === "certificates"
                ? "border-charcoal text-charcoal font-black"
                : "border-transparent text-midgray hover:text-charcoal"
              }`}
          >
            {t("Manajemen Sertifikat", "Certificate Management")}
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all flex items-center gap-2 ${activeTab === "requests"
                ? "border-charcoal text-charcoal font-black"
                : "border-transparent text-midgray hover:text-charcoal"
              }`}
          >
            {t("Permintaan Pelatihan", "Training Requests")}
            {requests.length > 0 && (
              <span className="bg-safety text-charcoal text-[9px] px-2 py-0.5 font-black">
                {requests.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "certificates" ? (
          <>
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

                    {/* Template Download Link */}
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

            {/* Certificate List Section */}
            <section className="mt-12 bg-white border border-border shadow-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="bg-charcoal text-safety p-2">
                    <Search size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm">
                      {t("Daftar Sertifikat", "Certificate List")}
                    </h3>
                    <p className="text-xs text-midgray mt-0.5">{t("Cari dan verifikasi sertifikat terdaftar", "Search and verify registered certificates")}</p>
                  </div>
                </div>

                {/* Search Input */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto sm:justify-end">
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
                        <th className="p-3 w-12 text-center">#</th>
                        <th className="p-3">{t("Nama Peserta", "Participant Name")}</th>
                        <th className="p-3">{t("Nomor Sertifikat", "Certificate No.")}</th>
                        <th className="p-3">{t("Bidang Keahlian / Program", "Field of Expertise / Program")}</th>
                        <th className="p-3">{t("Tanggal Terbit", "Issue Date")}</th>
                        <th className="p-3">{t("Masa Berlaku", "Validity")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert, idx) => {
                        const todayStr = new Date().toISOString().split("T")[0];
                        const isActive = !cert.tanggal_expired || cert.tanggal_expired >= todayStr;
                        return (
                          <tr key={cert.nomor_sertifikat} className="border-b border-border hover:bg-lightgray/40 align-middle">
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
                  </ul>
                </div>
                <div className="border border-border p-4 bg-lightgray/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-midgray uppercase tracking-widest">{t("Contoh Format CSV", "CSV Format Example")}</span>
                    <pre className="mt-2 text-xs font-mono text-darkgray bg-white p-3 border border-border overflow-x-auto leading-relaxed select-text">
                      {`nama,nomor_sertifikat,tanggal_terbit,bidang_keahlian
"Ade Kusnandar",Reg. 1290/CSE/2026,2026-06-19,Confined Space Entry
"Bayu Saputra",Reg. 1432/H2S/2026,2026-06-15,H2S Awareness & Safety`}
                    </pre>
                  </div>
                  <p className="text-[10px] text-midgray mt-3">
                    * {t("Pastikan tidak ada karakter aneh pada baris pertama pemisah kolom. Delimiter disarankan menggunakan koma (,) or titik koma (;).", "Make sure there are no malformed characters in the header row. Delimiter should be comma (,) or semicolon (;).")}
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-white border border-border shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="bg-charcoal text-safety p-2">
                  <Search size={18} />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-charcoal text-sm">
                    {t("Daftar Permintaan Pelatihan", "Training Requests List")}
                  </h3>
                  <p className="text-xs text-midgray mt-0.5">
                    {t("Daftar pengajuan formulir permintaan pelatihan dari website", "List of training requests submitted from the website")}
                  </p>
                </div>
              </div>

              {/* Search Input for Requests */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto sm:justify-end">
                <div className="relative max-w-xs w-full">
                  <input
                    type="text"
                    value={searchQueryRequests}
                    onChange={(e) => {
                      setSearchQueryRequests(e.target.value);
                      fetchRequests(e.target.value);
                    }}
                    placeholder={t("Cari Nama / Perusahaan...", "Search Name / Company...")}
                    className="w-full pl-10 pr-4 py-2.5 border border-border text-xs focus:border-charcoal focus:ring-0 focus:outline-none rounded-none transition-colors"
                  />
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-midgray pointer-events-none">
                    <Search size={14} />
                  </span>
                </div>
              </div>
            </div>

            {isLoadingRequests ? (
              <div className="flex flex-col items-center justify-center py-12 text-midgray gap-2">
                <Loader2 className="animate-spin text-charcoal" size={24} />
                <p className="text-xs font-semibold uppercase tracking-wider">{t("Memuat data permintaan...", "Loading requests...")}</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border">
                <p className="text-sm font-semibold text-charcoal">{t("Tidak ada data permintaan pelatihan", "No training requests found")}</p>
                <p className="text-xs text-midgray mt-1">{t("Belum ada pengunjung yang mengisi formulir permintaan pelatihan.", "No visitors have submitted the training request form yet.")}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-charcoal bg-lightgray text-[10px] font-bold uppercase tracking-wider text-charcoal">
                      <th className="p-3 w-12 text-center">#</th>
                      <th className="p-3">{t("Nama Pemohon", "Applicant Name")}</th>
                      <th className="p-3">{t("Perusahaan", "Company")}</th>
                      <th className="p-3">{t("Kontak", "Contact Info")}</th>
                      <th className="p-3">{t("Jenis Pelatihan", "Course Requested")}</th>
                      <th className="p-3">{t("Pesan / Catatan", "Message / Note")}</th>
                      <th className="p-3">{t("Tanggal Pengajuan", "Date Submitted")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, idx) => {
                      return (
                        <tr key={req.id} className="border-b border-border hover:bg-lightgray/40 align-middle">
                          <td className="p-3 w-12 text-center font-bold text-midgray font-mono">{idx + 1}</td>
                          <td className="p-3 font-bold text-charcoal uppercase">{req.nama}</td>
                          <td className="p-3 text-darkgray font-semibold">{req.perusahaan}</td>
                          <td className="p-3 text-darkgray space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <Mail size={12} className="text-midgray shrink-0" />
                              <a href={`mailto:${req.email}`} className="text-charcoal hover:underline">{req.email}</a>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone size={12} className="text-midgray shrink-0" />
                              <a href={`tel:${req.hp}`} className="text-charcoal hover:underline">{req.hp}</a>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="inline-flex px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] bg-charcoal text-safety">
                              {req.jenis_pelatihan}
                            </span>
                          </td>
                          <td className="p-3 text-darkgray max-w-xs break-words leading-relaxed font-medium whitespace-pre-wrap">{req.pesan || "-"}</td>
                          <td className="p-3 text-darkgray font-mono">{formatDateForTable(req.created_at?.split(" ")[0])}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
