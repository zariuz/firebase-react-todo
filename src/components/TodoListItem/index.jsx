import React from 'react';
import {
  Checkbox,
  Icon,
  IconButton,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
} from 'mdc-react';

export default function TodoListItem({ todo, onCompleteChange }) {
  return (
    <ListItem className="todo-list-item">
      <ListItemGraphic>
        <Checkbox checked={todo.completed} onChange={onCompleteChange} />
      </ListItemGraphic>

      <ListItemText>{todo.title}</ListItemText>

      <ListItemMeta>
        <IconButton>
          <Icon>delete</Icon>
        </IconButton>
      </ListItemMeta>
    </ListItem>
  );
}
