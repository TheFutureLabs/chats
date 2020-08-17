// tslint:disable-next-line: no-var-requires
global.XMLHttpRequest = require('xhr2');

import firebase from 'firebase';
import 'firebase/storage';

// firebase config
// const config = {
//     apiKey: 'AIzaSyDZIya5TikDNOHea5adozQ515lVwdz690U',
//     authDomain: 'project-0927.firebaseapp.com',
//     databaseURL: 'https://project-0927.firebaseio.com',
//     projectId: 'project-0927',
//     storageBucket: 'project-0927.appspot.com',
//     messagingSenderId: '215710443383',
//     appId: '1:215710443383:web:b363cd15aab1f589722372',
// };

// Initialize Firebase
function initializeFirebase(config: any) {
    const app = firebase.initializeApp(config);
    return {
        myFirebase: app,
        myFirestore: firebase.firestore(app),
        myStorage: firebase.storage(),
    };
}

export default initializeFirebase;
