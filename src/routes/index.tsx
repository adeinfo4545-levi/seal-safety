import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Flame,
  Wind,
  Gauge,
  HeartPulse,
  HardHat,
  ShieldAlert,
  LifeBuoy,
  FileCheck,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Award,
  Users,
  Building2,
  Target,
  Shield,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import blog1 from "@/assets/blog1.jpg";
import blog2 from "@/assets/blog2.jpg";
import blog3 from "@/assets/blog3.jpg";
import logoImg from "@/assets/logo.png";
import logoWhiteImg from "@/assets/logo-white.png";
import logomedco from "@/assets/logo_medco.png";
import logochevron from "@/assets/logo-chevron.png";
import logofreeport from "@/assets/logo-freeport.png";
import logopertamina from "@/assets/logo-pertamina.png";
import logophe from "@/assets/logo-phe.png";
import logovale from "@/assets/logo-vale.png";
import { useT, LanguageToggle } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEAL Training Center — Pelatihan HSE & Oil & Gas Indonesia" },
      {
        name: "description",
        content:
          "Pelatihan HSE, Oil & Gas, Marine Safety, Emergency Response, dan Industrial Safety berstandar industri. Instruktur praktisi, sertifikasi resmi, corporate training tersedia.",
      },
      { property: "og:title", content: "SEAL Training Center" },
      {
        property: "og:description",
        content:
          "Bangun budaya keselamatan kerja bersama SEAL Training Center — mitra pelatihan HSE & Oil & Gas terpercaya di Indonesia.",
      },
    ],
  }),
  component: Landing,
});

const WA = "https://wa.me/6287777265623";

function WhatsappIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

type Program = {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  dur: string;
  durEn: string;
  cert: string;
  certEn: string;
  icon: typeof Wind;
  syllabus: string[];
  syllabusEn: string[];
  target: string;
  targetEn: string;
};

