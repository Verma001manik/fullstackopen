/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
const cors = require('cors');
app.use(cors());
import diaryRouter from './routes/diaries';
app.use(express.json());

app.get('/', (_req, res)=>{
    res.send('search either for /ping or /api/diaries');
})
app.get('/ping', (_req,res)=>{
    res.send("search for /api/diaries.. dont waste your fucking time here   ");
})

app.use('/api/diaries', diaryRouter)
const PORT = 3003 ;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

})