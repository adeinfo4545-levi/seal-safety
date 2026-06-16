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
  MessageCircle,
  Menu,
  X,
  Award,
  Users,
  Building2,
  Target,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import blog1 from "@/assets/blog1.jpg";
import blog2 from "@/assets/blog2.jpg";
import blog3 from "@/assets/blog3.jpg";

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

const WA = "https://wa.me/6281234567890";

const programs = [
  { name: "H2S Awareness & Safety", desc: "Pengenalan bahaya gas H2S, deteksi, dan respons darurat di area Oil & Gas.", dur: "2 Hari", cert: "BNSP / Industri", icon: Wind },
  { name: "Confined Space Entry (CSE)", desc: "Prosedur entry, rescue, dan kontrol bahaya pada ruang terbatas.", dur: "3 Hari", cert: "Kemnaker", icon: ShieldAlert },
  { name: "Authorized Gas Tester (AGT)", desc: "Kompetensi pengukuran gas untuk hot work dan confined space.", dur: "3 Hari", cert: "Migas", icon: Gauge },
  { name: "First Aid", desc: "Pertolongan pertama pada kecelakaan kerja dan CPR sesuai standar internasional.", dur: "2 Hari", cert: "Internasional", icon: HeartPulse },
  { name: "Fire Fighting", desc: "Teknik pemadaman, klasifikasi kebakaran, dan emergency response industri.", dur: "3 Hari", cert: "Kemnaker", icon: Flame },
  { name: "Basic Sea Survival", desc: "Survival laut, evakuasi, dan penggunaan life-saving appliances.", dur: "2 Hari", cert: "Marine", icon: LifeBuoy },
  { name: "Working at Height", desc: "Bekerja aman di ketinggian, fall protection, dan rescue plan.", dur: "2 Hari", cert: "Kemnaker", icon: HardHat },
  { name: "Permit to Work", desc: "Sistem izin kerja, JSA, dan kontrol bahaya operasional.", dur: "1 Hari", cert: "Industri", icon: FileCheck },
];

const schedule = [
  { p: "H2S Awareness & Safety", t: "08 Jul 2026", l: "Jakarta", k: "12 / 16", s: "Tersedia" },
  { p: "Confined Space Entry", t: "14 Jul 2026", l: "Balikpapan", k: "14 / 16", s: "Tersedia" },
  { p: "Authorized Gas Tester", t: "21 Jul 2026", l: "Cilegon", k: "16 / 16", s: "Penuh" },
  { p: "Fire Fighting", t: "29 Jul 2026", l: "Jakarta", k: "9 / 20", s: "Tersedia" },
  { p: "Working at Height", t: "05 Agu 2026", l: "Surabaya", k: "11 / 18", s: "Tersedia" },
  { p: "Basic Sea Survival", t: "12 Agu 2026", l: "Batam", k: "6 / 14", s: "Tersedia" },
];

const testimonials = [
  { img: t1, name: "Ahmad Yusuf", pos: "HSE Manager", co: "PT Energi Nusantara", q: "Program in-house SEAL membantu kami menurunkan TRIR hingga 38% dalam satu tahun. Materi aplikatif dan instruktur sangat berpengalaman." },
  { img: t2, name: "Rina Pratiwi", pos: "Safety Officer", co: "PT Petromarine Indonesia", q: "Simulasi confined space di training center mereka realistis. Tim saya merasa benar-benar siap menghadapi kondisi lapangan." },
  { img: t3, name: "Bambang Setiawan", pos: "Operations Lead", co: "PT Migas Sentosa", q: "Customized training yang fleksibel dan sesuai shift operasional. Dokumentasi sertifikasi rapi dan auditable." },
];

const articles = [
  { img: blog1, t: "Pelatihan H2S untuk Industri Migas", e: "Mengapa kompetensi penanganan H2S menjadi syarat mutlak di lapangan Oil & Gas modern." },
  { img: blog2, t: "Pentingnya Authorized Gas Tester", e: "Peran AGT dalam memastikan keselamatan pekerjaan panas dan entry ruang terbatas." },
  { img: blog3, t: "Strategi Mencegah Kecelakaan Kerja", e: "Pendekatan budaya safety berbasis observasi, leading indicator, dan training berkelanjutan." },
];

