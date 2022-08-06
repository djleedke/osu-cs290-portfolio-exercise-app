import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditPage({ exercise }){

    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.substring(0,10));

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: parseInt(reps),
                weight: parseInt(weight),
                unit: unit,
                date: date
            }),
            headers: {'Content-Type':'application/json'}
        });

        if(response.status === 200){
            alert("Exercise update successful!");
        } else {
            const errMessage = await response.json();
            alert(`Exercise update failed. Status ${response.status}. ${errMessage.Error}.`);
            console.log(response.json());
        }

        history.push("/");
    }

    return (
        <>
            <h2>Edit Page</h2>
            <p>Change an existing exercise.</p>
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
                    <button type="submit" onClick={editExercise} id="submit">Save</button>
                </fieldset>
            </form>
        </>
    );
}

export default EditPage;