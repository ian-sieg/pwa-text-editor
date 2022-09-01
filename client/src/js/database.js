import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //opens a connection with the jate db and the version we want to use (1)
  const jateDb = await openDB('jate', 1)
  //creates a transaction which specifies the db we want to use and the privileges we want to allow
  const trx = jateDb.transaction('jate', 'readwrite')
  //uses the transaction to open up the jate store
  const store = trx.objectStore('jate')
  //adds/posts the content to the db from the user's input
  const req = store.add({content: content})
  //confirms the request to post
  const res = await req
  console.log('Data saved to the db', res)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1)

  const tx = jateDb.transaction('jate', 'readonly')

  const store = tx.objectStore('jate')

  const req = store.getAll()

  const res = await req

  return res
};

initdb();
