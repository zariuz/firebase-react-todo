import React, { useContext, useEffect, useState } from 'react';
import DBContext from './../../context/db';
import { List, Typography, Spinner } from 'mdc-react';

import TodoListItem from '../TodoListItem';
import './index.scss';

export default function TodoList({ match }) {
  const db = useContext(DBContext);
  const [todos, setTodos] = useState([]);
  console.log(match);

  useEffect(() => {
    db.get('todos')((collection) =>
      collection.where('listId', '==', match.params.listId)
    ).then(setTodos);
  }, [db, match.params.listId]);

  const list = db.lists.find((list) => list.id === match.params.listId);

  if (!list) return <Spinner />;

  return (
    <div className="todo-list">
      <Typography className="todo-list__title" variant="headline4">
        {list.title}
      </Typography>
      <List className="todo-list__items">
        <ul>
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </List>
    </div>
  );
}
