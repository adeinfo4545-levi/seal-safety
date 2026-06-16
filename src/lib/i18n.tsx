import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (id: string, en: string) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("seal.lang");
      if (saved === "id" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("seal.lang", l);
    } catch {}
  };

  const t = (id: string, en: string) => (lang === "id" ? id : en);

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  const base =
    "px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-colors";
  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={`inline-flex border border-charcoal ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
        className={`${base} ${
          lang === "id" ? "bg-charcoal text-white" : "bg-background text-charcoal hover:bg-lightgray"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} border-l border-charcoal ${
          lang === "en" ? "bg-charcoal text-white" : "bg-background text-charcoal hover:bg-lightgray"
        }`}
      >
        EN
      </button>
    </div>
  );
}
