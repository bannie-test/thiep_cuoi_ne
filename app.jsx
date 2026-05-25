/* Wedding invitation — App shell */

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sage",
  "displayFont": "cormorant"
}/*EDITMODE-END*/;

const PALETTES = {
  sage: {
    bg: "#f7f3ec", bg2: "#efe9df",
    ink: "#1a1612", ink2: "#4a443d", ink3: "#8a8278",
    accent: "oklch(0.55 0.05 145)",
    swatches: [
      { hex: "#3B4A36", name: "Xanh rêu" },
      { hex: "#C8B59A", name: "Be cát" },
      { hex: "#7C5C3E", name: "Nâu trầm" },
      { hex: "#F2EAD8", name: "Kem nhạt" },
    ],
  },
  terracotta: {
    bg: "#f6efe6", bg2: "#ece2d3",
    ink: "#231613", ink2: "#523d34", ink3: "#8e7669",
    accent: "oklch(0.58 0.10 40)",
    swatches: [
      { hex: "#A6553A", name: "Đất nung" },
      { hex: "#D6AC85", name: "Cam phấn" },
      { hex: "#5F3B2E", name: "Nâu sô-cô-la" },
      { hex: "#EFE0CB", name: "Sữa ấm" },
    ],
  },
  ink: {
    bg: "#ebe7e0", bg2: "#ddd7cc",
    ink: "#13141a", ink2: "#3d3f4a", ink3: "#76798a",
    accent: "oklch(0.45 0.08 250)",
    swatches: [
      { hex: "#222742", name: "Xanh đêm" },
      { hex: "#9CA3B8", name: "Khói lam" },
      { hex: "#4A3754", name: "Tím rượu" },
      { hex: "#E5DFCF", name: "Ngà cũ" },
    ],
  },
};

const FONTS = {
  cormorant: '"Cormorant Garamond", serif',
  playfair: '"Playfair Display", serif',
  dmserif: '"DM Serif Display", serif',
};

const COUPLE = {
  bride: "Ngọc Ánh",
  groom: "Duy Bân",
  briefBride: "B",
  briefGroom: "A",
};

const DATE = {
  weekday: "Chủ nhật",
  long: "15 tháng 11, 2026",
  short: "15.11.2026",
  location: "TP. Hồ Chí Minh",
  target: new Date("2026-11-15T18:00:00+07:00").getTime(),
};

const NAV = [
  { href: "#story", label: "Chuyện tình" },
  { href: "#events", label: "Hai buổi lễ" },
  { href: "#schedule", label: "Lịch trình" },
  { href: "#venue", label: "Địa điểm" },
  { href: "#gallery", label: "Hình ảnh" },
  { href: "#gift", label: "Mừng cưới" },
];

/* ---------- Music toggle ---------- */
function MusicToggle() {
  const [playing, setPlaying] = useStateA(false);
  const [tipShown, setTipShown] = useStateA(false);
  const audioRef = useRefA(null);

  useEffectA(() => {
    const t = setTimeout(() => setTipShown(true), 1200);
    const t2 = setTimeout(() => setTipShown(false), 4800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const toggle = () => {
    setTipShown(false);
    setPlaying((p) => {
      const next = !p;
      // No real audio file; this is a UI-only toggle. If a real audio
      // is hooked up later, control it here.
      if (audioRef.current) {
        if (next) audioRef.current.play().catch(()=>{});
        else audioRef.current.pause();
      }
      return next;
    });
  };

  return (
    <>
      <button className={"music-btn" + (playing ? " playing" : "")} onClick={toggle} aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}>
        <div className="bars">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>
      <div className={"music-tip" + (tipShown ? " show" : "")}>
        {playing ? "Đang phát" : "Bật nhạc nền"}
      </div>
    </>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useStateA(false);
  const [menuOpen, setMenuOpen] = useStateA(false);

  useEffectA(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-inner">
          <a className="nav-brand" href="#top">
            {COUPLE.briefBride}<span className="amp">&amp;</span>{COUPLE.briefGroom}
          </a>
          <div className="nav-links">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </div>
          <a className="nav-cta" href="#rsvp">Xác nhận tham dự</a>
          <button className={"nav-burger" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>
        ))}
        <a href="#rsvp" onClick={() => setMenuOpen(false)}>Xác nhận tham dự</a>
      </div>
    </>
  );
}

/* ---------- App ---------- */
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply palette + font tokens to :root
  useEffectA(() => {
    const p = PALETTES[t.palette] || PALETTES.sage;
    const r = document.documentElement.style;
    r.setProperty("--bg", p.bg);
    r.setProperty("--bg-2", p.bg2);
    r.setProperty("--ink", p.ink);
    r.setProperty("--ink-2", p.ink2);
    r.setProperty("--ink-3", p.ink3);
    r.setProperty("--accent", p.accent);
    r.setProperty("--serif", FONTS[t.displayFont] || FONTS.cormorant);
  }, [t.palette, t.displayFont]);

  const swatches = (PALETTES[t.palette] || PALETTES.sage).swatches;

  return (
    <>
      <Nav />
      <main>
        <Hero couple={COUPLE} date={DATE} />
        <Countdown target={DATE.target} />
        <Story />
        <Events />
        <Schedule />
        <Venue />
        <Gallery />
        <DressCode palette={swatches} />
        <RSVP />
        <Gift />
        <Guestbook />
      </main>
      <Footer couple={COUPLE} date={DATE} />
      <MusicToggle />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Bảng màu">
          <window.TweakRadio
            label="Palette"
            value={t.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              { value: "sage", label: "Sage" },
              { value: "terracotta", label: "Terra" },
              { value: "ink", label: "Ink" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection label="Kiểu chữ tiêu đề">
          <window.TweakRadio
            label="Display"
            value={t.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={[
              { value: "cormorant", label: "Cormorant" },
              { value: "playfair", label: "Playfair" },
              { value: "dmserif", label: "DM Serif" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
