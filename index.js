const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

const data = require(path.join(__dirname, '/data/data.js')).data;
let currentClosest = {index: 0, score: 100};

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/survey', (req,res)=>{
    res.sendFile(path.join(__dirname,'survey.html'));
})
app.post('/survey', (req, res)=>{
    console.log(req.body.score);
    let newOptions = req.body.score.map(i => parseInt(i));
    console.log(newOptions);
    let optionsTotal = newOptions.reduce(reducer);
    console.log(optionsTotal);
    data.forEach((d,i) => {
        let currentScore = d.score;
        let score = currentScore.reduce(reducer);
        if(score === optionsTotal){
            res.json(d);
            return;
        }
        if(Math.abs(optionsTotal - score) < currentClosest.score){
            currentClosest.index = i;
        }
        
    })
    data.push({score: newOptions, name: req.body.name, photo: req.body.photo});
    console.log(data);
    res.json(data[currentClosest.index]);

})

app.listen(process.env.PORT || 3000, function(){
    console.log('Friend finder app started');
    console.log(data);
})


function reducer(acc, v){
    return acc + v;
}