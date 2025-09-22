import React from 'react';
import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const colors = ['#ffd6e0', '#caffbf', '#ffd6a5', '#fdffb6', '#a0c4ff'];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const NoteItem = ({ note, onDelete, onEdit }) => (
  <Card style={{
    background: getRandomColor(),
    margin: 16,
    borderRadius: 16,
    boxShadow: '0 4px 14px 1px rgba(0,0,0,0.07)'
  }}>
    <CardContent>
      <Typography variant="h6">{note.title}</Typography>
      <Typography variant="body2">{note.content}</Typography>
    </CardContent>
    <CardActions>
      <IconButton onClick={onEdit}><EditIcon /></IconButton>
      <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
    </CardActions>
  </Card>
);

export default NoteItem;
