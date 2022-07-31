import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './model.mjs';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/exercises', asyncHandler(async(req, res) => {

    console.log(req.body);    

    // Create exercise
    const exercise = await exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight, 
        req.body.unit,
        req.body.date
    )

    // If exercise was successful send object back, otherwise error message
    if(exercise !== undefined){
        res.status(201).send(exercise);
    } else {
        res.status(400).send({ Error: "Invalid Request"});
    }

}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});