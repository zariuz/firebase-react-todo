import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDtrz6W6tBn7Or-J52qWydC242DFt4OpoA',
  authDomain: 'react-todo-f25e5.firebaseapp.com',
  databaseURL: 'https://react-todo-f25e5.firebaseio.com',
  projectId: 'react-todo-f25e5',
  storageBucket: 'react-todo-f25e5.appspot.com',
  messagingSenderId: '976960477637',
  appId: '1:976960477637:web:5e8c9abd1040e33fd0d3ac',
});

const db = firebase.firestore();

export { db };
