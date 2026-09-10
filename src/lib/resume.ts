import { jsPDF } from "jspdf";
import { certifications, profile, projects, skillCategories } from "./data";

/**
 * Builds the resume as a real PDF at runtime, so "Download Resume" works on
 * desktop and mobile with no network call and no missing file. Content is read
 * from the same honest data source the website uses.
 * (You can also drop a static copy at public/resume.pdf — see README.md.)
 */
function buildResumeDoc() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 16;
  const contentW = pageW - margin * 2;

  const ink: [number, number, number] = [17, 17, 17];
  const muted: [number, number, number] = [138, 135, 127];
  const olive: [number, number, number] = [90, 97, 70];

  let y = 0;

  // ── masthead ──
  doc.setFillColor(244, 241, 234);
  doc.rect(0, 0, pageW, 40, "F");
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.6);
  doc.line(margin, 39, pageW - margin, 39);

  doc.setTextColor(...ink);
  doc.setFont("times", "bold");
  doc.setFontSize(25);
  doc.text(profile.name, margin, 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.6);
  doc.setTextColor(...olive);
  doc.text("DATA ANALYTICS  →  DATA SCIENCE  →  AI / ML  →  AUTOMATION", margin, 26.5);

  doc.setTextColor(...muted);
  doc.setFontSize(9);
  doc.text(`${profile.location}   |   ${profile.email}`, margin, 32.5);
  doc.text(`github.com/${profile.githubHandle}   |   linkedin.com/in/sajid-jamal-130462380`, margin, 36.8);

  y = 50;

  const heading = (text: string) => {
    if (y > pageH - 30) {
      doc.addPage();
      y = 22;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.4);
    doc.setTextColor(...olive);
    doc.text(text.toUpperCase(), margin, y);
    doc.setDrawColor(214, 208, 196);
    doc.setLineWidth(0.3);
    doc.line(margin, y + 1.6, pageW - margin, y + 1.6);
    y += 7;
  };

  const body = (text: string, size = 9.2, color: [number, number, number] = ink, gap = 1.5) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentW);
    lines.forEach((line: string) => {
      if (y > pageH - 18) {
        doc.addPage();
        y = 22;
      }
      doc.text(line, margin, y);
      y += 4.4;
    });
    y += gap;
  };

  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    const lines = doc.splitTextToSize(text, contentW - 5);
    lines.forEach((line: string, index: number) => {
      if (y > pageH - 18) {
        doc.addPage();
        y = 22;
      }
      if (index === 0) {
        doc.setTextColor(...olive);
        doc.text("•", margin + 0.6, y);
      }
      doc.setTextColor(...ink);
      doc.text(line, margin + 5, y);
      y += 4.4;
    });
  };

  heading("Profile");
  body(
    "Computer science student and aspiring Data Scientist building a career path from Data Analytics into Data Science, AI/ML and Automation. Works with Python, SQL, Pandas and visualization tools to clean, explore and explain data, and turns what I learn into documented learning builds. Open to internships, hackathons and open-source collaboration as a student learner."
  );

  heading("Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.text(profile.education.degree, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.2);
  doc.setTextColor(...muted);
  doc.text(profile.education.years, pageW - margin, y, { align: "right" });
  y += 5;
  body(
    `${profile.education.institute} — ${profile.education.place}. ${profile.education.status}.`,
    9.2,
    muted
  );

  heading("Career Direction");
  bullet("Data Analytics — cleaning, SQL, exploratory analysis, visualization and clear written findings.");
  bullet("Data Science — statistics, EDA, feature engineering and predictive modelling grounded in validation.");
  bullet("AI / ML — machine learning fundamentals, model building, evaluation and LLM concepts.");
  bullet("Automation — Python automation and AI-assisted workflows that remove repetitive work.");
  y += 2;

  heading("Skills");
  skillCategories.forEach((group) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(...ink);
    const label = `${group.category}: `;
    doc.text(label, margin, y);
    const labelW = doc.getTextWidth(label);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text(group.skills.map((s) => `${s.name} (${s.level.toLowerCase()})`).join(", "), margin + labelW, y, {
      maxWidth: contentW - labelW,
    });
    y += 5.2;
  });
  y += 2;

  heading("Projects (honest learning builds)");
  projects.forEach((project) => {
    if (y > pageH - 30) {
      doc.addPage();
      y = 22;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.7);
    doc.setTextColor(...ink);
    doc.text(project.title, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...olive);
    doc.text(`${project.category} • ${project.status}`, pageW - margin, y, { align: "right" });
    y += 4.6;
    body(project.summary, 8.8, muted, 0.6);
    body(`Tech: ${project.tech.join(", ")}`, 8.5, muted, 2.4);
  });

  heading("Certifications & Training");
  certifications.forEach((cert) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(...ink);
    doc.text(`${cert.title} — ${cert.organization}`, margin, y);
    y += 4.4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    doc.setTextColor(...muted);
    doc.text(`Status: ${cert.status} • ${cert.date} • ${cert.skills.join(", ")}`, margin, y, { maxWidth: contentW });
    y += 6;
  });

  heading("Links");
  body(profile.github, 9.2, olive, 0.5);
  body(profile.linkedin, 9.2, olive, 0.5);
  body(profile.email, 9.2, olive, 0.5);

  const total = doc.getNumberOfPages();
  for (let page = 1; page <= total; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(...muted);
    doc.text(
      `© 2026 ${profile.name} — Turning data into better decisions.   ${page}/${total}`,
      pageW / 2,
      pageH - 9,
      { align: "center" }
    );
  }

  return doc;
}

