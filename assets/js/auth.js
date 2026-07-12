import { auth, provider } from "./firebase.js";

import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

let currentUser = null;

const loginBtn = document.getElementById("googleLoginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginArea = document.getElementById("googleLoginArea");
const userInfo = document.getElementById("userInfo");

const userName = document.getElementById("userName");
const userPhoto = document.getElementById("userPhoto");

// Google Sign In
loginBtn.addEventListener("click", async () => {

    try {

        await signInWithPopup(auth, provider);

    } catch (error) {

        console.error(error);
        alert("Google Sign-In failed.");

    }

});

// Logout
logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

});

// Detect Login
onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

        loginArea.style.display = "none";
        userInfo.style.display = "flex";

        userName.innerText = user.displayName;
        userPhoto.src = user.photoURL;

    } else {

        currentUser = null;

        loginArea.style.display = "block";
        userInfo.style.display = "none";

    }

});

export { currentUser };