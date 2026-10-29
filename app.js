import express from 'express';

const app = express();

app.get('/', (req, res)=>{
    res.send('hieeee');
})

app.listen(3000);