
import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = [];


    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
        });
        const dataJSON = await response.json();
        setNotes(dataJSON);
    }




    //Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL to add note
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const savedNote = await response.json();
        // Append the saved note returned from backend
        setNotes(prevNotes => [...prevNotes, savedNote]);
    }

    //Delete a note
    const deleteNote = async (id) => {
        //TODO: API CALL to Delete from Backend too
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
        });


        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a note  
    const editNote = async (id, title, description, tag) => {

        // API CALL 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const updatedNoteResponse = await response.json();
        // backend returns { note: <updatedNote> }
        const updatedNote = updatedNoteResponse.note || updatedNoteResponse;
        // Update local state immutably
        setNotes(prevNotes => prevNotes.map(n => n._id === id ? updatedNote : n));

    }
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};




export default NoteState;
