/**
 * Single source of truth for every piece of content on the portfolio.
 * Anything marked "placeholder" is intentionally left for Sajid to fill in —
 * nothing here should be invented, exaggerated or fabricated.
 */

export const profile = {
  name: "Sajid Jamal",
  position: "Computer science Student | Aspiring Data Scientist | Data Analytics | AI/ML | Automation",
  headline: "Turning Data Into Better Decisions.",
  tagline: "Turning data into decisions, models and intelligent workflows.",
  signature: "Learn. Build. Grow.",
  location: "Srinagar, Jammu & Kashmir, India",
  email: "sajidjamal212@gmail.com",
  github: "https://github.com/Lone-sajid12",
  githubHandle: "Lone-sajid12",
  linkedin: "https://www.linkedin.com/in/sajid-jamal-130462380/",
  /**
   * Relative paths keep the portrait + optional static resume working whether
   * the site is hosted at a domain root or inside a sub-directory.
   * Add your photo at public/mypic.png and (optionally) public/resume.pdf.
   */
  photo: "mypic.png",
  resume: "resume.pdf",
  education: {
    degree: "Undergraduate Programme in Computer Applications Major: Computer Applications | Minor: Applied Computing",
    institute: "Iqbal Institute of Technology & Management",
    place: "Hyderpora, Srinagar, Jammu & Kashmir",
    years: "2025 – 2028",
    status: "Currently studying",
  },
  careerPath: ["Data Analytics", "Data Science", "AI / ML", "Automation"],
};

export const heroIntro =
  "I'm Sajid Jamal, a Computer science student from Srinagar exploring Data Analytics, Data Science, AI/ML and Automation — building practical projects while continuously turning what I learn into something real.";

export const aboutStatement = "I'm learning to see the story behind the data.";
export const heroStatement = "Turning data into better decisions.";

export const aboutParagraphs: string[] = [
  "My name is Sajid Jamal, and I'm a Computer science student from Srinagar, Jammu & Kashmir, currently studying at IITM, Hyderpora. My academic journey started in 2025, and somewhere between learning the fundamentals of computing and writing my first scripts, I realised that what genuinely excites me is not just making software run — it is making software understand information.",
  "My interest in data started with something simple: curiosity about why things happen the way they do. I would look at a dataset and want to know what story was hiding inside it — which numbers mattered, which ones were noise, and what decision someone could make differently because of them. That curiosity pushed me past the classroom and into Python, SQL, spreadsheets and the habit of keeping notes on everything I learn. Data Analytics became the natural place to start: it is where raw, messy information first begins to make sense.",
  "From there, my direction became clearer. I'm working toward Data Science — statistics, exploratory data analysis, feature engineering and predictive modelling — because I want to move from describing what already happened to estimating what might happen next. Alongside that, I'm drawn to AI and machine learning: how a model learns patterns from examples, how it can be evaluated honestly, and how those ideas eventually reach people through real applications.",
  "Automation is the thread that ties it together for me. Repetitive work — cleaning files, formatting reports, collecting data, moving information between tools — is where I like to experiment first. If a task can be described clearly, it can usually be scripted, and if it needs judgement, AI and machine learning can often help carry part of the load. That combination of data, models and automation is the kind of work I want to build a career on.",
  "I'm honest about where I am. I'm a student, not a professional data scientist, and I don't present myself as one. What I do bring is consistency and a building habit: I learn something, then I build something small with it, then I write down what worked and what broke. My projects are learning builds, and I label them as such — documented notebooks, small tools and experiments that show how I think rather than claiming results I can't prove.",
  "Long term, my ambition is straightforward: become a highly capable Data Scientist who can take an unclear problem, work with real data, build something that genuinely helps, and explain it clearly to people who don't live in code. I'm at the beginning of that path, and I'm comfortable saying so — because the direction is clear, the work has started, and every project from here is a step further down the data pipeline.",
];

export const stats = [
  { value: "2025", label: "Computer science journey started", suffix: "" },
  { value: "4", label: "Career stages I'm building through", suffix: "" },
  { value: "8", label: "Stage data pipeline I work on", suffix: "" },
  { value: "∞", label: "Curiosity, documented in notes", suffix: "" },
];

export type WhatIDo = {
  id: string;
  icon: string;
  title: string;
  short: string;
  detail: string[];
  accent: string;
};

