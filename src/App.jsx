import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import useApi from './hooks/api';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import TodoList from './pages/TodoList';

export default function App() {
  const {
    data: { lists },
  } = useApi();

  return (
    <div className="app">
      <AppDrawer lists={lists} />
      <AppContent>
        <Switch>
          <Route path="/:listId" component={TodoList} />
        </Switch>
      </AppContent>
    </div>
  );
}
