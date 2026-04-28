// App entry — wires theme, lang, terminal, tweaks

const { useState: useS, useEffect: useE, useMemo: useM } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "matrix",
  "density": "cozy",
  "font": "jb",
  "matrix": true
}/*EDITMODE-END*/;

const ACCENTS = {
  matrix: { dark: "#00ff88", light: "#006633", glow: "rgba(0,255,136,0.35)", lightGlow: "rgba(0,102,51,0.2)" },
  amber:  { dark: "#ffaa00", light: "#aa6600", glow: "rgba(255,170,0,0.35)", lightGlow: "rgba(170,102,0,0.2)" },
  cyan:   { dark: "#00d4ff", light: "#005577", glow: "rgba(0,212,255,0.35)", lightGlow: "rgba(0,85,119,0.2)" },
  red:    { dark: "#ff5566", light: "#aa1122", glow: "rgba(255,85,102,0.35)", lightGlow: "rgba(170,17,34,0.2)" },
  violet: { dark: "#b88cff", light: "#5533aa", glow: "rgba(184,140,255,0.35)", lightGlow: "rgba(85,51,170,0.2)" },
};

function applyAccent(name, theme) {
  const a = ACCENTS[name] || ACCENTS.matrix;
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--accent", a.light);
    root.style.setProperty("--accent-dim", a.light);
    root.style.setProperty("--accent-glow", a.lightGlow);
  } else {
    root.style.setProperty("--accent", a.dark);
    root.style.setProperty("--accent-dim", a.dark);
    root.style.setProperty("--accent-glow", a.glow);
  }
}

function App() {
  const [lang, setLang] = useS("en");
  const [theme, setTheme] = useS("dark");
  const [active, setActive] = useS("home");
  const [termOpen, setTermOpen] = useS(false);
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useE(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useE(() => { document.documentElement.dataset.density = tweak.density; }, [tweak.density]);
  useE(() => { document.documentElement.dataset.font = tweak.font; }, [tweak.font]);
  useE(() => { applyAccent(tweak.accent, theme); }, [tweak.accent, theme]);

  // global key handlers
  useE(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTermOpen(true);
      } else if (e.key === "Escape") {
        setTermOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // active hash sync via IntersectionObserver
  useE(() => {
    const ids = ["home","about","experience","skills","certs","education","contact"];
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const ctx = useM(() => ({
    lang, setLang,
    theme, setTheme,
    openTerm: () => setTermOpen(true),
  }), [lang, theme]);

  return (
    <PortfolioCtx.Provider value={ctx}>
      <MatrixRain enabled={!!tweak.matrix} />
      <div className="app">
        <Topbar active={active} setActive={setActive} />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CertsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
      <TerminalOverlay open={termOpen} onClose={() => setTermOpen(false)} />
      <div className="cmd-hint">
        <span className="pulse" />
        <span>{lang === "en" ? "press" : "nhấn"}</span>
        <span className="kbd">⌘</span><span style={{opacity:0.5}}>+</span><span className="kbd">K</span>
        <span>{lang === "en" ? "for terminal" : "để mở terminal"}</span>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="theme">
          <TweakRadio
            label="mode"
            value={theme}
            onChange={(v) => setTheme(v)}
            options={[{ value: "dark", label: "dark" }, { value: "light", label: "light" }]}
          />
          <TweakRadio
            label="lang"
            value={lang}
            onChange={(v) => setLang(v)}
            options={[{ value: "en", label: "EN" }, { value: "vi", label: "VI" }]}
          />
        </TweakSection>
        <TweakSection label="accent">
          <TweakSelect
            label="color"
            value={tweak.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "matrix", label: "matrix green" },
              { value: "amber", label: "amber" },
              { value: "cyan", label: "cyan" },
              { value: "red", label: "red team" },
              { value: "violet", label: "violet" },
            ]}
          />
        </TweakSection>
        <TweakSection label="layout">
          <TweakRadio
            label="density"
            value={tweak.density}
            onChange={(v) => setTweak("density", v)}
            options={[{ value: "compact", label: "compact" }, { value: "cozy", label: "cozy" }, { value: "comfy", label: "comfy" }]}
          />
          <TweakSelect
            label="font"
            value={tweak.font}
            onChange={(v) => setTweak("font", v)}
            options={[
              { value: "jb", label: "JetBrains Mono" },
              { value: "fira", label: "Fira Code" },
              { value: "ibm", label: "IBM Plex Mono" },
            ]}
          />
        </TweakSection>
        <TweakSection label="effects">
          <TweakToggle label="matrix rain" value={!!tweak.matrix} onChange={(v) => setTweak("matrix", v)} />
        </TweakSection>
      </TweaksPanel>
    </PortfolioCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
