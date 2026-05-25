/* Wedding invitation — sections part 2 */

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ---------- GALLERY ---------- */
function Gallery() {
  const railRef = useRef2(null);
  const items = [
    { id: "g1", cap: "Đà Lạt · 2021", aspect: "3/4" },
    { id: "g2", cap: "Hà Nội · 2022", aspect: "3/4" },
    { id: "g3", cap: "Cù Lao Chàm · 2024", aspect: "4/3", wide: true },
    { id: "g4", cap: "Tokyo · 2023", aspect: "3/4" },
    { id: "g5", cap: "Pre-wedding · 2026", aspect: "3/4" },
    { id: "g6", cap: "Pre-wedding · 2026", aspect: "4/3", wide: true },
    { id: "g7", cap: "Pre-wedding · 2026", aspect: "3/4" },
  ];
  const scrollBy = (dir) => {
    const r = railRef.current;
    if (!r) return;
    r.scrollBy({ left: dir * r.clientWidth * 0.7, behavior: "smooth" });
  };
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <SectionHeader num="— 07" title="Khoảnh khắc" en="Photo gallery" />
      </div>
      <div className="container" style={{ overflow: "hidden", paddingLeft: 0, paddingRight: 0 }}>
        <div className="gallery-rail reveal" ref={railRef}>
          {items.map((it, i) => (
            <div key={it.id} className={"gallery-item" + (it.wide ? " wide" : "")}>
              <image-slot id={it.id} placeholder={it.cap} shape="rect"></image-slot>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="gallery-controls reveal">
          <span>Kéo ngang để xem · {items.length} ảnh</span>
          <div className="gallery-arrows">
            <button className="gallery-arrow" onClick={() => scrollBy(-1)} aria-label="Trước">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M9 2 L4 7 L9 12"/>
              </svg>
            </button>
            <button className="gallery-arrow" onClick={() => scrollBy(1)} aria-label="Sau">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 2 L10 7 L5 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- DRESS CODE ---------- */
function DressCode({ palette }) {
  const swatches = palette || [
    { hex: "#3B4A36", name: "Xanh rêu" },
    { hex: "#C8B59A", name: "Be cát" },
    { hex: "#7C5C3E", name: "Nâu trầm" },
    { hex: "#F2EAD8", name: "Kem nhạt" },
  ];
  return (
    <section className="dress" id="dress">
      <div className="container">
        <SectionHeader num="— 08" title="Trang phục" en="Dress code" />
        <div className="dress-grid">
          <div className="dress-copy reveal">
            <h3>Tone trầm,<br/><em className="italic">đất và rêu</em></h3>
            <p style={{ marginBottom: 16 }}>
              Chúng mình rất mong các bạn đến trong những gam màu trầm, ấm — be cát, nâu đất, xanh rêu, kem nhạt.
              Không bắt buộc, nhưng những bức ảnh sẽ đẹp lắm nếu cùng tone.
            </p>
            <p className="dim" style={{ fontSize: 13 }}>
              Tránh: trắng tinh, đen tuyền, đỏ neon, hồng phấn rực.
            </p>
          </div>
          <div className="dress-swatches reveal" data-delay="1">
            {swatches.map((s, i) => (
              <div className="swatch" key={i} style={{ background: s.hex, color: getContrast(s.hex) }}>
                <span className="hex">{s.hex.toUpperCase()}</span>
                <span className="label">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getContrast(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#1a1612" : "#f7f3ec";
}

/* ---------- RSVP ---------- */
function RSVP() {
  const [form, setForm] = useState2({
    name: "",
    attending: "",
    guests: "1",
    side: "",
    diet: "",
    message: "",
  });
  const [errors, setErrors] = useState2({});
  const [submitted, setSubmitted] = useState2(false);

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập tên";
    if (!form.attending) errs.attending = "Bạn có tham dự không?";
    if (!form.side) errs.side = "Khách của ai?";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // persist locally
    try {
      const prev = JSON.parse(localStorage.getItem("rsvp_list") || "[]");
      prev.push({ ...form, at: Date.now() });
      localStorage.setItem("rsvp_list", JSON.stringify(prev));
    } catch {}
    setSubmitted(true);
  };

  return (
    <section className="rsvp" id="rsvp">
      <div className="container">
        <SectionHeader num="— 09" title="Xác nhận tham dự" en="RSVP · Hạn 01.11.2026" />
        <div className="rsvp-card reveal">
          {submitted ? (
            <div className="rsvp-success">
              <div className="mark">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M5 11 L9 15 L17 7"/>
                </svg>
              </div>
              <h4>Cảm ơn {form.name.split(" ").slice(-1)[0]}!</h4>
              <p>Chúng mình đã nhận được lời xác nhận của bạn. Hẹn gặp lại vào ngày 15 tháng 11 nhé.</p>
              <button className="rsvp-submit" style={{ marginTop: 12 }} onClick={() => { setSubmitted(false); setForm({ name: "", attending: "", guests: "1", side: "", diet: "", message: "" }); }}>
                Gửi cho người khác
              </button>
            </div>
          ) : (
            <>
              <h3>Có mặt nhé, để ngày này trọn vẹn.</h3>
              <p className="lead">Vui lòng xác nhận trước ngày <strong>1 tháng 11, 2026</strong> để chúng mình chuẩn bị chu đáo nhất cho bạn.</p>
              <form className="rsvp-form" onSubmit={onSubmit} noValidate>
                <div className="field full">
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="field full">
                  <label>Bạn sẽ tham dự? *</label>
                  <div className="radio-row">
                    {[
                      { v: "yes", t: "Có, chắc chắn rồi" },
                      { v: "maybe", t: "Để mình xem lại" },
                      { v: "no", t: "Tiếc quá, không thể" },
                    ].map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        className={"radio-pill" + (form.attending === o.v ? " active" : "")}
                        onClick={() => update("attending", o.v)}
                      >
                        {o.t}
                      </button>
                    ))}
                  </div>
                  {errors.attending && <span className="error" style={{ bottom: -20 }}>{errors.attending}</span>}
                </div>

                <div className="field">
                  <label>Số người tham dự</label>
                  <select value={form.guests} onChange={(e) => update("guests", e.target.value)}>
                    <option value="1" style={{color: "#1a1612"}}>1 người</option>
                    <option value="2" style={{color: "#1a1612"}}>2 người</option>
                    <option value="3" style={{color: "#1a1612"}}>3 người</option>
                    <option value="4" style={{color: "#1a1612"}}>4 người</option>
                  </select>
                </div>

                <div className="field">
                  <label>Khách của *</label>
                  <div className="radio-row">
                    {[
                      { v: "bride", t: "Cô dâu" },
                      { v: "groom", t: "Chú rể" },
                    ].map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        className={"radio-pill" + (form.side === o.v ? " active" : "")}
                        onClick={() => update("side", o.v)}
                      >
                        {o.t}
                      </button>
                    ))}
                  </div>
                  {errors.side && <span className="error" style={{ bottom: -20 }}>{errors.side}</span>}
                </div>

                <div className="field full">
                  <label>Ăn chay, dị ứng hoặc ghi chú</label>
                  <input
                    type="text"
                    value={form.diet}
                    onChange={(e) => update("diet", e.target.value)}
                    placeholder="Tuỳ chọn — ví dụ: ăn chay, dị ứng hải sản"
                  />
                </div>

                <div className="field full">
                  <label>Lời nhắn cho cô dâu chú rể</label>
                  <textarea
                    rows="2"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tuỳ chọn"
                  ></textarea>
                </div>

                <button className="rsvp-submit" type="submit">
                  Gửi xác nhận
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M2 7 L12 7 M8 3 L12 7 L8 11"/>
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- GIFT ---------- */
function Gift() {
  const [copied, setCopied] = useState2(null);
  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    }).catch(() => {});
  };
  const accounts = [
    {
      num: "— 10.01",
      title: "Mừng cô dâu",
      who: "Nguyễn Thị Ngọc Ánh",
      bank: "",
      account: "",
      branch: "",
    },
    {
      num: "— 10.02",
      title: "Mừng chú rể",
      who: "Nguyễn Duy Bân",
      bank: "",
      account: "",
      branch: "",
    },
  ];
  return (
    <section className="gift" id="gift">
      <div className="container">
        <SectionHeader num="— 10" title="Mừng cưới" en="Lucky money · Gift" />
        <p className="reveal dim" style={{ maxWidth: "60ch", marginBottom: 36, fontSize: 15 }}>
          Sự có mặt của bạn đã là món quà lớn nhất với chúng mình. Nếu bạn ở xa hoặc không tiện đến, hộp mừng dưới đây luôn rộng mở.
        </p>
        <div className="gift-grid reveal" data-delay="1">
          {accounts.map((a, i) => (
            <div className="gift-card" key={i}>
              <span className="num">{a.num}</span>
              <div>
                <h4>{a.title}</h4>
                <div className="who">{a.who}</div>
              </div>
              <div>
                <div className="bank-line">
                  <span className="key">Ngân hàng</span>
                  <span className="val">{a.bank}</span>
                  <span></span>
                </div>
                <div className="bank-line">
                  <span className="key">Số TK</span>
                  <span className="val">{a.account}</span>
                  <button className={"copy-btn" + (copied === i ? " copied" : "")} onClick={() => copy(a.account.replace(/\s/g, ""), i)}>
                    {copied === i ? "Đã chép" : "Sao chép"}
                  </button>
                </div>
                <div className="bank-line">
                  <span className="key">Chi nhánh</span>
                  <span className="val">{a.branch}</span>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GUESTBOOK ---------- */
const SEED_WISHES = [
  { name: "Lan Hương", msg: "Chúc hai bạn trăm năm hạnh phúc, mỗi sáng thức dậy vẫn thấy nhau là điều may mắn nhất.", at: Date.now() - 86400000 * 3 },
  { name: "Anh Tuấn", msg: "Mừng cho hai đứa! Nhớ về Hà Nội ăn phở nhé.", at: Date.now() - 86400000 * 2 },
  { name: "Mai Phương", msg: "Em chờ ngày này từ lâu lắm rồi. Chúc anh chị một đám cưới thật đẹp và một cuộc đời thật bình yên.", at: Date.now() - 86400000 },
  { name: "Bố mẹ", msg: "Hai con đã trưởng thành. Cứ yêu thương nhau như những ngày đầu, mọi chuyện rồi sẽ qua được.", at: Date.now() - 3600000 * 5 },
];

function Guestbook() {
  const [wishes, setWishes] = useState2(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("guestbook") || "null");
      if (stored && stored.length) return stored;
    } catch {}
    return SEED_WISHES;
  });
  const [form, setForm] = useState2({ name: "", msg: "" });
  const [freshId, setFreshId] = useState2(null);

  useEffect2(() => {
    try { localStorage.setItem("guestbook", JSON.stringify(wishes)); } catch {}
  }, [wishes]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.msg.trim()) return;
    const next = { name: form.name.trim(), msg: form.msg.trim(), at: Date.now() };
    setWishes((w) => [next, ...w]);
    setFreshId(next.at);
    setForm({ name: "", msg: "" });
    setTimeout(() => setFreshId(null), 800);
  };

  const ago = (t) => {
    const d = Date.now() - t;
    if (d < 60000) return "Vừa xong";
    if (d < 3600000) return Math.floor(d / 60000) + " phút trước";
    if (d < 86400000) return Math.floor(d / 3600000) + " giờ trước";
    return Math.floor(d / 86400000) + " ngày trước";
  };

  return (
    <section className="guestbook" id="guestbook">
      <div className="container">
        <SectionHeader num="— 11" title="Sổ lưu bút" en="Wishes" />
        <div className="gb-grid">
          <form className="gb-form reveal" onSubmit={submit}>
            <p className="dim" style={{ fontSize: 14, marginBottom: 6 }}>Gửi đôi dòng cho chúng mình — lời chúc sẽ được in vào sổ kỷ niệm.</p>
            <div className="field">
              <label>Tên của bạn</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Bạn của cô dâu chú rể"
                style={{ fontFamily: "var(--serif)", fontSize: 22 }}
              />
            </div>
            <div className="field">
              <label>Lời chúc</label>
              <textarea
                rows="4"
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                placeholder="Viết điều bạn muốn nói…"
              ></textarea>
            </div>
            <button className="gb-submit" type="submit">
              Gửi lời chúc
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 7 L12 7 M8 3 L12 7 L8 11"/>
              </svg>
            </button>
          </form>
          <div className="gb-list reveal" data-delay="1">
            {wishes.map((w, i) => (
              <div key={w.at + "-" + i} className={"gb-item" + (freshId === w.at ? " fresh" : "")}>
                <div className="meta">
                  <span className="name">— {w.name}</span>
                  <span>{ago(w.at)}</span>
                </div>
                <div className="msg">"{w.msg}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ couple, date }) {
  return (
    <footer className="footer">
      <div className="container" style={{ gridColumn: "1 / -1" }}>
        <div className="footer-mark reveal">
          {couple.briefBride}<span className="amp">&amp;</span>{couple.briefGroom}
        </div>
      </div>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gridColumn: "1 / -1", flexWrap: "wrap", gap: 16 }}>
        <span className="note">Made with love · {date.short}</span>
        <a className="note" href="#top" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          Về đầu trang
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 10 L6 2 M2 6 L6 2 L10 6"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}

window.Gallery = Gallery;
window.DressCode = DressCode;
window.RSVP = RSVP;
window.Gift = Gift;
window.Guestbook = Guestbook;
window.Footer = Footer;
