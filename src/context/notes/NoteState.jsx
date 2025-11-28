
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
        console.log(dataJSON);
        setNotes(dataJSON);


        const note = {
            "_id": "6927e9c332c41c64cd3de172",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Fake added note (Hard coded)",
            "description": "Fake added note (Hard coded).................",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:47.989Z",
            "__v": 0
        };
        // Append immutably  do not mutate state or use push() result
        setNotes(prevNotes => [...prevNotes, note]);
    }




    //Add a Note
    const addNote = async (title, description, tag) => {
        // TODO API CALL
        await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "6927e9c332c41c64cd3de172",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Fake added note (Hard coded)",
            "description": "Fake added note (Hard coded).................",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:47.989Z",
            "__v": 0
        };
        // Append immutably  do not mutate state or use push() result
        setNotes(prevNotes => [...prevNotes, note]);
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
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNmFhMmNjYTgyZGJjNjQ0M2VmZmJjIn0sImlhdCI6MTc2NDE0MTYzM30.TM-2wg-MHDyv777PYnEI8rQfxKppxrSlSgeKdStv6As'
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Logic to Edit in client
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
        }

    }
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};




export default NoteState;
