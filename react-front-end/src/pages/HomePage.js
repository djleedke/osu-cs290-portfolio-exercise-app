import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExercise }){

    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }

    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE'});
        if(response.status === 204){
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <div>
            <h2>Home Page</h2>

            {exercises.length > 0 ? (
                <>
                    <p>Your exercise list:</p>
                    <ExerciseTable exercises={exercises} onEdit={onEditExercise} onDelete={onDeleteExercise}/>
                </>
            ) : (
                <p>Create an exercise to get started!</p>
            )}
            
        </div>
    );
}

export default HomePage;