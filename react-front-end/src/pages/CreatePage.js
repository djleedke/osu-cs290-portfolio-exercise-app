import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreatePage(){

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {

        const exercise = {
            name: name, 
            reps: parseInt(reps),
            weight: parseInt(weight), 
            unit: unit, 
            date: date
        }

        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type':'application/json',
            }
        });

        if(response.status === 201) {
            alert("Exercise created!");
        } else {
            const errMessage = await response.json();
            alert(`Exercise creation failed. Status ${response.status}. ${errMessage.Error}.`);
        }
    
        history.push("/");
    };
    
    return (
        <>
            <h2>Create Exercise</h2>
            <p>Add an exercise.</p>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name </label>
                        <input type="text" autoComplete="off" placeholder="Enter the name" value={name} onChange={e => setName(e.target.value)} id="exercise-name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reps">Reps </label>
                        <input type="number" placeholder="Enter the number of reps" value={reps} onChange={e => setReps(e.target.value)} id="exercise-reps" min="1" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight </label>
                        <input type="number" placeholder="Enter the weight" value={weight} onChange={e => setWeight(e.target.value)} id="exercise-weight" min="1" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Unit </label>
                        <select id="exercise-unit" value={unit} onChange={e => setUnit(e.target.value)}>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                            <option value="miles">miles</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date </label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} id="exercise-date" required></input>
                    </div>
                    <button type="submit" onClick={addExercise} id="submit">Add Exercise</button>
                </fieldset>
            </form>
        </>
    );
}

export default CreatePage;