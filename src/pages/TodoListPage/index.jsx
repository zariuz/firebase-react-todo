import React, { useEffect, useState, useContext } from 'react';
import { Spinner, Layout } from 'mdc-react';

import DataContext from 'context/data';
import { actions } from 'store';

import './index.scss';
import TodoList from 'components/TodoList';
import TodoForm from 'components/TodoForm/index';
import TodoDetails from 'components/TodoDetails';

export default function TodoListPage({ match }) {
  const { state, dispatch } = useContext(DataContext);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    if (match.params.listId) {
      actions.getListTodos(dispatch, match.params.listId);
    } else {
      actions.getTodos(dispatch);
    }
  }, [dispatch, match.params.listId]);

  function handleSubmit(title) {
    actions.createTodo(dispatch, {
      title,
      listId: list.id,
    });
  }

  function handleDelete(todoId) {
    actions.deleteTodo(dispatch, todoId);
  }

  function handleUpdate(todoId, data) {
    actions.updateTodo(dispatch, todoId, data);
  }

  function handleSelect(todo) {
    setSelectedTodo(todo);
  }

  const list = state.lists.find((list) => list.id === match.params.listId);

  if (!list || !state.todos) return <Spinner />;

  return (
    <Layout row id="list-page" className="page">
      <Layout>
        <TodoList
          list={list}
          todos={state.todos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onSelect={handleSelect}
        />
        <TodoForm onSubmit={handleSubmit} />
      </Layout>
      {selectedTodo && <TodoDetails todo={selectedTodo} />}
    </Layout>
  );
}
