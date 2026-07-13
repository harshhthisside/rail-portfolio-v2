import { db } from "../../assets/js/firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const publishBtn = document.getElementById("publishBtn");

const status = document.getElementById("status");

const title = document.getElementById("title");
const slug = document.getElementById("slug");

const params = new URLSearchParams(window.location.search);

const editId = params.get("id");

title.addEventListener("input", () => {

    if (slug.value.trim() !== "") return;

    slug.value = title.value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

});

if (editId) {

    loadBlog();

}

publishBtn.addEventListener("click", saveBlog);

async function loadBlog() {

    const snap = await getDoc(doc(db, "blogs", editId));

    if (!snap.exists()) {

        alert("Blog not found.");

        window.location.href = "blogs.html";

        return;

    }

    const blog = snap.data();

    title.value = blog.title || "";
    slug.value = blog.slug || "";
    document.getElementById("category").value = blog.category || "";
    document.getElementById("heroTag").value = blog.heroTag || "";
    document.getElementById("date").value = blog.date || "";
    document.getElementById("train").value = blog.train || "";
    document.getElementById("route").value = blog.route || "";
    document.getElementById("locomotive").value = blog.locomotive || "";
    document.getElementById("distance").value = blog.distance || "";
    document.getElementById("duration").value = blog.duration || "";
    document.getElementById("image").value = blog.image || "";
    document.getElementById("excerpt").value = blog.excerpt || "";
    document.getElementById("content").value = blog.content || "";

    document.getElementById("highlight1").value = blog.highlights?.[0] || "";
    document.getElementById("highlight2").value = blog.highlights?.[1] || "";
    document.getElementById("highlight3").value = blog.highlights?.[2] || "";

    document.getElementById("published").checked = blog.published;

    publishBtn.innerText = "💾 Save Changes";

}

async function saveBlog() {

    const blog = {

        title: title.value.trim(),

        slug: slug.value.trim(),

        category: document.getElementById("category").value.trim(),

        heroTag: document.getElementById("heroTag").value.trim(),

        date: document.getElementById("date").value.trim(),

        train: document.getElementById("train").value.trim(),

        route: document.getElementById("route").value.trim(),

        locomotive: document.getElementById("locomotive").value.trim(),

        distance: document.getElementById("distance").value.trim(),

        duration: document.getElementById("duration").value.trim(),

        image: document.getElementById("image").value.trim(),

        excerpt: document.getElementById("excerpt").value.trim(),

        content: document.getElementById("content").value.trim(),

        highlights: [

            document.getElementById("highlight1").value.trim(),

            document.getElementById("highlight2").value.trim(),

            document.getElementById("highlight3").value.trim()

        ].filter(Boolean),

        published: document.getElementById("published").checked,

        url: `blog.html?slug=${slug.value.trim()}`

    };

    if (!blog.title || !blog.slug || !blog.content) {

        alert("Please fill all required fields.");

        return;

    }

    publishBtn.disabled = true;

    if (editId) {

        await updateDoc(doc(db, "blogs", editId), blog);

        status.innerHTML = "✅ Blog updated successfully.";

    } else {

        blog.createdAt = serverTimestamp();

        await addDoc(collection(db, "blogs"), blog);

        status.innerHTML = "✅ Blog published successfully.";

        document.querySelectorAll("input").forEach(input => {

            if (input.type === "checkbox") {

                input.checked = true;

            } else {

                input.value = "";

            }

        });

        document.querySelectorAll("textarea").forEach(area => {

            area.value = "";

        });

    }

    publishBtn.disabled = false;

    publishBtn.innerText = editId
        ? "💾 Save Changes"
        : "🚆 Publish Blog";

}