const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './static/http404.html'));
})

app.listen(PORT, () => {
    console.log('App started on port: ', PORT);
})