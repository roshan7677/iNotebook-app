
import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6927e97f32c41c64cd3de162",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Node by me",
            "description": "This here is a Jaspree's note",
            "tag": "personal",
            "timestamp": "2025-11-27T06:02:39.584Z",
            "__v": 0
        },
        {
            "_id": "6927e98032c41c64cd3de164",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Node by me",
            "description": "This here is a Jaspree's note",
            "tag": "personal",
            "timestamp": "2025-11-27T06:02:40.133Z",
            "__v": 0
        },
        {
            "_id": "6927e99032c41c64cd3de166",
            "user": "6927e95332c41c64cd3de15f",
            "title": "blah blah blah....",
            "description": "v2 note.. change the shit",
            "tag": "personal",
            "timestamp": "2025-11-27T06:02:56.737Z",
            "__v": 0
        },
        {
            "_id": "6927e99232c41c64cd3de168",
            "user": "6927e95332c41c64cd3de15f",
            "title": "blah blah blah....",
            "description": "v2 note.. change the shit",
            "tag": "personal",
            "timestamp": "2025-11-27T06:02:58.673Z",
            "__v": 0
        },
        {
            "_id": "6927e9bc32c41c64cd3de16c",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Some more notes please",
            "description": "v2 note.. change the shit. Let's create some more notes guys! Let's gooooo!!!",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:40.825Z",
            "__v": 0
        },
        {
            "_id": "6927e9bd32c41c64cd3de16e",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Some more notes please",
            "description": "v2 note.. change the shit. Let's create some more notes guys! Let's gooooo!!!",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:41.437Z",
            "__v": 0
        },
        {
            "_id": "6927e9c132c41c64cd3de170",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Some more notes please",
            "description": "v4 note.. change the shit. Let's create some more notes guys! Let's gooooo!!!",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:45.128Z",
            "__v": 0
        },
        {
            "_id": "6927e9c332c41c64cd3de172",
            "user": "6927e95332c41c64cd3de15f",
            "title": "Some more notes please",
            "description": "v5 note.. change the shit. Let's create some more notes guys! Let's gooooo!!!",
            "tag": "personal",
            "timestamp": "2025-11-27T06:03:47.989Z",
            "__v": 0
        }
    ]


    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
