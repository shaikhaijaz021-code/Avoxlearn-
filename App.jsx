import React, { useState, useEffect, useRef } from "react";
import {
  Youtube, FileText, Headphones, Play, Pause, Rewind, FastForward,
  Download, ArrowRight, CheckCircle2, Star, Menu, X, Clock, User,
  Loader2, ChevronRight, BookOpen, Sparkles
} from "lucide-react";

const C = {
  bg: "#FAFAFB",
  surface: "#FFFFFF",
  ink: "#14152B",
  inkMuted: "#6B7280",
  inkFaint: "#9CA0AE",
  border: "#E7E7F0",
  accent: "#4A3AFF",
  accentDeep: "#3626D9",
  accentSoft: "#EEEBFF",
  violet: "#8B5CF6",
  amber: "#E08A00",
  amberSoft: "#FFF4E0",
};

const F = {
  display: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const PDF_STEPS = [
  "Reading your lecture…",
  "Understanding the topics…",
  "Identifying important concepts…",
  "Organizing study material…",
  "Creating your PDF…",
];

const AUDIO_STEPS = [
  "Reading your lecture…",
  "Understanding the topics…",
  "Preparing the audio script…",
  "Generating your study audio…",
];

function useProcessing(steps, onDone, active) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    setStep(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= steps.length) {
        clearInterval(id);
        setTimeout(onDone, 500);
      } else {
        setStep(i);
      }
    }, 750);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [active]);
  return step;
}

function Tab({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors"
      style={{
        color: active ? C.accent : C.inkMuted,
        fontFamily: F.body,
      }}
    >
      <Icon size={16} strokeWidth={2} />
      {label}
      {active && (
        <span
          className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full"
          style={{ background: C.accent }}
        />
      )}
    </button>
  );
}

function IndexCard({ tabLabel, tabColor, children, className = "", style = {} }) {
  return (
    <div className={`relative ${className}`} style={{ paddingTop: 14, ...style }}>
      <div
        className="absolute left-5 top-0 px-3 py-1 text-[11px] font-semibold tracking-wide rounded-t-md"
        style={{
          background: tabColor,
          color: "#fff",
          fontFamily: F.mono,
          letterSpacing: "0.05em",
        }}
      >
        {tabLabel}
      </div>
      <div
        className="rounded-2xl border p-6"
        style={{ background: C.surface, borderColor: C.border, boxShadow: "0 1px 2px rgba(20,21,43,0.04)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Toast({ message, show }) {
  return (
    <div
      className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 transition-all duration-300"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate(-50%, 0)" : "translate(-50%, 12px)",
        pointerEvents: "none",
      }}
    >
      <div
        className="rounded-full px-5 py-2.5 text-sm shadow-lg"
        style={{ background: C.ink, color: "#fff", fontFamily: F.body }}
      >
        {message}
      </div>
    </div>
  );
}

function Logo({ size = 20 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center justify-center rounded-lg"
        style={{ width: size + 14, height: size + 14, background: C.accent }}
      >
        <BookOpen size={size} color="#fff" strokeWidth={2.25} />
      </span>
      <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: size, color: C.ink, letterSpacing: "-0.01em" }}>
        Avoxlearn<span style={{ color: C.accent }}>.ai</span>
      </span>
    </span>
  );
}

function NavBar({ page, setPage, onStart }) {
  const [open, setOpen] = useState(false);
  const items = [
    { key: "home", label: "Home" },
    { key: "home", label: "YouTube → PDF" },
    { key: "audio", label: "YouTube → Audio" },
    { key: "about", label: "About" },
  ];
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ background: "rgba(250,250,251,0.9)", borderColor: C.border }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button onClick={() => setPage("home")} aria-label="Avoxlearn.ai home">
          <Logo />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => setPage(it.key)}
              className="rounded-full px-3.5 py-2 text-sm transition-colors"
              style={{
                fontFamily: F.body,
                color: page === it.key && (idx !== 1) ? C.ink : C.inkMuted,
                background: page === it.key && idx !== 1 ? C.accentSoft : "transparent",
                fontWeight: page === it.key ? 600 : 500,
              }}
            >
              {it.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onStart}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
            style={{ background: C.accent, fontFamily: F.body }}
          >
            Start Learning <ArrowRight size={15} />
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t px-5 py-3 flex flex-col gap-1" style={{ borderColor: C.border }}>
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => { setPage(it.key); setOpen(false); }}
              className="text-left rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{ fontFamily: F.body, color: C.ink }}
            >
              {it.label}
            </button>
          ))}
          <button
            onClick={() => { onStart(); setOpen(false); }}
            className="mt-1 rounded-full px-4 py-2.5 text-sm font-semibold text-white text-center"
            style={{ background: C.accent, fontFamily: F.body }}
          >
            Start Learning
          </button>
        </div>
      )}
    </header>
  );
}