export const whatIDo: WhatIDo[] = [
  {
    id: "analytics",
    icon: "M4 19h16M7 15V9m5 6V5m5 10v-7",
    title: "Data Analytics",
    short: "Transforming raw data into insights through cleaning, exploration, visualization and analytical thinking.",
    detail: [
      "I start with messy data: missing values, inconsistent columns, duplicated rows — the unglamorous part nobody screenshots.",
      "Then I explore: distributions, group-by comparisons, time trends, correlations, and the questions the data refuses to answer.",
      "Finally I present: clear charts, short written findings, and a recommendation someone could actually act on.",
    ],
    accent: "from-brand-500/70 to-cyan-400/50",
  },
  {
    id: "datascience",
    icon: "M4 18c4 0 4-12 8-12s4 12 8 12M4 6h4M16 18h4",
    title: "Data Science",
    short: "Learning how statistical methods and machine learning can turn data into predictive systems.",
    detail: [
      "Statistics is the base I keep strengthening: probability, sampling, distributions and the honest limits of small samples.",
      "I practise feature engineering — turning raw columns into signals a model can actually learn from.",
      "I'm learning to validate properly: train/test splits, cross-validation and metrics chosen for the problem, not for a screenshot.",
    ],
    accent: "from-iris-500/70 to-brand-500/50",
  },
  {
    id: "aiml",
    icon: "M12 4v6m0 4v6M6 12h12M7 7l3 3m7 7-3-3m3-7-3 3m-7 7 3-3",
    title: "AI / ML",
    short: "Exploring machine learning algorithms, model development and intelligent applications.",
    detail: [
      "I'm studying the fundamentals of supervised and unsupervised learning, when they apply, and how they fail.",
      "Model building is a loop for me: baseline first, then improved features and parameters, then compare honestly.",
      "On the AI side I'm exploring large language model concepts and how they can be composed into practical, guarded workflows.",
    ],
    accent: "from-cyan-400/70 to-iris-400/50",
  },
  {
    id: "automation",
    icon: "M12 3v3m0 12v3M3 12h3m12 0h3M6.4 6.4l2.1 2.1m7 7 2.1 2.1m0-11.2-2.1 2.1m-7 7-2.1 2.1M12 9.5A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5Z",
    title: "Automation",
    short: "Building workflows that reduce repetitive work and connect data, software and AI.",
    detail: [
      "If a task repeats more than a few times, I ask how much of it a script could own.",
      "I connect the pieces I already use: Python, files, spreadsheets, APIs and reporting output.",
      "AI automation is my newest interest — using models as a judgement layer inside an otherwise deterministic pipeline.",
    ],
    accent: "from-emerald-400/60 to-cyan-400/50",
  },
];

export type SkillCategory = {
  category: string;
  note: string;
  accent: string;
  skills: { name: string; level: "Comfortable" | "Building" | "Exploring" }[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming",
    note: "My daily tools for turning an idea into running code.",
    accent: "text-olive",
    skills: [
      { name: "Python", level: "Comfortable" },
      { name: "C", level: "Building" },
      { name: "JavaScript / TypeScript", level: "Building" },
    ],
  },
  {
    category: "Data",
    note: "Handling, querying and shaping structured data.",
    accent: "text-bronze",
    skills: [
      { name: "SQL", level: "Comfortable" },
      { name: "Pandas", level: "Comfortable" },
      { name: "NumPy", level: "Building" },
      { name: "Excel", level: "Comfortable" },
    ],
  },
  {
    category: "Visualization",
    note: "Making findings readable before making them pretty.",
    accent: "text-olive",
    skills: [
      { name: "Matplotlib", level: "Comfortable" },
      { name: "Seaborn", level: "Building" },
      { name: "Power BI", level: "Building" },
    ],
  },
  {
    category: "Data Science",
    note: "The core path: statistics, EDA and modelling.",
    accent: "text-bronze",
    skills: [
      { name: "Statistics", level: "Building" },
      { name: "EDA", level: "Comfortable" },
      { name: "Feature Engineering", level: "Building" },
      { name: "Machine Learning", level: "Building" },
    ],
  },
  {
    category: "AI",
    note: "Exploring intelligent systems and how they are wired together.",
    accent: "text-olive",
    skills: [
      { name: "Machine Learning", level: "Building" },
      { name: "AI Concepts", level: "Building" },
      { name: "LLM Concepts", level: "Exploring" },
    ],
  },
  {
    category: "Automation",
    note: "Scripts and workflows that remove repetitive work.",
    accent: "text-bronze",
    skills: [
      { name: "Python Automation", level: "Building" },
      { name: "AI Workflows", level: "Exploring" },
      { name: "Git & GitHub", level: "Building" },
      { name: "React / Next.js", level: "Exploring" },
    ],
  },
];

