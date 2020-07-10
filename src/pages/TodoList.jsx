import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'mdc-react';

import './index.scss';
import DBContext from '../context/db';
import TodoList from '../components/TodoList';
import TodoForm from './../components/TodoForm/index';

export default function TodoListPage({ match }) {
  const db = useContext(DBContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos();

    db.getListTodos(match.params.listId).then(setTodos);
  }, [db, match.params.listId]);

  const list = db.lists.find((list) => list.id === match.params.listId);

  function handleSubmit(title) {
    db.createTodo({
      title,
      listId: list.id,
    }).then((todo) => setTodos([...todos, todo]));
  }

  if (!list || !todos) return <Spinner />;

  return (
    <div id="todo-list-page" className="page">
      <TodoList list={list} todos={todos} />
      <TodoForm onSubmit={handleSubmit} />
    </div>
  );
}
