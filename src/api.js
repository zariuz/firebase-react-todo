import { db, auth } from './firebase';

export function get(collectionName) {
  const collection = db.collection(collectionName);

  return (query = () => collection) => {
    return query(collection)
      .get()
      .then((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return items;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };
}

export function getLists() {
  return db
    .collection('lists')
    .get()
    .then((snapshot) => {
      console.log(snapshot);

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    });
}
