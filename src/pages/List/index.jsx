import React, { useState } from 'react';
import { Icon, IconButton, Layout, SideSheet, Spinner, Typography } from 'mdc-react';

import useStore from 'hooks/store';

import TodoList from 'components/TodoList';
import TodoForm from 'components/TodoForm';
import TodoDetails from 'components/TodoDetails';
import PageHeader from 'components/PageHeader';

import './index.scss';

export default function ListPage({ match }) {
  const { state, actions } = useStore();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [sortBy, setSortBy] = useState('');

  function handleSubmit(title) {
    actions.createTodo({
      title,
      userId: state.user.uid,
      listId: list.id || '',
    });
  }

  function handleDelete(todoId) {
    actions.deleteTodo(todoId);
  }

  function handleUpdate(todoId, data) {
    actions.updateTodo(todoId, data);
  }

  function handleSelect(todo) {
    setSelectedTodo(todo);
  }

  function handleSortChange(sort) {
    setSortBy(sort);
  }

  const sortFn = {
    title: (a, b) => a.title.localeCompare(b.title),
    date: (a, b) => new Date(a.seconds * 1000) - new Date(b.seconds * 1000),
    important: (a, b) => b.important - a.important,
    completed: (a, b) => b.completed - a.completed,
  };

  const list = state.lists.find((list) => list.id === match.params.listId) || {
    title: 'Задачи',
  };
  const path = match.path;

  const getTodosByPath = {
    '/': (todos) => todos,
    '/important': (todos) => todos.filter((todo) => todo.important),
    '/planned': (todos) => todos.filter((todo) => todo.dueDate),
  };

  const getTodosByList = (listId, todos) => {
    return todos.filter((todo) => todo.listId === listId);
  };

  const todos = match.params.listId
    ? getTodosByList(match.params.listId, state.todos)
    : getTodosByPath[path](state.todos);

  const sortedTodos = sortBy ? todos.slice().sort(sortFn[sortBy]) : todos;

  if (!list || !todos) return <Spinner />;

  return (
    <Layout id="list-page" className="page">
      <PageHeader title={list.title} onSortChange={handleSortChange} sortBy={sortBy} />

      <Layout row>
        <SideSheet
          open={selectedTodo}
          dismissible
          appContentSelector=".mdc-side-sheet-app-content">
          <Layout row justifyContent="between" alignItems="center">
            <Typography noMargin>Детали задачи</Typography>

            <IconButton onClick={() => setSelectedTodo(null)}>
              <Icon>close</Icon>
            </IconButton>
          </Layout>

          {selectedTodo && <TodoDetails todo={selectedTodo} />}
        </SideSheet>

        <Layout column className="mdc-side-sheet-app-content">
          <TodoList
            list={list}
            todos={sortedTodos}
            onSelect={handleSelect}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />

          <TodoForm onSubmit={handleSubmit} />
        </Layout>
      </Layout>
    </Layout>
  );
}
