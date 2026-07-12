/* ==========================================
   RailCanvas JOURNEY MODAL
========================================== */

console.log("Journey Modal Loaded");

/* ========= Journey Data ========= */

const journeys = [
    {
        badge: "🏆 LONGEST JOURNEY",
        badgeClass: "gold",

        fromCode: "TVC",
        fromName: "Thiruvananthapuram Central",

        toCode: "NZM",
        toName: "Hazrat Nizamuddin",

        train: "12431 TVC NZM Rajdhani Express",

        distance: "2,845 km",
        duration: "45 hr 50 min"
    },

    {
        badge: "⚡ SHORTEST RESERVED",
        badgeClass: "silver",

        fromCode: "PNBE",
        fromName: "Patna Junction",

        toCode: "GAYA",
        toName: "Gaya Junction",

        train: "21896 Patna–Tatanagar Vande Bharat Express",

        distance: "92 km",
        duration: "1 hr 15 min"
    }
];

/* ========= Elements ========= */

const journeyCard = document.getElementById("journeyCard");
const journeyModal = document.getElementById("journeyModal");
const closeJourney = document.getElementById("closeJourney");
const journeyOverlay = document.querySelector(".journey-overlay");
const journeyTickets = document.getElementById("journeyTickets");

/* ========= Generate Tickets ========= */

function generateTickets() {

    if (!journeyTickets) return;

    journeyTickets.innerHTML = "";

    journeys.forEach((journey, index) => {

        journeyTickets.innerHTML += `

        <article class="rail-ticket">

            <div class="ticket-badge ${journey.badgeClass}">
                ${journey.badge}
            </div>

            <div class="route">

                <div class="station">

                    <h3>${journey.fromCode}</h3>

                    <small>${journey.fromName}</small>

                </div>

                <div class="route-track">

    <div class="route-arrow">

        <span class="line"></span>

        <i class="fa-solid fa-arrow-right-long"></i>

    </div>

</div>

                <div class="station">

                    <h3>${journey.toCode}</h3>

                    <small>${journey.toName}</small>

                </div>

            </div>

            <div class="train-name">

                ${journey.train}

            </div>

            <div class="ticket-info">

                <div>

                    <span>Distance</span>

                    <strong>${journey.distance}</strong>

                </div>

                <div>

                    <span>Duration</span>

                    <strong>${journey.duration}</strong>

                </div>

            </div>

        </article>

        `;

    });

}

/* ========= Modal ========= */

function openJourneyModal() {

    generateTickets();
   setTimeout(() => {

    document.querySelectorAll(".train").forEach(train => {

        train.style.left = "calc(100% - 22px)";

    });

    document.querySelectorAll(".track-fill").forEach(track => {

        track.style.width = "100%";

    });

}, 100);

    journeyModal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeJourneyModal() {

    journeyModal.classList.remove("active");

    document.body.style.overflow = "";

}

journeyCard?.addEventListener("click", openJourneyModal);

closeJourney?.addEventListener("click", closeJourneyModal);

journeyOverlay?.addEventListener("click", closeJourneyModal);

document.addEventListener("keydown", (e)=>{

    if(e.key==="Escape"){

        closeJourneyModal();

    }

});