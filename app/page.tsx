
"use client";

import { useState } from "react";

const EMAIL = "selindurmaz905@gmail.com";
const GITHUB = "https://github.com/selinddrmz";
const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=selindurmaz905%40gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/selin-d-37852b374";

const content = {
  tr: {
    nav: ["Hakkımda", "Yetkinlikler", "Projeler", "Eğitim", "İletişim"],
    navButton: "Projelerimi incele ↗",
    eyebrow: "VERİ ANALİZİ · MAKİNE ÖĞRENMESİ",
    hero1: "Veriden anlamlı",
    hero2: "sonuçlar çıkarıyorum.",
    intro: "Büyük Veri Analistliği öğrencisiyim. Python ve SQL kullanarak verileri analiz ediyor, makine öğrenmesi projeleri geliştiriyorum.",
    projectsBtn: "Projelerimi incele ↘",
    githubBtn: "GitHub profilim ↗",
    location: "Manisa, Türkiye",
    role: "Veri Analitiği Öğrencisi",
    dashboard: "Veri analiz paneli",
    demo: "ÖRNEK GÖRSELLEŞTİRME",
    metric1: "Veri hazırlama",
    metric1sub: "Temizleme · Dönüştürme",
    metric2: "Veri analizi",
    metric2sub: "İnceleme · Örüntüler",
    metric3: "Modelleme",
    metric3sub: "Tahmin · Değerlendirme",
    trend: "Trend analizi",
    category: "KATEGORİ DAĞILIMI",
    flow: "ANALİZ SÜRECİ",
    raw: "Ham veri",
    clean: "Temizleme",
    insight: "Bulgular",
    flowText: "Ham veriden anlamlı sonuçlara.",
    aboutLabel: "01 / HAKKIMDA",
    aboutTitle: "Her analiz,",
    aboutAccent: "doğru soruyla başlar.",
    aboutText: "Veri temizleme, keşifsel veri analizi ve görselleştirme üzerine çalışıyorum. Öğrendiklerimi uygulamalı projelerle geliştiriyor, analiz sonuçlarını anlaşılır biçimde sunmayı hedefliyorum.",
    linkedinBtn: "LinkedIn profilimi ziyaret et ↗",
    skillsLabel: "02 / TEKNİK YETKİNLİKLER",
    skillsTitle: "Veri analizi",
    skillsAccent: "araçları.",
    skillsText: "Projelerimde kullandığım programlama dilleri ve analiz araçları.",
    skillNote: "Seviye göstergeleri öz değerlendirmedir; sınav sonucu veya resmî yeterlilik ölçümü değildir.",
    projectsLabel: "03 / PROJELER",
    projectsTitle: "Üzerinde çalıştığım",
    projectsAccent: "projeler.",
    projectsText: "Veri analizi ve makine öğrenmesi alanlarında geliştirdiğim çalışmalar.",
    project1Type: "MAKİNE ÖĞRENMESİ",
    project1Title: "Uçak motorlarında kestirimci bakım",
    project1Text: "NASA C-MAPSS FD001 veri setiyle motorların kalan faydalı ömrünü (RUL) tahmin etmeye yönelik regresyon çalışması. Amaç, sensör verilerini incelemek ve farklı tahmin modellerini karşılaştırmaktır.",
    project2Type: "TALEP TAHMİNİ",
    project2Title: "Toplu taşımada talep tahmini",
    project2Text: "Manisa'daki 21 numaralı otobüs hattının yolcu talebini incelemeye ve sefer planlamasını destekleyecek tahmin yöntemlerini değerlendirmeye yönelik proje çalışması.",
    projectLink: "GitHub profilimi ziyaret et ↗",
    projectNote: "Grafiklerdeki değerler tasarım amacıyla oluşturulmuş örneklerdir; gerçek proje sonuçlarını göstermez.",
    educationLabel: "04 / EĞİTİM VE GELİŞİM",
    educationTitle: "Eğitimim ve",
    educationAccent: "gelişim yolculuğum.",
    educationText: "Akademik eğitimim ve teknik gelişimimi destekleyen çalışmalar.",
    university1: "Manisa Celal Bayar Üniversitesi",
    university1sub: "Büyük Veri Analistliği · Ön lisans",
    university1desc: "Veri analizi, programlama ve veri teknolojileri.",
    university2: "İstanbul Üniversitesi AUZEF",
    university2sub: "Bilgisayar Programcılığı · Ön lisans",
    university2desc: "Programlama ve yazılım geliştirme temelleri.",
    certificates: "Eğitim ve sertifika çalışmaları",
    certificatesText: "Cisco Networking Academy · BTK Akademi · Turkcell Geleceği Yazanlar · Akbank eğitimleri",
    contactLabel: "05 / İLETİŞİM",
    contactEyebrow: "YENİ FIRSATLARA AÇIĞIM",
    contactTitle: "İletişime",
    contactAccent: "geçelim.",
    contactText: "Projelerim, staj olanakları veya veri analizi alanındaki iş birlikleri hakkında bana e-posta ya da LinkedIn üzerinden ulaşabilirsiniz.",
    emailBtn: "E-posta gönder ↗",
    copyBtn: "E-posta adresini kopyala",
    copied: "E-posta kopyalandı ✓",
    githubLabel: "KOD VE PROJELER",
    linkedinLabel: "PROFESYONEL AĞ",
    emailLabel: "E-POSTA",
    footer: "Selin Durmaz · Veri Analizi Portföyü",
    backTop: "Başa dön ↑",
  },
  en: {
    nav: ["About", "Skills", "Projects", "Education", "Contact"],
    navButton: "Explore my projects ↗",
    eyebrow: "DATA ANALYTICS · MACHINE LEARNING",
    hero1: "Turning data into",
    hero2: "meaningful insights.",
    intro: "I am a Big Data Analytics student. I analyze data with Python and SQL and develop machine learning projects.",
    projectsBtn: "View my projects ↘",
    githubBtn: "My GitHub profile ↗",
    location: "Manisa, Türkiye",
    role: "Data Analytics Student",
    dashboard: "Data analytics dashboard",
    demo: "SAMPLE VISUALIZATION",
    metric1: "Data preparation",
    metric1sub: "Cleaning · Transforming",
    metric2: "Data analysis",
    metric2sub: "Exploration · Patterns",
    metric3: "Modeling",
    metric3sub: "Prediction · Evaluation",
    trend: "Trend analysis",
    category: "CATEGORY DISTRIBUTION",
    flow: "ANALYSIS PROCESS",
    raw: "Raw data",
    clean: "Cleaning",
    insight: "Insights",
    flowText: "From raw data to meaningful findings.",
    aboutLabel: "01 / ABOUT",
    aboutTitle: "Every analysis",
    aboutAccent: "starts with the right question.",
    aboutText: "I work on data cleaning, exploratory data analysis, and visualization. I strengthen my skills through hands-on projects and aim to present analytical findings clearly.",
    linkedinBtn: "Visit my LinkedIn profile ↗",
    skillsLabel: "02 / TECHNICAL SKILLS",
    skillsTitle: "Data analytics",
    skillsAccent: "tools.",
    skillsText: "Programming languages and analytical tools I use in my projects.",
    skillNote: "Skill levels are self-assessments, not exam results or official proficiency measurements.",
    projectsLabel: "03 / PROJECTS",
    projectsTitle: "Projects",
    projectsAccent: "I am working on.",
    projectsText: "Work I am developing in data analytics and machine learning.",
    project1Type: "MACHINE LEARNING",
    project1Title: "Predictive maintenance for aircraft engines",
    project1Text: "A regression project using NASA's C-MAPSS FD001 dataset to estimate remaining useful life (RUL). The goal is to explore sensor data and compare different prediction models.",
    project2Type: "DEMAND FORECASTING",
    project2Title: "Public transport demand forecasting",
    project2Text: "A project exploring passenger demand on Manisa bus route 21 and evaluating forecasting approaches that could support service planning.",
    projectLink: "Visit my GitHub profile ↗",
    projectNote: "Chart values are illustrative examples for design purposes and do not represent actual project results.",
    educationLabel: "04 / EDUCATION & DEVELOPMENT",
    educationTitle: "My education and",
    educationAccent: "learning journey.",
    educationText: "My academic background and activities supporting my technical development.",
    university1: "Manisa Celal Bayar University",
    university1sub: "Associate Degree in Big Data Analytics",
    university1desc: "Data analytics, programming, and data technologies.",
    university2: "Istanbul University AUZEF",
    university2sub: "Associate Degree in Computer Programming",
    university2desc: "Programming and software development fundamentals.",
    certificates: "Courses and certificates",
    certificatesText: "Cisco Networking Academy · BTK Akademi · Turkcell Geleceği Yazanlar · Akbank training programs",
    contactLabel: "05 / CONTACT",
    contactEyebrow: "OPEN TO NEW OPPORTUNITIES",
    contactTitle: "Let's",
    contactAccent: "connect.",
    contactText: "Feel free to contact me by email or LinkedIn about my projects, internship opportunities, or potential collaborations in data analytics.",
    emailBtn: "Send an email ↗",
    copyBtn: "Copy email address",
    copied: "Email copied ✓",
    githubLabel: "CODE & PROJECTS",
    linkedinLabel: "PROFESSIONAL NETWORK",
    emailLabel: "EMAIL",
    footer: "Selin Durmaz · Data Analytics Portfolio",
    backTop: "Back to top ↑",
  },
};

