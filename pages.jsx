// Page sections

const { useState: uS } = React;

function HeroSection() {
  const { lang } = usePortfolio();
  const [phase, setPhase] = uS(0);
  const lines = [
    { prompt: "$", text: "ssh guest@dang_duong.dev", cls: "cmd", delay: 200 },
    { text: "Connecting ... key verified ✔", cls: "out" },
    { text: "Last login: " + new Date().toDateString(), cls: "out" },
    { prompt: "$", text: "whoami", cls: "cmd" },
  ];
  return (
    <section id="home" className="hero">
      <div className="hero-term">
        <div className="term-bar">
          <span className="dots" style={{display:"inline-flex",gap:6}}>
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
          </span>
          <span className="title">guest@dang_duong:~ — zsh</span>
        </div>
        <div className="hero-term-body">
          <TypedLines lines={lines} onDone={() => setPhase(1)} />
          {phase >= 1 && (
            <div style={{ marginTop: 14 }}>
              <h1>
                {DATA.name.split(" ")[0]} <span className="accent">{DATA.name.split(" ")[1]}</span>
                <span style={{ color: "var(--accent)" }}>_</span>
              </h1>
              <h2>
                <span className="accent">&gt;</span> {DATA.role[lang]} · {DATA.location}
              </h2>
              <div className="hero-tags">
                {DATA.tagline[lang].map((t, i) => (
                  <span key={i} className={`tag ${i === 0 || i === 4 ? "green" : ""}`}>{t}</span>
                ))}
              </div>
              <div className="cta-row">
                <a className="btn" href="#contact">$ ./contact_me.sh</a>
                <a className="btn ghost" href="Dang-Duong-CV.pdf" download>↓ resume.pdf</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hero-side">
        <div className="id-card">
          <div className="id-photo" />
          <div className="id-rows">
            <div className="row"><span className="k">user</span><span className="v">{DATA.handle}</span></div>
            <div className="row"><span className="k">role</span><span className="v">sec_eng</span></div>
            <div className="row"><span className="k">loc</span><span className="v">HCMC, VN</span></div>
            <div className="row"><span className="k">uid</span><span className="v">1000</span></div>
            <div className="row"><span className="k">shell</span><span className="v">/bin/zsh</span></div>
          </div>
        </div>
        <div className="status-card">
          <div className="status-row"><span className="k">status</span><span className="v"><span className="status-dot" />{lang === "en" ? "available for work" : "đang sẵn sàng"}</span></div>
          <div className="status-row"><span className="k">uptime</span><span className="v">5y 2mo</span></div>
          <div className="status-row"><span className="k">latency</span><span className="v">12 ms</span></div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { lang } = usePortfolio();
  return (
    <section id="about">
      <div className="section-head">
        <span className="num">01 //</span>
        <h3>{lang === "en" ? "about" : "giới thiệu"}<span className="accent">.md</span></h3>
        <span className="meta">~/about</span>
      </div>
      <div className="about">
        <div>
          <p style={{ color: "var(--fg-dim)", fontSize: 12, letterSpacing: "0.04em" }}>$ cat summary.md</p>
          <p>{DATA.summary[lang]}</p>
          <div className="callouts">
            {DATA.stats.map((s, i) => (
              <div key={i} className="callout">
                <span className="num">{s.num}</span>
                <div className="lab">{s.lab[lang]}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <pre className="ascii-box">{`┌─ stack.txt ─────────────────┐
│                              │
│  ${"cloud"}      ${"→"}  gcp · gke      │
│  ${"security"}   ${"→"}  waf · dlp · vm │
│  ${"network"}    ${"→"}  vpn · firewall │
│  ${"automation"} ${"→"}  python · llm   │
│  ${"monitoring"} ${"→"}  splunk · siem  │
│                              │
└──────────────────────────────┘
`}</pre>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { lang } = usePortfolio();
  return (
    <section id="experience">
      <div className="section-head">
        <span className="num">02 //</span>
        <h3>{lang === "en" ? "experience" : "kinh nghiệm"}<span className="accent">.log</span></h3>
        <span className="meta">tail -f</span>
      </div>
      <div className="timeline">
        {DATA.experience.map((e, i) => (
          <div key={i} className="exp">
            <div className="exp-when">
              {e.now && <span className="exp-now-dot" />}
              {e.when}
            </div>
            <div>
              <h4 className="exp-title">
                {e.title} <span className="at">@</span> <span className="co">{e.company}</span>
              </h4>
              <div className="exp-loc">{e.loc}</div>
              <ul>
                {e.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <div className="hero-tags" style={{ marginTop: 12 }}>
                {e.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const { lang } = usePortfolio();
  return (
    <section id="skills">
      <div className="section-head">
        <span className="num">03 //</span>
        <h3>{lang === "en" ? "skills" : "kỹ năng"}<span className="accent">.json</span></h3>
        <span className="meta">$ cat skills.json | jq</span>
      </div>
      <div className="skills-grid">
        {DATA.skills.map((s, i) => (
          <div key={i} className="skill-cat">
            <div className="h"><span>{s.cat}</span><span style={{color:"var(--fg-faint)"}}>{s.items.length}</span></div>
            {s.items.map(([n, l], j) => (
              <div key={j} className="skill-row">
                <span className="name">{n}</span>
                <span className="lvl">
                  {[1,2,3,4,5].map((k) => <span key={k} className={k <= l ? "on" : ""} />)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function CertsSection() {
  const { lang } = usePortfolio();
  const ICON = ["⚙","✓","◈","◆","▲","●","■","✦"];
  return (
    <section id="certs">
      <div className="section-head">
        <span className="num">04 //</span>
        <h3>{lang === "en" ? "certifications" : "chứng chỉ"}<span className="accent">/</span></h3>
        <span className="meta">{DATA.certs.length} files</span>
      </div>
      <div className="certs">
        {DATA.certs.map((c, i) => (
          <div key={i} className="cert">
            <div className="yr">{c.yr}</div>
            <div className="icon">{ICON[i % ICON.length]}</div>
            <div className="name">{c.name}</div>
            <div className="body">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const { lang } = usePortfolio();
  return (
    <section id="education">
      <div className="section-head">
        <span className="num">05 //</span>
        <h3>{lang === "en" ? "education" : "học vấn"}<span className="accent">.edu</span></h3>
        <span className="meta">~/edu</span>
      </div>
      <div className="edu">
        {DATA.education.map((e, i) => (
          <div key={i} className="edu-card">
            <div className="deg">{e.deg[lang]}</div>
            <div className="sch">{e.sch}</div>
            <div className="meta">{e.meta[lang]}</div>
          </div>
        ))}
      </div>
      <div className="section-head" style={{marginTop:"calc(40px * var(--density))"}}>
        <span className="num">05.1 //</span>
        <h3>{lang === "en" ? "achievements" : "thành tích"}<span className="accent">.ctf</span></h3>
      </div>
      <div className="achv">
        {DATA.achievements.map((a, i) => (
          <div key={i} className="achv-card">
            <div className="rank">▲ {a.rank}</div>
            <div className="name">{a.name}</div>
            <div className="desc" style={{color:"var(--fg-dim)",fontSize:12}}>{a.desc[lang]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const { lang } = usePortfolio();
  return (
    <section id="contact">
      <div className="section-head">
        <span className="num">06 //</span>
        <h3>{lang === "en" ? "contact" : "liên hệ"}<span className="accent">.sh</span></h3>
        <span className="meta">$ ./reach_out.sh</span>
      </div>
      <div className="contact-grid">
        <a className="contact-card" href={`mailto:${DATA.email}`}>
          <span className="lab">▸ email</span>
          <span className="v">{DATA.email}</span>
        </a>
        <a className="contact-card" href={`tel:${DATA.phone.replace(/\s/g,"")}`}>
          <span className="lab">▸ phone</span>
          <span className="v">{DATA.phone}</span>
        </a>
        <a className="contact-card" href={`https://${DATA.linkedin}`} target="_blank" rel="noreferrer">
          <span className="lab">▸ linkedin</span>
          <span className="v">{DATA.linkedin}</span>
        </a>
        <div className="contact-card">
          <span className="lab">▸ location</span>
          <span className="v" style={{color:"var(--fg)"}}>{DATA.location}</span>
        </div>
      </div>
      <div className="cta-row">
        <a className="btn" href={`mailto:${DATA.email}`}>$ ./send_message</a>
        <a className="btn ghost" href="Dang-Duong-CV.pdf" download>↓ resume.pdf</a>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = usePortfolio();
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {DATA.name} · {lang === "en" ? "built with" : "tạo bằng"} html · css · curiosity</span>
      <span><span className="kbd">⌘</span> + <span className="kbd">K</span> {lang === "en" ? "to open terminal" : "để mở terminal"}</span>
    </footer>
  );
}

window.HeroSection = HeroSection;
window.AboutSection = AboutSection;
window.ExperienceSection = ExperienceSection;
window.SkillsSection = SkillsSection;
window.CertsSection = CertsSection;
window.EducationSection = EducationSection;
window.ContactSection = ContactSection;
window.Footer = Footer;