const programs: Program[] = [
  {
    name: "H2S Awareness & Safety",
    nameEn: "H2S Awareness & Safety",
    desc: "Pengenalan bahaya gas H2S, deteksi, dan respons darurat di area Oil & Gas.",
    descEn: "H2S hazard awareness, detection, and emergency response in Oil & Gas areas.",
    dur: "2 Hari",
    durEn: "2 Days",
    cert: "BNSP",
    certEn: "BNSP",
    icon: Wind,
    syllabus: [
      "Sifat fisik dan kimia gas H2S (Hidrogen Sulfida)",
      "Efek kesehatan paparan gas H2S berdasarkan konsentrasi (ppm)",
      "Karakteristik daerah bahaya dan klasifikasi area kerja",
      "Penggunaan detektor gas personal dan sistem alarm",
      "Penggunaan Self-Contained Breathing Apparatus (SCBA)",
      "Rencana tanggap darurat dan teknik penyelamatan korban gas H2S"
    ],
    syllabusEn: [
      "Physical and chemical properties of H2S gas (Hydrogen Sulfide)",
      "Health effects of H2S exposure based on concentration (ppm)",
      "Hazardous area characteristics and work area classification",
      "Use of personal gas detectors and alarm systems",
      "Use of Self-Contained Breathing Apparatus (SCBA)",
      "Emergency response planning and rescue techniques for H2S victims"
    ],
    target: "Pekerja lapangan, operator, supervisor, dan personel keselamatan di industri minyak & gas bumi (hulu & hilir).",
    targetEn: "Field workers, operators, supervisors, and safety personnel in the oil & gas industry (upstream & downstream)."
  },
  {
    name: "Confined Space Entry (CSE)",
    nameEn: "Confined Space Entry (CSE)",
    desc: "Prosedur entry, rescue, dan kontrol bahaya pada ruang terbatas.",
    descEn: "Entry procedures, rescue, and hazard control in confined spaces.",
    dur: "3 Hari",
    durEn: "3 Days",
    cert: "BNSP",
    certEn: "BNSP",
    icon: ShieldAlert,
    syllabus: [
      "Identifikasi dan klasifikasi ruang terbatas (confined space)",
      "Analisis potensi bahaya (kekurangan oksigen, gas beracun, dll.)",
      "Prosedur izin masuk kerja aman (Permit to Work)",
      "Teknik ventilasi dan pembersihan gas (purging)",
      "Tugas dan tanggung jawab Safety Watch / Standby Person",
      "Peralatan keselamatan, APD khusus, dan prosedur penyelamatan darurat"
    ],
    syllabusEn: [
      "Identification and classification of confined spaces",
      "Potential hazard analysis (oxygen deficiency, toxic gases, etc.)",
      "Safe entry permit procedures (Permit to Work)",
      "Ventilation techniques and gas purging",
      "Duties and responsibilities of the Safety Watch / Standby Person",
      "Safety equipment, specialized PPE, and emergency rescue procedures"
    ],
    target: "Teknisi pemeliharaan, petugas keselamatan, pekerja tangki, dan supervisor industri manufaktur, kimia, dan migas.",
    targetEn: "Maintenance technicians, safety officers, tank entry workers, and supervisors in manufacturing, chemical, and oil & gas industries."
  },
  {
    name: "Authorized Gas Tester (AGT)",
    nameEn: "Authorized Gas Tester (AGT)",
    desc: "Kompetensi pengukuran gas untuk hot work dan confined space.",
    descEn: "Gas measurement competency for hot work and confined space entry.",
    dur: "3 Hari",
    durEn: "3 Days",
    cert: "BNSP",
    certEn: "BNSP",
    icon: Gauge,
    syllabus: [
      "Teori atmosfer gas mudah terbakar, beracun, dan oksigen",
      "Pengenalan, kalibrasi, dan pengoperasian peralatan deteksi gas (gas detector)",
      "Teknik dan strategi pengambilan sampel gas secara aman",
      "Interpretasi hasil pengukuran dan pencatatan dokumentasi",
      "Penilaian bahaya sebelum pekerjaan panas (hot work) atau masuk ruang terbatas",
      "Studi kasus kecelakaan akibat kegagalan pengujian gas"
    ],
    syllabusEn: [
      "Atmospheric theory of flammable, toxic gases, and oxygen levels",
      "Introduction, calibration, and operation of gas detection equipment",
      "Safe gas sampling techniques and strategies",
      "Interpretation of measurement results and documentation logging",
      "Hazard assessment before hot work or confined space entry",
      "Case studies of accidents due to gas testing failure"
    ],
    target: "Safety inspector, permit issuer, gas tester, dan personel K3 yang bertanggung jawab atas pengujian gas atmosfer.",
    targetEn: "Safety inspectors, permit issuers, gas testers, and HSE personnel responsible for atmospheric gas testing."
  },
  {
    name: "First Aid",
    nameEn: "First Aid",
    desc: "Pertolongan pertama pada kecelakaan kerja dan CPR sesuai standar internasional.",
    descEn: "First aid for workplace incidents and CPR per international standards.",
    dur: "2 Hari",
    durEn: "2 Days",
    cert: "BNSP / KEMENAKER",
    certEn: "BNSP / KEMENAKER",
    icon: HeartPulse,
    syllabus: [
      "Prinsip dasar tindakan pertolongan pertama (First Aid)",
      "Resusitasi Jantung Paru (RJP / CPR) dan penggunaan AED",
      "Penanganan luka bakar, perdarahan, patah tulang, dan syok",
      "Penanganan kondisi medis darurat (serangan jantung, asma, pingsan)",
      "Teknik pemindahan dan evakuasi korban secara aman",
      "Pengelolaan kotak P3K dan pelaporan insiden medis"
    ],
    syllabusEn: [
      "Basic principles of first aid response",
      "Cardiopulmonary Resuscitation (CPR) and AED operation",
      "Handling burns, bleeding, fractures, and shock",
      "Managing medical emergencies (heart attacks, asthma, fainting)",
      "Safe victim transfer and evacuation techniques",
      "First aid kit management and medical incident reporting"
    ],
    target: "Tim tanggap darurat (ERT), petugas P3K di tempat kerja, supervisor, dan karyawan umum di semua sektor industri.",
    targetEn: "Emergency Response Teams (ERT), workplace first aiders, supervisors, and general employees in all industrial sectors."
  },
  {
    name: "Petugas Peran Kebakaran (Kelas D)",
    nameEn: "Fire Fighting Officer (Class D)",
    desc: "Teknik pemadaman, klasifikasi kebakaran, dan emergency response industri.",
    descEn: "Extinguishing techniques, fire classification, and industrial emergency response.",
    dur: "3 Hari",
    durEn: "3 Days",
    cert: "Kemnaker",
    certEn: "Kemnaker",
    icon: Flame,
    syllabus: [
      "Teori Segitiga Api dan klasifikasi kebakaran",
      "Pengenalan dan praktik penggunaan APAR (Alat Pemadam Api Ringan)",
      "Prosedur pencegahan dan inspeksi bahaya kebakaran di tempat kerja",
      "Sistem proteksi kebakaran aktif dan pasif (sprinkler, hidran, detektor)",
      "Rencana evakuasi darurat kebakaran dan penanganan histeria massa",
      "Organisasi penanggulangan kebakaran di lingkungan kerja"
    ],
    syllabusEn: [
      "Fire Triangle theory and fire classification",
      "Introduction and practice in using portable fire extinguishers (APAR)",
      "Fire hazard prevention and inspection procedures in the workplace",
      "Active and passive fire protection systems (sprinklers, hydrants, detectors)",
      "Fire emergency evacuation plans and managing crowd panic",
      "Fire prevention organization in the workplace environment"
    ],
    target: "Anggota tim pemadam kebakaran internal perusahaan, petugas K3, dan personel penanggung jawab keselamatan gedung.",
    targetEn: "Members of company internal firefighting teams, HSE officers, and building safety personnel."
  },
  {
    name: "Basic Sea Survival",
    nameEn: "Basic Sea Survival",
    desc: "Survival laut, evakuasi, dan penggunaan life-saving appliances.",
    descEn: "Sea survival, evacuation, and use of life-saving appliances.",
    dur: "2 Hari",
    durEn: "2 Days",
    cert: "BNSP",
    certEn: "BNSP",
    icon: LifeBuoy,
    syllabus: [
      "Prinsip bertahan hidup di laut (sea survival)",
      "Pengenalan peralatan keselamatan kapal dan platform lepas pantai (life jacket, life raft, lifeboat)",
      "Teknik melompat ke air secara aman dari ketinggian",
      "Teknik bertahan hidup berkelompok dan pencegahan hipotermia",
      "Prosedur penyelamatan oleh helikopter (heli hoist rescue)",
      "Penggunaan perangkat sinyal darurat (flare, cermin, radio)"
    ],
    syllabusEn: [
      "Sea survival principles and mindset",
      "Introduction to safety equipment on vessels and offshore platforms (life jackets, life rafts, lifeboats)",
      "Safe water entry techniques from heights",
      "Group survival techniques and hypothermia prevention",
      "Helicopter rescue procedures (heli hoist rescue)",
      "Use of emergency signaling devices (flares, mirrors, radio)"
    ],
    target: "Kru kapal, pekerja platform lepas pantai (offshore rig), surveyor maritim, dan personel industri perkapalan.",
    targetEn: "Vessel crew, offshore platform workers, marine surveyors, and shipping industry personnel."
  },
  {
    name: "Tenaga Kerja Pada Ketinggian Tingkat 1 (TKPK)",
    nameEn: "Working at Height Level 1 (TKPK)",
    desc: "Bekerja aman di ketinggian, fall protection, dan rescue plan.",
    descEn: "Safe work at height, fall protection, and rescue planning.",
    dur: "2 Hari",
    durEn: "2 Days",
    cert: "BNSP / KEMENAKER",
    certEn: "BNSP / KEMENAKER",
    icon: HardHat,
    syllabus: [
      "Regulasi K3 bekerja di ketinggian (Kemnaker & standar internasional)",
      "Pengenalan, pemeriksaan, dan perawatan Alat Pelindung Jatuh (Full Body Harness, Lanyard, Anchor)",
      "Teknik memanjat aman (climbing techniques) menggunakan double lanyard",
      "Pemasangan dan penggunaan sistem pengaman jatuh (fall arrest system)",
      "Prosedur penyelamatan darurat sederhana pada ketinggian",
      "Identifikasi bahaya jatuh dan penilaian risiko (Risk Assessment)"
    ],
    syllabusEn: [
      "HSE regulations for working at height (Kemnaker & international standards)",
      "Introduction, inspection, and maintenance of Fall Protection Equipment (Full Body Harness, Lanyard, Anchor)",
      "Safe climbing techniques using double lanyards",
      "Installation and use of fall arrest systems",
      "Simple emergency rescue procedures at height",
      "Fall hazard identification and Risk Assessment"
    ],
    target: "Pekerja konstruksi, teknisi telekomunikasi (tower climber), pemeliharaan gedung, dan pekerja akses tali pemula.",
    targetEn: "Construction workers, telecommunication technicians (tower climbers), building maintenance staff, and rope access beginners."
  },
  {
    name: "Tenaga Kerja Bangunan Tinggi Tingkat 2 (TKBT)",
    nameEn: "Working on High Buildings Level 2 (TKBT)",
    desc: "Sistem izin kerja, JSA, dan kontrol bahaya operasional.",
    descEn: "Permit-to-work system, JSA, and operational hazard control.",
    dur: "1 Hari",
    durEn: "1 Day",
    cert: "BNSP / KEMENAKER",
    certEn: "BNSP / KEMENAKER",
    icon: FileCheck,
    syllabus: [
      "Struktur sistem manajemen keselamatan bekerja di bangunan tinggi",
      "Pembuatan Analisis Keselamatan Pekerjaan (Job Safety Analysis - JSA)",
      "Sistem izin kerja aman dan pengawasan pekerjaan tinggi kompleks",
      "Teknik penyelamatan canggih pada ketinggian (high angle rescue)",
      "Pemasangan lintasan pengaman sementara dan permanen (lifeline)",
      "Evaluasi kesehatan pekerja dan kesiapan tim sebelum bekerja"
    ],
    syllabusEn: [
      "Safety management system structure for high building work",
      "Job Safety Analysis (JSA) preparation for heights",
      "Safe permit-to-work systems and supervision of complex high-altitude work",
      "Advanced rescue techniques at height (high angle rescue)",
      "Installation of temporary and permanent safety lifelines",
      "Worker health evaluations and pre-work team readiness"
    ],
    target: "Supervisor pekerjaan di ketinggian, manajer K3, insinyur konstruksi, dan penyelamat (rescue team) profesional.",
    targetEn: "Supervisors for work at heights, HSE managers, construction engineers, and professional rescue teams."
  },
  {
    name: "Pelatihan Security (Gada Pratama)",
    nameEn: "Security Officer Training (Gada Pratama)",
    desc: "Sertifikasi K3 dan kompetensi dasar satuan pengamanan untuk memenuhi standar industri dan regulasi Kepolisian.",
    descEn: "Basic security guard competency training and certification to meet police regulations and industrial security standards.",
    dur: "10 Hari",
    durEn: "10 Days",
    cert: "POLRI",
    certEn: "POLRI",
    icon: Shield,
    syllabus: [
      "Peranan, Tugas Pokok, dan Fungsi Satpam (Tupoksi)",
      "Kemampuan interpersonal dan etika profesi pengamanan",
      "Teknik patroli, penjagaan, pengawalan, dan Turjawali",
      "Pencegahan bahaya kebakaran tingkat dasar dan K3",
      "Bela diri praktis militer/satpam dan penggunaan tongkat/borgol",
      "Tindakan Pertama di Tempat Kejadian Perkara (TPTKP)"
    ],
    syllabusEn: [
      "Role, Core Duties, and Functions of Security Guards (Tupoksi)",
      "Interpersonal skills and professional security ethics",
      "Patrolling, guarding, escorting, and Turjawali techniques",
      "Basic fire prevention and workplace health & safety",
      "Practical martial arts for security and use of batons/handcuffs",
      "First Action at the Crime Scene (TPTKP)"
    ],
    target: "Calon anggota satpam baru, anggota satpam aktif yang belum tersertifikasi, dan koordinator keamanan industri.",
    targetEn: "Aspiring security guards, active guards needing certification, and industrial security coordinators."
  }
];

