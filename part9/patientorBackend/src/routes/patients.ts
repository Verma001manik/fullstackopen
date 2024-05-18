import express from 'express';
import patient from '../services/patient';
// import patientEntries from '../../data/patientsData';
const router = express.Router();

router.get('/', (_req, res)=>{
    res.send(patient.getSensitiveEntries());
})
router.get('/:id', (_req,res)=>{
    const p = patient.findById(String(_req.params.id));
    if(p){
        res.send(p);

    }else{
        res.sendStatus(404);

    }


})
router.post('/', (_req, res)=>{
    const {name, dateOfBirth, ssn , gender, occupation} = _req.body;
    const addEntry = patient.createPatients(name, dateOfBirth,gender,ssn, occupation );
    res.json(addEntry);

})

export default router;

