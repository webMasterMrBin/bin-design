const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '.out')));

app.listen('5000', () => console.log('now listen 5000'));

app.get('*', (req, res) => {
  res.render('index.html');
});