const schedule = [
  { p: "H2S Awareness & Safety", pEn: "H2S Awareness & Safety", t: "08 Jul 2026", tEn: "08 Jul 2026", l: "Jakarta", lEn: "Jakarta", k: "12 / 16", s: "Tersedia", sEn: "Available" },
  { p: "Confined Space Entry", pEn: "Confined Space Entry", t: "14 Jul 2026", tEn: "14 Jul 2026", l: "Balikpapan", lEn: "Balikpapan", k: "14 / 16", s: "Tersedia", sEn: "Available" },
  { p: "Authorized Gas Tester", pEn: "Authorized Gas Tester", t: "21 Jul 2026", tEn: "21 Jul 2026", l: "Cilegon", lEn: "Cilegon", k: "16 / 16", s: "Penuh", sEn: "Full" },
  { p: "Petugas Peran Kebakaran (Kelas D)", pEn: "Fire Fighting Officer (Class D)", t: "29 Jul 2026", tEn: "29 Jul 2026", l: "Jakarta", lEn: "Jakarta", k: "9 / 20", s: "Tersedia", sEn: "Available" },
  { p: "Tenaga Kerja Pada Ketinggian Tingkat 1 (TKPK)", pEn: "Working at Height Level 1 (TKPK)", t: "05 Agu 2026", tEn: "05 Aug 2026", l: "Surabaya", lEn: "Surabaya", k: "11 / 18", s: "Tersedia", sEn: "Available" },
  { p: "Basic Sea Survival", pEn: "Basic Sea Survival", t: "12 Agu 2026", tEn: "12 Aug 2026", l: "Batam", lEn: "Batam", k: "6 / 14", s: "Tersedia", sEn: "Available" },
];

const testimonials = [
  { img: t1, name: "Ahmad Yusuf", pos: "HSE Manager", posEn: "HSE Manager", co: "PT Energi Nusantara", q: "Program in-house SEAL membantu kami menurunkan TRIR hingga 38% dalam satu tahun. Materi aplikatif dan instruktur sangat berpengalaman.", qEn: "SEAL's in-house program helped us cut TRIR by 38% in a year. Practical material and highly experienced instructors." },
  { img: t2, name: "Rina Pratiwi", pos: "Safety Officer", posEn: "Safety Officer", co: "PT Petromarine Indonesia", q: "Simulasi confined space di training center mereka realistis. Tim saya merasa benar-benar siap menghadapi kondisi lapangan.", qEn: "The confined space simulation at their training center is realistic. My team felt truly ready for field conditions." },
  { img: t3, name: "Bambang Setiawan", pos: "Operations Lead", posEn: "Operations Lead", co: "PT Migas Sentosa", q: "Customized training yang fleksibel dan sesuai shift operasional. Dokumentasi sertifikasi rapi dan auditable.", qEn: "Customized training flexible to operational shifts. Certification records are tidy and auditable." },
];

const articles = [
  { img: blog1, t: "Pelatihan H2S untuk Industri Migas", tEn: "H2S Training for the Oil & Gas Industry", e: "Mengapa kompetensi penanganan H2S menjadi syarat mutlak di lapangan Oil & Gas modern.", eEn: "Why H2S competency is a non-negotiable in modern Oil & Gas field operations." },
  { img: blog2, t: "Pentingnya Authorized Gas Tester", tEn: "The Importance of the Authorized Gas Tester", e: "Peran AGT dalam memastikan keselamatan pekerjaan panas dan entry ruang terbatas.", eEn: "The AGT's role in safeguarding hot work and confined space entry." },
  { img: blog3, t: "Strategi Mencegah Kecelakaan Kerja", tEn: "Strategies to Prevent Workplace Incidents", e: "Pendekatan budaya safety berbasis observasi, leading indicator, dan training berkelanjutan.", eEn: "A safety culture approach built on observation, leading indicators, and continuous training." },
];

