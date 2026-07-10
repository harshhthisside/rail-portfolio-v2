console.log("Rail Portfolio V2 Loaded!");
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCards = document.querySelectorAll(".photo-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        photoCards.forEach(card => {

            if(filter === "all" || card.dataset.category === filter){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});