import React, { useEffect, useState } from 'react';
import { Spinner } from 'mdc-react';

import './index.scss';
import useApi from '../hooks/api';
import TodoList from '../components/TodoList';
import TodoForm from './../components/TodoForm/index';

export default function TodoListPage({ match }) {
  const { data, actions } = useApi();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos();

    actions.getListTodos(match.params.listId).then(setTodos);
  }, [actions, match.params.listId]);

  function handleSubmit(title) {
    actions
      .createTodo({
        title,
        listId: list.id,
      })
      .then((todo) => setTodos([...todos, todo]));
  }

  function handleDelete(todoId) {
    actions.deleteTodo(todoId).then((todoId) => {
      setTodos([...todos.filter((t) => t.id !== todoId)]);
    });
  }

  function handleUpdate(todoId, data) {
    actions.updateTodo(todoId, data).then((todoId) => {
      setTodos([...todos.map((t) => (t.id !== todoId ? { ...t, ...data } : t))]);
    });
  }

  const list = data.lists.find((list) => list.id === match.params.listId);

  if (!list || !todos) return <Spinner />;

  return (
    <div id="todo-list-page" className="page">
      <TodoList
        list={list}
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <TodoForm onSubmit={handleSubmit} />
    </div>
  );
}
