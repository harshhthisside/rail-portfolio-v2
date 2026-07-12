import { db } from "./firebase.js";
import { currentUser } from "./auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

let selectedRating = "";

document.querySelectorAll(".rating-btn").forEach((button) => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".rating-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        selectedRating = button.dataset.rating;

    });

});

document.getElementById("submitRating").addEventListener("click", async () => {

    const message = document.getElementById("ratingMessage");

    if (!currentUser) {

        message.style.color = "red";
        message.innerText = "Please sign in with Google first.";
        return;

    }

    if (selectedRating === "") {

        message.style.color = "red";
        message.innerText = "Please select a rating.";
        return;

    }

    const blogId = document.body.dataset.blog;

    const ratingId = `${blogId}_${currentUser.uid}`;

    const ratingRef = doc(db, "blogRatings", ratingId);

    const existing = await getDoc(ratingRef);

    if (existing.exists()) {

        message.style.color = "red";
        message.innerText = "You have already rated this journey.";
        return;

    }

    await setDoc(ratingRef, {

        blogId: blogId,
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        photo: currentUser.photoURL,
        rating: selectedRating,
        createdAt: Date.now()

    });

    await loadRatings();

    message.style.color = "green";
    message.innerText = "Thank you for rating! ❤️";

    selectedRating = "";

    document.querySelectorAll(".rating-btn").forEach(btn =>
        btn.classList.remove("active")
    );

});
async function loadRatings() {

    const blogId = document.body.dataset.blog;

    const q = query(
        collection(db, "blogRatings"),
        where("blogId", "==", blogId)
    );

    const snapshot = await getDocs(q);

    let good = 0;
    let average = 0;
    let bad = 0;

    snapshot.forEach((doc) => {

        const rating = doc.data().rating;

        if (rating === "Good") good++;

        if (rating === "Average") average++;

        if (rating === "Bad") bad++;

    });

    document.getElementById("goodCount").textContent = good;

    document.getElementById("averageCount").textContent = average;

    document.getElementById("badCount").textContent = bad;

    document.getElementById("totalRatings").textContent =
        good + average + bad;

}
loadRatings();