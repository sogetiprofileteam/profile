const express = require('express');
const app = express();

app.get('/search', (req, res) => res.send('search'));
app.post('/profile', (req, res) => res.send('Profile Post here'));
app.put('/profile/{id}', (req, res) => res.send('Profile Put here'));
app.delete('/profile/{id}', (req, res) => res.send('Profile delete here'));
app.get('/profile/{id}', (req, res) => res.send('Profile get here'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));