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
    summary: 'A Windows-first real-time voice application for clean microphone routing, authorized RVC conversion, voice-model management, recording and local GPU training.',
    role: 'Product & Python Application Development', year: '2026', stack: ['Python 3.12', 'PySide6', 'FastAPI', 'CUDA / RVC', 'RMVPE'],
    challenge: 'Advanced voice-conversion workflows combine audio devices, GPU inference, model files and latency-sensitive controls that can easily overwhelm users.',
    contribution: 'I developed the desktop workflow, live audio controls, model library, authorized training flow, device routing and RTX 3050-oriented presets around a Python and CUDA inference stack.',
    outcome: 'CineVoice packages a complex local AI-audio pipeline into a focused interface for calls, OBS, games and recordings, with consent and model licensing built into the workflow.',
    live: 'https://cinevoice-studio.vercel.app', private: true, published: true
  },
  'bitcoin-america': {
    number: '04', title: 'Bitcoin America', eyebrow: 'FINTECH / FULL-STACK PRODUCT', accent: 'orange',
    summary: 'A live non-custodial crypto decision-support product with market data, calculators, paper portfolios, watchlists, alerts, learning progress and an admin analytics console.',
    role: 'Full-Stack Product Development', year: '2026', stack: ['Next.js', 'TypeScript', 'Clerk', 'Neon Postgres', 'Drizzle ORM'],
    challenge: 'The product needed to bring market research, planning tools, education and saved member data together without handling customer funds or encouraging unsafe trading behavior.',
    contribution: 'I built multi-route product flows, authenticated member and admin experiences, persisted portfolio and learning data, server-side market integration and responsive application states.',
    outcome: 'The deployed application demonstrates complete product thinking across public pages, authentication, live data, database-backed workspaces, calculators and operational admin tools.',
    live: 'https://bitcoin-america.vercel.app', private: true, published: true
  }
};

app.get('/', (req, res) => res.render('home'));
app.get('/cv', (req, res) => res.render('cv'));
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
