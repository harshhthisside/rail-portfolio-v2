import { auth, db } from "../../assets/js/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "index.html";

        return;

    }

    const snapshot = await getDocs(collection(db, "admins"));

    let allowed = false;

    snapshot.forEach(doc => {

        if (
            doc.data().email.trim().toLowerCase() ===
            user.email.trim().toLowerCase()
        ) {

            allowed = true;

        }

    });

    if (!allowed) {

        alert("Access Denied");

        location.href = "index.html";

    }

});