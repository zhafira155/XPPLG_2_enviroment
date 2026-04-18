document.addEventListener("DOMContentLoaded", function () {

    let hero = document.querySelector(".hero");
    let header = document.querySelector(".header-wrapper");

    if (hero && header) {
        window.addEventListener("scroll", function () {
            let scroll = window.scrollY;

            if (scroll > hero.offsetHeight - 100) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    const counters = document.querySelectorAll(".counter");
    const fadeEls = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                if (entry.target.classList.contains("counter")) {

                    const counter = entry.target;
                    const target = +counter.getAttribute("data-target");
                    let count = 0;

                    const update = () => {
                        const increment = target / 120;

                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.floor(count);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    update();
                }

                observer.unobserve(entry.target);
            }

        });
    });

    fadeEls.forEach(el => observer.observe(el));
    counters.forEach(el => observer.observe(el));

    // PROGRESS BAR
    window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let progress = (scrollTop / height) * 100;

        let bar = document.querySelector(".progress-bar");
        if (bar) {
            bar.style.width = progress + "%";
        }
    });
});


let index = 0;
const track = document.getElementById("track");
const slides = document.querySelectorAll(".teka-slide");

function updateSlide() {
    track.style.transform = "translateX(-" + (index * 100) + "%)";
}

function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
}