const whyUs = [
  { icon: Users, t: "Instruktur Praktisi Industri", d: "Instruktur berasal dari sektor Oil & Gas, Petrochemical, Mining, dan Marine dengan pengalaman lapangan lebih dari 15 tahun." },
  { icon: Award, t: "Sertifikasi Kompetensi", d: "Program sesuai standar industri, Kemnaker, dan kebutuhan spesifik perusahaan klien." },
  { icon: Building2, t: "Training Center Modern", d: "Fasilitas lengkap untuk simulasi praktik lapangan: confined space mock-up, fire ground, dan height rig." },
  { icon: Target, t: "Corporate Training Solution", d: "Program disesuaikan dengan profil risiko operasional perusahaan, fleksibel onsite maupun in-house." },
];

const steps = [
  { n: "01", t: "Pilih Pelatihan", d: "Tinjau katalog program publik atau ajukan permintaan customized." },
  { n: "02", t: "Registrasi Online", d: "Isi formulir pendaftaran dengan data peserta dan kebutuhan perusahaan." },
  { n: "03", t: "Konfirmasi Pembayaran", d: "Penerbitan invoice resmi dan konfirmasi slot peserta." },
  { n: "04", t: "Ikuti Pelatihan", d: "Sesi teori, praktik lapangan, dan asesmen kompetensi." },
  { n: "05", t: "Dapatkan Sertifikat", d: "Sertifikat dapat diverifikasi melalui sistem online SEAL." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
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
      {v.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-swiss flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center bg-safety text-safety-foreground">
            <ShieldAlert size={18} strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-charcoal">
            SEAL<span className="text-midgray font-medium"> Training Center</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#why" className="text-sm font-medium text-darkgray hover:text-safety">
            Tentang
          </a>
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-darkgray hover:text-safety">
              Program <ChevronDown size={14} />
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
                      <p.icon size={18} className="mt-0.5 shrink-0 text-safety" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-charcoal group-hover:text-safety">
                          {p.name}
                        </div>
                        <div className="truncate text-xs text-midgray">{p.dur} · {p.cert}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="#schedule" className="text-sm font-medium text-darkgray hover:text-safety">
            Jadwal
          </a>
          <a href="#corporate" className="text-sm font-medium text-darkgray hover:text-safety">
            Corporate
          </a>
          <a href="#contact" className="text-sm font-medium text-darkgray hover:text-safety">
            Kontak
          </a>
        </nav>
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-safety px-5 py-2.5 text-sm font-semibold text-safety-foreground transition-transform hover:-translate-y-0.5"
          >
            Jadwalkan Pelatihan <ArrowRight size={14} />
          </a>
        </div>
        <button
          aria-label="Menu"
          className="lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-swiss flex flex-col py-4">
            {["Tentang #why", "Program #programs", "Jadwal #schedule", "Corporate #corporate", "Kontak #contact"].map(
              (item) => {
                const [label, href] = item.split(" ");
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 text-sm font-medium text-darkgray"
                  >
                    {label}
                  </a>
                );
              },
            )}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-safety px-5 py-3 text-center text-sm font-semibold text-safety-foreground"
            >
              Jadwalkan Pelatihan
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-border bg-background">
      <div className="container-swiss grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-safety">
            <span className="h-px w-10 bg-safety" />
            HSE · Oil & Gas · Marine Safety
          </div>
          <h1 className="text-[44px] font-black leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-6xl lg:text-[72px]">
            Bangun Budaya
            <br />
            Keselamatan Kerja
            <br />
            <span className="text-safety">Bersama SEAL.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-darkgray">
            Pelatihan HSE, Oil & Gas, Marine Safety, Emergency Response, dan Industrial Safety
            untuk individu maupun perusahaan — disampaikan oleh praktisi industri dengan
            standar kompetensi internasional.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-safety px-7 py-4 text-sm font-semibold text-safety-foreground transition-transform hover:-translate-y-0.5"
            >
              Jadwalkan Pelatihan <ArrowRight size={16} />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 border border-charcoal px-7 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              Lihat Program Training
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {[
              "Sertifikat Resmi",
              "Instruktur Berpengalaman",
              "Program Berstandar Industri",
              "Corporate Training Available",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2.5 text-sm font-medium text-darkgray">
                <Check size={16} className="text-safety" strokeWidth={3} />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-lightgray">
            <img
              src={heroImg}
              alt="Pelatihan keselamatan industri HSE di SEAL Training Center"
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
            />
            <div className="absolute left-0 top-6 bg-safety px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Fire Fighting · Live Drill
            </div>
          </div>
          <div className="absolute -bottom-8 -left-4 grid w-[280px] grid-cols-3 border border-border bg-background shadow-xl sm:-left-8 sm:w-[340px]">
            {[
              { v: 5000, s: "+", l: "Peserta Terlatih" },
              { v: 100, s: "+", l: "Perusahaan Klien" },
              { v: 95, s: "%", l: "Tingkat Kepuasan" },
            ].map((m, i) => (
              <div
                key={m.l}
                className={`p-4 ${i < 2 ? "border-r border-border" : ""}`}
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
    <div className="reveal mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-safety">
          <span className="h-px w-10 bg-safety" />
          {kicker}
        </div>
      </div>
      <div className="lg:col-span-8">
        <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-charcoal sm:text-5xl">
          {title}
        </h2>
        {sub && <p className="mt-5 max-w-2xl text-base text-darkgray sm:text-lg">{sub}</p>}
      </div>
    </div>
  );
}

function WhyUs() {
  return (
    <section id="why" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Mengapa SEAL"
          title="Mengapa Memilih SEAL Training Center?"
          sub="Mitra pelatihan keselamatan kerja yang dipercaya operator dan kontraktor di sektor energi nasional."
        />
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <div key={w.t} className="reveal bg-background p-8">
              <div className="mb-5 border-t-2 border-safety pt-5">
                <w.icon size={28} className="text-charcoal" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold leading-tight text-charcoal">{w.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-midgray">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Program Pelatihan"
          title="Program Pelatihan Unggulan"
          sub="Delapan program inti untuk kompetensi keselamatan kerja sektor Oil & Gas, Marine, dan Industrial."
        />
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <article
              key={p.name}
              className="reveal group flex flex-col justify-between bg-background p-7 transition-colors hover:bg-charcoal"
            >
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-border pb-5 group-hover:border-white/20">
                  <p.icon size={26} className="text-safety" strokeWidth={1.75} />
                  <span className="bg-safety px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-safety-foreground">
                    {p.cert}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug text-charcoal group-hover:text-white">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-midgray group-hover:text-white/70">
                  {p.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4 group-hover:border-white/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-midgray group-hover:text-white/60">
                  {p.dur}
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-safety"
                >
                  Detail <ArrowRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Alur Pendaftaran"
          title="Proses Pendaftaran Mudah"
          sub="Lima langkah jelas dari pemilihan program hingga penerbitan sertifikat kompetensi."
        />
        <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <div key={s.n} className="reveal bg-background p-7">
              <div className="text-5xl font-black tracking-tight text-safety">{s.n}</div>
              <div className="mt-6 h-px w-10 bg-charcoal" />
              <h3 className="mt-5 text-base font-bold text-charcoal">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-midgray">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corporate() {
  return (
    <section id="corporate" className="bg-charcoal py-24 text-white">
      <div className="container-swiss grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-safety">
            <span className="h-px w-10 bg-safety" />
            Corporate Training
          </div>
          <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Solusi Pelatihan Untuk Perusahaan
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-white/75">
            Kami membantu perusahaan meningkatkan kompetensi tenaga kerja dan memperkuat budaya
            keselamatan operasional melalui program pelatihan yang dirancang sesuai profil
            risiko, regulasi, dan kebutuhan industri Anda.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            {[
              { t: "In-House Training", d: "Pelatihan di kantor Anda untuk efisiensi waktu." },
              { t: "Onsite Training", d: "Praktik langsung di lokasi operasional klien." },
              { t: "Training Need Analysis", d: "Asesmen gap kompetensi sebelum penyusunan kurikulum." },
              { t: "Customized Program", d: "Modul disesuaikan dengan SOP & regulasi internal." },
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
              Diskusikan Kebutuhan Perusahaan <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certification() {
  const [cert, setCert] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Sertifikasi"
          title="Sertifikasi dan Kepatuhan"
          sub="Program SEAL selaras dengan standar nasional dan praktik internasional industri energi."
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
        <div className="reveal mt-16 border-2 border-charcoal p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-safety">
                Verifikasi Sertifikat
              </div>
              <h3 className="mt-2 text-2xl font-bold text-charcoal">
                Cek keaslian sertifikat SEAL secara online.
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMsg(
                  cert.trim()
                    ? `Nomor sertifikat "${cert.trim()}" sedang diproses. Hasil verifikasi akan ditampilkan di sini.`
                    : "Mohon masukkan nomor sertifikat.",
                );
              }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] lg:col-span-7"
            >
              <input
                value={cert}
                onChange={(e) => setCert(e.target.value)}
                placeholder="Masukkan Nomor Sertifikat"
                className="border border-charcoal bg-background px-5 py-4 text-sm font-medium text-charcoal placeholder:text-midgray focus:outline-none focus:ring-2 focus:ring-safety"
              />
              <button
                type="submit"
                className="bg-charcoal px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-safety"
              >
                Verifikasi
              </button>
              {msg && (
                <div className="border-l-2 border-safety bg-lightgray p-3 text-sm text-darkgray sm:col-span-2">
                  {msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Testimoni"
          title="Apa Kata Peserta Kami"
          sub="Suara langsung dari HSE Manager dan Safety Officer mitra operasional kami."
        />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="reveal flex flex-col justify-between bg-background p-8">
              <blockquote className="text-base leading-relaxed text-charcoal">
                <span className="mb-4 block text-3xl font-black leading-none text-safety">“</span>
                {t.q}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={t.img}
                  alt={t.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 object-cover grayscale"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-charcoal">{t.name}</div>
                  <div className="truncate text-xs text-midgray">
                    {t.pos} · {t.co}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {["PERTAMINA", "PHE ONWJ", "MEDCO", "CHEVRON", "VALE", "FREEPORT"].map((c) => (
            <div
              key={c}
              className="bg-background py-6 text-center text-[11px] font-bold tracking-[0.2em] text-midgray"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Jadwal"
          title="Jadwal Pelatihan Terdekat"
          sub="Kelas publik di kota-kota basis operasi industri energi nasional."
        />
        <div className="reveal -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-charcoal text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal">
                <th className="py-4 pr-4">Program</th>
                <th className="py-4 pr-4">Tanggal</th>
                <th className="py-4 pr-4">Lokasi</th>
                <th className="py-4 pr-4">Kuota</th>
                <th className="py-4 pr-4">Status</th>
                <th className="py-4"></th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => {
                const full = r.s === "Penuh";
                return (
                  <tr key={r.p + r.t} className="border-b border-border align-middle text-sm">
                    <td className="py-5 pr-4 font-semibold text-charcoal">{r.p}</td>
                    <td className="py-5 pr-4 text-darkgray">{r.t}</td>
                    <td className="py-5 pr-4 text-darkgray">{r.l}</td>
                    <td className="py-5 pr-4 text-darkgray">{r.k}</td>
                    <td className="py-5 pr-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          full ? "bg-lightgray text-midgray" : "bg-turquoise text-white"
                        }`}
                      >
                        {r.s}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <a
                        href={full ? "#contact" : "#contact"}
                        className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                          full ? "text-midgray" : "text-safety hover:underline"
                        }`}
                      >
                        {full ? "Waiting List" : "Daftar Sekarang"} <ArrowRight size={12} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="border-b border-border bg-lightgray py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Insights"
          title="Artikel Keselamatan Kerja"
          sub="Wawasan praktis dari instruktur dan praktisi HSE."
        />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.t} className="reveal group flex flex-col bg-background">
              <div className="aspect-[4/3] overflow-hidden bg-lightgray">
                <img
                  src={a.img}
                  alt={a.t}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="text-[11px] font-bold uppercase tracking-wider text-safety">
                  HSE · Insight
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-charcoal">{a.t}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-midgray">{a.e}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-safety"
                >
                  Baca Artikel <ArrowRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCTA() {
  return (
    <section className="bg-safety py-20 text-safety-foreground">
      <div className="container-swiss grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Siap Meningkatkan Kompetensi Tim Anda?
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
            Hubungi tim kami untuk konsultasi program pelatihan yang sesuai dengan kebutuhan
            operasional dan profil risiko perusahaan Anda.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={16} /> Hubungi via WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-charcoal"
          >
            Request Proposal <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="border-b border-border bg-background py-24">
      <div className="container-swiss">
        <SectionLabel
          kicker="Kontak"
          title="Diskusikan Kebutuhan Pelatihan Anda"
          sub="Tim konsultan kami akan merespons dalam 1 × 24 jam kerja."
        />
        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
          <div className="bg-background p-8 lg:p-10">
            <h3 className="text-lg font-bold text-charcoal">Informasi Kontak</h3>
            <ul className="mt-6 space-y-5 text-sm">
              {[
                { i: Phone, l: "Telepon", v: "+62 21 5000 1234" },
                { i: MessageCircle, l: "WhatsApp", v: "+62 812 3456 7890" },
                { i: Mail, l: "Email", v: "training@seal-center.co.id" },
                { i: MapPin, l: "Alamat", v: "Jl. Industri Raya No. 12, Jakarta Selatan 12950" },
              ].map((c) => (
                <li key={c.l} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-border text-safety">
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
                title="Lokasi SEAL Training Center"
                src="https://www.google.com/maps?q=Jakarta&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
          <div className="bg-background p-8 lg:p-10">
            <h3 className="text-lg font-bold text-charcoal">Form Permintaan Pelatihan</h3>
            {sent ? (
              <div className="mt-6 border-l-2 border-safety bg-lightgray p-6">
                <div className="text-sm font-bold text-charcoal">Terima kasih!</div>
                <p className="mt-2 text-sm text-darkgray">
                  Permintaan Anda telah kami terima. Tim konsultan SEAL akan segera menghubungi
                  Anda. Untuk respons lebih cepat, silakan{" "}
                  <a href={WA} className="font-semibold text-safety underline">
                    chat via WhatsApp
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { n: "nama", l: "Nama Lengkap", t: "text", req: true },
                  { n: "perusahaan", l: "Perusahaan", t: "text", req: true },
                  { n: "email", l: "Email", t: "email", req: true },
                  { n: "hp", l: "Nomor HP", t: "tel", req: true },
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
                    Jenis Pelatihan
                  </span>
                  <select
                    name="jenis"
                    required
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-safety"
                  >
                    <option value="">Pilih program pelatihan…</option>
                    {programs.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                    <option>Customized / Corporate Training</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-midgray">
                    Pesan
                  </span>
                  <textarea
                    name="pesan"
                    rows={4}
                    className="mt-2 w-full resize-none border border-border bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-safety"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-safety px-7 py-4 text-sm font-semibold text-safety-foreground transition-transform hover:-translate-y-0.5 sm:col-span-2"
                >
                  Kirim Permintaan <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-white/75">
      <div className="container-swiss">
        <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center bg-safety">
                <ShieldAlert size={18} strokeWidth={2.5} />
              </span>
              <span className="text-base font-extrabold tracking-tight text-white">
                SEAL Training Center
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Institusi pelatihan HSE, Oil & Gas, dan Industrial Safety berbasis di Indonesia.
              Membentuk kompetensi keselamatan kerja untuk industri energi nasional.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm">
              {["Tentang", "Program", "Jadwal", "Corporate", "Kontak"].map((x) => (
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
              Program Pelatihan
            </div>
            <ul className="space-y-2 text-sm">
              {programs.slice(0, 5).map((p) => (
                <li key={p.name}>
                  <a href="#programs" className="hover:text-safety">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Kontak
            </div>
            <ul className="space-y-2 text-sm">
              <li>+62 21 5000 1234</li>
              <li>training@seal-center.co.id</li>
              <li>Jakarta Selatan</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} SEAL Training Center. All rights reserved.</div>
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
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi via WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center bg-safety text-white shadow-2xl transition-transform hover:-translate-y-1"
    >
      <MessageCircle size={24} />
    </a>
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
