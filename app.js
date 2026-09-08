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
    summary: 'A medical emergency application built around a real-world need: helping people respond to emergency situations through a clearer, more usable mobile experience.',
    role: 'Frontend / Interface Development', year: '2022–2023', stack: ['Android Studio', 'Java', 'UI Development', 'Team Collaboration'],
    challenge: 'Emergency software has to communicate quickly. The interface needed to make important actions understandable without adding unnecessary complexity.',
    contribution: 'I contributed primarily to frontend and interface development while collaborating with the wider development team on requirements, debugging and iterative improvements.',
    outcome: 'The project gave me practical experience building software around real user needs while working inside a collaborative development workflow.',
    repo: 'https://github.com/JohnTombra/QuickMedicalServicesUpgrade'
  },
  'bread-of-life': {
    number: '02', title: 'Bread of Life DCM', eyebrow: 'WEB / COMMUNITY PLATFORM', accent: 'gold',
    summary: 'A modern church platform designed to make messages, events, ministries and community information easy to discover across devices.',
    role: 'Web Product Development', year: '2026', stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    challenge: 'The platform needed to organize a broad amount of ministry content without making the experience feel crowded or difficult to navigate.',
    contribution: 'I worked on the responsive product experience, content structure and interface direction using a modern React-based stack.',
    outcome: 'The result is a multi-section community platform designed to support both first-time visitors and returning members.',
    repo: 'https://github.com/GARBATHEGREAT/BOL-church-website', live: 'https://breadoflifedcm.gandjtechhub.chatgpt.site'
  },
  'cinevoice': {
    number: '03', title: 'CineVoice Studio', eyebrow: 'AI / AUDIO PRODUCT', accent: 'violet',
    summary: 'An ongoing product exploration around AI-assisted voice and audio workflows, with emphasis on clarity, usability and real-time interaction.',
    role: 'Product / Software Exploration', year: '2026', stack: ['AI Workflows', 'Audio UX', 'Product Design', 'Software Prototyping'],
    challenge: 'Powerful AI audio tools can quickly become complicated. The product direction focuses on making advanced workflows feel approachable and controlled.',
    contribution: 'I have been exploring product structure, interaction flows and implementation patterns for voice and audio experiences.',
    outcome: 'The project reflects my interest in turning emerging technology into software that feels understandable and useful.',
    private: true
  },
  'bitcoin-america': {
    number: '04', title: 'Bitcoin America', eyebrow: 'FINTECH / FULL-STACK PRODUCT', accent: 'orange',
    summary: 'A broader multi-page software product exploration focused on account flows, dashboards and building a more complete application experience.',
    role: 'Full-Stack Product Exploration', year: '2026', stack: ['Full Stack', 'Product Design', 'Web Application', 'UX Flows'],
    challenge: 'The goal is to move beyond isolated screens and think through how a complete application behaves across multiple user journeys.',
    contribution: 'I have been developing the product structure, interface direction and application workflows as part of my progression toward more complete software products.',
    outcome: 'The project is part of my ongoing work to strengthen end-to-end product engineering skills.',
    private: true
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
