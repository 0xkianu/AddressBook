const express = require('express');
const path = require('path');
const parser = require('body-parser');
const app = express();
const contacts = require('./routes/contacts');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/contacts', contacts);

app.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
});

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(3000, function() {
    console.log('listening on port 3000');
});


