document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
    const menu = document.querySelector(".menu"),
        nav = document.querySelector(".navlinks");
    if (menu) menu.addEventListener("click", () => nav.classList.toggle("open"));
    document.querySelectorAll(".navlinks a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
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
    const form = document.querySelector("#contactForm");
    if (form) form.addEventListener("submit", e => {
        e.preventDefault();
        document.querySelector(".form-message").textContent = "Thanks — your enquiry has been captured for this demo.";
        form.reset()
    });
});