/* ==========================================
   RailCanvas PREMIUM STATS
========================================== */

const stats = [
    {
        id: "journeys",
        value: 300,
        suffix: "+"
    },
    {
        id: "distanceCovered",
        value: 35550 ,
        suffix: " km"
    },
    {
        id: "zonesCovered",
        value: 16,
        suffix: "/18"
    },
    {
        id: "travelTime",
        value: 1720,
        suffix: "+"
    }
];

/* ===========================
   Counter Animation
=========================== */

function animateCounter(element, target, suffix) {

    let start = 0;

    const duration = 2200;

    let startTime = null;

    function easeOutExpo(x) {

        return x === 1
            ? 1
            : 1 - Math.pow(2, -10 * x);

    }

    function update(currentTime) {

        if (!startTime) startTime = currentTime;

        const progress = Math.min(

            (currentTime - startTime) / duration,

            1

        );

        const eased = easeOutExpo(progress);

        const value = Math.floor(eased * target);

        element.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

/* ===========================
   Trigger Once
=========================== */

const statsSection = document.querySelector(".stats-section");

if (statsSection) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    stats.forEach(stat => {

                        const el = document.getElementById(stat.id);

                        if (el) {

                            animateCounter(

                                el,

                                stat.value,

                                stat.suffix

                            );

                        }

                    });

                    observer.unobserve(statsSection);

                }

            });

        },

        {

            threshold: 0.35

        }

    );

    observer.observe(statsSection);

}

/* ===========================
   Premium 3D Tilt
=========================== */

const cards = document.querySelectorAll(".stat-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 16;

        const rotateX = ((y / rect.height) - 0.5) * -16;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale(1.03)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ===========================
   Parallax Background
=========================== */

const circle1 = document.querySelector(".circle-1");
const circle2 = document.querySelector(".circle-2");

window.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;

    const y = e.clientY / window.innerHeight;

    if (circle1) {

        circle1.style.transform =
            `translate(${x * 35}px, ${y * 35}px)`;

    }

    if (circle2) {

        circle2.style.transform =
            `translate(${-x * 35}px, ${-y * 35}px)`;

    }

});