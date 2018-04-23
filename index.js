const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const data = require(path.join(__dirname, '/data/data.js'));





app.listen(process.env.PORT || 3000, function(){
    console.log('Friend finder app started');
    console.log(data);
})