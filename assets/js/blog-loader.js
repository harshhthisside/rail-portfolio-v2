import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const blogGrid = document.getElementById("dynamicBlogs");

async function loadBlogs() {

    const q = query(
        collection(db, "blogs"),
        where("published", "==", true)
    );

    const snapshot = await getDocs(q);

    blogGrid.innerHTML = "";

    snapshot.forEach(doc => {

        const blog = doc.data();

        const highlights = (blog.highlights || [])
            .map(item => `<span>${item}</span>`)
            .join("");

        blogGrid.innerHTML += `

        <article class="blog-card">

            <div class="blog-image">

                <img src="${blog.image}" alt="${blog.title}">

                <span class="blog-category">
                    ${blog.category}
                </span>

            </div>

            <div class="blog-content">

                <div class="blog-meta">

                    <span>
                        <i class="fa-solid fa-calendar-days"></i>
                        ${blog.date}
                    </span>

                    <span>
    <i class="fa-solid fa-train"></i>
    ${blog.train}
</span>
                </div>

                <h2>${blog.title}</h2>

                <p>${blog.excerpt}</p>

                <div class="blog-highlights">

                    ${highlights}

                </div>

                <a href="${blog.url || '#'}" class="btn btn-primary">

                    Read Full Journey

                    <i class="fa-solid fa-arrow-right-long"></i>

                </a>

            </div>

        </article>

        `;

    });

}

loadBlogs();