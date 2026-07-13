import { db, auth } from "../../assets/js/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

async function loadDashboard() {

    const blogSnapshot = await getDocs(collection(db, "blogs"));
    document.getElementById("blogCount").innerText = blogSnapshot.size;

    const ratingSnapshot = await getDocs(collection(db, "blogRatings"));
    document.getElementById("ratingCount").innerText = ratingSnapshot.size;

    const users = new Set();

    ratingSnapshot.forEach(doc => {

        const data = doc.data();

        if (data.email) {

            users.add(data.email);

        }

    });

    document.getElementById("userCount").innerText = users.size;

}

loadDashboard();

document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});