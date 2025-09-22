import React from 'react';
import NoteItem from './NoteItem';
import "./NoteList.css";

const NoteList = ({ notes, deleteNote, editNote }) => (
  <div className="notes-list">
    {notes.map(note => (
      <NoteItem
        key={note._id}
        note={note}
        onDelete={() => deleteNote(note._id)}
        onEdit={() => editNote(note)}
      />
    ))}
  </div>
);

export default NoteList;
