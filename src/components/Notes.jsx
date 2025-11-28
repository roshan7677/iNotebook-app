import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem.jsx';
import AddNote from './AddNote.jsx';



const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ _id: "", title: "", description: "", tag: "" })

    useEffect(() => {
        getNotes();
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        // Set the selected note in state so the modal fields populate
        setNote({ _id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
        // Programmatically create/show the Bootstrap modal instance
        const modalEl = document.getElementById('staticBackdrop');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        } else if (ref.current) {
            // fallback to clicking hidden button if bootstrap not available
            ref.current.click();
        }
    }

    const handleSaveClick = (e) => {
        e.preventDefault();
        // Call editNote from context with updated values
        editNote(note._id, note.title, note.description, note.tag);
        // Close the modal
        const modalEl = document.getElementById('staticBackdrop');
        if (modalEl && window.bootstrap) {
            const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
            modal.hide();
        }
        // Clear the form
        setNote({ _id: "", title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your notes</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                }
                )}



            </div>
        </>
    )
}

export default Notes
