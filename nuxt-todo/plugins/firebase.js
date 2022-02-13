import firebase from 'firebase';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

// アプリを初期化する
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase