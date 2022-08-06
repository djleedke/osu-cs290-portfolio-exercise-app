import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function ExerciseRow({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td className='exercise-date'>{exercise.date.substring(0,10)}</td>
            <td><MdDeleteForever className="trash-can" onClick={() => onDelete(exercise._id)} /></td>
            <td><MdEdit className="pencil" onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default ExerciseRow;