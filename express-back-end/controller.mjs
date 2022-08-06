import 'dotenv/config';
import e from 'express';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './model.mjs';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// 1. Create using POST /exercises
app.post('/exercises', asyncHandler(async(req, res) => {

    // Create exercise
    const exercise = await exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight, 
        req.body.unit,
        req.body.date
    ).then(exercise => {
        if(exercise !== undefined){
            res.status(201).json(exercise);
        } else {
            res.status(400).json({ Error: 'Invalid Request'})
        }
    });

}));

// 2. Read using GET /exercises
app.get('/exercises', asyncHandler(async(req,res) => {

    const exercise = await exercises.retrieveExercises();

    if(exercise !== null){
        res.status(200).json(exercise);
    } else {
        res.status(404).json({ Error: "Not Found" });
    }

}));

// 3. GET using GET /exercises/:id
app.get('/exercises/:id', (req, res) => {

    const exerciseId = req.params.id;
    exercises.findById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Not Found'});
            }
        });

});

// 4. Update using PUT /exercises/:id
app.put('/exercises/:id', (req, res) => {

    const exerciseId = req.params.id;

    exercises.findById(exerciseId)
        .then(exercise => {
            const update = {};
            if(exercise !== null){
                
                if(req.body.name !== undefined){
                    update.name = req.body.name;
                }
                if(req.body.reps !== undefined){
                    update.reps = req.body.reps;
                }
                if(req.body.weight !== undefined){
                    update.weight = req.body.weight;
                }
                if(req.body.unit !== undefined){
                    update.unit = req.body.unit;
                }
                if(req.body.date !== undefined){
                    update.date = req.body.date;
                }

                exercises.updateExercise({ _id: exerciseId }, update)
                .then(exercise => {

                    if(exercise.Error == undefined && exercise !== null){
                        res.status(200).json(exercise);
                    } else if (exercise.Error){
                        res.status(400).json(exercise);
                    } else {
                        res.status(404).json({ Error: "Not Found"});
                    }
                });

            } else {
                res.status(404).json({ Error: "Not Found"});
            }
            
        })
        .catch(error => {
            res.status(404).json({ Error: "Not Found"})
        });

});

// 5. DELETE using DELETE /exercises/:id
app.delete('/exercises/:id', (req, res) => {
    
    const exerciseId = req.params.id;

    exercises.deleteById(exerciseId)
        .then(result => {
            if(result === 1){
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not Found" });
            }
        })
        .catch(error => {
            res.status(404).json({ Error: "Not Found" })
        });

});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});