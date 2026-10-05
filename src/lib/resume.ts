import { jsPDF } from "jspdf";

function buildResumeDoc() {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const pageW = 210;
  const pageH = 297;

  const margin = 12;
  const contentW = pageW - margin * 2;

  const navy: [number, number, number] = [30, 43, 60];
  const text: [number, number, number] = [55, 60, 66];
  const muted: [number, number, number] = [105, 110, 116];
  const line: [number, number, number] = [215, 218, 221];

  let y = 17;

  // =========================================================
  // HEADER
  // =========================================================

  doc.setTextColor(...navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text("SAJID JAMAL", margin, y);

  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...navy);

  doc.text(
    "DATA ANALYTICS  |  DATA SCIENCE  |  AI / ML",
    margin,
    y
  );

  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(...muted);

  doc.text(
    "sajidjamal212@gmail.com  ·  www.linkedin.com/in/sajid-jamal-130462380  ·  www.github.com/Lone-sajid12  ·  Srinagar, Jammu & Kashmir, India",
    margin,
    y
  );

  y += 4;

  doc.setDrawColor(...navy);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageW - margin, y);

  y += 7;

  // =========================================================
  // SECTION HEADING
  // =========================================================

  const heading = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(...navy);
    doc.text(title.toUpperCase(), margin, y);

    y += 2.5;

    doc.setDrawColor(...line);
    doc.setLineWidth(0.25);
    doc.line(margin, y, pageW - margin, y);

    y += 5;
  };

  // =========================================================
  // BODY TEXT
  // =========================================================

  const body = (
    value: string,
    fontSize = 8.2,
    color: [number, number, number] = text
  ) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);

    const lines = doc.splitTextToSize(value, contentW);

    lines.forEach((lineText: string) => {
      doc.text(lineText, margin, y);
      y += 3.7;
    });

    y += 1.5;
  };

  // =========================================================
  // BULLET
  // =========================================================

  const bullet = (value: string, size = 7.9) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...text);

    const bulletWidth = 4;
    const lines = doc.splitTextToSize(
      value,
      contentW - bulletWidth
    );

    lines.forEach((lineText: string, index: number) => {
      if (index === 0) {
        doc.text("•", margin, y);
      }

      doc.text(lineText, margin + bulletWidth, y);
      y += 3.6;
    });
  };

  // =========================================================
  // PROFESSIONAL SUMMARY
  // =========================================================

  heading("Professional Summary");

  body(
    "Computer Science student currently focused on Data Analytics and working toward a career in Data Science. Hands-on experience with Python, Pandas, NumPy, data cleaning and exploratory data analysis through practical projects. Currently developing skills in SQL, statistics and machine learning, with experience using AI-assisted coding for development and debugging.",
    8.1
  );

  y += 1;

  // =========================================================
  // SKILLS
  // =========================================================

  heading("Skills");

  const skillRows = [
    {
      leftTitle: "Programming:",
      left:
        "Python, JavaScript, C Programming",
      rightTitle: "Data Analytics:",
      right:
        "Pandas, NumPy, Data Cleaning, Exploratory Data Analysis, Data Analysis, Data Interpretation, Data Visualization",
    },
    {
      leftTitle: "SQL & Database:",
      left:
        "SQL (Learning)",
      rightTitle: "Machine Learning:",
      right:
        "scikit-learn, Machine Learning (Learning)",
    },
    {
      leftTitle: "Tools:",
      left:
        "Git, GitHub, Vercel, VS Code",
      rightTitle: "Development (AI-Assisted):",
      right:
        "React, Next.js, Vite, Tailwind CSS, FastAPI, APIs",
    },
    {
      leftTitle: "Practical Skills:",
      left:
        "Debugging & Troubleshooting, Problem Solving, Technical Communication",
      rightTitle: "AI & Development:",
      right:
        "AI-assisted coding, Prompt Engineering, AI Tools for Software Development, AI Automation (Learning), AI Agent Concepts (Learning)",
    },
  ];

  const colGap = 8;
  const colW = (contentW - colGap) / 2;

  skillRows.forEach((row) => {
    const startY = y;

    // Left column
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.7);
    doc.setTextColor(...text);

    const leftTitleWidth = doc.getTextWidth(row.leftTitle);

    doc.text(row.leftTitle, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...text);

    const leftLines = doc.splitTextToSize(
      row.left,
      colW - leftTitleWidth
    );

    if (leftLines.length > 0) {
      doc.text(
        leftLines[0],
        margin + leftTitleWidth,
        y
      );

      for (let i = 1; i < leftLines.length; i++) {
        doc.text(leftLines[i], margin, y + i * 3.4);
      }
    }

    // Right column
    const rightX = margin + colW + colGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.7);
    doc.setTextColor(...text);

    const rightTitleWidth = doc.getTextWidth(row.rightTitle);

    doc.text(row.rightTitle, rightX, startY);

    doc.setFont("helvetica", "normal");

    const rightLines = doc.splitTextToSize(
      row.right,
      colW - rightTitleWidth
    );

    if (rightLines.length > 0) {
      doc.text(
        rightLines[0],
        rightX + rightTitleWidth,
        startY
      );

      for (let i = 1; i < rightLines.length; i++) {
        doc.text(
          rightLines[i],
          rightX,
          startY + i * 3.4
        );
      }
    }

    const rowHeight =
      Math.max(leftLines.length, rightLines.length) * 3.4;

    y += rowHeight + 4;
  });

  y += 1;

  // =========================================================
  // PROJECTS
  // =========================================================

  heading("Projects");

  // Customer Churn Analytics
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.3);
  doc.setTextColor(...text);

  doc.text("Customer Churn Analytics", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.1);
  doc.setTextColor(...muted);

  doc.text(
    "Python · Pandas · NumPy · Data Analysis",
    pageW - margin,
    y,
    { align: "right" }
  );

  y += 4;

  bullet(
    "Cleaned and analyzed the Telco Customer Churn dataset using Python and Pandas."
  );

  bullet(
    "Performed exploratory data analysis to understand customer churn patterns."
  );

  bullet(
    "Analyzed churn by contract type, tenure, internet service and customer services."
  );

  bullet(
    "Used data-driven analysis to identify differences in customer churn behavior."
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.6);
  doc.setTextColor(...muted);

  doc.text(
    "GitHub: github.com/Lone-sajid12/customer-churn-analytics",
    margin + 4,
    y
  );

  y += 5.5;

  // Nexora Global
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.3);
  doc.setTextColor(...text);

  doc.text(
    "Nexora Global — Business Website",
    margin,
    y
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.1);
  doc.setTextColor(...muted);

  doc.text(
    "Website Development",
    pageW - margin,
    y,
    { align: "right" }
  );

  y += 4;

  bullet("Worked on a responsive business website.");

  bullet(
    "Worked on navigation, branding, mobile layout and website structure."
  );

  bullet(
    "Used GitHub and Vercel for development and deployment."
  );

  bullet(
    "Used AI-assisted coding and debugging during development."
  );

  y += 2;

  // Personal Portfolio
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.3);
  doc.setTextColor(...text);

  doc.text(
    "Personal Portfolio",
    margin,
    y
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.1);
  doc.setTextColor(...muted);

  doc.text(
    "Next.js · React · Tailwind CSS",
    pageW - margin,
    y,
    { align: "right" }
  );

  y += 4;

  bullet("Built a personal developer portfolio.");

  bullet(
    "Added project, certification and resume sections."
  );

  bullet(
    "Worked with Next.js, React and Tailwind CSS."
  );

  bullet(
    "Used AI-assisted coding and debugging during development."
  );

  y += 2;

  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  heading("Certifications");

  bullet(
    "Career Essentials in Data Analysis by Microsoft and LinkedIn · LinkedIn Learning · Completed September 2026"
  );

  bullet(
    "Statistics Foundations 1: The Basics · LinkedIn Learning"
  );

  bullet(
    "Power BI Essentials · LinkedIn Learning"
  );

  bullet(
    "Deloitte — Data Analytics Job Simulation · Forage"
  );

  y += 2;

  // =========================================================
  // EDUCATION
  // =========================================================

  heading("Education");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...text);

  doc.text(
    "COMPUTER APPLICATIONS",
    margin,
    y
  );

  doc.setFontSize(7.5);
  doc.setTextColor(...navy);

  doc.text(
    "CURRENTLY IN 2ND YEAR",
    pageW - margin,
    y,
    { align: "right" }
  );

  y += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.9);
  doc.setTextColor(...text);

  doc.text(
    "Bachelor's Degree with Major in Computer Applications",
    margin,
    y
  );

  y += 3.8;

  doc.setTextColor(...muted);

  doc.text(
    "IITM Hyderpora, Srinagar, Jammu & Kashmir",
    margin,
    y
  );

  y += 6;

  // =========================================================
  // CAREER FOCUS
  // =========================================================

  heading("Career Focus");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...text);

  doc.text(
    "Data Analytics  ·  Data Science  ·  Machine Learning  ·  Artificial Intelligence  ·  Data-driven problem solving",
    margin,
    y
  );

  // =========================================================
  // SAVE / RETURN
  // =========================================================

  return doc;
}


