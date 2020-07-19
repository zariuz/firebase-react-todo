import React, { useEffect, useReducer, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import DataContext from './context/data';
import { reducer, initialState, actions } from './store';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import TodoList from './pages/TodoList';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    actions.getLists(dispatch);
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <DataContext.Provider value={contextValue}>
      <div className="app">
        <AppDrawer lists={state.lists} />
        <AppContent>
          <Switch>
            <Route exact path="/" component={TodoList} />
            <Route exact path="/important" component={TodoList} />
            <Route exact path="/planned" component={TodoList} />
            <Route path="/:listId/:todoId?" component={TodoList} />
          </Switch>
        </AppContent>
      </div>
    </DataContext.Provider>
  );
}
