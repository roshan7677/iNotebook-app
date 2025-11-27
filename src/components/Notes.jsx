import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem.jsx';
import AddNote from './AddNote.jsx';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h3>Your notes</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                }
                )}
            


            </div>
        </>
    )
}

export default Notes
