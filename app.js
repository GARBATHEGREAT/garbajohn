const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 1010;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));
app.use(express.urlencoded({ extended: true }));

const projects = {
  'quick-med': {
    number: '01', title: 'Quick Med', eyebrow: 'MOBILE / HEALTHCARE', accent: 'mint',
    summary: 'An Android emergency-response application that guides users through ambulance, hospital, map, account and payment flows with clear mobile interfaces.',
    role: 'Frontend / Android UI Development', year: '2022–2023', stack: ['Android Studio', 'Java', 'XML Layouts', 'Material Components'],
    challenge: 'Emergency software has to make important actions understandable quickly while connecting several multi-screen service journeys.',
    contribution: 'I contributed to the Java and Android interface layer, refining navigation, screen states and UI flows across emergency selection, ambulance and hospital journeys, maps and payments.',
    outcome: 'The project strengthened my experience turning requirements into usable mobile screens, debugging interactions and collaborating inside an existing application codebase.',
    repo: 'https://github.com/GARBATHEGREAT/quickmed'
  },
  'bread-of-life': {
    number: '02', title: 'Bread of Life DCM', eyebrow: 'WEB / COMMUNITY PLATFORM', accent: 'gold',
    summary: 'A live ministry platform with a responsive public experience and a private dashboard for managing content, media, events and visitor messages.',
    role: 'Frontend & Full-Stack Web Development', year: '2026', stack: ['React', 'TypeScript', 'Vite / Vinext', 'Drizzle ORM', 'SQLite / D1'],
    challenge: 'The site needed to organize sermons, ministries, events, galleries and visitor information while remaining simple for church administrators to update.',
    contribution: 'I built the responsive public interface and content-management flows for text, images, videos, slides, service details, social links and submissions, including protected admin access and uploads.',
    outcome: 'The production site gives visitors a polished cross-device experience while allowing the ministry team to update day-to-day content without editing source code.',
    repo: 'https://github.com/GARBATHEGREAT/BOL-church-website', live: 'https://breadoflifedcm.org', published: true
  },
  'cinevoice': {
    number: '03', title: 'CineVoice Studio', eyebrow: 'AI / AUDIO PRODUCT', accent: 'violet',
    summary: 'A Windows-first real-time voice application for microphone routing, authorized voice conversion, model management and local GPU training, plus a research track that trains and evaluates a streaming accent-conversion model.',
    role: 'Product & Python Application Development', year: '2026', stack: ['Python 3.12', 'PySide6', 'FastAPI', 'CUDA / RVC', 'RMVPE'],
    challenge: 'Advanced voice-conversion workflows combine audio devices, GPU inference, model files and latency-sensitive controls that can easily overwhelm users.',
    contribution: 'I developed the desktop workflow, live audio controls, model library, authorized training flow, device routing and RTX 3050-oriented presets around a Python and CUDA inference stack.',
    outcome: 'CineVoice packages a complex local AI-audio pipeline into a focused interface with consent and licensing built in. On the research side I trained a compact (about 4M parameter) streaming student distilled from a larger teacher and scored it on held-out sentences with word error rate and mel error. The first student scored 0.31 against the teacher\'s 0.09; a recogniser-trained front end brought a later version from 0.18 to 0.13. Failed experiments are documented, not hidden.',
    live: 'https://cinevoice-studio.vercel.app', private: true, published: true
  },
  'gandj': {
    number: '04', title: 'GandJ Trading Platform', eyebrow: 'FINTECH / TRADING SANDBOX', accent: 'orange',
    summary: 'A compliance-first trading sandbox with market research, dedicated charts, a TradingView workspace and MT5 demo onboarding—built for practice without real funds or live execution.',
    role: 'Full-Stack Product Development', year: '2026', stack: ['Next.js', 'TypeScript', 'Clerk', 'Neon Postgres', 'Drizzle ORM'],
    challenge: 'The product needed to connect market research, charting and platform onboarding in one credible experience while keeping a clear demo-only boundary ahead of licensing.',
    contribution: 'I built the authenticated multi-route product, dedicated chart and platform pages, TradingView workspace, MT5 demo flow, persisted user data, responsive states and safety gating.',
    outcome: 'GandJ Trading Platform V2 demonstrates end-to-end fintech product delivery for sandbox exploration while keeping real trading, live execution and customer funds disabled.',
    live: 'https://bitcoin-america.vercel.app', private: true, published: true
  },
  'evalkit': {
    number: '05', title: 'evalkit', eyebrow: 'AI EVALUATION / OPEN SOURCE', accent: 'violet',
    summary: 'An open-source toolkit for evaluating AI-written code: it runs each candidate answer against hidden tests, scores it with a written rubric and reports which answer is better and why.',
    role: 'Design & Python Development', year: '2026', stack: ['Python', 'pytest', 'GitHub Actions', 'Cohen\'s kappa'],
    challenge: 'AI-written code often looks right and passes the obvious example while failing on edge cases. Reviewing it consistently needs isolated execution, edge-case tests and a rubric a second reviewer can follow.',
    contribution: 'I built a runner that executes each answer in a separate process with a timeout, a rubric scoring correctness, edge-case robustness and code quality, Markdown pairwise reports, an inter-annotator agreement check and a test suite with CI. Each task ships with plausible-but-wrong answers such as touching intervals, duplicate maximums and infinite loops.',
    outcome: 'The report names the exact failing cases instead of a bare score, and the README documents how I judge an AI answer: run it, edge cases first, read the failures, then quality, and write the reason down.',
    repo: 'https://github.com/GARBATHEGREAT/evalkit'
  }
};

app.get('/', (req, res) => res.render('home'));
app.get('/cv', (req, res) => res.render('cv'));
app.get('/design', (req, res) => res.render('design'));
app.get('/projects/bitcoin-america', (req, res) => res.redirect(301, '/projects/gandj'));
app.get('/projects/:slug', (req, res) => {
  const project = projects[req.params.slug];
  if (!project) return res.status(404).redirect('/#work');
  res.render('project', { project, slug: req.params.slug });
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Garba John portfolio running on port ${PORT}`));
}

module.exports = app;
