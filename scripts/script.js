/* =========================
   GLOBAL SCRIPT.JS
   MoveO Website (Updated)
========================= */

/* =========================
   1. COMPONENT LOADER
========================= */
async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;

        // Navbar load થયા પછી init કરો
        if (id === "navbar-placeholder") {
            initNavbar();
        }

    } catch (err) {
        console.error("Component load error:", err);
    }
}

// Auto load navbar & footer
loadComponent("navbar-placeholder", "navbar.html");
loadComponent("footer-placeholder", "footer.html");


/* =========================
   2. NAVBAR LOGIC (FIXED)
========================= */
function initNavbar() {

    const trigger = document.getElementById("menuToggle");
    const menu = document.getElementById("navMenu");

    if (!trigger || !menu) return;

    // Prevent duplicate events
    trigger.replaceWith(trigger.cloneNode(true));
    const newTrigger = document.getElementById("menuToggle");

    // Toggle menu
    newTrigger.addEventListener("click", (e) => {
        e.stopPropagation();

        menu.classList.toggle("active");
        newTrigger.classList.toggle("active");

        // Body scroll lock
        document.body.style.overflow =
            menu.classList.contains("active") ? "hidden" : "auto";
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (
            menu.classList.contains("active") &&
            !menu.contains(e.target) &&
            !newTrigger.contains(e.target)
        ) {
            closeMenu(menu, newTrigger);
        }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("active")) {
            closeMenu(menu, newTrigger);
        }
    });

    // Close menu when link clicked (mobile)
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMenu(menu, newTrigger);
        });
    });
}

// Close function
function closeMenu(menu, trigger) {
    menu.classList.remove("active");
    trigger.classList.remove("active");
    document.body.style.overflow = "auto";
}


/* =========================
   3. SCROLL REVEAL
========================= */
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
   4. COUNTER ANIMATION
========================= */
const counters = document.querySelectorAll(".count");

if (counters.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const target = +entry.target.dataset.target;
            let current = 0;
            const step = target / 100;

            const update = () => {
                current += step;
                if (current < target) {
                    entry.target.innerText = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    entry.target.innerText = target + "+";
                }
            };

            update();
            observer.unobserve(entry.target);
        });
    }, { threshold: 1 });

    counters.forEach(c => observer.observe(c));
}


/* =========================
   5. TESTIMONIAL SLIDER
========================= */
const slides = document.querySelectorAll(".testimonial-slide");

if (slides.length) {
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 5000);
}


/* =========================
   6. CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            subject: this.subject.value,
            message: this.message.value,
            time: new Date().toLocaleString(),
            status: "New"
        };

        console.log("Inquiry:", data);
        alert(" Inquiry sent successfully!");
        this.reset();
    });
}

