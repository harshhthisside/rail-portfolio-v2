import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {

    document.getElementById("blogContainer").innerHTML = `
        <h1>🚆 Blog Not Found</h1>
        <p>No blog slug provided.</p>
    `;

    throw new Error("No slug provided");

}

async function loadBlog() {

    try {

        const q = query(
            collection(db, "blogs"),
            where("slug", "==", slug),
            where("published", "==", true)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            document.getElementById("blogContainer").innerHTML = `
                <h1>🚆 Blog Not Found</h1>
                <p>This blog doesn't exist.</p>
            `;

            return;

        }

        const blog = snapshot.docs[0].data();

        document.title = `${blog.title} | RailCanvas`;

        document.getElementById("heroTag").textContent =
            blog.heroTag || blog.category || "";

        document.getElementById("blogTitle").textContent =
            blog.title || "";

        document.getElementById("blogDate").textContent =
            blog.date || "";

        document.getElementById("blogTrain").textContent =
            blog.train || "";

        document.getElementById("blogRoute").textContent =
            blog.route || "";

        document.getElementById("blogExcerpt").textContent =
            blog.excerpt || "";

        document.getElementById("blogImage").src =
            blog.image || "";

        document.getElementById("blogImage").alt =
            blog.title || "";

        document.getElementById("infoTrain").textContent =
            blog.train || "";

        document.getElementById("infoRoute").textContent =
            blog.route || "";

        document.getElementById("infoLocomotive").textContent =
            blog.locomotive || "";

        document.getElementById("infoDistance").textContent =
            blog.distance || "";

        document.getElementById("infoDuration").textContent =
            blog.duration || "";

        document.getElementById("blogContent").innerHTML =
            blog.content || "";

            // Update meta description
let meta = document.querySelector('meta[name="description"]');

if (!meta) {

    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);

}

meta.content = blog.excerpt || "";

// Render highlights
const highlightsContainer = document.getElementById("blogHighlights");

highlightsContainer.innerHTML = "";

(blog.highlights || []).forEach(item => {

    highlightsContainer.innerHTML += `
        <span>${item}</span>
    `;

});

    }

    catch (err) {

        console.error(err);

        document.getElementById("blogContainer").innerHTML = `
            <h1>Something went wrong.</h1>
        `;

    }

}

loadBlog();