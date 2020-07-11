import { useEffect, useState } from 'react';

import * as api from '../api';

export default function useApi() {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    api.getLists().then(setLists);
  }, []);

  return {
    data: {
      lists,
      todos,
    },
    actions: api,
  };
}
