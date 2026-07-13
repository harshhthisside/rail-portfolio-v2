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

// Get blog slug from URL
const blogId = new URLSearchParams(window.location.search).get("slug");

let selectedRating = "";

// Rating buttons
document.querySelectorAll(".rating-btn").forEach((button) => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".rating-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        selectedRating = button.dataset.rating;

    });

});

// Submit rating
document.getElementById("submitRating").addEventListener("click", async () => {

    const message = document.getElementById("ratingMessage");

    if (!currentUser) {

        message.style.color = "red";
        message.innerText = "Please sign in with Google first.";
        return;

    }

    if (!blogId) {

        message.style.color = "red";
        message.innerText = "Blog not found.";
        return;

    }

    if (selectedRating === "") {

        message.style.color = "red";
        message.innerText = "Please select a rating.";
        return;

    }

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

// Load community ratings
async function loadRatings() {

    if (!blogId) return;

    const q = query(
        collection(db, "blogRatings"),
        where("blogId", "==", blogId)
    );

    const snapshot = await getDocs(q);

    let good = 0;
    let average = 0;
    let bad = 0;

    snapshot.forEach((docSnap) => {

        const rating = docSnap.data().rating;

        if (rating === "Good") good++;
        if (rating === "Average") average++;
        if (rating === "Bad") bad++;

    });

    document.getElementById("goodCount").textContent = good;
    document.getElementById("averageCount").textContent = average;
    document.getElementById("badCount").textContent = bad;
    document.getElementById("totalRatings").textContent = good + average + bad;

}

loadRatings();