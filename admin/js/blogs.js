import { db } from "../../assets/js/firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const blogList = document.getElementById("blogList");
const searchInput = document.getElementById("searchBlog");
const blogCount = document.getElementById("blogCount");

let allBlogs = [];

async function loadBlogs() {

    blogList.innerHTML = `
        <div class="loading">
            Loading blogs...
        </div>
    `;

    try {

        const snapshot = await getDocs(
            collection(db, "blogs")
        );

        allBlogs = [];

        snapshot.forEach(documentData => {

            allBlogs.push({

                id: documentData.id,

                ...documentData.data()

            });

        });

        allBlogs.sort((a, b) => {

            const aTime = a.createdAt?.seconds || 0;
            const bTime = b.createdAt?.seconds || 0;

            return bTime - aTime;

        });

        blogCount.innerHTML = `Total Blogs : ${allBlogs.length}`;

        renderBlogs(allBlogs);

    }

    catch (err) {

        console.error(err);

        blogList.innerHTML = `
            <div class="loading">
                Failed to load blogs.
            </div>
        `;

    }

}

function renderBlogs(blogs) {

    if (blogs.length === 0) {

        blogList.innerHTML = `
            <div class="loading">
                <h2>📭 No blogs found</h2>
                <p>Try another search or create a new journey.</p>
            </div>
        `;

        return;

    }

    let html = "";

    blogs.forEach(blog => {

        html += `

        <div class="blog-card">

            <img
                src="${blog.image || "../assets/images/blog-placeholder.webp"}"
                alt="${blog.title}"
                onerror="this.src='../assets/images/blog-placeholder.webp'">

            <div class="blog-content">

                <span class="status ${blog.published ? "published" : "draft"}">

                    ${blog.published ? "Published" : "Draft"}

                </span>

                <h2>${blog.title}</h2>

                <div class="blog-meta">

                    ${blog.date || ""}<br>

                    ${blog.category || ""}

                </div>

                <div class="actions">

                    <button
                        class="edit-btn"
                        onclick="editBlog('${blog.id}')">

                        ✏ Edit

                    </button>

                    <button
                        class="publish-btn"
                        onclick="togglePublish('${blog.id}', ${blog.published})">

                        ${blog.published ? "📦 Unpublish" : "🚀 Publish"}

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteBlog('${blog.id}')">

                        🗑 Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    blogList.innerHTML = html;

}

window.editBlog = function(id) {

    window.location.href = `editor.html?id=${id}`;

};

window.deleteBlog = async function(id) {

    if (!confirm("Delete this blog permanently?")) return;

    await deleteDoc(doc(db, "blogs", id));

    loadBlogs();

};

window.togglePublish = async function(id, currentStatus) {

    await updateDoc(

        doc(db, "blogs", id),

        {
            published: !currentStatus
        }

    );

    loadBlogs();

};

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const filtered = allBlogs.filter(blog => {

        return (

            (blog.title || "").toLowerCase().includes(keyword) ||

            (blog.category || "").toLowerCase().includes(keyword) ||

            (blog.slug || "").toLowerCase().includes(keyword)

        );

    });

    blogCount.innerHTML =
        `Showing ${filtered.length} of ${allBlogs.length} blogs`;

    renderBlogs(filtered);

});

loadBlogs();