function ProcessingScreen({ steps, step }) {
  return (
    <div className="mx-auto max-w-md py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
          style={{ background: C.accentSoft }}
        >
          <Loader2 size={26} color={C.accent} className="animate-spin" />
        </div>
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 20, color: C.ink }}>
          Preparing your study material
        </h3>
        <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.inkMuted, marginTop: 4 }}>
          This usually takes a few moments.
        </p>
      </div>
      <ol className="flex flex-col gap-1">
        {steps.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{
              background: current ? C.accentSoft : "transparent",
            }}>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                style={{
                  fontFamily: F.mono,
                  background: done ? C.accent : current ? "#fff" : "transparent",
                  color: done ? "#fff" : current ? C.accent : C.inkFaint,
                  border: current ? `1.5px solid ${C.accent}` : done ? "none" : `1.5px solid ${C.border}`,
                }}
              >
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </span>
              <span
                style={{
                  fontFamily: F.body,
                  fontSize: 14,
                  fontWeight: current ? 600 : 500,
                  color: done ? C.ink : current ? C.ink : C.inkFaint,
                }}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const NOTE_TOPIC = {
  title: "Newton's Second Law of Motion",
  definition:
    "The rate of change of momentum of a body is directly proportional to the net force applied, and this change happens in the direction of the force.",
  points: [
    "A bigger force produces a bigger acceleration, if mass stays the same.",
    "The same force produces less acceleration on a heavier object.",
    "Force and acceleration always point in the same direction.",
  ],
  formula: "F = m × a",
  formulaTerms: [
    ["F", "Net force acting on the object, in newtons (N)"],
    ["m", "Mass of the object, in kilograms (kg)"],
    ["a", "Acceleration produced, in metres per second² (m/s²)"],
  ],
  derivation: [
    "Momentum is defined as p = m v.",
    "Newton's second law states F = dp/dt.",
    "Substitute momentum: F = d(m v)/dt.",
    "For constant mass, m comes out of the derivative: F = m (dv/dt).",
    "Since dv/dt is acceleration: F = m a.",
  ],
  example:
    "Pushing an empty shopping cart takes little effort. Pushing the same cart full of groceries with the same push produces far less acceleration — same force, more mass, less acceleration.",
  exam:
    "F = m a only holds when mass is constant. For rockets and other variable-mass systems, use the impulse–momentum form F = dp/dt instead.",
  revision: [
    "Definition: force = rate of change of momentum",
    "Formula: F = m × a",
    "Direction of acceleration = direction of net force",
    "Constant mass only — use dp/dt otherwise",
  ],
};

