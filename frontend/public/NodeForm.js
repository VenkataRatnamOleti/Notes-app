import React, { useState, useEffect } from 'react';

const NoteForm = ({ submit, note, cancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      submit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit">{note ? 'Update' : 'Add'} Note</button>
      {note && <button type="button" onClick={cancel}>Cancel</button>}
    </form>
  );
};

export default NoteForm;
