import { db, auth } from './firebase';

export function getLists() {
  return db
    .collection('lists')
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    });
}

export function getListTodos(listId) {
  return db
    .collection('todos')
    .where('listId', '==', listId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    });
}

export function createTodo(data) {
  return db
    .collection('todos')
    .add({
      ...data,
      completed: false,
    })
    .then((docRef) => docRef.get())
    .then((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
}
