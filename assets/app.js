// =================<HEAD> Tag =================
fetch("/partials/head.html")
    .then(res => res.text())
    .then(data => document.head.insertAdjacentHTML("afterbegin", data));

// =================Head Header Footer =================
document.addEventListener("DOMContentLoaded", () => {
    /* =========================LOAD HEADER========================= */
    const header = document.getElementById("header");
    if (header) {
        fetch("/partials/header.html")
            .then(res => res.text())
            .then(data => {
                header.innerHTML = data;
                /* =========================MOBILE MENU========================= */
                const menu = header.querySelector(".menu");
                const nav = header.querySelector(".navlinks");
                if (menu && nav) {
                    menu.addEventListener("click", () => {
                        nav.classList.toggle("open");
                    });
                    nav.querySelectorAll("a").forEach(link => {
                        link.addEventListener("click", () => {
                            nav.classList.remove("open");
                        });
                    });
                }
                /* =========================ACTIVE NAV LINK========================= */
                const currentPage =
                    window.location.pathname.split("/").pop() || "index.html";
                nav.querySelectorAll("a").forEach(link => {
                    const href = link.getAttribute("href");
                    if (!href) return;
                    if (href.includes("#")) return;
                    const linkPage =
                        // href.split("/").pop().split("#")[0] || "index.html";
                        href.split("/").pop() || "index.html";
                    if (href === "/#testimonial") {
                        if (currentPage === "index.html") {
                            link.classList.add("active");
                        }
                        return;
                    }
                    if (linkPage === currentPage) {
                        link.classList.add("active");
                    }
                });
            });
    }
    /* =========================LOAD FOOTER========================= */
    const footer = document.getElementById("footer");
    if (footer) {
        fetch("/partials/footer.html")
            .then(res => res.text())
            .then(data => footer.innerHTML = data);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
    // const menu = document.querySelector(".menu"),
    //     nav = document.querySelector(".navlinks");
    // if (menu) menu.addEventListener("click", () => nav.classList.toggle("open"));
    // document.querySelectorAll(".navlinks a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("show") }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(x => obs.observe(x));
    document.querySelectorAll("[data-year]").forEach(x => x.textContent = new Date().getFullYear());
    document.querySelectorAll(".filter").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const type = btn.dataset.filter;
            document.querySelectorAll("[data-type]").forEach(card => card.style.display = (type === "all" || card.dataset.type === type) ? "" : "none");
        })
    });
});

// ==========================Contact Form JS=====================
document.addEventListener("DOMContentLoaded", function() {
    // const form = document.getElementById("contactForm");
    // const message = document.querySelector(".form-message");
    // if (!form) return;
    // form.addEventListener("submit", async function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const button = form.querySelector("button[type='submit']");
    //     button.disabled = true;
    //     button.textContent = "Sending...";
    //     try {
    //         const response = await fetch(form.action, {
    //             method: "POST",
    //             body: new FormData(form),
    //             headers: {
    //                 "Accept": "application/json"
    //             }
    //         });
    //         const result = await response.json();
    //         if (result.success) {
    //             message.textContent =
    //                 "Thanks! Your enquiry has been sent successfully.";
    //             form.reset();
    //         } else {
    //             message.textContent =
    //                 "Something went wrong. Please try again.";
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         message.textContent =
    //             "Something went wrong. Please try again.";
    //     }
    //     button.disabled = false;
    //     button.textContent = "Send Enquiry →";
    // });
});

// ==========================Contact Form JS with hCaptcha====================
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const message = form.querySelector(".form-message");
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Check hCaptcha
        const hCaptcha = form.querySelector(
            "textarea[name='h-captcha-response']"
        ).value;
        if (!hCaptcha) {
            message.textContent = "Please complete the captcha.";
            return;
        }
        const button = form.querySelector("button[type='submit']");
        button.disabled = true;
        button.textContent = "Sending...";
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            if (result.success) {
                message.textContent =
                    "Thanks! Your enquiry has been sent successfully.";
                form.reset();
            } else {
                message.textContent =
                    "Something went wrong. Please try again.";
            }
        } catch (error) {
            console.error(error);
            message.textContent =
                "Something went wrong. Please try again.";
        }
        button.disabled = false;
        button.textContent = "Send Enquiry →";
    });
});

// ==========================Career Form JS=====================
document.addEventListener("DOMContentLoaded", function() {
    // const applicationform = document.getElementById("applicationform");
    // const message = document.querySelector(".form-message");
    // if (!applicationform) return;
    // applicationform.addEventListener("submit", async function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const button = applicationform.querySelector("button[type='submit']");
    //     button.disabled = true;
    //     button.textContent = "Submitting...";
    //     try {
    //         const response = await fetch(applicationform.action, {
    //             method: "POST",
    //             body: new FormData(applicationform),
    //             headers: {
    //                 "Accept": "application/json"
    //             }
    //         });
    //         const result = await response.json();
    //         if (result.success) {
    //             message.textContent =
    //                 "Thanks — your application has been sent successfully. Our Team will get back to you.";

    //             applicationform.reset();
    //         } else {
    //             message.textContent =
    //                 "Something went wrong. Please try again.";
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         message.textContent =
    //             "Something went wrong. Please try again.";
    //     }
    //     button.disabled = false;
    //     button.textContent = "Submit Application →";
    // });
});

// ==========================Career Form JS with hCaptcha=====================
document.addEventListener("DOMContentLoaded", function() {
    const applicationform = document.getElementById("applicationform");
    if (!applicationform) return;
    const message = applicationform.querySelector(".form-message");
    applicationform.addEventListener("submit", async function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Check hCaptcha
        const hCaptcha = applicationform.querySelector(
            "textarea[name='h-captcha-response']"
        ).value;
        if (!hCaptcha) {
            message.textContent = "Please complete the captcha.";
            return;
        }
        const button = applicationform.querySelector("button[type='submit']");
        button.disabled = true;
        button.textContent = "Submitting...";
        try {
            const response = await fetch(applicationform.action, {
                method: "POST",
                body: new FormData(applicationform),
                headers: {
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            if (result.success) {
                message.textContent =
                    "Thanks — your application has been sent successfully. Our Team will get back to you.";
                applicationform.reset();
            } else {
                message.textContent =
                    "Something went wrong. Please try again.";
            }
        } catch (error) {
            console.error(error);
            message.textContent =
                "Something went wrong. Please try again.";
        }
        button.disabled = false;
        button.textContent = "Submit Application →";
    });
});