// =============================================================
// PRINT FALLBACK
// =============================================================

function openPrintableFallback() {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Sajid Jamal — Resume</title>

        <style>
          @page {
            size: A4;
            margin: 12mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #373c42;
            font-size: 11px;
            line-height: 1.45;
          }

          h1 {
            margin: 0;
            font-size: 30px;
            color: #1e2b3c;
          }

          .role {
            margin: 4px 0;
            color: #1e2b3c;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .contact {
            color: #696e74;
            font-size: 9px;
            margin-bottom: 8px;
          }

          .line {
            border-bottom: 2px solid #1e2b3c;
          }

          h2 {
            margin: 12px 0 5px;
            padding-bottom: 3px;
            border-bottom: 1px solid #d7dade;
            color: #1e2b3c;
            font-size: 10px;
            letter-spacing: 1.5px;
          }

          p {
            margin: 4px 0;
          }

          ul {
            margin: 3px 0 7px;
            padding-left: 17px;
          }

          li {
            margin: 2px 0;
          }

          .project {
            margin-bottom: 9px;
          }

          .project-title {
            font-weight: bold;
          }

          .tech {
            float: right;
            color: #696e74;
            font-size: 9px;
          }

          .education-title {
            font-weight: bold;
          }

          .education-year {
            float: right;
            color: #1e2b3c;
            font-weight: bold;
            font-size: 9px;
          }
        </style>
      </head>

      <body>
        <h1>SAJID JAMAL</h1>

        <div class="role">
          DATA ANALYTICS | DATA SCIENCE | AI / ML
        </div>

        <div class="contact">
          sajidjamal212@gmail.com ·
          www.linkedin.com/in/sajid-jamal-130462380 ·
          www.github.com/Lone-sajid12 ·
          Srinagar, Jammu & Kashmir, India
        </div>

        <div class="line"></div>

        <h2>PROFESSIONAL SUMMARY</h2>

        <p>
          Computer Science student currently focused on Data Analytics and
          working toward a career in Data Science. Hands-on experience with
          Python, Pandas, NumPy, data cleaning and exploratory data analysis
          through practical projects. Currently developing skills in SQL,
          statistics and machine learning, with experience using AI-assisted
          coding for development and debugging.
        </p>

        <h2>SKILLS</h2>

        <p>
          <b>Programming:</b> Python, JavaScript, C Programming
          &nbsp;&nbsp;
          <b>Data Analytics:</b> Pandas, NumPy, Data Cleaning,
          Exploratory Data Analysis, Data Analysis, Data Interpretation,
          Data Visualization
        </p>

        <p>
          <b>SQL & Database:</b> SQL (Learning)
          &nbsp;&nbsp;
          <b>Machine Learning:</b> scikit-learn, Machine Learning (Learning)
        </p>

        <p>
          <b>Tools:</b> Git, GitHub, Vercel, VS Code
          &nbsp;&nbsp;
          <b>Development (AI-Assisted):</b> React, Next.js, Vite,
          Tailwind CSS, FastAPI, APIs
        </p>

        <p>
          <b>Practical Skills:</b> Debugging & Troubleshooting,
          Problem Solving, Technical Communication
          &nbsp;&nbsp;
          <b>AI & Development:</b> AI-assisted coding, Prompt Engineering,
          AI Tools for Software Development, AI Automation (Learning),
          AI Agent Concepts (Learning)
        </p>

        <h2>PROJECTS</h2>

        <div class="project">
          <div class="project-title">
            Customer Churn Analytics
            <span class="tech">
              Python · Pandas · NumPy · Data Analysis
            </span>
          </div>

          <ul>
            <li>Cleaned and analyzed the Telco Customer Churn dataset using Python and Pandas.</li>
            <li>Performed exploratory data analysis to understand customer churn patterns.</li>
            <li>Analyzed churn by contract type, tenure, internet service and customer services.</li>
            <li>Used data-driven analysis to identify differences in customer churn behavior.</li>
            <li>GitHub: github.com/Lone-sajid12/customer-churn-analytics</li>
          </ul>
        </div>

        <div class="project">
          <div class="project-title">
            Nexora Global — Business Website
            <span class="tech">Website Development</span>
          </div>

          <ul>
            <li>Worked on a responsive business website.</li>
            <li>Worked on navigation, branding, mobile layout and website structure.</li>
            <li>Used GitHub and Vercel for development and deployment.</li>
            <li>Used AI-assisted coding and debugging during development.</li>
          </ul>
        </div>

        <div class="project">
          <div class="project-title">
            Personal Portfolio
            <span class="tech">
              Next.js · React · Tailwind CSS
            </span>
          </div>

          <ul>
            <li>Built a personal developer portfolio.</li>
            <li>Added project, certification and resume sections.</li>
            <li>Worked with Next.js, React and Tailwind CSS.</li>
            <li>Used AI-assisted coding and debugging during development.</li>
          </ul>
        </div>

        <h2>CERTIFICATIONS</h2>

        <ul>
          <li>
            <b>Career Essentials in Data Analysis by Microsoft and LinkedIn</b>
            · LinkedIn Learning · Completed September 2026
          </li>
          <li>
            <b>Statistics Foundations 1: The Basics</b>
            · LinkedIn Learning
          </li>
          <li>
            <b>Power BI Essentials</b>
            · LinkedIn Learning
          </li>
          <li>
            <b>Deloitte — Data Analytics Job Simulation</b>
            · Forage
          </li>
        </ul>

        <h2>EDUCATION</h2>

        <div>
          <span class="education-title">COMPUTER APPLICATIONS</span>
          <span class="education-year">CURRENTLY IN 2ND YEAR</span>
        </div>

        <div>
          Bachelor's Degree with Major in Computer Applications
        </div>

        <div>
          IITM Hyderpora, Srinagar, Jammu & Kashmir
        </div>

        <h2>CAREER FOCUS</h2>

        <p>
          Data Analytics · Data Science · Machine Learning · Artificial Intelligence ·
          Data-driven problem solving
        </p>
      </body>
    </html>
  `;

  window.open(
    URL.createObjectURL(
      new Blob([html], { type: "text/html" })
    ),
    "_blank",
    "noopener,noreferrer"
  );
}


// =============================================================
// DOWNLOAD RESUME
// =============================================================

export function downloadResume() {
  try {
    buildResumeDoc().save("Sajid-Jamal-Resume.pdf");
    return true;
  } catch {
    openPrintableFallback();
    return false;
  }
}


// =============================================================
// VIEW RESUME
// =============================================================

export function viewResume() {
  try {
    const url = buildResumeDoc().output("bloburl");

    window.open(
      url as unknown as string,
      "_blank",
      "noopener,noreferrer"
    );

    return true;
  } catch {
    openPrintableFallback();
    return false;
  }
}