function NotesContent({ compact = false }) {
  const t = NOTE_TOPIC;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-4 w-1 rounded-full" style={{ background: C.accent }} />
          <h4 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
            1. Definition
          </h4>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.6, paddingLeft: 12 }}>
          {t.definition}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-4 w-1 rounded-full" style={{ background: C.accent }} />
          <h4 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
            2. What it means
          </h4>
        </div>
        <ul className="flex flex-col gap-1.5" style={{ paddingLeft: 12 }}>
          {t.points.map((p, i) => (
            <li key={i} className="flex gap-2" style={{ fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.55 }}>
              <span style={{ color: C.accent, fontWeight: 700 }}>·</span>{p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-4 w-1 rounded-full" style={{ background: C.accent }} />
          <h4 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
            3. Formula
          </h4>
        </div>
        <div className="ml-3 rounded-xl p-4" style={{ background: C.accentSoft }}>
          <div style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 600, color: C.accentDeep, marginBottom: 10 }}>
            {t.formula}
          </div>
          <div className="flex flex-col gap-1">
            {t.formulaTerms.map(([sym, meaning], i) => (
              <div key={i} style={{ fontFamily: F.body, fontSize: 13.5, color: C.ink }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, color: C.accentDeep }}>{sym}</span>
                <span style={{ color: C.inkMuted }}> — {meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!compact && (
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-4 w-1 rounded-full" style={{ background: C.accent }} />
            <h4 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
              4. Derivation
            </h4>
          </div>
          <ol className="flex flex-col gap-1.5" style={{ paddingLeft: 12 }}>
            {t.derivation.map((d, i) => (
              <li key={i} className="flex gap-2.5" style={{ fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.55 }}>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold mt-0.5"
                  style={{ fontFamily: F.mono, background: "#fff", border: `1.5px solid ${C.border}`, color: C.inkMuted }}
                >
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-4 w-1 rounded-full" style={{ background: C.accent }} />
          <h4 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15.5, color: C.ink }}>
            5. Example
          </h4>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.6, paddingLeft: 12, fontStyle: "italic" }}>
          {t.example}
        </p>
      </div>

      <div className="ml-3 rounded-xl p-4 flex gap-3" style={{ background: C.amberSoft }}>
        <Star size={16} color={C.amber} className="shrink-0 mt-0.5" fill={C.amber} />
        <div>
          <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 13, color: C.amber, marginBottom: 2 }}>
            Exam focus
          </div>
          <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.ink, lineHeight: 1.55 }}>{t.exam}</p>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ border: `1.5px dashed ${C.accent}` }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Star size={15} color={C.accent} fill={C.accent} />
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14, color: C.ink }}>
            Quick Revision
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          {t.revision.map((r, i) => (
            <li key={i} style={{ fontFamily: F.body, fontSize: 13.5, color: C.ink, lineHeight: 1.6 }}>
              → {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PdfPreview({ notify }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-[520px] rounded-lg border overflow-hidden"
        style={{ borderColor: C.border, background: "#fff", boxShadow: "0 8px 30px rgba(20,21,43,0.08)" }}
      >
        <div className="px-7 pt-7 pb-5" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.inkFaint, letterSpacing: "0.06em" }}>
            STUDY BOOKLET
          </div>
          <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 21, color: C.ink, marginTop: 4 }}>
            {NOTE_TOPIC.title}
          </h3>
          <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkMuted, marginTop: 2 }}>
            Class 11 Physics · Generated by Avoxlearn.ai
          </div>
        </div>
        <div className="px-7 py-6">
          <NotesContent compact />
        </div>
        <div
          className="flex items-center justify-between px-7 py-3 text-xs"
          style={{ borderTop: `1px solid ${C.border}`, fontFamily: F.mono, color: C.inkFaint }}
        >
          <span>Avoxlearn.ai</span>
          <span>Page 1</span>
        </div>
      </div>
      <button
        onClick={() => notify("This is a preview — PDF downloads aren't available yet.")}
        className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white active:scale-95 transition-transform"
        style={{ background: C.accent, fontFamily: F.body }}
      >
        <Download size={16} /> Download PDF
      </button>
    </div>
  );
}

