const certificateSection = document.getElementById("certificateScrollSection");
const certificateStage = document.getElementById("certificateStage");
const certificateTrack = document.getElementById("certificateTrack");
const progressFill = document.getElementById("certificateProgressFill");
const progressText = document.getElementById("certificateProgressText");
const certificateCards = Array.from(document.querySelectorAll(".certificate-card"));

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function isMobileLayout() {
    return window.matchMedia("(max-width: 820px)").matches;
}

function getCertificateMoveDistance() {
    if (!certificateStage || !certificateTrack) return 0;
    return Math.max(certificateTrack.scrollHeight - certificateStage.clientHeight, 0);
}

function getMobileCertificateProgress() {
    if (!certificateSection) return 0;

    const sectionTop = certificateSection.offsetTop;
    const sectionHeight = certificateSection.offsetHeight;

    // On mobile the certificates are normal page content, not a nested scroller.
    // This makes the loader start at 01 / 06 and progress naturally while scrolling.
    const startPoint = sectionTop - window.innerHeight * 0.28;
    const endPoint = sectionTop + sectionHeight - window.innerHeight * 0.72;
    const range = Math.max(endPoint - startPoint, 1);

    return clamp((window.scrollY - startPoint) / range, 0, 1);
}

function setCertificateSectionHeight() {
    if (!certificateSection || !certificateStage || !certificateTrack) return;

    if (isMobileLayout()) {
        certificateSection.style.height = "auto";
        certificateSection.style.removeProperty("--certificate-scroll-distance");
        certificateTrack.style.transform = "none";
        return;
    }

    const moveDistance = getCertificateMoveDistance();

    // Desktop pinned-scroll height: viewport + only the distance needed to reveal all cards.
    certificateSection.style.setProperty("--certificate-scroll-distance", `${moveDistance}px`);
    certificateSection.style.height = `calc(100vh + ${moveDistance}px)`;
}

function updateCertificateProgress(progress) {
    if (!progressFill || !progressText || !certificateCards.length) return;

    // If there is only one certificate, show it as complete
    if (certificateCards.length === 1) {
        progressFill.style.width = "100%";
        progressText.textContent = "01 / 01";
        return;
    }

    progressFill.style.width = `${progress * 100}%`;

    const activeIndex = clamp(
        Math.ceil(progress * certificateCards.length),
        1,
        certificateCards.length
    );

    progressText.textContent = `${String(activeIndex).padStart(2, "0")} / ${String(certificateCards.length).padStart(2, "0")}`;
}

function animateCertificatesOnScroll() {
    if (!certificateSection || !certificateStage || !certificateTrack) return;

    if (isMobileLayout()) {
        certificateTrack.style.transform = "none";
        updateCertificateProgress(getMobileCertificateProgress());
        return;
    }

    const sectionTop = certificateSection.offsetTop;
    const moveDistance = getCertificateMoveDistance();

    if (moveDistance <= 0) {
        certificateTrack.style.transform = "none";
        updateCertificateProgress(0);
        return;
    }

    const progress = clamp((window.scrollY - sectionTop) / moveDistance, 0, 1);

    certificateTrack.style.transform = `translate3d(0, ${-progress * moveDistance}px, 0)`;
    updateCertificateProgress(progress);
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.16
});

document.querySelectorAll(".section-reveal").forEach((element) => {
    revealObserver.observe(element);
});

let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            animateCertificatesOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

function refreshCertificateScroll() {
    setCertificateSectionHeight();
    animateCertificatesOnScroll();
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", refreshCertificateScroll);
window.addEventListener("load", refreshCertificateScroll);

// Recalculate after fonts/layout finish settling so the section height stays exact.
setTimeout(refreshCertificateScroll, 250);
setTimeout(refreshCertificateScroll, 800);

refreshCertificateScroll();
