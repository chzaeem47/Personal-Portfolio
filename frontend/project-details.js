document.addEventListener("DOMContentLoaded", () => {

    const projectSections = Array.from(document.querySelectorAll(".pd-project"));
    const railItems = Array.from(document.querySelectorAll(".pd-rail li"));
    const railFill = document.getElementById("railFill");
    const mobileFill = document.getElementById("mobileProgressFill");

    // Wrap rail <a> elements in <li> reference for active-state toggling
    document.querySelectorAll("#railList a").forEach((a) => {
        a.closest("li").dataset.index = a.dataset.index;
    });

    function setActiveRail(index) {
        railItems.forEach((li, i) => {
            li.classList.toggle("active", i === index);
        });
        if (railFill) {
            const pct = ((index + 1) / projectSections.length) * 100;
            railFill.style.height = pct + "%";
        }
    }

    if ("IntersectionObserver" in window && projectSections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = projectSections.indexOf(entry.target);
                    setActiveRail(idx);
                }
            });
        }, { threshold: 0.45 });

        projectSections.forEach((section) => spy.observe(section));
    }

    // Mobile top progress bar based on overall scroll through project sections
    function updateMobileProgress() {
        if (!mobileFill || !projectSections.length) return;

        const first = projectSections[0];
        const last = projectSections[projectSections.length - 1];

        const start = first.offsetTop;
        const end = last.offsetTop + last.offsetHeight - window.innerHeight;
        const range = Math.max(end - start, 1);

        const progress = Math.min(Math.max((window.scrollY - start) / range, 0), 1);
        mobileFill.style.width = (progress * 100) + "%";
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateMobileProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateMobileProgress();

    // Graceful fallback if a demo video source doesn't exist yet
    document.querySelectorAll(".pd-video-frame video").forEach((video) => {
        video.addEventListener("error", () => {
            video.closest(".pd-video-frame").style.opacity = "0.55";
        }, true);
    });

});