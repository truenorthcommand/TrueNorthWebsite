import type { AuditReport } from "./auditEngine";

const urgencyBadge = (urgency: "high" | "medium" | "low") => {
  const map = {
    high: { bg: "#3d1515", border: "#ef4444", text: "#ef4444", label: "High Priority" },
    medium: { bg: "#3d2e10", border: "#f97316", text: "#f97316", label: "Medium Priority" },
    low: { bg: "#0f2d1a", border: "#22c55e", text: "#22c55e", label: "Low Priority" },
  };
  const s = map[urgency];
  return `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;background:${s.bg};border:1px solid ${s.border};color:${s.text};letter-spacing:0.5px;">${s.label}</span>`;
};

export function buildAuditEmailHtml(name: string, report: AuditReport): string {
  const { score, findings, recommendations, summary, nextStep } = report;

  const findingsHtml = findings.map(f => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <p style="margin:0 0 4px 0;font-size:13px;font-weight:700;color:#f0f4f8;letter-spacing:0.3px;">${f.area}</p>
            <p style="margin:0 0 8px 0;font-size:12px;color:rgba(240,244,248,0.45);">Your answer: ${f.status}</p>
            <p style="margin:0;font-size:13px;color:rgba(240,244,248,0.75);line-height:1.6;">${f.insight}</p>
          </div>
          <div style="flex-shrink:0;padding-top:2px;">${urgencyBadge(f.urgency)}</div>
        </div>
      </td>
    </tr>
  `).join("");

  const recsHtml = recommendations.map((r, i) => `
    <tr>
      <td style="padding:16px;background:rgba(0,255,255,0.03);border:1px solid rgba(0,255,255,0.1);border-radius:10px;margin-bottom:12px;display:block;">
        <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:1px;text-transform:uppercase;">Recommendation ${i + 1}</p>
        <p style="margin:0 0 6px 0;font-size:15px;font-weight:700;color:#f0f4f8;">${r.title}</p>
        <p style="margin:0 0 12px 0;font-size:13px;color:rgba(240,244,248,0.7);line-height:1.6;">${r.description}</p>
        <a href="${r.serviceUrl}" style="display:inline-block;padding:8px 16px;background:rgba(0,255,255,0.1);border:1px solid rgba(0,255,255,0.3);border-radius:6px;color:#00FFFF;font-size:12px;font-weight:600;text-decoration:none;">View ${r.service} →</a>
      </td>
    </tr>
    <tr><td style="height:10px;"></td></tr>
  `).join("");

  // Score ring (CSS-only, email-safe)
  const pct = Math.round((score.total / 10) * 100);
  const circumference = 2 * Math.PI * 40; // r=40
  const dash = (pct / 100) * circumference;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your TrueNorth Operational Audit Report</title>
</head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px 32px;background:linear-gradient(135deg,#0d1b2a 0%,#0a1628 100%);border-radius:16px 16px 0 0;border:1px solid rgba(0,255,255,0.12);border-bottom:none;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:2px;text-transform:uppercase;">TrueNorth Operations Group</p>
              <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:800;color:#f0f4f8;line-height:1.2;">Your Operational Audit Report</h1>
              <p style="margin:0;font-size:14px;color:rgba(240,244,248,0.5);">Prepared exclusively for ${name}</p>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="padding:32px;background:#0d1b2a;border-left:1px solid rgba(0,255,255,0.12);border-right:1px solid rgba(0,255,255,0.12);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <!-- Score ring (SVG) -->
                    <svg width="120" height="120" viewBox="0 0 100 100" style="display:block;margin:0 auto 16px auto;">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="${score.colour}" stroke-width="8"
                        stroke-dasharray="${dash.toFixed(1)} ${circumference.toFixed(1)}"
                        stroke-dashoffset="${(circumference / 4).toFixed(1)}"
                        stroke-linecap="round"/>
                      <text x="50" y="46" text-anchor="middle" font-size="22" font-weight="800" fill="${score.colour}" font-family="-apple-system,sans-serif">${score.total}</text>
                      <text x="50" y="60" text-anchor="middle" font-size="9" fill="rgba(240,244,248,0.4)" font-family="-apple-system,sans-serif">out of 10</text>
                    </svg>
                    <p style="margin:0 0 4px 0;font-size:20px;font-weight:800;color:${score.colour};">${score.label}</p>
                    <p style="margin:0;font-size:13px;color:rgba(240,244,248,0.6);max-width:420px;line-height:1.6;">${score.description}</p>
                  </td>
                </tr>
              </table>

              <!-- Summary -->
              <div style="padding:16px 20px;background:rgba(0,255,255,0.04);border:1px solid rgba(0,255,255,0.1);border-radius:10px;margin-bottom:28px;">
                <p style="margin:0;font-size:14px;color:rgba(240,244,248,0.8);line-height:1.7;font-style:italic;">"${summary}"</p>
              </div>

              <!-- Findings -->
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:1.5px;text-transform:uppercase;">Key Findings</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${findingsHtml}
              </table>
            </td>
          </tr>

          <!-- Recommendations -->
          <tr>
            <td style="padding:0 32px 32px 32px;background:#0d1b2a;border-left:1px solid rgba(0,255,255,0.12);border-right:1px solid rgba(0,255,255,0.12);">
              <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:1.5px;text-transform:uppercase;">Recommended Next Steps</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${recsHtml}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px;background:linear-gradient(135deg,#0d1b2a 0%,#091220 100%);border-radius:0 0 16px 16px;border:1px solid rgba(0,255,255,0.12);border-top:1px solid rgba(0,255,255,0.08);text-align:center;">
              <p style="margin:0 0 6px 0;font-size:18px;font-weight:800;color:#f0f4f8;">Ready to take action?</p>
              <p style="margin:0 0 24px 0;font-size:13px;color:rgba(240,244,248,0.55);line-height:1.6;max-width:400px;margin-left:auto;margin-right:auto;">${nextStep}</p>
              <a href="https://truenorthoperationsgroup.com/#contact" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#00FFFF,#14b8a6);border-radius:8px;color:#0a0f1a;font-size:14px;font-weight:800;text-decoration:none;letter-spacing:0.3px;">Book a Discovery Call →</a>
              <p style="margin:24px 0 0 0;font-size:11px;color:rgba(240,244,248,0.25);">TrueNorth Operations Group · Ashford, Kent · Company No. 16854356</p>
              <p style="margin:8px 0 0 0;font-size:11px;color:rgba(0,255,255,0.4);">⚡ Powered by TrueNorthOS</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAuditEmailText(name: string, report: AuditReport): string {
  const { score, findings, recommendations, summary, nextStep } = report;
  const lines: string[] = [
    `TRUENORTH OPERATIONS GROUP — OPERATIONAL AUDIT REPORT`,
    `Prepared for: ${name}`,
    ``,
    `OPERATIONAL MATURITY SCORE: ${score.total}/10 — ${score.label}`,
    ``,
    score.description,
    ``,
    `SUMMARY`,
    summary,
    ``,
    `KEY FINDINGS`,
    `───────────`,
    ...findings.map(f => `• ${f.area} [${f.urgency.toUpperCase()}]\n  Your answer: ${f.status}\n  ${f.insight}`),
    ``,
    `RECOMMENDED NEXT STEPS`,
    `──────────────────────`,
    ...recommendations.map((r, i) => `${i + 1}. ${r.title}\n   ${r.description}\n   ${r.serviceUrl}`),
    ``,
    `NEXT STEP`,
    nextStep,
    ``,
    `Book a Discovery Call: https://truenorthoperationsgroup.com/#contact`,
    ``,
    `TrueNorth Operations Group · Ashford, Kent · Company No. 16854356`,
    `Powered by TrueNorthOS`,
  ];
  return lines.join("\n");
}
