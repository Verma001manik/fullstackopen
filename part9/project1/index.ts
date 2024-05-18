import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('hello fullstack');
});

app.get(`/bmi/:height/:weight`, (req, res) => {
    const { height, weight } = req.params;

    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
        return res.status(400).send('Invalid height or weight');
    }

    const bmiCategory = calculateBmi(parsedHeight, parsedWeight);
    const result = {
        height: height,
        weight: weight,
        bmiCategory: bmiCategory
    }
    // Return the calculated BMI category as a response
    return res.json({result});
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