/** Plain-text label styles — no pills, no progress bars, no invented numbers. */
export const levelStyles: Record<string, string> = {
  Comfortable: "text-olive",
  Building: "text-ink/70",
  Exploring: "text-warmgray",
};

export type ProjectCategory = "Data Analytics" | "Data Science" | "Machine Learning" | "AI" | "Automation";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: string;
  year: string;
  summary: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  caseStudy: {
    problem: string;
    data: string;
    process: string[];
    technology: string;
    result: string;
    learning: string;
  };
};

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "AI",
  "Automation",
];

/**
 * These are honest learning builds. Outcomes describe what was produced and
 * documented — never invented business impact, user counts or accuracy claims.
 */
export const projects: Project[] = [
  {
    slug: "retail-sales-intelligence",
    title: "Retail Sales Intelligence",
    category: "Data Analytics",
    status: "Completed learning build",
    year: "2025",
    summary:
      "An end-to-end analytics walkthrough on retail sales data: SQL for extraction, Python for cleaning and EDA, and a dashboard layer for the findings.",
    tech: ["Python", "Pandas", "SQL", "Matplotlib", "Power BI"],
    image: "projects/analytics-dashboard.png",
    github: profile.github,
    caseStudy: {
      problem:
        "A retail dataset usually arrives as a single flat table full of returns, discounts and seasonality. I wanted to answer one practical question: which products and regions actually drive revenue, and which only look busy on a chart?",
      data:
        "A public retail sales dataset with order dates, product categories, regions, quantities, discount and revenue columns. It is openly available sample data, so the exercise is about method rather than confidential business data.",
      process: [
        "Profiled the raw table first: row counts, null density, date ranges and duplicate order IDs.",
        "Cleaned in Python with Pandas — type casting dates, standardising category labels, handling negative quantities caused by returns.",
        "Wrote SQL queries for group-by analysis: revenue by category, month-over-month trend, region contribution.",
        "Ran EDA to check whether the trend was real or an artefact of a few large orders.",
        "Built the visual layer: a KPI strip, trend line, category breakdown and a regional comparison view.",
      ],
      technology:
        "Python with Pandas for cleaning and aggregation, SQL for the extraction and group-by layer, Matplotlib for exploratory charts, Power BI for the dashboard view and Git for versioning the notebook.",
      result:
        "A documented notebook plus dashboard that ranks revenue drivers, flags the months where discounting pulled margin down, and lists the data-quality issues found on the way. It is a learning artefact, not a deployed business system.",
      learning:
        "Cleaning takes longer than charting, and the most useful insight was a boring one: a seasonal dip that looked dramatic on a monthly chart smoothed out once returns were handled correctly.",
    },
  },
  {
    slug: "customer-churn-modeling",
    title: "Customer Churn Modeling",
    category: "Machine Learning",
    status: "In progress — learning build",
    year: "2026",
    summary:
      "A supervised learning study on churn: baseline models first, then feature engineering, then honest evaluation with the metrics that fit the problem.",
    tech: ["Python", "scikit-learn", "Pandas", "Seaborn"],
    image: "projects/ml-model-lab.png",
    github: profile.github,
    caseStudy: {
      problem:
        "Churn is a classification problem where the interesting part is not the accuracy score — it is deciding which mistakes are more expensive, and understanding which features actually carry signal.",
      data:
        "A standard public customer-churn dataset: service usage, tenure, contract type, billing details and a binary churned label. No private customer data is used.",
      process: [
        "Split the data first and kept the test set untouched to avoid fooling myself with leakage.",
        "Built a majority-class baseline so every later model had something honest to beat.",
        "Encoded categorical columns, scaled numerics and engineered a few ratio features from tenure and charge columns.",
        "Compared logistic regression and tree-based models, then looked at precision, recall and the confusion matrix instead of only accuracy.",
        "Inspected feature importance and error cases to see where the model systematically struggles.",
      ],
      technology:
        "Python, scikit-learn pipelines, Pandas for preparation, Seaborn and Matplotlib for evaluation visuals, notebook documentation in markdown.",
      result:
        "A reproducible notebook pipeline with a baseline, two candidate models and an evaluation section written in plain language. Model scores are intentionally not published as headline numbers — they are dataset-specific and the notebook is the honest record.",
      learning:
        "Evaluation is the hardest and most valuable stage. I learned to distrust a single metric and to ask what a false negative would actually cost before calling a model good.",
    },
  },
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    category: "Automation",
    status: "Active build",
    year: "2026",
    summary:
      "Python automation that watches a folder, cleans and consolidates incoming spreadsheet reports, generates a summary sheet and logs every run.",
    tech: ["Python", "Pandas", "OpenPyXL", "APIs", "AI Workflows"],
    image: "projects/automation-workflow.png",
    github: profile.github,
    caseStudy: {
      problem:
        "Consolidating repetitive reports by hand is slow and easy to get wrong — files arrive in different shapes, columns drift, and someone has to remember what changed.",
      data:
        "Locally generated sample CSV and XLSX report files with deliberately inconsistent headers and date formats, so the script has real problems to solve instead of a perfect input.",
      process: [
        "Mapped the pipeline as stages: watch → validate → clean → consolidate → summarise → log.",
        "Wrote schema validation that rejects a file with clear error messages instead of silently producing wrong totals.",
        "Normalised column names and date parsing, appended a source-file column so every row stays traceable.",
        "Generated a summary sheet and a run log with timestamps, row counts and failures.",
        "Experimented with an AI step for short natural-language summaries of the run, kept behind a toggle so the deterministic path still works offline.",
      ],
      technology:
        "Python with Pandas and OpenPyXL for file handling, the standard library for scheduling and logging, a small model call for the optional summarisation layer.",
      result:
        "A working automation that turns a folder of inconsistent reports into one consolidated, traceable output with a run log. Built against sample data — not deployed inside any company workflow.",
      learning:
        "Automation quality is decided by failure handling. A script that breaks loudly and explains itself is far more useful than one that quietly guesses.",
    },
  },
  {
    slug: "open-data-explorer",
    title: "Open Data Explorer",
    category: "Data Science",
    status: "Completed learning build",
    year: "2025",
    summary:
      "An EDA playbook applied to openly published regional data: cleaning decisions written down, questions framed before charts were drawn.",
    tech: ["Python", "Pandas", "NumPy", "Seaborn", "SQL"],
    image: "projects/ml-model-lab.png",
    github: profile.github,
    caseStudy: {
      problem:
        "Public datasets are usually published once and rarely maintained. I wanted to know how much of a conclusion can be trusted when the underlying data has gaps and reporting inconsistencies.",
      data:
        "Openly published tabular data on regional indicators such as population, literacy and similar government-published measurements, used exactly as downloaded.",
      process: [
        "Wrote the questions down first — five of them — so exploration stayed focused.",
        "Audited data quality: missing years, changed units, inconsistent region naming.",
        "Documented every cleaning decision as a small, reversible function rather than ad-hoc edits in the notebook.",
        "Produced distribution and comparison visuals, then cross-checked two of the trends with an independent query.",
        "Ended with a short written findings list, including the questions the data simply could not answer.",
      ],
      technology:
        "Python, Pandas and NumPy for transformation, SQL for cross-check queries, Seaborn and Matplotlib for visual exploration, markdown for the written analysis.",
      result:
        "A reusable EDA pattern with a documented cleaning layer and an honest findings summary. Two of the five original questions remained unanswered — and that limitation is written down.",
      learning:
        "Saying 'this data cannot answer that' is a real analytical result. Framing questions first made the whole study shorter and far more useful.",
    },
  },
  {
    slug: "llm-study-assistant",
    title: "LLM Study Assistant",
    category: "AI",
    status: "Prototype — exploring",
    year: "2026",
    summary:
      "A small prototype that turns my own study notes into searchable, summarised revisions using an LLM API, with grounding rules to reduce invented answers.",
    tech: ["Python", "LLM APIs", "Prompting", "JSON Notes"],
    image: "projects/automation-workflow.png",
    github: profile.github,
    caseStudy: {
      problem:
        "I keep notes across many topics and rarely re-read them. I wanted a tool that answers questions using only my own notes, instead of a chat model inventing plausible-sounding statistics.",
      data:
        "My personal learning notes stored as markdown and JSON files — a small, private corpus used to test retrieval and grounding behaviour.",
      process: [
        "Built a simple keyword and embedding-style lookup over the notes so the model receives only relevant context.",
        "Wrote strict instructions: answer from context, say 'not in my notes' when unsupported, always cite the note file.",
        "Added a review pass that compares the answer against the retrieved snippets to catch unsupported claims.",
        "Tested with deliberately obscure questions to see where grounding fails.",
        "Kept the interface plain so the focus stays on retrieval quality rather than a chat skin.",
      ],
      technology:
        "Python, an LLM API for generation, prompt and context management written explicitly in the codebase, JSON and markdown note storage.",
      result:
        "An experimental prototype that answers study questions from my own notes with citations and refuses to answer outside them. Not a product, not deployed, and documented as an experiment.",
      learning:
        "Grounding is a design decision, not a prompt trick. Most hallucination problems I hit came from retrieval returning the wrong context.",
    },
  },
];

