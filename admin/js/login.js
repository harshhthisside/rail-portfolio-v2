import { auth, provider, db } from "../../assets/js/firebase.js";

import {
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

loginBtn.addEventListener("click", async () => {

    try {

        await signInWithPopup(auth, provider);

    } catch (err) {

        console.error(err);
        status.innerHTML = "Login Failed";

    }

});

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const snapshot = await getDocs(collection(db, "admins"));

    let allowed = false;

    snapshot.forEach(doc => {

        const adminEmail = doc.data().email.trim().toLowerCase();

        if (adminEmail === user.email.trim().toLowerCase()) {

            allowed = true;

        }

    });

    if (!allowed) {

        alert("You are not an Admin.");

        await auth.signOut();

        return;

    }

    window.location.href = "dashboard.html";

});