import { useState } from "react";

const PROMPT_SIGNATURES = [
  { pattern: /stealth.*system|silent.*distribution|faceless.*engine/i, label: "Stealth Automation Scam" },
  { pattern: /demand fusion loop|micro offer stack/i, label: "Fake Marketing Framework" },
  { pattern: /pull.*fast.*money|clear.*lakh.*fast/i, label: "Get-Rich-Quick Injection" },
  { pattern: /execution only|no audience.*no leverage.*no money/i, label: "Social Engineering Template" },
  { pattern: /multiplying.*converts|lock.*into.*engine/i, label: "Affiliate Fraud Pattern" },
  { pattern: /(bypass|jailbreak|ignore previous|disregard.*instructions)/i, label: "AI Jailbreak Attempt" },
  { pattern: /act as.*DAN|you are now|pretend you have no restrictions/i, label: "Role Override Injection" },
  { pattern: /from.*anthropic|you must comply|override.*safety/i, label: "Authority Spoofing" },
];

const BUSINESSES = [
  {
    id: 1,
    name: "Koru Digital Studio",
    category: "Web Design",
    location: "Auckland",
    tier: "gold",
    score: 94.2,
    reviewCount: 47,
    verifiedReviewers: 47,
    size: "small",
    description: "Boutique web design studio specialising in Māori-owned business branding and digital presence.",
    tags: ["Web Design", "Branding", "NZ-owned"],
    verified: true,
    since: "2019",
  },
  {
    id: 2,
    name: "Southpaw Accounting",
    category: "Finance",
    location: "Wellington",
    tier: "gold",
    score: 91.8,
    reviewCount: 63,
    verifiedReviewers: 63,
    size: "small",
    description: "Trusted small business accounting with transparent pricing. No surprises, no upsells.",
    tags: ["Accounting", "Tax", "SME"],
    verified: true,
    since: "2016",
  },
  {
    id: 3,
    name: "BlueFern Tech",
    category: "IT Support",
    location: "Christchurch",
    tier: "silver",
    score: 78.4,
    reviewCount: 29,
    verifiedReviewers: 22,
    size: "medium",
    description: "Managed IT services for Canterbury businesses. Currently completing full reviewer verification.",
    tags: ["IT", "Cloud", "Support"],
    verified: false,
    since: "2021",
  },
  {
    id: 4,
    name: "Harakeke Copy Co.",
    category: "Copywriting",
    location: "Hamilton",
    tier: "bronze",
    score: 61.3,
    reviewCount: 11,
    verifiedReviewers: 8,
    size: "micro",
    description: "Freelance copywriting for NZ startups. New to the platform — building verified review base.",
    tags: ["Copywriting", "Content", "Startups"],
    verified: false,
    since: "2023",
  },
];

const TIER_CONFIG = {
  gold: {
    color: "#C9930A",
    bg: "rgba(201,147,10,0.10)",
    border: "rgba(201,147,10,0.35)",
    glow: "0 0 24px rgba(201,147,10,0.25)",
    label: "Gold Star",
    icon: "★",
    description: "100% verified reviewers · Intensive vetting · Consistently excellent",
  },
  silver: {
    color: "#8A9BB5",
    bg: "rgba(138,155,181,0.10)",
    border: "rgba(138,155,181,0.30)",
    glow: "0 0 16px rgba(138,155,181,0.15)",
    label: "Silver Star",
    icon: "★",
    description: "Mostly verified · Building full review base · Good standing",
  },
  bronze: {
    color: "#A0714F",
    bg: "rgba(160,113,79,0.08)",
    border: "rgba(160,113,79,0.25)",
    glow: "none",
    label: "Bronze Star",
    icon: "★",
    description: "Entry tier · Partial verification · Growing reputation",
  },
};

function ScoreBar({ score, tier }) {
  const cfg = TIER_CONFIG[tier];
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8a8fa8", marginBottom: 4 }}>
        <span>Trust Score</span>
        <span style={{ color: cfg.color, fontWeight: 700 }}>{score}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${score}%`,
          background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`,
          borderRadius: 99,
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
}

