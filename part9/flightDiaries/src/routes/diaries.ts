import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';


const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(diaryService.getNonSensitiveEntries());
})
router.get('/:id', (req,res)=>{
    const diary = diaryService.findById(Number(req.params.id));
    if(diary){
        res.send(diary);

    }else{
        res.sendStatus(404);
    }
})
router.post('/', (_req, res)=>{
    try{
        const newDiaryEntry = toNewDiaryEntry(_req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
    
        res.json(addedEntry);
    
    }catch(error: unknown){
        let errorMessage = 'something went wrong';
        if(error instanceof Error){
            errorMessage += 'error: '+error.message;

        }
        res.status(400).send(errorMessage);
    }

})
export default router;