function AudioPlayer({ notify }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speeds = [0.75, 1, 1.25, 1.5, 2];
  return (
    <div className="flex flex-col items-center py-6">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-full mb-6"
        style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.violet})` }}
      >
        <Headphones size={36} color="#fff" />
      </div>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.ink }}>
        {NOTE_TOPIC.title}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkMuted, marginTop: 2 }}>
        Study audio · 9 min 40 sec
      </div>

      <div className="w-full max-w-sm mt-6">
        <div className="h-1.5 w-full rounded-full" style={{ background: C.border }}>
          <div className="h-1.5 rounded-full" style={{ width: "28%", background: C.accent }} />
        </div>
        <div className="flex justify-between mt-1.5" style={{ fontFamily: F.mono, fontSize: 11, color: C.inkFaint }}>
          <span>2:42</span>
          <span>9:40</span>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-5">
        <button onClick={() => notify("Skipped back 10 seconds.")} style={{ color: C.inkMuted }} aria-label="Back 10 seconds">
          <Rewind size={22} />
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white active:scale-95 transition-transform"
          style={{ background: C.accent }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={22} fill="#fff" /> : <Play size={22} fill="#fff" style={{ marginLeft: 2 }} />}
        </button>
        <button onClick={() => notify("Skipped forward 10 seconds.")} style={{ color: C.inkMuted }} aria-label="Forward 10 seconds">
          <FastForward size={22} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-6">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              fontFamily: F.mono,
              background: speed === s ? C.accent : "transparent",
              color: speed === s ? "#fff" : C.inkMuted,
              border: `1.5px solid ${speed === s ? C.accent : C.border}`,
            }}
          >
            {s}x
          </button>
        ))}
      </div>

      <button
        onClick={() => notify("This is a preview — audio downloads aren't available yet.")}
        className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white active:scale-95 transition-transform"
        style={{ background: C.accent, fontFamily: F.body }}
      >
        <Download size={16} /> Download Audio
      </button>
    </div>
  );
}

function ResultMeta() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
      <div
        className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `linear-gradient(135deg, ${C.accentSoft}, #fff)`, border: `1px solid ${C.border}` }}
      >
        <Youtube size={30} color={C.accent} />
      </div>
      <div className="text-center sm:text-left">
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 17, color: C.ink }}>
          {NOTE_TOPIC.title} — Class 11 Physics
        </h3>
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-1.5 flex-wrap" style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkMuted }}>
          <span className="flex items-center gap-1"><User size={13} /> Learn Physics Easy</span>
          <span className="flex items-center gap-1"><Clock size={13} /> 18:42</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ notify }) {
  const [tab, setTab] = useState("notes");
  return (
    <div className="mt-8">
      <div className="flex items-center gap-1.5 mb-2">
        <CheckCircle2 size={17} color={C.accent} />
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 17, color: C.ink }}>
          Your study material is ready
        </h3>
      </div>
      <ResultMeta />
      <div className="flex gap-1 border-b mb-6" style={{ borderColor: C.border }}>
        <Tab icon={FileText} label="Notes" active={tab === "notes"} onClick={() => setTab("notes")} />
        <Tab icon={BookOpen} label="PDF" active={tab === "pdf"} onClick={() => setTab("pdf")} />
        <Tab icon={Headphones} label="Audio" active={tab === "audio"} onClick={() => setTab("audio")} />
      </div>
      {tab === "notes" && (
        <IndexCard tabLabel="NOTES" tabColor={C.accent}>
          <NotesContent />
        </IndexCard>
      )}
      {tab === "pdf" && <PdfPreview notify={notify} />}
      {tab === "audio" && (
        <IndexCard tabLabel="AUDIO" tabColor={C.violet}>
          <AudioPlayer notify={notify} />
        </IndexCard>
      )}
      <div className="mt-8 flex items-center gap-2 opacity-60">
        <span style={{ fontFamily: F.body, fontSize: 12, color: C.inkFaint }}>Coming soon:</span>
        {["Flashcards", "Quiz", "Ask the Video"].map((f) => (
          <span
            key={f}
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ fontFamily: F.body, background: C.bg, border: `1px solid ${C.border}`, color: C.inkFaint }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function HomePage({ notify, heroRef }) {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | processing | done
  const step = useProcessing(PDF_STEPS, () => setPhase("done"), phase === "processing");

  const handleGenerate = () => {
    if (!url.trim()) {
      notify("Paste a YouTube lecture link to continue.");
      return;
    }
    setPhase("processing");
  };

  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 pt-14 pb-6 text-center">
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-5 text-xs font-semibold"
          style={{ background: C.accentSoft, color: C.accentDeep, fontFamily: F.body }}
        >
          <Sparkles size={13} /> Free for students
        </div>
        <h1
          style={{
            fontFamily: F.display, fontWeight: 700, fontSize: "clamp(30px, 6vw, 48px)",
            color: C.ink, lineHeight: 1.08, letterSpacing: "-0.02em",
          }}
        >
          Turn YouTube lectures into <span style={{ color: C.accent }}>study material</span>
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: C.inkMuted, marginTop: 16, lineHeight: 1.6 }}>
          Learn from educational videos and turn them into clear, organized and easy-to-revise study material.
        </p>

        <div ref={heroRef} className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-xl mx-auto">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video link…"
            className="flex-1 rounded-full px-5 py-3.5 text-sm outline-none"
            style={{
              fontFamily: F.body, background: C.surface, border: `1.5px solid ${C.border}`, color: C.ink,
            }}
            onFocus={(e) => (e.target.style.borderColor = C.accent)}
            onBlur={(e) => (e.target.style.borderColor = C.border)}
          />
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white active:scale-95 transition-transform"
            style={{ background: C.accent, fontFamily: F.body }}
          >
            Generate Study Material
          </button>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkFaint, marginTop: 10 }}>
          Paste an educational YouTube lecture and let Avoxlearn.ai organize it into useful study material.
        </p>
      </section>

      {phase === "idle" && (
        <section className="mx-auto max-w-3xl px-5 py-10 grid sm:grid-cols-2 gap-4">
          <IndexCard tabLabel="PRIMARY" tabColor={C.accent}>
            <FileText size={22} color={C.accent} />
            <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 10 }}>
              YouTube → PDF
            </h3>
            <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.inkMuted, marginTop: 4, lineHeight: 1.55 }}>
              Turn educational videos into structured, exam-friendly study notes.
            </p>
          </IndexCard>
          <IndexCard tabLabel="REVISION" tabColor={C.violet}>
            <Headphones size={22} color={C.violet} />
            <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 10 }}>
              YouTube → Audio
            </h3>
            <p style={{ fontFamily: F.body, fontSize: 13.5, color: C.inkMuted, marginTop: 4, lineHeight: 1.55 }}>
              Turn educational content into listenable study material for revision.
            </p>
          </IndexCard>
        </section>
      )}

      {phase === "processing" && (
        <section className="px-5">
          <ProcessingScreen steps={PDF_STEPS} step={step} />
        </section>
      )}

      {phase === "done" && (
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <Dashboard notify={notify} />
        </section>
      )}
    </div>
  );
}

