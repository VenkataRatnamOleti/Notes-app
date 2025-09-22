import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (note) => {
    await axios.post('http://localhost:5000/api/notes', note);
    fetchNotes();
  };

  const updateNote = async (id, note) => {
    await axios.put(`http://localhost:5000/api/notes/${id}`, note);
    fetchNotes();
    setEditing(null);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="container">
      <h1 className="title">📝 Note Assist</h1>
      <NoteForm
        submit={editing ? (note) => updateNote(editing._id, note) : addNote}
        note={editing}
        cancel={() => setEditing(null)}
      />
      <NoteList notes={notes} deleteNote={deleteNote} editNote={setEditing} />
    </div>
  );
}

export default App;
