import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);

  return (
    <div>
      <h2>About component {a.name} and {a.class}</h2>
    </div>
  );
};

export default About;