/** Print-ready HTML fallback if PDF generation is unavailable in the browser. */
function openPrintableFallback() {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${profile.name} — Resume</title>
  <style>
    body{font-family:Georgia,'Times New Roman',serif;margin:0;padding:52px;background:#f4f1ea;color:#111;line-height:1.65}
    .wrap{max-width:720px;margin:0 auto}
    h1{margin:0 0 8px;font-size:34px;letter-spacing:-.02em}
    .role{font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#5a6146;margin:0 0 14px}
    .meta{font-family:ui-monospace,monospace;font-size:11px;color:#8a877f}
    h2{margin:30px 0 10px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#5a6146;border-bottom:1px solid #d6d0c4;padding-bottom:6px;font-family:ui-monospace,monospace}
    ul{padding-left:16px;margin:6px 0;font-size:14px} li{margin:4px 0}
    p{font-size:14.5px} .t{font-weight:700} .s{color:#8a877f;font-size:12.5px;font-family:ui-monospace,monospace}
    .item{margin-bottom:16px}
  </style></head><body><div class="wrap">
  <h1>${profile.name}</h1>
  <p class="role">Data Analytics → Data Science → AI / ML → Automation</p>
  <p class="meta">${profile.location} &nbsp;|&nbsp; ${profile.email} &nbsp;|&nbsp; ${profile.github} &nbsp;|&nbsp; ${profile.linkedin}</p>
  <h2>Profile</h2>
  <p>Computer science student and aspiring Data Scientist building a career path from Data Analytics into Data Science, AI/ML and Automation. Works with Python, SQL, Pandas and visualization tools, and turns learning into documented builds. Open to internships, hackathons and open-source collaboration as a student learner.</p>
  <h2>Education</h2>
  <div class="item"><div class="t">${profile.education.degree}</div><div class="s">${profile.education.institute} — ${profile.education.place} • ${profile.education.years}</div></div>
  <h2>Skills</h2>
  ${skillCategories
    .map(
      (group) =>
        `<div class="item"><div class="t">${group.category}</div><div class="s">${group.skills
          .map((s) => `${s.name} (${s.level.toLowerCase()})`)
          .join(" • ")}</div></div>`
    )
    .join("")}
  <h2>Projects (honest learning builds)</h2>
  ${projects
    .map(
      (p) =>
        `<div class="item"><div class="t">${p.title} <span class="s">— ${p.category} • ${p.status}</span></div><div>${p.summary}</div><div class="s">Tech: ${p.tech.join(", ")}</div></div>`
    )
    .join("")}
  <h2>Certifications &amp; Training</h2>
  <ul>${certifications.map((c) => `<li><span class="t">${c.title}</span> — ${c.organization} (${c.status})</li>`).join("")}</ul>
  <h2>Links</h2>
  <ul><li>${profile.github}</li><li>${profile.linkedin}</li><li>${profile.email}</li></ul>
  <p class="s">© 2026 ${profile.name} — Turning data into better decisions.</p>
  </div></body></html>`;
  window.open(URL.createObjectURL(new Blob([html], { type: "text/html" })), "_blank", "noopener,noreferrer");
}

export function downloadResume() {
  try {
    buildResumeDoc().save("Sajid-Jamal-Resume.pdf");
    return true;
  } catch {
    openPrintableFallback();
    return false;
  }
}

export function viewResume() {
  try {
    const url = buildResumeDoc().output("bloburl");
    window.open(url as unknown as string, "_blank", "noopener,noreferrer");
    return true;
  } catch {
    openPrintableFallback();
    return false;
  }
}