const whyUs = [
  { icon: Users, t: "Instruktur Praktisi Industri", tEn: "Industry Practitioner Instructors", d: "Instruktur berasal dari sektor Oil & Gas, Petrochemical, Mining, dan Marine dengan pengalaman lapangan lebih dari 15 tahun.", dEn: "Instructors come from Oil & Gas, Petrochemical, Mining, and Marine sectors with 15+ years of field experience." },
  { icon: Award, t: "Sertifikasi Kompetensi", tEn: "Competency Certification", d: "Program sesuai standar industri, Kemnaker, dan kebutuhan spesifik perusahaan klien.", dEn: "Programs aligned with industry standards, Kemnaker, and the specific needs of client companies." },
  { icon: Building2, t: "Training Center Modern", tEn: "Modern Training Center", d: "Fasilitas lengkap untuk simulasi praktik lapangan: confined space mock-up, fire ground, dan height rig.", dEn: "Full facilities for field practice simulations: confined space mock-up, fire ground, and height rig." },
  { icon: Target, t: "Corporate Training Solution", tEn: "Corporate Training Solution", d: "Program disesuaikan dengan profil risiko operasional perusahaan, fleksibel onsite maupun in-house.", dEn: "Programs tailored to operational risk profiles, flexible onsite or in-house." },
];

const steps = [
  { n: "01", t: "Pilih Pelatihan", tEn: "Choose a Program", d: "Tinjau katalog program publik atau ajukan permintaan customized.", dEn: "Browse the public catalog or request a customized program." },
  { n: "02", t: "Registrasi Online", tEn: "Register Online", d: "Isi formulir pendaftaran dengan data peserta dan kebutuhan perusahaan.", dEn: "Submit participant details and company requirements." },
  { n: "03", t: "Konfirmasi Pembayaran", tEn: "Confirm Payment", d: "Penerbitan invoice resmi dan konfirmasi slot peserta.", dEn: "Official invoice issued and seat confirmation." },
  { n: "04", t: "Ikuti Pelatihan", tEn: "Attend Training", d: "Sesi teori, praktik lapangan, dan asesmen kompetensi.", dEn: "Theory sessions, field practice, and competency assessment." },
  { n: "05", t: "Dapatkan Sertifikat", tEn: "Receive Certificate", d: "Sertifikat dapat diverifikasi melalui sistem online SEAL.", dEn: "Certificates verifiable through SEAL's online system." },
];

function useReveal() {
  // Scroll reveal animations are now handled by the React-native <Reveal /> component
}

function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </Tag>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { lang } = useT();
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1400;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {v.toLocaleString(lang === "id" ? "id-ID" : "en-US")}
      {suffix}
    </span>
  );
}

