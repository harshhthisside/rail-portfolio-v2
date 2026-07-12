import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKrXsOg01Oqe3iQ4keuv2a3FPox6hexzE",
  authDomain: "railcanvas-website.firebaseapp.com",
  projectId: "railcanvas-website",
  storageBucket: "railcanvas-website.firebasestorage.app",
  messagingSenderId: "83007002546",
  appId: "1:83007002546:web:19ee699e62d8ddcb97b6ab"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
    db,
    auth,
    provider
};