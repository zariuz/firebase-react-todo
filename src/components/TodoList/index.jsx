import React, { useContext } from 'react';
import DBContext from './../../context/db';

export default function TodoList() {
  const db = useContext(DBContext);

  return (
    <div>
      <ul>
        {db.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
