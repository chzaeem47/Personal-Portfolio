
document.addEventListener("DOMContentLoaded", () => {


const splashHero = document.querySelector("#splashHero");
const splashEnterBtn = document.querySelector("#splashEnterBtn");
const homeSec = document.querySelector("#homeSec");

let splashFinished = !splashHero;
let homeIntroPlayed = false;
let typedStarted = false;


function revealHomeIntro() {
    if (!homeSec || homeIntroPlayed) return;

    homeIntroPlayed = true;
    homeSec.classList.add("home-intro-play");
    
}

if (homeSec && "IntersectionObserver" in window) {
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && splashFinished) {
                revealHomeIntro();
            }
        });
    }, {
        threshold: 0.35
    });

    homeObserver.observe(homeSec);
}

if (splashHero) {
    let isSplashClosing = false;

    document.body.classList.add("splash-active");

    requestAnimationFrame(() => {
        splashHero.classList.add("splash-loaded");
    });

    function createPortfolioBridge() {
        const bridge = document.createElement("div");
        bridge.className = "portfolio-bridge";

        bridge.innerHTML = `
            <div class="bridge-glass"></div>

            <div class="bridge-hanging-card card-one">
                <span></span>
                <h4>Frontend</h4>
                <p>Clean UI</p>
            </div>

            <div class="bridge-hanging-card card-two">
                <span></span>
                <h4>MERN</h4>
                <p>Full Stack</p>
            </div>

            <div class="bridge-hanging-card card-three">
                <span></span>
                <h4>Projects</h4>
                <p>Portfolio</p>
            </div>

            <div class="bridge-line"></div>
            <p class="bridge-text">Entering Portfolio</p>
        `;

        document.body.appendChild(bridge);

        requestAnimationFrame(() => {
            bridge.classList.add("bridge-active");
        });

        return bridge;
    }

    function closeSplash(targetId = "#homeSec") {
        if (isSplashClosing) return;
        isSplashClosing = true;

        const targetSection = document.querySelector(targetId);
        const bridge = createPortfolioBridge();

        if (splashEnterBtn) {
            splashEnterBtn.classList.add("is-launching");
        }

        splashHero.classList.add("splash-pro-exit");

        setTimeout(() => {
            document.body.classList.remove("splash-active");

            if (targetSection) {
                const oldScrollBehavior = document.documentElement.style.scrollBehavior;
                document.documentElement.style.scrollBehavior = "auto";

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "auto"
                });

                document.documentElement.style.scrollBehavior = oldScrollBehavior;
            }

            splashHero.style.display = "none";
            document.body.classList.add("portfolio-revealed");
        }, 900);

        setTimeout(() => {
            splashFinished = true;

            if (targetId === "#homeSec") {
                revealHomeIntro();
            }

            bridge.classList.add("bridge-leave");
        }, 2000);

        setTimeout(() => {
            bridge.remove();
        }, 2500);
    }

    if (splashEnterBtn) {
        splashEnterBtn.addEventListener("click", () => {
            closeSplash("#homeSec");
        });
    }

    splashHero.addEventListener("wheel", (event) => {
        event.preventDefault();
        closeSplash("#homeSec");
    }, { once: true, passive: false });

    splashHero.addEventListener("touchmove", (event) => {
        event.preventDefault();
        closeSplash("#homeSec");
    }, { once: true, passive: false });

    document.addEventListener("keydown", (event) => {
        if (!isSplashClosing && (event.key === "Enter" || event.key === " ")) {
            closeSplash("#homeSec");
        }
    });

    const splashLinks = splashHero.querySelectorAll("a[href^='#']");

    splashLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            closeSplash(link.getAttribute("href"));
        });
    });
}


    const skillBtn = document.querySelector("#skillBtn");
    const expeBtn = document.querySelector("#ExperienceBtn");
    const eduBtn = document.querySelector("#EducationBtn");

    const skillDiv = document.querySelector("#skillDetailsDiv");
    const expeDiv = document.querySelector("#ExperienceDetailDiv");
    const eduDiv = document.querySelector("#educationPicDetail");

    function switchTab(showDiv, activeBtn) {
        if (!skillDiv || !expeDiv || !eduDiv || !skillBtn || !expeBtn || !eduBtn) return;

        skillDiv.style.display = "none";
        expeDiv.style.display = "none";
        eduDiv.style.display = "none";

        skillBtn.style.borderBottom = "none";
        expeBtn.style.borderBottom = "none";
        eduBtn.style.borderBottom = "none";

        showDiv.style.display = "inline-block";
        activeBtn.style.borderBottom = "3px solid aqua";
    }

    if (skillBtn && expeBtn && eduBtn && skillDiv && expeDiv && eduDiv) {
        switchTab(skillDiv, skillBtn);

        skillBtn.addEventListener("click", () => {
            switchTab(skillDiv, skillBtn);
        });

        expeBtn.addEventListener("click", () => {
            switchTab(expeDiv, expeBtn);
        });

        eduBtn.addEventListener("click", () => {
            switchTab(eduDiv, eduBtn);
            eduDiv.style.display = "block";
            eduDiv.style.visibility = "visible";
            eduDiv.style.opacity = "1";
        });
    }


    // =========================
    // TYPED TEXT
    // =========================

    if (typeof Typed !== "undefined" && document.querySelector("#typed")) {
        new Typed("#typed", {
            strings: ["Frontend Developer", "MERN Stack Developer", "Freelancer"],
            typeSpeed: 100,
            loop: true
        });
    }


    // =========================
    // SCROLL REVEAL
    // =========================

    if (typeof ScrollReveal !== "undefined") {
        const sr = ScrollReveal({
            distance: "60px",
            duration: 2000,
            delay: 200,
            reset: true,
            mobile: true
        });

        sr.reveal(".helloTxt", { origin: "top" });
        sr.reveal(".nameTxt", { origin: "left", delay: 400 });
        sr.reveal(".imTxt", { origin: "right", delay: 600 });
        sr.reveal("#bioTxt", { origin: "bottom", delay: 800 });
        sr.reveal("#image", { origin: "right", scale: 0.5 });
        sr.reveal(".iconDiv", { interval: 100, origin: "bottom", delay: 1000 });
        sr.reveal("#cvBtn", { origin: "bottom", delay: 1200 });

        sr.reveal("#aboutMe", { origin: "left" });

        sr.reveal("#educationPicDetail", {
            origin: "bottom",
            scale: 0.9,
            distance: "20px",
            viewFactor: 0.1
        });

        sr.reveal(".skillPics", {
            interval: 200,
            origin: "right",
            distance: "100px",
            viewFactor: 0.1
        });

        sr.reveal(".skillPicTxt", { interval: 200, origin: "right", delay: 300 });
        sr.reveal(".skill3Txt", { interval: 200, origin: "bottom" });

        sr.reveal("#skillText", { origin: "top" });
        sr.reveal(".skill-card", { interval: 100, scale: 0.5, rotate: { y: 180 } });

        sr.reveal(".contact-text-div", { origin: "top" });
        sr.reveal(".contact-input-text", { origin: "left" });
        sr.reveal(".contact-input-email", { origin: "right" });
        sr.reveal(".text-description", { origin: "bottom" });
        sr.reveal(".submitt-contact", { origin: "bottom" });
        sr.reveal(".contact-me-div", { origin: "right" });
    }


    // =========================
    // NAVBAR ACTIVE EFFECT
    // =========================

    const navbar = document.querySelector("header");
    const navButtons = document.querySelectorAll(".NavigationBar, #home");

    if (navbar && navButtons.length > 0) {
        navButtons.forEach((button) => {
            button.addEventListener("click", () => {
                navbar.classList.add("nav-active");

                setTimeout(() => {
                    navbar.classList.remove("nav-active");
                }, 1500);
            });
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                navbar.classList.remove("nav-active");
            }
        });
    }


    // =========================
    // CONTACT FORM EMAIL
    // =========================

    const submitBtn = document.querySelector(".submitt-contact");
    const nameInput = document.querySelector(".contact-input-text");
    const emailInput = document.querySelector(".contact-input-email");
    const descInput = document.querySelector(".text-description");

    if (submitBtn && nameInput && emailInput && descInput) {
        submitBtn.addEventListener("click", async () => {

            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                alert("Please fill in your name and email!");
                return;
            }

            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                description: descInput.value.trim()
            };

            try {
                const API_BASE_URL =
                location.hostname === "localhost" || location.hostname === "127.0.0.1"
                    ? "http://localhost:8080"
                    : "https://personal-portfolio-x1dh.vercel.app";

                const response = await fetch(`${API_BASE_URL}/api/contact`, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    console.log("Success! Check your email inbox.");

                    nameInput.value = "";
                    emailInput.value = "";
                    descInput.value = "";

                    submitBtn.innerText = "Sent";
                } else {
                    alert("Error: " + result.message);
                    submitBtn.innerText = "Submitt";
                }

            } catch (error) {
                console.error("Connection Error:", error);
                alert("Could not connect to the server. Make sure your backend is running!");
                submitBtn.innerText = "Submitt";

            } finally {
                setTimeout(() => {
                    submitBtn.innerText = "Submitt";
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }


    // =========================
    // PROJECT FOLDERS ANIMATION
    // =========================

    const projectFolders = document.querySelectorAll(".project-folder");

    function animateProjectFolder(folder, index) {
        if (!folder) return;

        folder.classList.remove("project-animate");
        folder.classList.remove("project-reset");

        void folder.offsetWidth;

        folder.style.setProperty("--delay", index * 140);
        folder.classList.add("project-animate");
    }

    function resetProjectFolder(folder) {
        if (!folder) return;

        folder.classList.remove("project-animate");
        folder.classList.add("project-reset");
    }

    if (projectFolders.length > 0 && "IntersectionObserver" in window) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const folder = entry.target;
                const index = Array.from(projectFolders).indexOf(folder);

                if (entry.isIntersecting) {
                    animateProjectFolder(folder, index);
                } else {
                    resetProjectFolder(folder);
                }
            });
        }, {
            threshold: 0.25
        });

        projectFolders.forEach((folder) => {
            projectObserver.observe(folder);
        });
    }

    const projectNavLinks = document.querySelectorAll('a[href="#projects"]');

    if (projectNavLinks.length > 0 && projectFolders.length > 0) {
        projectNavLinks.forEach((link) => {
            link.addEventListener("click", () => {
                setTimeout(() => {
                    projectFolders.forEach((folder, index) => {
                        animateProjectFolder(folder, index);
                    });
                }, 500);
            });
        });
    }

});


