import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
// import * as admin from 'firebase-admin';

//import { admin } from 'firebase/storage';
// import { admin as fbAdmin } from 'firebase/firebase-admin';
// const serviceAccount = './firebaseCred.json';
// console.log(serviceAccount);

import { get as getSvelte } from 'svelte/store';
import { update as updateSvelte } from 'svelte/store';
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  push,
  runTransaction,
} from 'firebase/database';

import { offlineData, offlineMode } from '../stores/pageState';

const firebaseConfig = {
  // credential: admin.credential.cert(serviceAccount),
  apiKey: 'AIzaSyCFE8TqTBWCDSBee0CuT9HXLnNNRtSA4S8',
  authDomain: 'eye-tracking-8adeb.firebaseapp.com',
  databaseURL: 'https://eye-tracking-8adeb-default-rtdb.firebaseio.com',
  projectId: 'eye-tracking-8adeb',
  storageBucket: 'eye-tracking-8adeb.appspot.com',
  messagingSenderId: '214459503975',
  appId: '1:214459503975:web:ff62018ff95cb21cfe8bc2',
  measurementId: 'G-55T3T75PPR', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

export async function getOfflineData() {
  let dataRaw = await fetch('./assets/data/offlineDb.json');
  let dataJson = await dataRaw.json();
  offlineData.update((x) => (x = dataJson));
  return dataJson;
}

async function getDataOnline(itemPath) {
  try {
    let response = await get(child(ref(db), itemPath));
    if (response.exists()) {
      return response.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function dbGet(itemPath) {
  let offline = getSvelte(offlineMode);
  if (itemPath.includes('works')) {
    if (offline) {
      return getSvelte(offlineData).works;
    } else {
      return getDataOnline(itemPath);
    }
  } else if (itemPath.includes('sessionData')) {
    let key = itemPath.split('sessionData/')[1];
    if (key) {
      let localData = getSvelte(offlineData).sessionData[key];
      if (localData) {
        return localData;
      } else {
        return getDataOnline(itemPath);
      }
    }
  } else if (itemPath.includes('reactions')) {
    let key = itemPath.split('reactions/')[1];
    if (key) {
      let localData = getSvelte(offlineData).reactions[key];
      if (localData) {
        return localData;
      } else {
        return getDataOnline(itemPath);
      }
    }
  }
}

export async function dbWrite(itemPath, itemData) {
  try {
    await set(ref(db, itemPath), itemData);
    return 'db write done';
  } catch (error) {
    console.error(error);
  }
}

export function postTest() {
  const postListRef = ref(db, 'works/mehretu-untitled2/sessions');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    sessionId: 250,
  });
}

export function appendData(path, dataToAppend) {
  const postRef = ref(db, path);

  runTransaction(postRef, (post) => {
    if (post) {
      post.push(dataToAppend);
    } else {
    }
    return post;
  });
}

export async function uploadBlob(path, blob) {
  try {
    const newFileRef = storageRef(storage, path);
    await uploadBytes(newFileRef, blob);
    return 'blobbity upload';
  } catch (error) {
    console.error(error);
  }
}
