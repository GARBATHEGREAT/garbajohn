const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 1010;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('home'));
app.get('/cv', (req, res) => res.render('cv'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Garba John portfolio running on port ${PORT}`);
});
