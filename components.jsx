// Shared components: matrix canvas, terminal hero typing, terminal command overlay

const { useEffect, useRef, useState, useMemo, useCallback } = React;

/* ============ Matrix Rain ============ */
function MatrixRain({ enabled = true }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, cols, drops;
    const charset = "アァカサタナハマヤラワABCDEFGHJKLMNPQRSTUVWXYZ0123456789{}[]<>#$%@!*&+=-/\\";
    const fontSize = 14;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    }
    function getColor() {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--accent").trim() || "#00ff88";
    }
    let color = getColor();
    let bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#0a0e0a";
    function frame() {
      // light fade to leave trails
      ctx.fillStyle = `rgba(10, 14, 10, 0.08)`;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = color;
      for (let i = 0; i < cols; i++) {
        const ch = charset[Math.floor(Math.random() * charset.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // brighter head
        if (Math.random() > 0.97) ctx.fillStyle = "#ffffff";
        else ctx.fillStyle = color;
        ctx.fillText(ch, x, y);
        drops[i] += 1;
        if (y > h && Math.random() > 0.975) drops[i] = 0;
      }
    }
    let raf;
    let last = 0;
    function loop(ts) {
      if (ts - last > 60) {
        frame();
        last = ts;
      }
      raf = requestAnimationFrame(loop);
    }
    resize();
    color = getColor();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    // also re-read color on theme change
    const mo = new MutationObserver(() => {
      color = getColor();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mo.disconnect();
    };
  }, [enabled]);
  if (!enabled) return null;
  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />;
}

/* ============ Typed line for hero ============ */
function TypedLines({ lines, onDone, speed = 22, stagger = 200 }) {
  const [shown, setShown] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx >= lines.length) { onDone && onDone(); return; }
    const line = lines[idx];
    let i = 0;
    let t;
    function tick() {
      i++;
      setShown((prev) => {
        const cur = prev.slice();
        cur[idx] = line.text.slice(0, i);
        return cur;
      });
      if (i < line.text.length) {
        t = setTimeout(tick, speed + Math.random() * 18);
      } else {
        t = setTimeout(() => setIdx((n) => n + 1), stagger);
      }
    }
    if (line.delay) t = setTimeout(tick, line.delay); else t = setTimeout(tick, 80);
    return () => clearTimeout(t);
  }, [idx, lines, speed, stagger]);
  return (
    <div>
      {lines.map((ln, i) => {
        const show = shown[i] || "";
        if (i > idx) return null;
        return (
          <div className="hero-line" key={i}>
            {ln.prompt && <span className="prompt">{ln.prompt}</span>}{" "}
            <span className={ln.cls || (ln.prompt ? "cmd" : "out")}>{show}</span>
            {i === idx && i < lines.length && <span className="cursor" />}
          </div>
        );
      })}
    </div>
  );
}

/* ============ Theme + Lang context ============ */
const PortfolioCtx = React.createContext(null);

function usePortfolio() {
  return React.useContext(PortfolioCtx);
}

/* ============ Topbar ============ */
function Topbar({ active, setActive }) {
  const { lang, setLang, theme, setTheme, openTerm } = usePortfolio();
  const NAV = [
    { id: "home", en: "home", vi: "trang chủ" },
    { id: "about", en: "about", vi: "giới thiệu" },
    { id: "experience", en: "experience", vi: "kinh nghiệm" },
    { id: "skills", en: "skills", vi: "kỹ năng" },
    { id: "certs", en: "certifications", vi: "chứng chỉ" },
    { id: "education", en: "education", vi: "học vấn" },
    { id: "contact", en: "contact", vi: "liên hệ" },
  ];
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="dots" style={{display:"inline-flex",gap:6,marginRight:6}}>
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
        </span>
        <span className="brand">~/<span>{DATA.handle}</span>.sh</span>
      </div>
      <nav className="nav" aria-label="Primary">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? "active" : ""}
            onClick={() => setActive && setActive(n.id)}
          >
            {n[lang]}
          </a>
        ))}
      </nav>
      <div className="topbar-right">
        <button className="icon-btn lang" onClick={() => setLang(lang === "en" ? "vi" : "en")} title="Toggle language">
          {lang.toUpperCase()}
        </button>
        <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">
          {theme === "dark" ? "☾" : "☀"}
        </button>
        <button className="icon-btn" onClick={openTerm} title="Open terminal (⌘K)">⌘K</button>
      </div>
    </header>
  );
}

