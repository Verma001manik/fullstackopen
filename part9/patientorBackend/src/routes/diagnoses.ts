import express from 'express';
import diagnose from '../services/diagnose';
const router = express.Router();

router.get('/', (_req,res)=>{
    res.send(diagnose.getDiagnoses());
})
router.post('/', (_req,res)=>{
    res.send('posting diagnoses');

})
export default router;
