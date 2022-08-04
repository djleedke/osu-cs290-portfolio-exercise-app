// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect to the Atlas cluster or local MongoDB.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// Confirm that the database has connected 
// and print a message in the console.
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define the collection's schema.
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true }
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Validates the provided Exercise object.
 * 
 * @param {Exercise} exercise An exercise object. 
 * @returns Returns false if validation fails, true if successful.
 */
function validateExercise(exercise) {

    // Name validation, must be string, cannot be null, and must have at least 1 character
    if(typeof exercise.name !== "string" || exercise.name == undefined || exercise.name.length == 0) {
        return false;
    }

    // Reps validation, must be an integer, cannot be less than 0 or more than 10
    if(!Number.isInteger(exercise.reps) || exercise.reps <= 0){
        return false;
    }

    // Reps validation, must be an integer, cannot be less than 0 or more than 10
    if(!Number.isInteger(exercise.weight) || exercise.weight <= 0) {
        return false;
    }

    // Unit validation, must be a string, must be in specified list of units
    if(typeof exercise.unit !== "string") {
        return false;
    } else {

        let choices = ["kgs", "lbs", "miles"] 
        let found = false;

        choices.forEach((choice, i) => {
            if (exercise.unit === choice){
                found = true;
            }
        });

        if(!found){
            return false;
        }
    }

    if(exercise.date == undefined) {
        return false;
    }


    return true;

}

/**
 * Creates an exercise entry in the database.
 * 
 * @param {string} name The name of the exercise
 * @param {integer} reps The number of reps, must be an integer greater than 0
 * @param {integer} weight The weight, must be an integer greater than 0
 * @param {string} unit The unit of measure, must be 'kgs', 'lbs', or 'miles'
 * @param {date} date The date the exercise took place
 * @returns The created exercise object from MongoDB or undefined if validation fails.
 */
const createExercise = async (name, reps, weight, unit, date) => {
    
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });

    // Validating the object
    if(validateExercise(exercise)){
        return exercise.save();
    } else {
        return undefined;
    }

}

/**
 * Retrieves a list of all exercise objects from the database.
 * 
 * @returns A list of all exercise objects from the database.
 */
const retrieveExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

/**
 * Retrieves an exercise from the database for the specified id.
 * 
 * @param {_id} exerciseId The id of the exercise 
 * @returns The results of the query.
 */
const findById = async (exerciseId) => {
    const query = Exercise.findById(exerciseId);
    return query.exec();
}

/**
 * Updates the specified exercise with the provided data.
 * 
 * @param {*} filter A filter containing the object to be updated.
 * @param {*} update The updated object.
 * @returns The updated exercise object, null if validation failed.
 */
const updateExercise = async (filter, update) => {

    if(validateExercise(update)){

        let options = { returnDocument: 'after'}
        const result = await Exercise.findOneAndUpdate(filter, update, options)
            .catch(error => {
                return {Error: 'Invalid Request'};
            });
        return result;
    } else {
        return {Error: 'Invalid Request'};
    }

}

/**
 * Deletes the Exercise with the specified id.
 * 
 * @param {*} exerciseId The exercise id
 * @returns The number of objects deleted
 */
const deleteById = async (exerciseId) => {
    const result = await Exercise.deleteOne({_id: exerciseId});
    return result.deletedCount;
}

export { createExercise, deleteById, findById, retrieveExercises, updateExercise }