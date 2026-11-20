export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  role: string;
  status: string;
  stack: string[];
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenge?: string;
  event?: string;
  live?: string;
  source?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "meteora-playground",
    name: "Meteora Playground",
    category: "Web3 / Game design",
    summary:
      "A playable introduction to liquidity. Place chips, follow a moving price and see what happens when your range misses.",
    role: "Game design and development",
    status: "Playable demo",
    stack: ["Next.js", "TypeScript", "React"],
    problem:
      "A liquidity range is easy to draw and harder to understand. What happens to a position when the price spends a round just outside its bounds?",
    solution:
      "I built a short arcade game around that question. Bin Runner gives you a limited pile of chips and a moving price. After a round, the Range Lab lets you slow down and compare different allocations.",
    architecture:
      "A seeded price generator makes a round repeatable. The rules for scoring and distributing chips live separately from the React board. Personal scores stay in browser storage.",
    features: [
      "Replay a 60-second round against the same price path.",
      "Compare narrow and wide ranges with an equal chip budget.",
      "Explore Meteora’s DLMM, DAMM v2 and DBC through diagrams and documentation.",
    ],
    challenge:
      "The arcade needs points to play for, while actual liquidity provision involves financial risk. Virtual chips and a separate scoring formula keep the lesson focused on coverage.",
    live: "https://meteora-playground-sigma.vercel.app/",
    source: "https://github.com/Adil-ca/meteora-playground",
    featured: true,
  },
  {
    slug: "mandatemukti",
    name: "MandateMukti",
    category: "Fintech / Consumer tools",
    summary:
      "A private way to work backwards from a recurring bank debit to the mandate, cancellation steps and paperwork behind it.",
    role: "Founder and developer",
    status: "Live product",
    stack: ["Next.js", "TypeScript", "React", "jsPDF"],
    problem:
      "A bank SMS can identify a merchant, an amount and a reference number, yet leave its reader wondering where to stop the next payment.",
    solution:
      "I founded MandateMukti to give that moment a practical next step. Someone can paste a message or describe a debit manually, identify the likely mandate and follow the relevant guide in their own payment app.",
    architecture:
      "The browser processes the message locally. Structured guide files supply app and merchant instructions. A client-side PDF builder assembles the details the user chooses to include in an evidence pack.",
    features: [
      "Identify recurring debit clues in a bank message.",
      "Look up UPI AutoPay, e-mandate and NACH guidance.",
      "Prepare a complaint draft and download a PDF evidence pack.",
    ],
    challenge:
      "The useful details are also sensitive. Keeping message analysis and document generation on the device lets a person use the guide without creating an account.",
    live: "https://www.mandatemukti.in/",
    source: "https://github.com/Adil-ca/MandateMukti",
    featured: true,
  },
  {
    slug: "sahaaya-relay",
    name: "Sahaaya Relay",
    category: "Civic tech / Offline tools",
    summary:
      "A bilingual disaster-response prototype that preserves an emergency report on a phone when its network connection drops.",
    role: "Prototype development",
    status: "Hackathon prototype",
    stack: ["Next.js", "TypeScript", "IndexedDB", "Dexie"],
    problem:
      "A survivor can know where help is needed long before their phone regains a signal. A form that needs a successful network request can lose the report at exactly that moment.",
    solution:
      "I worked on an English and Malayalam reporting flow that turns the request into a local Aid Packet. The prototype prepares a QR handoff and shows how a responder could review the packet in a simulated command centre.",
    architecture:
      "IndexedDB holds unfinished drafts and completed packets. A deterministic representation and a SHA-256 digest let the receiving workflow check whether packet contents have changed.",
    features: [
      "Recover a draft after leaving a report.",
      "Prepare a compact QR payload and record a relay receipt.",
      "Follow a prepared flood scenario through the simulated responder workflow.",
    ],
    challenge:
      "A repeated handoff can look like a second incident. Packet identity and duplicate checks keep the same report recognisable across transfers. The responder and dispatch steps are demonstrations.",
    live: "https://sahaaya-relay.vercel.app/",
    source: "https://github.com/Adil-ca/Sahaaya-Relay",
    featured: true,
  },
  {
    slug: "pitch-patch",
    name: "PitchPatch",
    category: "AI / Writing tools",
    summary:
      "An editing desk for mobile app launches. Diagnose a draft, compare repairs and keep the version that sounds like you.",
    role: "Product development",
    status: "Hackathon prototype",
    event: "HackOnVibe · July 2026",
    stack: ["Next.js", "TypeScript", "Gemini", "Supabase", "Zod"],
    problem:
      "A launch announcement can list every feature and still leave a reader unsure who the app helps or why they should try it.",
    solution:
      "PitchPatch starts with the audience, the app and the original post. It scores six aspects of the copy and places a revised draft beside the original. The writer can accept a focused edit, undo it or export a platform-specific version.",
    architecture:
      "A Next.js route requests structured Gemini output, which Zod checks before display. Supabase stores signed-in users’ saved analyses with row-level access rules. A labelled, prepared example shows the workflow when live analysis is unavailable.",
    features: [
      "Inspect feedback on the hook, audience, benefit, tone, trust and call to action.",
      "Undo a repair and recover the exact previous draft.",
      "Copy a channel-specific draft or download the review.",
    ],
    challenge:
      "A fluent rewrite can introduce a claim the app never made. The repair instructions use the supplied product facts, and the side-by-side view leaves the final editorial decision with the writer.",
    live: "https://pitch-patch.vercel.app/",
    source: "https://github.com/Adil-ca/Pitch-Patch",
    featured: true,
  },
  {
    slug: "venodesign",
    name: "VenoDesign",
    category: "Identity / Web studio",
    summary:
      "The service site for my independent design brand, with working portfolio examples for each level of the studio’s offering.",
    role: "Founder and web designer",
    status: "Live studio site",
    stack: ["HTML", "CSS", "JavaScript"],
    problem:
      "It is hard to choose a portfolio package from a list of features. A prospective client needs to see how a simple site and a motion-led one actually feel.",
    solution:
      "I built a home for VenoDesign where visitors can compare the studio’s basic, styled and animated offerings, open an example and start an enquiry about a specific package.",
    architecture:
      "The studio uses a static document with custom CSS and JavaScript for navigation and interaction. The package entries open standalone example sites and compose a package-specific WhatsApp enquiry.",
    features: [
      "Compare three portfolio design packages.",
      "Open working examples from individual package descriptions.",
      "Start an enquiry with the selected package already in the message.",
    ],
    challenge:
      "The examples do the explaining. Giving each one its own destination keeps the studio overview readable while letting prospective clients explore a design in use.",
    live: "https://veno-design.vercel.app/",
    source: "https://github.com/Adil-ca/VENO-DESIGN",
    featured: true,
  },
  {
    slug: "runtime-radar",
    name: "Runtime Radar",
    category: "AI / Developer tools",
    summary:
      "A workbench for running the same prompt through several models and comparing their output, latency and recorded cost.",
    role: "Full-stack development",
    status: "Hackathon prototype",
    event: "BTL Runtime Hackathon",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "BTL Runtime"],
    problem:
      "Two models can answer the same prompt differently. Reading the answers alone tells a developer little about the time, caching and billing behind each call.",
    solution:
      "I built a comparison dashboard for the BTL Runtime Hackathon. It places outputs beside the timing and accounting information returned for each request.",
    architecture:
      "Next.js route handlers issue runtime requests on the server and forward selected response headers to the interface. The browser can show the recorded request ID while the service credential stays server-side.",
    features: [
      "Compare one prompt across multiple models.",
      "Read request identifiers, cache tiers and reported charges.",
      "Repeat a request to examine cache behaviour.",
    ],
    live: "https://runtime-rebels.vercel.app/",
    source: "https://github.com/Adil-ca/Runtime-Rebels",
    featured: false,
  },
  {
    slug: "memory-rift",
    name: "Memory Rift",
    category: "Creative coding / Games",
    summary:
      "A survival dungeon that remembers a player’s choices and turns the completed run into a shareable record.",
    role: "Game development",
    status: "Playable prototype",
    stack: ["React", "TypeScript", "Vite", "Express"],
    problem:
      "A score says how a run ended. It rarely says what decisions the player made along the way.",
    solution:
      "In the dungeon, choices change health, inventory and the events that follow. At the end, the memory timeline gives the player a record of the route they took. A second mode turns the same world into a short arcade flight.",
    architecture:
      "The React game tracks run state and can generate encounters locally. Its backend includes adapters for optional 0G services. The default local simulation and preview proof cards work without a connected wallet.",
    features: [
      "Choose a class and risk style before entering the dungeon.",
      "Review a run’s decisions and accumulated traits.",
      "Play Rift Flight with keyboard or drag controls.",
    ],
    live: "https://memory-rift.vercel.app/",
    source: "https://github.com/Adil-ca/Memory-Rift",
    featured: false,
  },
  {
    slug: "shadowleak",
    name: "ShadowLeak",
    category: "Privacy / Browser tools",
    summary:
      "A local screenshot scanner for spotting accidentally visible contact details, links, QR codes and embedded metadata.",
    role: "Web development",
    status: "Live web tool",
    stack: ["Next.js", "TypeScript", "Tesseract.js", "Canvas"],
    problem:
      "A screenshot meant to show one element of a page can include a private meeting link, a phone number or location metadata.",
    solution:
      "ShadowLeak lets the person preparing to share an image scan it in the browser, review potential exposures and export a cleaned copy.",
    architecture:
      "Client-side OCR reads visible text. QR decoding and metadata inspection add findings that a text search alone would miss. A canvas export rebuilds the output image locally.",
    features: [
      "Drop an image into the local scanner.",
      "Review findings alongside the original screenshot.",
      "Export an image rebuilt without its original embedded metadata.",
    ],
    challenge:
      "Small codes and low-contrast text can escape automated detection. The review step keeps the original visible for a final human check.",
    live: "https://shadowleak.vercel.app/",
    source: "https://github.com/Adil-ca/ShadowLeak",
    featured: false,
  },
  {
    slug: "mern-task-dashboard",
    name: "MERN Task Management Dashboard",
    category: "Full-stack / Productivity",
    summary:
      "A task-management exercise that follows a task from a React form through a REST API to a MongoDB record.",
    role: "Full-stack development",
    status: "Frontend preview",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    problem:
      "A task list has to keep its summary counts and individual records in sync as users edit due dates or mark work complete.",
    solution:
      "I built a dashboard with create, edit, complete and delete actions, alongside totals for open and finished work. The public preview currently reports that its task API is unavailable.",
    architecture:
      "A Vite and React client talks to Express routes. Mongoose validates records before writing to MongoDB. The source includes API tests for the core task lifecycle.",
    features: [
      "Record a task with a description, status and due date.",
      "Change pending and completed states through the task API.",
      "Run the client and server together using the repository instructions.",
    ],
    live: "https://mern-task-management-dashboard-nf4r.vercel.app/",
    source: "https://github.com/Adil-ca/mern-task-management-dashboard",
    featured: false,
  },
  {
    slug: "cjp-action-hub",
    name: "CJP Action Hub",
    category: "Community / Creator tools",
    summary:
      "An independent community resource that puts shareable graphics, public links and a creator kit in one browser-based workspace.",
    role: "Frontend development",
    status: "Live web tool",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem:
      "Supporters looking for a particular public link or a reusable graphic can end up piecing both together from social posts.",
    solution:
      "I built a static resource for Cockroach Janta Party supporters that collects reference links, explains the published manifesto and offers editable poster templates. The site identifies its independent status.",
    architecture:
      "Shared content files feed the Next.js pages. The poster and profile-frame tools use browser APIs to prepare a graphic visitors can download.",
    features: [
      "Find public links and their QR codes.",
      "Customise and download a share card.",
      "Browse manifesto summaries and creator-kit assets.",
    ],
    live: "https://cjp-action-hub-omega.vercel.app/",
    source: "https://github.com/Adil-ca/CJP-Action-Hub",
    featured: false,
  },
  {
    slug: "fresheros",
    name: "FresherOS",
    category: "Career tools / Interface study",
    summary:
      "An early Job Passport interface for Indian graduates organizing academic projects, applications and interview preparation.",
    role: "Interface development",
    status: "Local prototype",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem:
      "A first application asks a graduate to turn coursework, projects and internships into evidence of what they can do. That material often sits across separate documents.",
    solution:
      "FresherOS explores how a Job Passport could collect those pieces in one place. Its landing page and module screens establish the structure for a résumé, outreach, interview practice and a skills plan.",
    architecture:
      "The App Router serves a shared passport index and individual module routes. Typed module data defines the visible tools. The available build is an interface foundation, with the AI writing workflow still at the concept stage.",
    features: [
      "Browse the Job Passport’s module index.",
      "Inspect individual routes for résumé and application material.",
      "See how proof-building and skill planning fit into the same workspace.",
    ],
    featured: false,
  },
];

export const communities = [
  {
    name: "Syntetika",
    role: "Community Manager",
    description:
      "I help members find answers, coordinate community announcements and keep conversations moving.",
    url: "https://x.com/Syntetika",
  },
  {
    name: "PICWE",
    role: "Ambassador",
    description:
      "I introduce newcomers to the project, share updates and carry community feedback back to the team.",
    url: "https://x.com/PicWeGlobal",
  },
];

export const toolkit = [
  {
    group: "Interface",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Data & services",
    tools: ["Node.js", "Express", "MongoDB", "Supabase", "IndexedDB"],
  },
  {
    group: "Creative development",
    tools: ["Framer Motion", "GSAP", "Canvas", "Vite"],
  },
  {
    group: "AI & onchain experiments",
    tools: ["Gemini", "BTL Runtime", "Zod", "0G Storage SDK"],
  },
];