function AudioPage({ notify }) {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState("idle");
  const step = useProcessing(AUDIO_STEPS, () => setPhase("done"), phase === "processing");

  const handleGenerate = () => {
    if (!url.trim()) {
      notify("Paste a YouTube lecture link to continue.");
      return;
    }
    setPhase("processing");
  };

  return (
    <section className="mx-auto max-w-2xl px-5 pt-14 pb-16 text-center">
      <div
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
        style={{ background: C.accentSoft }}
      >
        <Headphones size={22} color={C.violet} />
      </div>
      <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(26px, 5vw, 36px)", color: C.ink, letterSpacing: "-0.02em" }}>
        YouTube → Audio
      </h1>
      <p style={{ fontFamily: F.body, fontSize: 15, color: C.inkMuted, marginTop: 12, lineHeight: 1.6 }}>
        Paste a lecture link and get a listenable study-audio version, ready for revision on the go.
      </p>

      {phase === "idle" && (
        <div className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video link…"
            className="flex-1 rounded-full px-5 py-3.5 text-sm outline-none"
            style={{ fontFamily: F.body, background: C.surface, border: `1.5px solid ${C.border}`, color: C.ink }}
          />
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white active:scale-95 transition-transform"
            style={{ background: C.accent, fontFamily: F.body }}
          >
            Generate Audio
          </button>
        </div>
      )}

      {phase === "processing" && <ProcessingScreen steps={AUDIO_STEPS} step={step} />}

      {phase === "done" && (
        <div className="mt-8 text-left">
          <ResultMeta />
          <IndexCard tabLabel="AUDIO" tabColor={C.violet}>
            <AudioPlayer notify={notify} />
          </IndexCard>
        </div>
      )}

      <p style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkFaint, marginTop: 28, lineHeight: 1.6 }}>
        Avoxlearn.ai respects YouTube's terms and copyright rules, and does not redistribute
        content without permission.
      </p>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-14 pb-20">
      <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(28px, 5vw, 38px)", color: C.ink, letterSpacing: "-0.02em" }}>
        About Avoxlearn.ai
      </h1>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.ink, marginTop: 20, lineHeight: 1.7 }}>
        Avoxlearn.ai is a free study platform created to help school and college students learn
        more effectively from educational videos.
      </p>
      <p style={{ fontFamily: F.body, fontSize: 16, color: C.ink, marginTop: 16, lineHeight: 1.7 }}>
        Instead of spending a long time making notes from lectures, students can use Avoxlearn.ai
        to turn educational YouTube content into organized study material.
      </p>

      <div className="mt-10 rounded-2xl p-6" style={{ background: C.accentSoft }}>
        <div className="flex items-center gap-3 mb-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
            style={{ background: C.accent, fontFamily: F.display }}
          >
            AS
          </span>
          <div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14.5, color: C.ink }}>
              Founded by Aijaz Shaikh
            </div>
          </div>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 14.5, color: C.ink, lineHeight: 1.65 }}>
          Avoxlearn.ai was created with a simple idea: make learning from educational videos easier
          by turning them into clear, organized and easy-to-revise study material.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState({ show: false, message: "" });
  const heroRef = useRef(null);
  const toastTimer = useRef(null);

  const notify = (message) => {
    clearTimeout(toastTimer.current);
    setToast({ show: true, message });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600);
  };

  const scrollToHero = () => {
    setPage("home");
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      heroRef.current?.querySelector("input")?.focus();
    }, 50);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar page={page} setPage={setPage} onStart={scrollToHero} />
      <main>
        {page === "home" && <HomePage notify={notify} heroRef={heroRef} />}
        {page === "audio" && <AudioPage notify={notify} />}
        {page === "about" && <AboutPage />}
      </main>
      <footer className="border-t px-5 py-8" style={{ borderColor: C.border }}>
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <Logo size={15} />
          <p style={{ fontFamily: F.body, fontSize: 12, color: C.inkFaint }}>
            © 2026 Avoxlearn.ai · Created by Aijaz Shaikh
          </p>
        </div>
      </footer>
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}
