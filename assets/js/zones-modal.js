/* ==========================================
   RAILSCAPE ZONES MODAL
========================================== */
console.log("Zones modal loaded");

const zonesCard = document.getElementById("zonesCard");
const zonesModal = document.getElementById("zonesModal");
const closeZones = document.getElementById("closeZones");
const overlay = document.querySelector(".zones-overlay");
const progressFill = document.querySelector(".progress-fill");

const coveredZones = 16;
const totalZones = 18;

function openZonesModal() {

    zonesModal.classList.add("active");

    document.body.style.overflow = "hidden";

    progressFill.style.width = "0%";

    setTimeout(() => {

        progressFill.style.width =
            `${(coveredZones / totalZones) * 100}%`;

    }, 200);

}

function closeZonesModal() {

    zonesModal.classList.remove("active");

    document.body.style.overflow = "";

}

if (zonesCard) {

    zonesCard.addEventListener("click", openZonesModal);

}

if (closeZones) {

    closeZones.addEventListener("click", closeZonesModal);

}

if (overlay) {

    overlay.addEventListener("click", closeZonesModal);

}

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        zonesModal.classList.contains("active")
    ) {

        closeZonesModal();

    }

});