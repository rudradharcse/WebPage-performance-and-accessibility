/* =========================================================
   WEEK 4 – PERFORMANCE & ACCESSIBILITY OPTIMIZED JAVASCRIPT
   DOM | Keyboard support | ARIA | Validation | Local Storage
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    /* ---------- Mobile navigation ---------- */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    const setMenuState = (open) => {
        navLinks.classList.toggle("show", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.querySelector("span").textContent = open ? "✕" : "☰";
    };

    menuToggle.addEventListener("click", () => {
        setMenuState(!navLinks.classList.contains("show"));
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navLinks.classList.contains("show")) {
            setMenuState(false);
            menuToggle.focus();
        }
    });

    /* ---------- Theme ---------- */
    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("portfolioTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        body.classList.add("dark-mode");
    }

    const updateThemeButton = () => {
        const dark = body.classList.contains("dark-mode");
        themeToggle.textContent = dark ? "☀️ Light" : "🌙 Dark";
        themeToggle.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode"
        );
    };

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
        const dark = body.classList.toggle("dark-mode");
        localStorage.setItem("portfolioTheme", dark ? "dark" : "light");
        updateThemeButton();
        showToast(dark ? "Dark mode enabled" : "Light mode enabled");
    });

    /* ---------- Dynamic greeting ---------- */
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();

    greeting.textContent =
        hour < 12
            ? "Good morning! Welcome to my portfolio."
            : hour < 18
                ? "Good afternoon! Welcome to my portfolio."
                : "Good evening! Welcome to my portfolio.";

    /* ---------- About Read More ---------- */
    const aboutMoreButton = document.getElementById("aboutMoreButton");
    const extraAbout = document.getElementById("extraAbout");

    aboutMoreButton.addEventListener("click", () => {
        const expanded = aboutMoreButton.getAttribute("aria-expanded") === "true";

        aboutMoreButton.setAttribute("aria-expanded", String(!expanded));
        aboutMoreButton.textContent = expanded ? "Read More" : "Read Less";
        extraAbout.hidden = expanded;
    });

    /* ---------- Project filters ---------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            projectCards.forEach((card) => {
                const matches =
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter;

                card.classList.toggle("hide", !matches);
            });
        });
    });

    /* ---------- Accessible project modal ---------- */
    const modal = document.getElementById("projectModal");
    const modalContent = modal.querySelector(".modal-content");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalClose = document.getElementById("modalClose");
    const detailButtons = document.querySelectorAll(".project-details-btn");

    let lastFocusedElement = null;

    const openModal = (button) => {
        lastFocusedElement = button;

        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        body.classList.add("no-scroll");

        modalClose.focus();
    };

    const closeModal = () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        body.classList.remove("no-scroll");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => openModal(button));
    });

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("show")) return;

        if (event.key === "Escape") {
            closeModal();
            return;
        }

        /* Simple focus trap for keyboard users */
        if (event.key === "Tab") {
            const focusable = modalContent.querySelectorAll(
                "button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    /* ---------- Contact form validation ---------- */
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const fields = [
        {
            input: nameInput,
            error: document.getElementById("nameError"),
            validate: (value) =>
                value.length >= 3 ? "" : "Name must contain at least 3 characters."
        },
        {
            input: emailInput,
            error: document.getElementById("emailError"),
            validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "Please enter a valid email address."
        },
        {
            input: messageInput,
            error: document.getElementById("messageError"),
            validate: (value) =>
                value.length >= 10
                    ? ""
                    : "Message must contain at least 10 characters."
        }
    ];

    const clearFieldError = (field) => {
        field.input.classList.remove("invalid");
        field.input.setAttribute("aria-invalid", "false");
        field.error.textContent = "";
    };

    const validateField = (field) => {
        const value = field.input.value.trim();
        const message = value === "" ? "This field is required." : field.validate(value);

        if (message) {
            field.input.classList.add("invalid");
            field.input.setAttribute("aria-invalid", "true");
            field.error.textContent = message;
            return false;
        }

        clearFieldError(field);
        return true;
    };

    fields.forEach((field) => {
        field.input.addEventListener("input", () => {
            if (field.input.value.trim()) {
                validateField(field);
            } else {
                clearFieldError(field);
            }
        });

        field.input.addEventListener("blur", () => validateField(field));
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const valid = fields.map(validateField).every(Boolean);
        const success = document.getElementById("formSuccess");

        success.textContent = "";

        if (!valid) {
            const firstInvalid = fields.find(
                (field) => field.input.getAttribute("aria-invalid") === "true"
            );

            firstInvalid?.input.focus();
            return;
        }

        success.textContent =
            "Thank you! Your message has been submitted successfully.";

        contactForm.reset();
        fields.forEach(clearFieldError);
        showToast("Form submitted successfully.");
    });

    /* ---------- Scroll-to-top ---------- */
    const topButton = document.getElementById("topButton");

    const updateTopButton = () => {
        const visible = window.scrollY > 350;
        topButton.classList.toggle("show", visible);
        topButton.setAttribute("aria-hidden", String(!visible));
    };

    window.addEventListener("scroll", updateTopButton, { passive: true });
    updateTopButton();

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---------- Active navigation ---------- */
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navItems.forEach((link) => link.classList.remove("active"));

                    const activeLink = document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                    activeLink?.classList.add("active");
                });
            },
            { rootMargin: "-35% 0px -55% 0px" }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    /* ---------- Scroll reveal ---------- */
    const revealElements = document.querySelectorAll(".reveal");
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    /* ---------- Toast ---------- */
    const toast = document.getElementById("toast");
    let toastTimer;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }
});