export type Certification = {
  title: string;
  organization: string;
  category: "Data" | "Programming" | "AI/ML" | "Other";
  status: "Completed" | "In progress";
  date: string;
  skills: string[];
  /** Leave undefined until a real verification link exists — do not invent one. */
  verifyUrl?: string;
  note?: string;
};

export const certifications: Certification[] = [
  {
    title: "C Programming Fundamentals",
    organization: "Udemy",
    category: "Programming",
    status: "Completed",
    date: "Add completion date",
    skills: ["C syntax", "Control flow", "Functions", "Arrays", "Pointers basics"],
    note: "Certificate file to be attached — add the PDF or image and its verification link in src/lib/data.ts when available.",
  },
  {
    title: "Python for AI & ML — Training",
    organization: "Kashmir Education Initiative in collaboration with IITM",
    category: "AI/ML",
    status: "In progress",
    date: "Ongoing",
    skills: ["Python", "NumPy", "Pandas", "Intro to ML", "Data handling"],
    note: "Organised by Kashmir Education Initiative in collaboration with IIT Madras. Certificate to be attached at completion.",
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    organization: "Forage",
    category: "Data",
    status: "Completed",
    date: "Certificate date to be added",
    skills: ["Data analysis", "Forensic technology", "Dashboarding", "Business insight"],
    note: "Forage job simulation. Verification link to be added from the certificate page once published.",
  },
];

