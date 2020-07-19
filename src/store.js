import * as api from './api';

export function reducer(state, action) {
  switch (action.type) {
    case 'GET_LISTS':
      return {
        ...state,
        lists: action.payload.lists,
      };
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
      };

    case 'GET_LIST_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
      };

    case 'CREATE_TODO':
      return {
        ...state,
        todos: state.todos.push(action.payload.todo),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todo.id) {
            return {
              ...todo,
              ...action.payload.todo,
            };
          }

          return todo;
        }),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo !== action.payload.todoId),
      };
    default:
      return state;
  }
}

export const initialState = { lists: [], todos: [] };

export function getLists(dispatch) {
  return api.getLists().then((lists) =>
    dispatch({
      type: 'GET_LISTS',
      payload: { lists },
    }),
  );
}

export function getTodos(dispatch) {
  return api.getTodos().then((todos) =>
    dispatch({
      type: 'GET_TODOS',
      payload: {
        todos,
      },
    }),
  );
}

export function getListTodos(dispatch, listId) {
  return api.getListTodos(listId).then((todos) =>
    dispatch({
      type: 'GET_LIST_TODOS',
      payload: {
        todos,
      },
    }),
  );
}

export function createTodo(dispatch, data) {
  return api.createTodo(data).then((todo) =>
    dispatch({
      type: 'CREATE_TODO',
      payload: {
        todo,
      },
    }),
  );
}

export function updateTodo(dispatch, todoId, data) {
  return api.updateTodo(todoId, data).then((todo) =>
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        todo,
      },
    }),
  );
}

export function deleteTodo(dispatch, todoId) {
  return api.deleteTodo(todoId).then((todoId) =>
    dispatch({
      type: 'DELETE_TODO',
      payload: {
        todoId,
      },
    }),
  );
}

// export function updateTodo(todoId, data) {
//   return api.updateTodo(todoId, data).then((todoId) => {
//     setTodos([...todos.map((t) => (t.id !== todoId ? { ...t, ...data } : t))]);
//   });
// }

// export function deleteTodo(todoId) {
//   return api.deleteTodo(todoId).then((todoId) => {
//     setTodos([...todos.filter((t) => t.id !== todoId)]);
//   });
// }

export const actions = {
  getLists,
  getTodos,
  getListTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