function SizeLabel({ size }) {
  const map = { micro: ["Micro Biz", "#7C6AF5"], small: ["Small Biz", "#3BA87A"], medium: ["Medium Biz", "#E07B3A"] };
  const [label, color] = map[size] || ["Business", "#8a8fa8"];
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.06em",
      color,
      background: color + "18",
      border: `1px solid ${color}44`,
      borderRadius: 5,
      padding: "2px 7px",
      textTransform: "uppercase",
    }}>{label}</span>
  );
}

function BusinessCard({ biz, highlight }) {
  const cfg = TIER_CONFIG[biz.tier];
  return (
    <div style={{
      background: highlight ? cfg.bg : "rgba(255,255,255,0.03)",
      border: `1.5px solid ${highlight ? cfg.border : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16,
      padding: "20px 22px",
      boxShadow: highlight ? cfg.glow : "none",
      transition: "all 0.3s ease",
      cursor: "default",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#f0f0f0", marginBottom: 3 }}>
            {biz.name}
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.04em" }}>
            {biz.category} · {biz.location} · Est. {biz.since}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, color: cfg.color, lineHeight: 1 }}>{cfg.icon}</div>
          <div style={{ fontSize: 10, color: cfg.color, fontWeight: 700, letterSpacing: "0.05em", marginTop: 2 }}>
            {cfg.label.toUpperCase()}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12.5, color: "#9ca3b0", lineHeight: 1.6, margin: "0 0 12px" }}>{biz.description}</p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <SizeLabel size={biz.size} />
        {biz.tags.map(t => (
          <span key={t} style={{
            fontSize: 10, color: "#6b7280", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 5, padding: "2px 7px",
          }}>{t}</span>
        ))}
      </div>

      <ScoreBar score={biz.score} tier={biz.tier} />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "#6b7280" }}>
        <span>{biz.verifiedReviewers} verified reviewer{biz.verifiedReviewers !== 1 ? "s" : ""} of {biz.reviewCount}</span>
        <span style={{ color: biz.verified ? "#3BA87A" : "#E07B3A" }}>
          {biz.verified ? "✓ Fully verified" : "⏳ Verification in progress"}
        </span>
      </div>
    </div>
  );
}

function PromptScanner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const scan = () => {
    if (!input.trim()) return;
    const found = PROMPT_SIGNATURES.filter(s => s.pattern.test(input));
    setResult({
      safe: found.length === 0,
      flags: found,
      text: input,
    });
  };

  return (
    <div>
      <div style={{
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.18)",
        borderRadius: 14,
        padding: "18px 20px",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: "#f87171", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 6 }}>
          ⚠️ WHAT IS PROMPT INJECTION?
        </div>
        <p style={{ fontSize: 12.5, color: "#9ca3b0", lineHeight: 1.65, margin: 0 }}>
          Malicious actors share copy-paste prompts designed to trick AI systems into producing harmful content — scam frameworks, get-rich-quick schemes, or bypassing safety systems. 
          TrustShield scans text before it reaches an AI, flagging known attack patterns.
        </p>
      </div>

      <textarea
        value={input}
        onChange={e => { setInput(e.target.value); setResult(null); }}
        placeholder="Paste any suspicious prompt or message here to scan it…"
        style={{
          width: "100%",
          minHeight: 120,
          background: "rgba(255,255,255,0.04)",
          border: "1.5px solid rgba(255,255,255,0.09)",
          borderRadius: 12,
          color: "#d1d5db",
          fontSize: 13,
          lineHeight: 1.6,
          padding: "14px 16px",
          resize: "vertical",
          fontFamily: "'DM Mono', monospace",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      <button
        onClick={scan}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "13px",
          background: "linear-gradient(135deg, #1e3a5f, #1a2d4a)",
          border: "1.5px solid rgba(99,179,237,0.3)",
          borderRadius: 12,
          color: "#93c5fd",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.05em",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        🔍 SCAN FOR INJECTION PATTERNS
      </button>

      {result && (
        <div style={{
          marginTop: 16,
          padding: "18px 20px",
          borderRadius: 14,
          background: result.safe ? "rgba(52,199,89,0.07)" : "rgba(239,68,68,0.08)",
          border: `1.5px solid ${result.safe ? "rgba(52,199,89,0.25)" : "rgba(239,68,68,0.3)"}`,
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 800,
            color: result.safe ? "#34c759" : "#f87171",
            letterSpacing: "0.04em",
            marginBottom: result.safe ? 0 : 12,
          }}>
            {result.safe ? "✓ NO KNOWN INJECTION PATTERNS DETECTED" : `🚨 ${result.flags.length} THREAT PATTERN${result.flags.length > 1 ? "S" : ""} FOUND`}
          </div>
          {!result.safe && result.flags.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              marginTop: 8, padding: "8px 12px",
              background: "rgba(239,68,68,0.08)", borderRadius: 8,
              border: "1px solid rgba(239,68,68,0.18)",
            }}>
              <span style={{ fontSize: 16 }}>⛔</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5" }}>{f.label}</div>
                <div style={{ fontSize: 11, color: "#9ca3b0", marginTop: 2 }}>
                  Pattern match detected — do not submit to AI systems
                </div>
              </div>
            </div>
          ))}
          {!result.safe && (
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: "rgba(255,255,255,0.03)", borderRadius: 8,
              fontSize: 12, color: "#6b7280", lineHeight: 1.6,
            }}>
              <strong style={{ color: "#9ca3b0" }}>What to do:</strong> Do not submit this to any AI system.
              If you received it from someone else, report it. This text matches known manipulation templates
              circulating online designed to produce scam content or override AI safety guidelines.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreExplainer() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: "20px 22px",
      marginBottom: 24,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 14, letterSpacing: "0.04em" }}>
        📐 HOW THE FAIR SCORE WORKS
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          ["Verified Review %", "Only authenticated human reviewers count. 100% of Gold reviewers are ID-verified."],
          ["Size-Adjusted Baseline", "A micro business with 8 perfect reviews scores comparably to a large chain with 200. Volume doesn't dominate."],
          ["Consistency Bonus", "Sustained quality over time. A bad month doesn't destroy years of good service."],
          ["Response & Integrity", "How businesses handle complaints. Transparency increases score."],
        ].map(([title, desc]) => (
          <div key={title} style={{
            padding: "12px 14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#93c5fd", marginBottom: 5, letterSpacing: "0.04em" }}>
              {title.toUpperCase()}
            </div>
            <div style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.55 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustShieldNZ() {
  const [tab, setTab] = useState("scanner");
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? BUSINESSES : BUSINESSES.filter(b => b.tier === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      fontFamily: "'DM Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Playfair+Display:wght@700;900&family=DM+Mono&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e2a3a; border-radius: 99px; }
        textarea:focus { border-color: rgba(99,179,237,0.4) !important; box-shadow: 0 0 0 3px rgba(99,179,237,0.08) !important; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(13,17,23,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #1e3a5f, #0d2137)",
            border: "1.5px solid rgba(99,179,237,0.35)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🛡️</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em", color: "#f0f6ff" }}>
              TrustShield <span style={{ color: "#3b82f6" }}>NZ</span>
            </div>
            <div style={{ fontSize: 10, color: "#4b5563", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              AI Safety · Verified Business Ratings
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#374151", background: "rgba(255,255,255,0.03)", padding: "5px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.06)" }}>
          🇳🇿 NZ Initiative
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0d1117" }}>
        {[
          { id: "scanner", label: "🔍 Prompt Scanner", desc: "Detect AI manipulation" },
          { id: "directory", label: "⭐ Verified Directory", desc: "Gold/Silver/Bronze rated" },
          { id: "howit", label: "📋 How It Works", desc: "Verification process" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "14px 8px",
              background: tab === t.id ? "rgba(59,130,246,0.08)" : "transparent",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #3b82f6" : "2px solid transparent",
              color: tab === t.id ? "#93c5fd" : "#4b5563",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 500,
              letterSpacing: "0.02em",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            <div>{t.label}</div>
            <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 60px" }}>

        {tab === "scanner" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, margin: "0 0 6px", color: "#f0f6ff" }}>
                AI Prompt Injection Scanner
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                Paste any suspicious message to check if it's a known manipulation template being shared online to trick AI systems.
              </p>
            </div>
            <PromptScanner />
          </div>
        )}

        {tab === "directory" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, margin: "0 0 6px", color: "#f0f6ff" }}>
                Verified NZ Business Directory
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                Every reviewer is identity-verified by TrustShield. Scores are size-adjusted — a small business competes fairly with a large one.
              </p>
            </div>

            <ScoreExplainer />

            {/* Tier legend */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {Object.entries(TIER_CONFIG).map(([tier, cfg]) => (
                <div
                  key={tier}
                  onClick={() => setFilter(filter === tier ? "all" : tier)}
                  style={{
                    padding: "10px 12px",
                    background: filter === tier ? cfg.bg : "rgba(255,255,255,0.025)",
                    border: `1.5px solid ${filter === tier ? cfg.border : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: filter === tier ? cfg.glow : "none",
                  }}
                >
                  <div style={{ fontSize: 16, color: cfg.color, lineHeight: 1 }}>{cfg.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: cfg.color, letterSpacing: "0.05em", marginTop: 3 }}>
                    {cfg.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 10, color: "#4b5563", marginTop: 3, lineHeight: 1.4 }}>
                    {tier === "gold" ? "100% verified" : tier === "silver" ? "Mostly verified" : "Entry level"}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map(biz => (
                <BusinessCard key={biz.id} biz={biz} highlight={filter === biz.tier || filter === "all"} />
              ))}
            </div>
          </div>
        )}

        {tab === "howit" && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, margin: "0 0 6px", color: "#f0f6ff" }}>
              How TrustShield Works
            </h2>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.6 }}>
              Two systems working together: an AI abuse prevention layer, and a business trust verification framework.
            </p>

            {[
              {
                icon: "🔍",
                title: "Prompt Injection Detection",
                color: "#f87171",
                points: [
                  "Community-curated database of known manipulation prompt templates",
                  "Pattern matching on structure, not just keywords — evolves as new patterns emerge",
                  "Open source signature library so researchers can contribute new patterns",
                  "API available for AI platforms, schools, and businesses to integrate protection",
                  "NZ CERT partnership to escalate novel attack patterns to national cybersecurity",
                ]
              },
              {
                icon: "🪙",
                title: "Gold Star Verification Process",
                color: "#C9930A",
                points: [
                  "Applicants submit NZ Business Number + proof of operation",
                  "TrustShield recruits reviewers from unrelated demographics to the business",
                  "Each reviewer completes identity verification (NZ driver licence or passport)",
                  "Reviewers trial the service independently — TrustShield covers cost up to $50",
                  "Reviews are structured interviews, not free text — harder to fake or game",
                  "Minimum 20 verified reviewers required for Gold · 10 for Silver · 5 for Bronze",
                ]
              },
              {
                icon: "📐",
                title: "Size-Fair Scoring Formula",
                color: "#3BA87A",
                points: [
                  "Raw score = (Verified positive reviews / Total verified reviews) × 100",
                  "Size multiplier: Micro (+8pts baseline), Small (+5pts), Medium (+2pts), Large (0pts)",
                  "This means a micro business with 90% satisfaction scores ~98, same as a large chain needing 98% to match",
                  "Consistency bonus: businesses with 3+ years of stable scores receive up to +3pts",
                  "No business can buy ratings — all reviewer selection is managed by TrustShield",
                ]
              },
              {
                icon: "🚨",
                title: "Reporting & Enforcement",
                color: "#a78bfa",
                points: [
                  "Anyone can flag a suspicious prompt via the scanner — goes to moderation queue",
                  "Businesses found gaming reviews lose Gold status immediately, review suspended 12 months",
                  "All decisions appealable through a 3-person independent review panel",
                  "Annual NZ Commerce Commission compliance report published publicly",
                ]
              },
            ].map(section => (
              <div key={section.title} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "20px 22px",
                marginBottom: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{section.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 800, color: section.color, letterSpacing: "0.03em" }}>
                    {section.title.toUpperCase()}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.points.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: section.color, marginTop: 6, flexShrink: 0 }} />
                      <div style={{ fontSize: 12.5, color: "#9ca3b0", lineHeight: 1.6 }}>{p}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{
              background: "rgba(59,130,246,0.07)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 14,
              padding: "16px 18px",
              marginTop: 8,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93c5fd", marginBottom: 6 }}>💡 CONCEPT NOTE</div>
              <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
                This is a product concept prototype. Building TrustShield NZ would require partnership with
                MBIE, NZ CERT, and consumer advocacy groups. The prompt injection scanner could be open-sourced
                immediately. The rating system would need seed funding for the reviewer verification process.
                Both systems address real, documented harms happening right now.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