export const certificationCategories = ["All", "Data", "Programming", "AI/ML", "Other"] as const;

export const journey = [
  {
    year: "2025",
    title: "Started UG",
    text: "Began my Undergraduate Programme in Computer Applications Major: Computer Applications | Minor: Applied Computing at Iqbal Institute of Technology & Management, Hyderpora, Srinagar. Programming fundamentals, computer systems, and the habit of learning in the open.",
    tag: "Foundation",
  },
  {
    year: "Now",
    title: "Data Analytics",
    text: "Developing Python, SQL, Excel and visualization skills — cleaning messy datasets, asking precise questions and turning findings into charts people can actually read.",
    tag: "Analytics",
  },
  {
    year: "Next",
    title: "Data Science",
    text: "Learning statistics, exploratory data analysis and feature engineering: the step from explaining what happened to estimating what might happen next.",
    tag: "Data Science",
  },
  {
    year: "Building",
    title: "Machine Learning",
    text: "Baselines first, then features and models compared honestly — precision, recall, error inspection and the courage to say a model isn't good enough yet.",
    tag: "ML",
  },
  {
    year: "Exploring",
    title: "Artificial Intelligence",
    text: "How intelligent systems are structured, where large language models help, and how to keep generated output grounded in real context.",
    tag: "AI",
  },
  {
    year: "Ongoing",
    title: "Automation",
    text: "Learning how software, data and AI can remove repetitive work — scripts, workflows and pipelines that keep running after the notebook closes.",
    tag: "Automation",
  },
  {
    year: "Future",
    title: "Data Scientist",
    text: "Become a highly capable Data Scientist who can take an unclear problem, work with real data, build something that helps, and explain it clearly.",
    tag: "Ambition",
  },
];