/* ============ Terminal command overlay ============ */
const COMMANDS = {
  help: {
    desc: { en: "list commands", vi: "danh sách lệnh" },
    run: () => ({
      lines: [
        "Available commands:",
        "  help          — show this list",
        "  whoami        — about me",
        "  ls            — list pages",
        "  cd <page>     — go to page (about/experience/skills/certs/education/contact)",
        "  cat skills    — print skill list",
        "  cat certs     — print certifications",
        "  cat exp       — print experience",
        "  resume        — download resume",
        "  email         — copy email",
        "  theme         — toggle theme",
        "  lang          — toggle language",
        "  clear         — clear screen",
        "  exit          — close terminal",
      ],
    }),
  },
  whoami: {
    desc: { en: "about me", vi: "giới thiệu" },
    run: () => ({
      lines: [
        `${DATA.name}  /  ${DATA.role.en}`,
        `${DATA.location}`,
        ``,
        DATA.summary.en,
      ],
    }),
  },
  ls: {
    desc: { en: "list pages", vi: "danh mục" },
    run: () => ({
      lines: [
        "drwxr-xr-x  about/        intro & summary",
        "drwxr-xr-x  experience/   work timeline",
        "drwxr-xr-x  skills/       technical skills",
        "drwxr-xr-x  certs/        certifications",
        "drwxr-xr-x  education/    schools",
        "drwxr-xr-x  achievements/ ctf & awards",
        "drwxr-xr-x  contact/      reach out",
        "-rw-r--r--  resume.pdf    download cv",
      ],
    }),
  },
  cd: {
    desc: { en: "go to page", vi: "đi đến trang" },
    run: (arg) => {
      const map = { about: "about", experience: "experience", exp: "experience", skills: "skills", certs: "certs", certifications: "certs", education: "education", edu: "education", contact: "contact", home: "home" };
      const target = map[arg] || arg;
      if (!target) return { lines: ["cd: missing argument. try `cd about`."] };
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return { lines: [`navigating to /${target}/ ...`], close: true };
      }
      return { lines: [`cd: no such directory: ${arg}`] };
    },
  },
  cat: {
    desc: { en: "print file", vi: "in nội dung" },
    run: (arg) => {
      if (arg === "skills" || arg === "skills.txt") {
        return { lines: DATA.skills.flatMap((s) => [`# ${s.cat}`, ...s.items.map(([n, l]) => `  ${n.padEnd(22, " ")} ${"█".repeat(l)}${"░".repeat(5 - l)}`)]) };
      }
      if (arg === "certs" || arg === "certs.txt") {
        return { lines: DATA.certs.map((c) => `  [${c.yr}]  ${c.name}  —  ${c.body}`) };
      }
      if (arg === "exp" || arg === "experience") {
        return { lines: DATA.experience.flatMap((e) => [`# ${e.title} @ ${e.company}`, `  ${e.when}  ·  ${e.loc}`, ""]) };
      }
      return { lines: [`cat: ${arg}: no such file. try \`cat skills\`, \`cat certs\`, \`cat exp\`.`] };
    },
  },
  resume: {
    desc: { en: "download resume", vi: "tải hồ sơ" },
    run: () => {
      const a = document.createElement("a");
      a.href = "uploads/Dang-Duong-CV.pdf";
      a.download = "Dang-Duong-CV.pdf";
      a.click();
      return { lines: ["⇣ downloading resume ..."] };
    },
  },
  email: {
    desc: { en: "copy email", vi: "sao chép email" },
    run: () => {
      navigator.clipboard?.writeText(DATA.email);
      return { lines: [`copied to clipboard: ${DATA.email}`] };
    },
  },
  clear: {
    desc: { en: "clear screen", vi: "xoá màn hình" },
    run: () => ({ lines: [], clear: true }),
  },
  exit: {
    desc: { en: "close terminal", vi: "đóng terminal" },
    run: () => ({ lines: ["bye 👋"], close: true }),
  },
};

function TerminalOverlay({ open, onClose }) {
  const { theme, setTheme, lang, setLang } = usePortfolio();
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const [history, setHistory] = useState(() => [
    { kind: "out", text: "guest@dang_duong:~$ welcome." },
    { kind: "out", text: "type `help` to see available commands." },
    { kind: "out", text: "" },
  ]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState([]);
  const [hidx, setHidx] = useState(-1);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, open]);

  function exec(raw) {
    const trimmed = raw.trim();
    setHistory((h) => [...h, { kind: "cmd", text: `guest@dang_duong:~$ ${raw}` }]);
    if (!trimmed) return;
    setHist((h) => [trimmed, ...h]);
    setHidx(-1);
    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    if (cmd === "theme") {
      setTheme(theme === "dark" ? "light" : "dark");
      setHistory((h) => [...h, { kind: "out", text: `theme → ${theme === "dark" ? "light" : "dark"}` }]);
      return;
    }
    if (cmd === "lang") {
      setLang(lang === "en" ? "vi" : "en");
      setHistory((h) => [...h, { kind: "out", text: `lang → ${lang === "en" ? "vi" : "en"}` }]);
      return;
    }
    const c = COMMANDS[cmd];
    if (!c) {
      setHistory((h) => [...h, { kind: "err", text: `command not found: ${cmd}. try \`help\`.` }]);
      return;
    }
    const res = c.run(arg);
    if (res.clear) { setHistory([]); return; }
    if (res.lines && res.lines.length) setHistory((h) => [...h, ...res.lines.map((l) => ({ kind: "out", text: l }))]);
    if (res.close) setTimeout(onClose, 400);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      exec(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(hidx + 1, hist.length - 1);
      setHidx(ni);
      if (hist[ni] != null) setValue(hist[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(hidx - 1, -1);
      setHidx(ni);
      setValue(ni === -1 ? "" : hist[ni]);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <div className={`term-overlay ${open ? "" : "hidden"}`} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="term">
        <div className="term-bar">
          <span className="dots" style={{display:"inline-flex",gap:6}}>
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
          </span>
          <span className="title">guest@dang_duong — bash — 80×24</span>
          <span className="kbd">esc</span>
        </div>
        <div className="term-body" ref={bodyRef}>
          {history.map((h, i) => (
            <div key={i} className="hero-line">
              <span className={h.kind === "err" ? "" : (h.kind === "cmd" ? "cmd" : "out")} style={h.kind === "err" ? { color: "var(--danger)" } : {}}>
                {h.text || "\u00a0"}
              </span>
            </div>
          ))}
        </div>
        <div className="term-input-row">
          <span className="prompt">guest@dang_duong:~$</span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            placeholder="type `help` and press enter ..."
          />
        </div>
      </div>
    </div>
  );
}

window.MatrixRain = MatrixRain;
window.TypedLines = TypedLines;
window.PortfolioCtx = PortfolioCtx;
window.usePortfolio = usePortfolio;
window.Topbar = Topbar;
window.TerminalOverlay = TerminalOverlay;
