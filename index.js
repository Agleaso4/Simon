const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get(`/scores`, (_req, res) => {
    res.send(scores);
});

apiRouter.post((req, res) => {
    scores = updateScores(req.body, scores);
    res.send(scores);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'})
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

let scores = [];
function updateScores(newScores, scores){
    let found = false;
    for(const [i, prevScore] of scores.entries()){
        if (newScores.score > prevScore.score){
            scores.splice(i, 0, newScores);
            found = true;
            break;
        }
    }
    if (!found){
        scores.push(newScores);
    }
    if(scores.length > 10){
        scores.length = 10;
    }
    return scores;
}