export const pipelineStages = [
  {
    id: "raw",
    label: "Raw Data",
    icon: "◍",
    detail: "Sources arrive as CSVs, database rows, spreadsheets or APIs — inconsistent, incomplete and full of questions.",
    tools: "Files • SQL tables • APIs • Excel",
  },
  {
    id: "clean",
    label: "Clean",
    icon: "◌",
    detail: "Types, duplicates, missing values and outliers handled deliberately, with every decision written down so it can be reversed.",
    tools: "Pandas • NumPy • SQL",
  },
  {
    id: "explore",
    label: "Explore",
    icon: "◎",
    detail: "Distributions, segments, trends and correlations. Questions get framed before charts get drawn.",
    tools: "EDA • Statistics • Group-bys",
  },
  {
    id: "viz",
    label: "Visualize",
    icon: "◐",
    detail: "Charts that answer something: an argument the reader can follow without a caption.",
    tools: "Matplotlib • Seaborn • Power BI",
  },
  {
    id: "model",
    label: "Model",
    icon: "◈",
    detail: "Started from a baseline, then engineered features and compared candidate models against each other.",
    tools: "scikit-learn • Statistics",
  },
  {
    id: "predict",
    label: "Predict",
    icon: "◇",
    detail: "Estimating what is likely next, with clear statements about uncertainty and known failure cases.",
    tools: "Classification • Regression",
  },
  {
    id: "automate",
    label: "Automate",
    icon: "⬡",
    detail: "Wrapping the useful parts into scripts and workflows so the insight does not disappear into a notebook.",
    tools: "Python • APIs • AI workflows",
  },
  {
    id: "impact",
    label: "Impact",
    icon: "★",
    detail: "The end goal: a decision made faster, a task removed, or a process that stops depending on manual memory.",
    tools: "Clarity • Trust • Ownership",
  },
];

export const currentFocus = [
  { title: "Data Analytics", note: "Cleaning, SQL querying and dashboard practice", progress: 78 },
  { title: "Statistics", note: "Probability, distributions and inference basics", progress: 62 },
  { title: "Machine Learning", note: "Baselines, feature engineering, evaluation", progress: 55 },
  { title: "AI / ML", note: "Model families and when each one fits", progress: 50 },
  { title: "Python Automation", note: "File handling, scheduling and reporting scripts", progress: 70 },
  { title: "AI Automation", note: "Grounded LLM steps inside deterministic workflows", progress: 38 },
];

export const lab = [
  {
    id: "data",
    title: "Data Experiments",
    icon: "◍",
    text: "Small studies on open datasets where the point is the method: how cleaning choices change the conclusion.",
    items: ["Cleaning-once vs cleaning-in-stages", "Missing-value strategy comparisons", "Chart honesty checks"],
  },
  {
    id: "ml",
    title: "ML Experiments",
    icon: "◈",
    text: "Baseline-first modelling notes with evaluation tables, error inspection and a written reflection.",
    items: ["Baseline construction", "Feature engineering trials", "Metric sensitivity tests"],
  },
  {
    id: "ai",
    title: "AI Experiments",
    icon: "✳",
    text: "Exploring LLM concepts: grounding, retrieval, evaluation and how to keep generated output honest.",
    items: ["Notes-grounded Q&A", "Prompt structure studies", "Hallucination spot-checks"],
  },
  {
    id: "automation",
    title: "Automation Experiments",
    icon: "⬡",
    text: "Scripts that remove repetitive work at home and in study workflows — file cleanup, reporting, consolidation.",
    items: ["Report consolidation bots", "Scheduled file tidy-ups", "Log-driven run reports"],
  },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/about#skills" },
  { label: "Projects", to: "/projects" },
  { label: "Certifications", to: "/certifications" },
  { label: "Journey", to: "/journey" },
  { label: "Contact", to: "/contact" },
];

export const expertiseCards = [
  {
    title: "Data Analysis",
    meta: "Python • SQL • Excel • Data Visualization",
    icon: "◍",
    accent: "from-brand-500/25 to-cyan-400/15",
  },
  {
    title: "Data Science",
    meta: "Statistics • EDA • Feature Engineering • Predictive Modeling",
    icon: "◎",
    accent: "from-iris-500/25 to-brand-500/15",
  },
  {
    title: "AI / ML",
    meta: "Machine Learning • Model Building • Evaluation",
    icon: "◈",
    accent: "from-cyan-400/25 to-iris-500/15",
  },
  {
    title: "Automation",
    meta: "Python Automation • AI Workflows • Intelligent Systems",
    icon: "⬡",
    accent: "from-emerald-400/25 to-brand-500/15",
  },
];