const skills = [
  { name: "Python", category: "Programming", level: 75 },
  { name: "SQL", category: "Data querying", level: 65 },
  { name: "Pandas & NumPy", category: "Data processing", level: 75 },
  { name: "Matplotlib & Seaborn", category: "Visualization", level: 70 },
  { name: "Scikit-learn", category: "Machine learning", level: 55 },
  { name: "Excel", category: "Reporting", level: 65 },
];

export default function Home() {
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [copied, setCopied] = useState(false);
  const t = content[language];

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(GMAIL_URL, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="portfolio" lang={language}>
      <div className="top-line" />

      <nav className="nav">
        <a className="brand" href="#home">SD<span>.</span></a>
        <div className="nav-links">
          {t.nav.map((item, i) => (
            <a key={item} href={["#about", "#skills", "#projects", "#education", "#contact"][i]}>{item}</a>
          ))}
        </div>
        <div className="nav-right">
          <div className="language-switch" aria-label="Language">
            <button className={language === "tr" ? "active" : ""} onClick={() => setLanguage("tr")} aria-pressed={language === "tr"}>TR</button>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <a className="nav-cta" href="#projects">{t.navButton}</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" />{t.eyebrow}</div>
          <h1>{t.hero1}<br /><span>{t.hero2}</span></h1>
          <p className="hero-text">{t.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">{t.projectsBtn}</a>
            <a className="button secondary" href={GITHUB} target="_blank" rel="noreferrer">{t.githubBtn}</a>
          </div>
          <div className="hero-meta"><span>⌖ {t.location}</span><span className="meta-divider" /><span>{t.role}</span></div>
        </div>

        <div className="dashboard">
          <div className="dash-top">
            <div><div className="dash-kicker">ANALYTICS WORKSPACE</div><div className="dash-title">{t.dashboard}</div></div>
            <span className="live-label">{t.demo}</span>
          </div>
          <div className="metric-grid">
            {[t.metric1, t.metric2, t.metric3].map((name, i) => (
              <div className="metric" key={name}><span>{name}</span><strong>0{i + 1}</strong><small>{[t.metric1sub, t.metric2sub, t.metric3sub][i]}</small></div>
            ))}
          </div>
          <div className="chart-panel">
            <div className="chart-heading"><div><span className="chart-label">TIME SERIES</span><h3>{t.trend}</h3></div><span className="chart-tag">DEMO DATA</span></div>
            <svg className="line-chart" viewBox="0 0 500 165" role="img" aria-label={t.trend}>
              <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff5bd6" stopOpacity=".27" /><stop offset="100%" stopColor="#ff5bd6" stopOpacity="0" /></linearGradient></defs>
              {[20, 55, 90, 125].map(y => <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#493052" strokeDasharray="4 6" />)}
              <path d="M0 120 C28 112 36 82 70 94 S116 125 150 80 S200 92 235 57 S280 78 315 43 S360 67 390 31 S450 44 500 12 L500 150 L0 150 Z" fill="url(#areaFill)" />
              <path d="M0 120 C28 112 36 82 70 94 S116 125 150 80 S200 92 235 57 S280 78 315 43 S360 67 390 31 S450 44 500 12" fill="none" stroke="#ff5bd6" strokeWidth="3" strokeLinecap="round" />
              {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m, i) => <text key={m} x={i * 98 + 4} y="162" fill="#bba7c6" fontSize="10">{language === "tr" ? ["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ"][i] : m}</text>)}
            </svg>
          </div>
          <div className="dash-bottom">
            <div className="mini-panel">
              <div className="chart-label">{t.category}</div>
              <div className="donut-row">
                <svg viewBox="0 0 100 100" className="donut" role="img" aria-label={t.category}>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#493052" strokeWidth="13" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#ff5bd6" strokeWidth="13" strokeDasharray="95 220" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#a78bfa" strokeWidth="13" strokeDasharray="57 220" strokeDashoffset="-100" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#ffc0e8" strokeWidth="13" strokeDasharray="40 220" strokeDashoffset="-162" transform="rotate(-90 50 50)" />
                  <text x="50" y="53" fill="#fff0fc" textAnchor="middle" fontSize="13" fontWeight="700">EDA</text>
                </svg>
                <div className="legend"><span><i className="mint" />Category A</span><span><i className="purple" />Category B</span><span><i className="orange" />Category C</span></div>
              </div>
            </div>
            <div className="mini-panel">
              <div className="chart-label">{t.flow}</div>
              <div className="flow"><span>{t.raw}</span><b>→</b><span>{t.clean}</span><b>→</b><span className="flow-last">{t.insight}</span></div>
              <p className="flow-caption">{t.flowText}</p>
            </div>
          </div>
          <div className="dash-foot"><span><i className="status-dot" /> PYTHON · SQL · VISUALIZATION</span><span>PORTFOLIO / 2026</span></div>
        </div>
      </section>

      <div className="ticker"><div>PYTHON <b>✳</b> SQL <b>✳</b> DATA CLEANING <b>✳</b> EXPLORATORY DATA ANALYSIS <b>✳</b> MACHINE LEARNING <b>✳</b> DATA VISUALIZATION</div></div>

      <section className="section" id="about">
        <div className="section-label">{t.aboutLabel}</div>
        <div className="about-grid">
          <h2>{t.aboutTitle}<br /><span>{t.aboutAccent}</span></h2>
          <div className="about-copy"><p>{t.aboutText}</p><a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">{t.linkedinBtn}</a></div>
        </div>
      </section>

      <section className="section bordered" id="skills">
        <div className="section-label">{t.skillsLabel}</div>
        <div className="section-heading"><h2>{t.skillsTitle} <span>{t.skillsAccent}</span></h2><p>{t.skillsText}</p></div>
        <div className="skills-grid">
          {skills.map((skill, i) => <div className="skill-card" key={skill.name}>
            <div className="skill-number">0{i + 1}</div>
            <div className="skill-info"><h3>{skill.name}</h3><p>{language === "tr" ? ["Programlama", "Veri sorgulama", "Veri işleme", "Görselleştirme", "Makine öğrenmesi", "Raporlama"][i] : skill.category}</p></div>
            <div className="skill-level">{skill.level}/100</div>
            <div className="skill-track"><span style={{ width: `${skill.level}%` }} /></div>
          </div>)}
        </div>
        <p className="note">{t.skillNote}</p>
      </section>

      <section className="section bordered" id="projects">
        <div className="section-label">{t.projectsLabel}</div>
        <div className="section-heading"><h2>{t.projectsTitle} <span>{t.projectsAccent}</span></h2><p>{t.projectsText}</p></div>

        <article className="project-card">
          <div className="project-visual">
            <div className="project-visual-top"><span>PROJECT / 001</span><span>REGRESSION</span></div>
            <div className="project-visual-title">PREDICTIVE<br />MAINTENANCE</div>
            <svg viewBox="0 0 460 150" className="project-chart" role="img" aria-label="Illustrative engine sensor trend">
              {[25, 60, 95, 130].map(y => <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="#493052" strokeDasharray="4 5" />)}
              <path d="M0 22 L35 30 L70 26 L105 45 L140 40 L175 59 L210 52 L245 77 L280 82 L315 95 L350 105 L385 120 L420 124 L460 141" fill="none" stroke="#ff5bd6" strokeWidth="3" />
              <path d="M0 38 L35 41 L70 48 L105 51 L140 60 L175 63 L210 71 L245 75 L280 88 L315 89 L350 98 L385 105 L420 117 L460 122" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
            <div className="visual-legend"><span><i className="mint" />Sensor trend</span><span><i className="purple" />Comparison line</span></div>
          </div>
          <div className="project-content">
            <div className="project-meta"><span>{t.project1Type}</span><span>01 / 02</span></div>
            <h3>{t.project1Title}</h3><p>{t.project1Text}</p>
            <div className="tag-list">{["Python", "Pandas", "Scikit-learn", "RUL", "Regression"].map(x => <span key={x}>{x}</span>)}</div>
            <div className="project-bottom"><span className="project-status"><i /> NASA C-MAPSS FD001</span><a href={GITHUB} target="_blank" rel="noreferrer">{t.projectLink}</a></div>
          </div>
        </article>

        <article className="project-card reverse">
          <div className="project-visual purple-bg">
            <div className="project-visual-top"><span>PROJECT / 002</span><span>TIME SERIES</span></div>
            <div className="project-visual-title">PUBLIC TRANSIT<br />DEMAND</div>
            <div className="bar-chart">{[42, 68, 52, 84, 62, 95, 72, 48, 78, 59, 88, 66].map((height, i) => <div className="bar-column" key={i}><span style={{ height: `${height}%` }} /><small>{i + 1}</small></div>)}</div>
            <div className="visual-legend"><span><i className="mint" />Illustrative passenger demand</span></div>
          </div>
          <div className="project-content">
            <div className="project-meta"><span>{t.project2Type}</span><span>02 / 02</span></div>
            <h3>{t.project2Title}</h3><p>{t.project2Text}</p>
            <div className="tag-list">{["Python", "Pandas", "NumPy", "Time Series", "Forecasting"].map(x => <span key={x}>{x}</span>)}</div>
            <div className="project-bottom"><span className="project-status"><i /> PYTHON · DATA ANALYSIS</span><a href={GITHUB} target="_blank" rel="noreferrer">{t.projectLink}</a></div>
          </div>
        </article>
        <p className="note">{t.projectNote}</p>
      </section>

      <section className="section bordered" id="education">
        <div className="section-label">{t.educationLabel}</div>
        <div className="section-heading"><h2>{t.educationTitle} <span>{t.educationAccent}</span></h2><p>{t.educationText}</p></div>
        <div className="timeline">
          <div className="timeline-item"><div className="timeline-date">2025 — {language === "tr" ? "DEVAM" : "PRESENT"}</div><div className="timeline-marker" /><div className="timeline-body"><h3>{t.university1}</h3><p>{t.university1sub}</p><span>{t.university1desc}</span></div></div>
          <div className="timeline-item"><div className="timeline-date">2025 — {language === "tr" ? "DEVAM" : "PRESENT"}</div><div className="timeline-marker" /><div className="timeline-body"><h3>{t.university2}</h3><p>{t.university2sub}</p><span>{t.university2desc}</span></div></div>
        </div>
        <div className="cert-box"><div className="cert-icon">✳</div><div><h3>{t.certificates}</h3><p>{t.certificatesText}</p></div></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-label">{t.contactLabel}</div>
        <div className="contact-inner">
          <div className="eyebrow"><span className="status-dot" />{t.contactEyebrow}</div>
          <h2>{t.contactTitle} <span>{t.contactAccent}</span></h2>
          <p>{t.contactText}</p>
          <div className="contact-actions">
            <a className="button primary" href={`${GMAIL_URL}&su=${encodeURIComponent(language === "tr" ? "Portföyünüz hakkında" : "Regarding your portfolio")}`} target="_blank" rel="noreferrer">{t.emailBtn}</a>
            <button className="button secondary" type="button" onClick={copyEmail}>{copied ? t.copied : t.copyBtn}</button>
          </div>
          <div className="social-grid">
            <a href={GITHUB} target="_blank" rel="noreferrer"><span className="social-icon">GH</span><span><small>{t.githubLabel}</small><strong>GitHub</strong></span><span className="social-arrow">↗</span></a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"><span className="social-icon">in</span><span><small>{t.linkedinLabel}</small><strong>LinkedIn</strong></span><span className="social-arrow">↗</span></a>
            <a href={GMAIL_URL} target="_blank" rel="noreferrer"><span className="social-icon">@</span><span><small>{t.emailLabel}</small><strong>{EMAIL}</strong></span><span className="social-arrow">↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer"><a className="brand" href="#home">SD<span>.</span></a><span>{t.footer}</span><a href="#home">{t.backTop}</a></footer>

    </main>
  );
}
