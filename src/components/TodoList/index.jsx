import React from 'react';
import { List } from 'mdc-react';

import TodoListItem from '../TodoListItem';
import './index.scss';

export default function TodoList({ todos, onUpdate, onSelect, onDelete }) {
  return (
    <List className="todo-list">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}
