import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        // call context addNote and then clear the form
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Add a note</h2>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>

    )
}

export default AddNote