function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const links: [string, string, string][] = [
    ["#why", t("Tentang", "About")],
    ["#schedule", t("Jadwal", "Schedule")],
    ["#corporate", t("Corporate", "Corporate")],
    ["#contact", t("Kontak", "Contact")],
  ].map(([h, l]) => [h, l, l]) as [string, string, string][];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-swiss flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center">
          <img src={logoImg} alt="SEAL Training Center" className="h-10 w-auto object-contain" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#why" className="text-sm font-medium text-darkgray hover:text-charcoal">
            {t("Tentang", "About")}
          </a>
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-darkgray hover:text-charcoal">
              {t("Program", "Programs")} <ChevronDown size={14} />
            </button>
            {mega && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 border border-border bg-background p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {programs.map((p) => (
                    <a
                      key={p.name}
                      href="#programs"
                      className="group flex items-start gap-3 border-l-2 border-transparent pl-3 transition-colors hover:border-safety"
                    >
                      <p.icon size={18} className="mt-0.5 shrink-0 text-charcoal" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-charcoal group-hover:text-charcoal">
                          {t(p.name, p.nameEn)}
                        </div>
                        <div className="truncate text-xs text-midgray">
                          {t(p.dur, p.durEn)} · {t(p.cert, p.certEn)}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="#schedule" className="text-sm font-medium text-darkgray hover:text-charcoal">
            {t("Jadwal", "Schedule")}
          </a>
          <a href="#corporate" className="text-sm font-medium text-darkgray hover:text-charcoal">
            {t("Corporate", "Corporate")}
          </a>
          <a href="#contact" className="text-sm font-medium text-darkgray hover:text-charcoal">
            {t("Kontak", "Contact")}
          </a>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-charcoal px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {t("Jadwalkan Pelatihan", "Schedule Training")} <ArrowRight size={14} />
          </a>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-swiss flex flex-col py-4">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-darkgray"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-charcoal px-5 py-3 text-center text-sm font-semibold text-white"
            >
              {t("Jadwalkan Pelatihan", "Schedule Training")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="border-b border-border bg-background">
      <div className="container-swiss grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
            <span className="h-px w-10 bg-charcoal" />
            HSE · Oil & Gas · Marine Safety
          </div>
          <h1 className="text-[44px] font-black leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-6xl lg:text-[72px]">
            {t("Bangun Budaya", "Build a Culture of")}
            <br />
            {t("Keselamatan Kerja", "Workplace Safety")}
            <br />
            {t("Bersama ", "With ")}
            <span className="bg-lime px-3 text-charcoal">
              SEAL
            </span>
            .
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-darkgray">
            {t(
              "Pelatihan HSE, Oil & Gas, Marine Safety, Emergency Response, dan Industrial Safety untuk individu maupun perusahaan — disampaikan oleh praktisi industri dengan standar kompetensi internasional.",
              "HSE, Oil & Gas, Marine Safety, Emergency Response, and Industrial Safety training for individuals and companies — delivered by industry practitioners to international competency standards.",
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-charcoal px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t("Jadwalkan Pelatihan", "Schedule Training")} <ArrowRight size={16} />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 border border-charcoal px-7 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              {t("Lihat Program Training", "View Training Programs")}
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {[
              t("Sertifikat Resmi", "Official Certificate"),
              t("Instruktur Berpengalaman", "Experienced Instructors"),
              t("Program Berstandar Industri", "Industry-Standard Programs"),
              t("Corporate Training Available", "Corporate Training Available"),
            ].map((x) => (
              <li key={x} className="flex items-center gap-2.5 text-sm font-medium text-darkgray">
                <Check size={16} className="text-charcoal" strokeWidth={3} />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-lightgray">
            <img
              src={heroImg}
              alt={t(
                "Pelatihan keselamatan industri HSE di SEAL Training Center",
                "HSE industrial safety training at SEAL Training Center",
              )}
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
            />
            <div className="absolute left-0 top-6 bg-lime px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal">
              {t("Petugas Peran Kebakaran (Kelas D)", "Fire Fighting Officer (Class D)")} · {t("Latihan Langsung", "Live Drill")}
            </div>
          </div>
          <div className="absolute -bottom-8 -left-4 flex w-max max-w-[calc(100vw-2rem)] sm:max-w-none border border-border bg-background shadow-xl sm:-left-8">
            {[
              { v: 50000, s: "+", l: t("Peserta Terlatih", "Trained Participants") },
              { v: 100, s: "+", l: t("Perusahaan Klien", "Client Companies") },
              { v: 95, s: "%", l: t("Tingkat Kepuasan", "Satisfaction Rate") },
            ].map((m, i) => (
              <div
                key={m.l}
                className={`p-3 sm:p-4 flex-1 min-w-[85px] sm:min-w-[110px] ${i < 2 ? "border-r border-border" : ""}`}
              >
                <div className="text-2xl font-black tracking-tight text-charcoal sm:text-3xl">
                  <Counter to={m.v} suffix={m.s} />
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-midgray">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
          <span className="h-px w-10 bg-charcoal" />
          {kicker}
        </div>
      </div>
      <div className="lg:col-span-8">
        <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-charcoal sm:text-5xl">
          {title}
        </h2>
        {sub && <p className="mt-5 max-w-2xl text-base text-darkgray sm:text-lg">{sub}</p>}
      </div>
    </Reveal>
  );
}

function WhyUs() {
  const { t } = useT();
  return (
    <section id="why" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Mengapa SEAL", "Why SEAL")}
          title={t("Mengapa Memilih SEAL Training Center?", "Why Choose SEAL Training Center?")}
          sub={t(
            "Mitra pelatihan keselamatan kerja yang dipercaya operator dan kontraktor di sektor energi nasional.",
            "A safety training partner trusted by operators and contractors across the national energy sector.",
          )}
        />
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <Reveal key={w.t} className="bg-background p-8">
              <div className="mb-5 border-t-2 border-safety pt-5">
                <w.icon size={28} className="text-charcoal" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold leading-tight text-charcoal">{t(w.t, w.tEn)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-midgray">{t(w.d, w.dEn)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const { t } = useT();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <section id="programs" className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Program Pelatihan", "Training Programs")}
          title={t("Program Pelatihan Unggulan", "Flagship Training Programs")}
          sub={t(
            "Sembilan program inti untuk kompetensi keselamatan kerja sektor Oil & Gas, Marine, dan Industrial.",
            "Nine core programs for safety competency across Oil & Gas, Marine, and Industrial sectors.",
          )}
        />
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Reveal
              key={p.name}
              as="article"
              className="group flex flex-col justify-between bg-background p-7 transition-colors hover:bg-charcoal"
            >
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-border pb-5 group-hover:border-white/20">
                  <p.icon size={26} className="text-charcoal group-hover:text-safety" strokeWidth={1.75} />
                  <span className="bg-safety px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-safety-foreground">
                    {t(p.cert, p.certEn)}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug text-charcoal group-hover:text-white">
                  {t(p.name, p.nameEn)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-midgray group-hover:text-white/70">
                  {t(p.desc, p.descEn)}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4 group-hover:border-white/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-midgray group-hover:text-white/60">
                  {t(p.dur, p.durEn)}
                </span>
                <button
                  onClick={() => setSelectedProgram(p)}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-safety cursor-pointer text-left focus:outline-none"
                >
                  {t("Detail", "Detail")} <ArrowRight size={12} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onRegister={() => {
            const selectEl = document.querySelector<HTMLSelectElement>("select[name='jenis']");
            if (selectEl) {
              selectEl.value = selectedProgram.name;
              selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            setSelectedProgram(null);
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      )}
    </section>
  );
}

function Process() {
  const { t } = useT();
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Alur Pendaftaran", "Registration Flow")}
          title={t("Proses Pendaftaran Mudah", "A Simple Registration Process")}
          sub={t(
            "Lima langkah jelas dari pemilihan program hingga penerbitan sertifikat kompetensi.",
            "Five clear steps from program selection to competency certification.",
          )}
        />
        <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <Reveal key={s.n} className="bg-background p-7">
              <div className="text-5xl font-black tracking-tight text-charcoal">{s.n}</div>
              <div className="mt-6 h-px w-10 bg-safety" />
              <h3 className="mt-5 text-base font-bold text-charcoal">{t(s.t, s.tEn)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-midgray">{t(s.d, s.dEn)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corporate() {
  const { t } = useT();
  return (
    <section id="corporate" className="bg-charcoal py-24 text-white">
      <div className="container-swiss grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-safety">
            <span className="h-px w-10 bg-safety" />
            Corporate Training
          </div>
          <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            {t("Solusi Pelatihan Untuk Perusahaan", "Training Solutions for Companies")}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-white/75">
            {t(
              "Kami membantu perusahaan meningkatkan kompetensi tenaga kerja dan memperkuat budaya keselamatan operasional melalui program pelatihan yang dirancang sesuai profil risiko, regulasi, dan kebutuhan industri Anda.",
              "We help companies strengthen workforce competency and operational safety culture through programs tailored to your risk profile, regulations, and industry needs.",
            )}
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            {[
              { t: t("In-House Training", "In-House Training"), d: t("Pelatihan di kantor Anda untuk efisiensi waktu.", "Training at your office for time efficiency.") },
              { t: t("Onsite Training", "Onsite Training"), d: t("Praktik langsung di lokasi operasional klien.", "Hands-on practice at client operational sites.") },
              { t: t("Training Need Analysis", "Training Need Analysis"), d: t("Asesmen gap kompetensi sebelum penyusunan kurikulum.", "Competency gap assessment before curriculum design.") },
              { t: t("Customized Program", "Customized Program"), d: t("Modul disesuaikan dengan SOP & regulasi internal.", "Modules tailored to internal SOPs and regulations.") },
            ].map((f) => (
              <li key={f.t} className="bg-charcoal p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Check size={16} className="text-safety" strokeWidth={3} /> {f.t}
                </div>
                <p className="mt-2 text-sm text-white/65">{f.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-safety px-7 py-4 text-sm font-semibold text-safety-foreground transition-transform hover:-translate-y-0.5"
            >
              {t("Diskusikan Kebutuhan Perusahaan", "Discuss Your Company's Needs")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certification() {
  const { t } = useT();
  const [cert, setCert] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{
    status: "success" | "error";
    message?: string;
    data?: {
      nama_peserta: string;
      nama_program: string;
      tanggal_terbit: string;
      status: string;
    };
  } | null>(null);

  return (
    <section className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Sertifikasi", "Certification")}
          title={t("Sertifikasi dan Kepatuhan", "Certification and Compliance")}
          sub={t(
            "Program SEAL selaras dengan standar nasional dan praktik internasional industri energi.",
            "SEAL programs align with national standards and international energy industry practice.",
          )}
        />
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {["HSE Standards", "Oil & Gas Standards", "Industrial Safety", "Emergency Response"].map(
            (s) => (
              <div key={s} className="bg-background p-8 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center border-2 border-charcoal">
                  <Award size={24} className="text-charcoal" strokeWidth={1.75} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-charcoal">{s}</div>
              </div>
            ),
          )}
        </div>
        <Reveal className="mt-16 border-2 border-charcoal p-8 sm:p-10 bg-background">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="text-xs font-bold uppercase tracking-wider text-midgray">
                {t("Verifikasi Sertifikat", "Certificate Verification")}
              </div>
              <h3 className="mt-2.5 text-2xl font-black tracking-tight text-charcoal sm:text-3xl leading-tight">
                {t("Cek keaslian sertifikat SEAL secara online.", "Verify SEAL certificate authenticity online.")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-midgray">
                {t("Masukkan nomor registrasi sertifikat resmi Anda untuk memverifikasi data kompetensi peserta di database SEAL.", "Enter your official certificate registration number to verify participant competency details in the SEAL database.")}
              </p>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-start">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const trimmedCert = cert.trim();
                  if (!trimmedCert) {
                    setVerifyResult({
                      status: "error",
                      message: t("Mohon masukkan nomor sertifikat.", "Please enter a certificate number.")
                    });
                    return;
                  }
                  setLoading(true);
                  setVerifyResult(null);
                  try {
                    const response = await fetch(`http://localhost/Project-seal-ssh/api/verifikasi_sertifikat.php?nomor=${encodeURIComponent(trimmedCert)}`);
                    const result = await response.json();
                    if (result.status === "success") {
                      setVerifyResult({
                        status: "success",
                        data: result.data
                      });
                    } else {
                      setVerifyResult({
                        status: "error",
                        message: t(result.message || "Sertifikat tidak terdaftar.", result.message || "Certificate not registered.")
                      });
                    }
                  } catch (err) {
                    setVerifyResult({
                      status: "error",
                      message: t("Gagal menghubungi server verifikasi.", "Failed to connect to the verification server.")
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  value={cert}
                  onChange={(e) => setCert(e.target.value)}
                  placeholder={t("Masukkan Nomor Sertifikat (cth: CERT-XXXX)", "Enter certificate number (e.g., CERT-XXXX)")}
                  className="flex-1 border border-charcoal bg-background px-5 py-4 text-sm font-semibold text-charcoal placeholder:text-midgray focus:outline-none focus:ring-2 focus:ring-safety"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-charcoal px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-safety hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none min-w-[140px]"
                >
                  {loading ? t("Memproses...", "Processing...") : t("Verifikasi", "Verify")}
                </button>
              </form>

              {/* Verification Result Area - styled as a premium dashboard card */}
              <div className="mt-4 min-h-[40px]">
                {loading && (
                  <div className="flex items-center gap-2.5 py-3 text-sm font-semibold text-midgray animate-pulse">
                    <span className="h-4 w-4 animate-spin border-2 border-charcoal border-t-transparent rounded-full" />
                    {t("Menghubungi database server...", "Connecting to database server...")}
                  </div>
                )}

                {verifyResult && (
                  <div className="animate-modal-backdrop">
                    {verifyResult.status === "success" && verifyResult.data ? (
                      <div className="border border-border bg-lightgray p-5 shadow-sm">
                        {/* Success Badge */}
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4">
                          <span className="grid h-6 w-6 place-items-center bg-emerald-100 text-emerald-700 rounded-full">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {t("Sertifikat Valid & Terverifikasi", "Certificate Valid & Verified")}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-y-3 gap-x-4 border-t border-border/60 pt-4 text-sm sm:grid-cols-2">
                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-midgray">
                              {t("Nama Peserta", "Participant Name")}
                            </span>
                            <span className="font-bold text-charcoal block mt-0.5">{verifyResult.data.nama_peserta}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-midgray">
                              {t("Program Pelatihan", "Training Program")}
                            </span>
                            <span className="font-bold text-charcoal block mt-0.5">{verifyResult.data.nama_program}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-midgray">
                              {t("Tanggal Terbit", "Date Issued")}
                            </span>
                            <span className="font-bold text-charcoal block mt-0.5">{verifyResult.data.tanggal_terbit}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-midgray">
                              {t("Status Keaktifan", "Active Status")}
                            </span>
                            <span className="inline-flex items-center mt-1 px-2.5 py-0.5 text-[10px] font-bold uppercase bg-safety text-safety-foreground">
                              {verifyResult.data.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-red-200 bg-red-50/50 p-5">
                        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                          <span className="grid h-6 w-6 place-items-center bg-red-100 text-red-700 rounded-full">
                            <X size={14} strokeWidth={3} />
                          </span>
                          {t("Sertifikat Tidak Valid / Terdaftar", "Invalid / Unregistered Certificate")}
                        </div>
                        <p className="mt-2.5 text-sm text-red-700 font-medium">
                          {verifyResult.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useT();
  return (
    <section className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Testimoni", "Testimonials")}
          title={t("Apa Kata Peserta Kami", "What Our Participants Say")}
          sub={t(
            "Suara langsung dari HSE Manager dan Safety Officer mitra operasional kami.",
            "Direct voices from HSE Managers and Safety Officers of our operational partners.",
          )}
        />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {testimonials.map((tt) => (
            <Reveal key={tt.name} as="figure" className="flex flex-col justify-between bg-background p-8">
              <blockquote className="text-base leading-relaxed text-charcoal">
                <span className="mb-4 block text-3xl font-black leading-none text-charcoal">“</span>
                {t(tt.q, tt.qEn)}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={tt.img}
                  alt={tt.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 object-cover grayscale"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-charcoal">{tt.name}</div>
                  <div className="truncate text-xs text-midgray">
                    {t(tt.pos, tt.posEn)} · {tt.co}
                  </div>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 overflow-hidden border-y border-border py-6 relative w-full bg-lightgray/30">
          {/* Gradient overlay for fade effects on edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-lightgray to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-lightgray to-transparent z-10" />

          {(() => {
            const clientLogos = [
              { name: "PERTAMINA", img: logopertamina },
              { name: "PHE ONWJ", img: logophe },
              { name: "MEDCO", img: logomedco },
              { name: "CHEVRON", img: logochevron },
              { name: "VALE", img: logovale },
              { name: "FREEPORT", img: logofreeport },
            ];

            return (
              <div className="flex w-max animate-marquee">
                {/* First set of items */}
                <div className="flex shrink-0">
                  {clientLogos.map((c, idx) => (
                    <div key={c.name + idx} className="px-4">
                      <div className="bg-background border border-border px-6 py-3 text-center min-w-[240px] h-[96px] flex items-center justify-center shadow-sm">
                        <img
                          src={c.img}
                          alt={c.name}
                          className="h-14 max-w-[190px] w-auto object-contain transition-all duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Second set of items for seamless loop */}
                <div className="flex shrink-0" aria-hidden="true">
                  {clientLogos.map((c, idx) => (
                    <div key={c.name + "-clone-" + idx} className="px-4">
                      <div className="bg-background border border-border px-6 py-3 text-center min-w-[240px] h-[96px] flex items-center justify-center shadow-sm">
                        <img
                          src={c.img}
                          alt={c.name}
                          className="h-14 max-w-[190px] w-auto object-contain transition-all duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const { t } = useT();
  return (
    <section id="schedule" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Jadwal", "Schedule")}
          title={t("Jadwal Pelatihan Terdekat", "Upcoming Training Schedule")}
          sub={t(
            "Kelas publik di kota-kota basis operasi industri energi nasional.",
            "Public classes in cities that serve as bases for national energy operations.",
          )}
        />
        <Reveal className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-charcoal text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal">
                <th className="py-4 pr-4">{t("Program", "Program")}</th>
                <th className="py-4 pr-4">{t("Tanggal", "Date")}</th>
                <th className="py-4 pr-4">{t("Lokasi", "Location")}</th>
                <th className="py-4 pr-4">{t("Kuota", "Seats")}</th>
                <th className="py-4 pr-4">{t("Status", "Status")}</th>
                <th className="py-4"></th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => {
                const full = r.s === "Penuh";
                return (
                  <tr key={r.p + r.t} className="border-b border-border align-middle text-sm">
                    <td className="py-5 pr-4 font-semibold text-charcoal">{t(r.p, r.pEn)}</td>
                    <td className="py-5 pr-4 text-darkgray">{t(r.t, r.tEn)}</td>
                    <td className="py-5 pr-4 text-darkgray">{t(r.l, r.lEn)}</td>
                    <td className="py-5 pr-4 text-darkgray">{r.k}</td>
                    <td className="py-5 pr-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${full ? "bg-lightgray text-midgray" : "bg-lime text-charcoal"
                          }`}
                      >
                        {t(r.s, r.sEn)}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${full ? "text-midgray" : "text-charcoal hover:underline"
                          }`}
                      >
                        {full ? t("Waiting List", "Waiting List") : t("Daftar Sekarang", "Register Now")} <ArrowRight size={12} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function Blog() {
  const { t } = useT();
  return (
    <section className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Insights", "Insights")}
          title={t("Artikel Keselamatan Kerja", "Workplace Safety Articles")}
          sub={t(
            "Wawasan praktis dari instruktur dan praktisi HSE.",
            "Practical insights from HSE instructors and practitioners.",
          )}
        />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {articles.map((a) => (
            <Reveal key={a.t} as="article" className="group flex flex-col bg-background">
              <div className="aspect-[4/3] overflow-hidden bg-lightgray">
                <img
                  src={a.img}
                  alt={t(a.t, a.tEn)}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal">
                  HSE · {t("Wawasan", "Insight")}
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-charcoal">{t(a.t, a.tEn)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-midgray">{t(a.e, a.eEn)}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-charcoal/70"
                >
                  {t("Baca Artikel", "Read Article")} <ArrowRight size={12} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCTA() {
  const { t } = useT();
  return (
    <section className="bg-lime py-20 text-charcoal">
      <div className="container-swiss grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            {t("Siap Meningkatkan Kompetensi Tim Anda?", "Ready to Strengthen Your Team's Competency?")}
          </h2>
          <p className="mt-5 max-w-xl text-base text-charcoal/80 sm:text-lg">
            {t(
              "Hubungi tim kami untuk konsultasi program pelatihan yang sesuai dengan kebutuhan operasional dan profil risiko perusahaan Anda.",
              "Contact our team to discuss a training program tailored to your operational needs and risk profile.",
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <WhatsappIcon size={16} /> {t("Hubungi via WhatsApp", "Contact via WhatsApp")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-charcoal px-7 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            {t("Request Proposal", "Request Proposal")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProgramModal({ program, onClose, onRegister }: { program: Program; onClose: () => void; onRegister: () => void }) {
  const { t } = useT();
  const Icon = program.icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm animate-modal-backdrop" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl border border-border bg-background p-6 shadow-2xl animate-modal-content sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-midgray hover:text-charcoal cursor-pointer focus:outline-none"><X size={20} /></button>
        <div className="flex items-start gap-4 border-b border-border pb-6 sm:gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center border border-border bg-safety text-charcoal sm:h-14 sm:w-14"><Icon size={24} /></span>
          <div>
            <span className="inline-block bg-safety px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-safety-foreground">{t(program.cert, program.certEn)}</span>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-charcoal sm:text-2xl">{t(program.name, program.nameEn)}</h2>
            <div className="mt-2 text-xs font-semibold text-midgray">{t("Durasi Pelatihan:", "Training Duration:")} <span className="text-charcoal font-bold">{t(program.dur, program.durEn)}</span></div>
          </div>
        </div>
        <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-midgray">{t("Deskripsi Program", "Program Description")}</h4>
            <p className="mt-2 text-sm leading-relaxed text-darkgray">{t(program.desc, program.descEn)}</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-midgray">{t("Materi Utama (Syllabus)", "Key Syllabus Topics")}</h4>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
              {(t(program.syllabus, program.syllabusEn) as string[]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-darkgray"><Check size={16} className="mt-0.5 shrink-0 text-charcoal" strokeWidth={3} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-midgray">{t("Target Peserta", "Target Audience")}</h4>
            <p className="mt-2 text-sm leading-relaxed text-darkgray font-medium">{t(program.target, program.targetEn)}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <button onClick={onClose} className="inline-flex items-center justify-center border border-border px-5 py-3 text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-lightgray transition-colors cursor-pointer focus:outline-none">{t("Kembali", "Back")}</button>
          <button onClick={onRegister} className="inline-flex items-center justify-center bg-charcoal px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-safety hover:text-charcoal transition-colors cursor-pointer focus:outline-none">{t("Daftar Sekarang", "Register Now")}</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-charcoal py-16 text-white/75">
      <div className="container-swiss">
        <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-center">
              <img src={logoWhiteImg} alt="SEAL Training Center" className="h-15 w-auto object-contain" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {t(
                "Institusi pelatihan HSE, Oil & Gas, dan Industrial Safety berbasis di Indonesia. Membentuk kompetensi keselamatan kerja untuk industri energi nasional.",
                "An HSE, Oil & Gas, and Industrial Safety training institution based in Indonesia. Building workplace safety competency for the national energy industry.",
              )}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {t("Tautan Cepat", "Quick Links")}
            </div>
            <ul className="space-y-2 text-sm">
              {[
                t("Tentang", "About"),
                t("Program", "Programs"),
                t("Jadwal", "Schedule"),
                t("Corporate", "Corporate"),
                t("Kontak", "Contact"),
              ].map((x) => (
                <li key={x}>
                  <a href="#" className="hover:text-safety">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {t("Program Pelatihan", "Training Programs")}
            </div>
            <ul className="space-y-2 text-sm">
              {programs.slice(0, 5).map((p) => (
                <li key={p.name}>
                  <a href="#programs" className="hover:text-safety">
                    {t(p.name, p.nameEn)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {t("Kontak", "Contact")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>+62 21 75676868</li>
              <li>training@seal-center.co.id</li>
              <li>Jakarta Selatan</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} SEAL Training Center. {t("Semua hak dilindungi.", "All rights reserved.")}</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-safety">
              LinkedIn
            </a>
            <a href="#" className="hover:text-safety">
              Instagram
            </a>
            <a href="#" className="hover:text-safety">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  const { t } = useT();
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label={t("Hubungi via WhatsApp", "Contact via WhatsApp")}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center bg-charcoal text-safety shadow-2xl transition-transform hover:-translate-y-1"
    >
      <WhatsappIcon size={24} />
    </a>
  );
}

function Contact() {
  const { t } = useT();
  const [sent, setSent] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      nama: formData.get("nama"),
      perusahaan: formData.get("perusahaan"),
      email: formData.get("email"),
      hp: formData.get("hp"),
      jenis: formData.get("jenis"),
      pesan: formData.get("pesan"),
    };

    try {
      const response = await fetch("http://localhost/Project-seal-ssh/api/simpan_permintaan.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "success") {
        setSent(true);
      } else {
        alert(t("Gagal menyimpan permintaan: ", "Failed to submit request: ") + result.message);
      }
    } catch (err) {
      alert(t("Gagal menghubungkan ke database server.", "Failed to connect to the database server."));
    }
  };
  return (
    <section id="contact" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker={t("Kontak", "Contact")}
          title={t("Diskusikan Kebutuhan Pelatihan Anda", "Discuss Your Training Needs")}
          sub={t(
            "Tim konsultan kami akan merespons dalam 1 × 24 jam kerja.",
            "Our consultants will respond within 1 × 24 business hours.",
          )}
        />
        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
          <div className="bg-background p-8 lg:p-10">
            <h3 className="text-lg font-bold text-charcoal">{t("Informasi Kontak", "Contact Information")}</h3>
            <ul className="mt-6 space-y-5 text-sm">
              {[
                { i: Phone, l: t("Telepon", "Phone"), v: "+62 21 75676868" },
                { i: WhatsappIcon, l: "WhatsApp", v: "+62 87777265623" },
                { i: Mail, l: "Email", v: "training@seal-center.co.id" },
                { i: MapPin, l: t("Alamat", "Address"), v: "Boulevard Tekno Blok C No. 5, Jalan Tekno Widya, Serpong Tangerang  Selatan - Banten 15314, Indonesia" },
              ].map((c) => (
                <li key={c.l} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-border bg-safety text-charcoal">
                    <c.i size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-midgray">
                      {c.l}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-charcoal">{c.v}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 aspect-[16/10] w-full overflow-hidden border border-border">
              <iframe
                title={t("Lokasi SEAL Training Center", "SEAL Training Center Location")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4916017831806!2d106.67749417459102!3d-6.330292061939303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e55fc5beae9d%3A0xcbac4697569661be!2sSEAL%20Training%20%26%20Consulting!5e0!3m2!1sid!2sid!4v1781677034663!5m2!1sid!2sid"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="bg-background p-8 lg:p-10">
            <h3 className="text-lg font-bold text-charcoal">{t("Form Permintaan Pelatihan", "Training Request Form")}</h3>
            {sent ? (
              <div className="mt-6 border-l-2 border-safety bg-lightgray p-6">
                <div className="text-sm font-bold text-charcoal">{t("Terima kasih!", "Thank you!")}</div>
                <p className="mt-2 text-sm text-darkgray">
                  {t(
                    "Permintaan Anda telah kami terima. Tim konsultan SEAL akan segera menghubungi Anda. Untuk respons lebih cepat, silakan",
                    "We've received your request. The SEAL consulting team will reach out shortly. For faster response, please",
                  )}{" "}
                  <a href={WA} target="_blank" className="font-semibold text-charcoal underline">
                    {t("chat via WhatsApp", "chat via WhatsApp")}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { n: "nama", l: t("Nama Lengkap", "Full Name"), t: "text", req: true },
                  { n: "perusahaan", l: t("Perusahaan", "Company"), t: "text", req: true },
                  { n: "email", l: "Email", t: "email", req: true },
                  { n: "hp", l: t("Nomor HP", "Phone Number"), t: "tel", req: true },
                ].map((f) => (
                  <label key={f.n} className="block">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-midgray">
                      {f.l}
                    </span>
                    <input
                      type={f.t}
                      name={f.n}
                      required={f.req}
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-safety"
                    />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-midgray">
                    {t("Jenis Pelatihan", "Training Type")}
                  </span>
                  <select
                    name="jenis"
                    required
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-safety"
                  >
                    <option value="">{t("Pilih program pelatihan…", "Select a training program…")}</option>
                    {programs.map((p) => (
                      <option key={p.name} value={p.name}>{t(p.name, p.nameEn)}</option>
                    ))}
                    <option value="Customized / Corporate Training">{t("Customized / Corporate Training", "Customized / Corporate Training")}</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-midgray">
                    {t("Pesan", "Message")}
                  </span>
                  <textarea
                    name="pesan"
                    rows={4}
                    className="mt-2 w-full resize-none border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-safety"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-charcoal px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:col-span-2"
                >
                  {t("Kirim Permintaan", "Send Request")} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  useReveal();
  return (
    <div className="min-h-screen bg-background font-sans text-charcoal">
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Programs />
        <Process />
        <Corporate />
        <Certification />
        <Testimonials />
        <Schedule />
        <Blog />
        <LeadCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
