import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res)=>{
    res.send('ffnpong');
})
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });