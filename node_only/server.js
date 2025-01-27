const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.post('/save', (req, res) => {
  const subjects = req.body;
  res.json({ message: 'Plan dnia został otrzymany.' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
