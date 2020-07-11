import React from 'react';
import { List, Typography } from 'mdc-react';

import TodoListItem from '../TodoListItem';
import './index.scss';

export default function TodoList({ list, todos, onDelete, onUpdate }) {
  return (
    <div className="todo-list">
      <Typography className="todo-list__title" variant="headline4">
        {list.title}
      </Typography>
      <List className="todo-list">
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </List>
    </div>
  );
}
