import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import { get } from './api';
import DBContext from './context/db';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import TodoList from './components/TodoList';

export default function App() {
  const [lists, setLists] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    get('lists').then(setLists);
    get('todos').then(setTodos);
  }, []);

  return (
    <DBContext.Provider value={{ lists, todos }}>
      <div className="app">
        <AppDrawer lists={lists} />
        <AppContent>
          <Switch>
            <Route path="/:listId" component={TodoList} />
          </Switch>
        </AppContent>
      </div>
    </DBContext.Provider>
  );
}
