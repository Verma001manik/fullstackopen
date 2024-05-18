import express from 'express';
const app = express();
app.use(express.json());

import { calculator } from './calculator';
app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.post('/calculate', (_req, res)=>{
  const {value1, value2 , op} = _req.body;
  const result = calculator(value1,value2, op);
  res.send({result});

})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});