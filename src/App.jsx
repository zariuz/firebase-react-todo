import React, { useEffect, useReducer, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'App.scss';

import DataContext from 'context/data';
import { reducer, initialState, actions } from 'store';

import AppDrawer from 'components/AppDrawer';
import AppContent from 'components/AppContent';
import TodoList from 'pages/TodoListPage';
import LoginPage from 'pages/Login';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    actions.getLists(dispatch);
    actions.setAuth(dispatch);
  }, []);

  if (!state.user) return <LoginPage />;

  return (
    <DataContext.Provider value={contextValue}>
      {/* {!state.user ? <LoginPage /> : <Redirect to="/" />} */}

      <div className="app">
        <AppDrawer lists={state.lists} />
        <AppContent>
          <Switch>
            <Route exact path="/" component={TodoList} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/important" component={TodoList} />
            <Route exact path="/planned" component={TodoList} />
            <Route path="/:listId/:todoId?" component={TodoList} />
          </Switch>
        </AppContent>
      </div>
    </DataContext.Provider>
  );
}
