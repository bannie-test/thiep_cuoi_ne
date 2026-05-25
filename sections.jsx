/* Wedding invitation — section components */
/* All components attached to window for cross-file access */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Reveal-on-scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- Section header ---------- */
function SectionHeader({ num, title, en }) {
  return (
    <div className="section-header reveal">
      <span className="section-num">{num}</span>
      <h2>{title}</h2>
      <span className="right">{en}</span>
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero({ couple, date }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-stage">
        <div className="hero-eyebrow reveal">
          <span className="eyebrow">Lưu ngày trọng đại</span>
          <span className="dot"></span>
          <span className="eyebrow">Save the date</span>
        </div>
        <h1 className="hero-names reveal" data-delay="1">
          {couple.bride}
          <span className="amp">&amp;</span>
          {couple.groom}
        </h1>
        <div className="hero-divider reveal" data-delay="2"></div>
        <div className="hero-meta reveal" data-delay="3">
          <span>{date.weekday}</span>
          <span className="sep">·</span>
          <span>{date.long}</span>
          <span className="sep">·</span>
          <span>{date.location}</span>
        </div>
      </div>
      <div className="container hero-scroll">
        <span>Cuộn xuống</span>
        <span className="arrow"></span>
        <span>01 / 10</span>
      </div>
    </section>
  );
}

/* ---------- COUNTDOWN ---------- */
function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const cells = [
    { n: days, l: "Ngày" },
    { n: hours, l: "Giờ" },
    { n: mins, l: "Phút" },
    { n: secs, l: "Giây" },
  ];

  return (
    <section className="countdown">
      <div className="container">
        <div className="section-header reveal" style={{ paddingTop: 0, borderTop: 0 }}>
          <span className="section-num">— 02</span>
          <h2>Đếm ngược</h2>
          <span className="right">Until forever</span>
        </div>
        <div className="countdown-inner reveal" data-delay="1">
          {cells.map((c, i) => (
            <div className="countdown-cell" key={i}>
              <div className="countdown-num">
                {String(c.n).padStart(2, "0").split("").map((d, j) => (
                  <span key={j + "-" + d}>{d}</span>
                ))}
              </div>
              <div className="countdown-label">{c.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STORY ---------- */
function Story() {
  const items = [
    {
      year: "2019 · Mùa thu",
      title: "Ánh nhìn đầu tiên",
      body: "Một quán cà phê nhỏ ở Hà Nội, một quyển sách bỏ quên, và lời chào tình cờ làm thay đổi mọi thứ.",
      slot: "story-01",
    },
    {
      year: "2021 · Mùa xuân",
      title: "Chuyến đi đầu tiên",
      body: "Đà Lạt mưa phùn, hai chiếc xe đạp, và lời hứa thầm sẽ cùng nhau đi thêm thật nhiều nơi.",
      slot: "story-02",
    },
    {
      year: "2024 · Mùa hè",
      title: "Lời cầu hôn",
      body: "Hoàng hôn trên biển Cù Lao Chàm. Không có flashmob, không có pháo hoa — chỉ có anh, em và một chiếc nhẫn.",
      slot: "story-03",
    },
    {
      year: "2026 · Mùa thu",
      title: "Một khởi đầu mới",
      body: "Hôm nay chúng mình cùng bước qua ngưỡng cửa mới, và chúng mình muốn có bạn ở đó.",
      slot: "story-04",
    },
  ];

  return (
    <section className="story" id="story">
      <div className="container">
        <SectionHeader num="— 03" title={<>Chuyện tình của <em className="italic">chúng mình</em></>} en="Our story" />
        <div className="timeline">
          {items.map((it, i) => (
            <article key={i} className="story-item reveal" data-delay={(i % 3) + 1}>
              <div className="story-year">{it.year}</div>
              <div className="story-content">
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
              <div className="story-img">
                <image-slot id={it.slot} placeholder={`Ảnh ${it.year}`} shape="rect"></image-slot>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EVENTS ---------- */
function Events() {
  return (
    <section className="events" id="events">
      <div className="container">
        <SectionHeader num="— 04" title="Hai buổi lễ" en="The events" />
        <div className="events-grid reveal" data-delay="1">
          <div className="event-card">
            <span className="num">— 04.01</span>
            <h3>Lễ Vu Quy</h3>
            <div className="event-meta">
              <div className="event-row"><span className="key">Ngày</span><span className="val">Chủ nhật, 15 tháng 11, 2026</span></div>
              <div className="event-row"><span className="key">Giờ</span><span className="val">9:00 sáng</span></div>
              <div className="event-row"><span className="key">Địa điểm</span><span className="val">Tư gia nhà gái — Quang Rực, Khúc Thừa Dụ, Hải Phòng</span></div>
              <div className="event-row"><span className="key">Trang phục</span><span className="val">Áo dài truyền thống · Tone trầm</span></div>
            </div>
          </div>
          <div className="event-card">
            <span className="num">— 04.02</span>
            <h3>Tiệc thành hôn</h3>
            <div className="event-meta">
              <div className="event-row"><span className="key">Ngày</span><span className="val">Chủ nhật, 15 tháng 11, 2026</span></div>
              <div className="event-row"><span className="key">Giờ</span><span className="val">18:00 — đón khách<br/>19:00 — khai tiệc</span></div>
              <div className="event-row"><span className="key">Địa điểm</span><span className="val">Nhà văn hóa thôn Cuối Chùa, Tây Phương, Hà Nội</span></div>
              <div className="event-row"><span className="key">Trang phục</span><span className="val">Lịch sự · Tone be / cát / xanh rêu</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SCHEDULE ---------- */
function Schedule() {
  const items = [
    { t: "08:30", h: "Đón nhà trai", d: "Hai họ gặp mặt, dùng trà & bánh tại tư gia nhà gái." },
    { t: "09:00", h: "Lễ Vu Quy", d: "Nghi lễ truyền thống, trao nhẫn cưới." },
    { t: "11:00", h: "Tiệc gia đình", d: "Bữa cơm thân mật cùng hai họ." },
    { t: "18:00", h: "Đón khách", d: "Chào đón quan khách tại Nhà văn hóa thôn Cuối Chùa." },
    { t: "19:00", h: "Khai tiệc", d: "Nghi thức rót rượu, cắt bánh, lễ tri ân." },
    { t: "20:30", h: "Tiệc & âm nhạc", d: "Buổi tối cùng âm nhạc, khiêu vũ và lời chúc." },
    { t: "22:00", h: "Tiễn khách", d: "Cùng nhau khép lại một ngày trọng đại." },
  ];
  return (
    <section className="schedule" id="schedule">
      <div className="container">
        <SectionHeader num="— 05" title="Lịch trình một ngày" en="Schedule of the day" />
        <div className="schedule-grid">
          <div className="schedule-img reveal">
            <image-slot id="schedule-hero" placeholder="Ảnh cô dâu chú rể (dọc)" shape="rect"></image-slot>
          </div>
          <div className="schedule-list">
            {items.map((it, i) => (
              <div key={i} className="schedule-row reveal" data-delay={(i % 3) + 1}>
                <div className="schedule-time">{it.t}</div>
                <div className="schedule-event">
                  <h4>{it.h}</h4>
                  <p>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- VENUE ---------- */
function Venue() {
  return (
    <section className="venue" id="venue">
      <div className="container">
        <SectionHeader num="— 06" title="Tiệc cưới" en="Reception venue" />
        <div className="venue-grid">
          <div className="venue-map reveal">
            <svg className="map-svg" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">
              <rect width="600" height="420" fill="transparent"/>
              {/* water */}
              <path className="water" d="M0,300 Q150,260 280,290 T600,310 L600,420 L0,420 Z"/>
              {/* blocks */}
              <rect className="blk" x="40" y="40" width="80" height="56"/>
              <rect className="blk" x="140" y="40" width="120" height="56"/>
              <rect className="blk" x="280" y="40" width="80" height="56"/>
              <rect className="blk" x="380" y="40" width="100" height="56"/>
              <rect className="blk" x="500" y="40" width="80" height="56"/>
              <rect className="blk" x="40" y="120" width="120" height="80"/>
              <rect className="blk" x="180" y="120" width="80" height="80"/>
              <rect className="blk" x="380" y="120" width="80" height="80"/>
              <rect className="blk" x="480" y="120" width="100" height="80"/>
              <rect className="blk" x="40" y="220" width="100" height="64"/>
              <rect className="blk" x="160" y="220" width="80" height="64"/>
              <rect className="blk" x="380" y="220" width="120" height="64"/>
              {/* roads */}
              <path className="road major" d="M0,108 L600,108"/>
              <path className="road major" d="M0,210 L600,210"/>
              <path className="road" d="M130,0 L130,300"/>
              <path className="road" d="M270,0 L270,300"/>
              <path className="road" d="M370,0 L370,300"/>
              <path className="road" d="M0,290 Q150,250 280,280 T600,300"/>
              {/* pin */}
              <g transform="translate(310, 215)">
                <circle className="pin map-pulse" r="6"/>
                <circle className="pin" r="6"/>
                <circle r="2" fill="white"/>
              </g>
              <text x="320" y="244" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5" fill="currentColor" opacity="0.7">RIVERSIDE PALACE</text>
            </svg>
          </div>
          <div className="venue-info reveal" data-delay="1">
            <h3>nhà văn hóa thôn Cuối Chùa<br/><em className="italic dim"></em></h3>
            <p>Tây Phương, Hà Nội</p>
            <p className="dim" style={{marginTop: 18, fontSize: 14}}>Có chỗ đậu xe miễn phí<br/></p>
            <div className="venue-btns">
              <a className="btn primary" href="https://maps.google.com/?q=Riverside+Palace+Ben+Van+Don" target="_blank" rel="noreferrer">
                Mở Google Maps <span className="arrow"></span>
              </a>
              <a className="btn" href="#schedule">Xem lịch trình</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.useReveal = useReveal;
window.Hero = Hero;
window.Countdown = Countdown;
window.Story = Story;
window.Events = Events;
window.Schedule = Schedule;
window.Venue = Venue;
window.SectionHeader = SectionHeader;
