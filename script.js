
const skillBtn = document.querySelector("#skillBtn");
const expeBtn = document.querySelector("#ExperienceBtn");
const eduBtn = document.querySelector("#EducationBtn");

const skillDiv = document.querySelector("#skillDetailsDiv");
const expeDiv = document.querySelector("#ExperienceDetailDiv");
const eduDiv = document.querySelector("#educationPicDetail");

/**
 * @param {HTMLElement} showDiv
 * @param {HTMLElement} activeBtn
 */

function switchTab(showDiv, activeBtn) {
    
    skillDiv.style.display = "none";
    expeDiv.style.display = "none";
    eduDiv.style.display = "none";

    skillBtn.style.borderBottom = "none";
    expeBtn.style.borderBottom = "none";
    eduBtn.style.borderBottom = "none";

    showDiv.style.display = "inline-block"; 
    activeBtn.style.borderBottom = "3px solid aqua";
}

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


var typed = new Typed('#typed', {
    strings: ['Frontend Developer', 'MERN Stack Developer', 'Freelancer'],
    typeSpeed: 100,
    loop: true,
});


const sr = ScrollReveal({
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true,
    mobile: true 
});

sr.reveal('.helloTxt', { origin: 'top' });
sr.reveal('.nameTxt', { origin: 'left', delay: 400 });
sr.reveal('.imTxt', { origin: 'right', delay: 600 });
sr.reveal('#bioTxt', { origin: 'bottom', delay: 800 });
sr.reveal('#image', { origin: 'right', scale: 0.5 });
sr.reveal('.iconDiv', { interval: 100, origin: 'bottom', delay: 1000 });
sr.reveal('#cvBtn', { origin: 'bottom', delay: 1200 });

sr.reveal('#aboutMe', { origin: 'left' });
sr.reveal('#educationPicDetail', { 
    origin: 'bottom', 
    scale: 0.9, 
    distance: '20px',
    viewFactor: 0.1
});

sr.reveal('.skillPics', { 
    interval: 200, 
    origin: 'right', 
    distance: '100px',
    viewFactor: 0.1 
});

sr.reveal('.skillPicTxt', { interval: 200, origin: 'right', delay: 300 });
sr.reveal('.skill3Txt', { interval: 200, origin: 'bottom' });


sr.reveal('#skillText', { origin: 'top' });
sr.reveal('.skillicons', { interval: 100, scale: 0.5, rotate: { y: 180 } });


sr.reveal('.contact-text-div', { origin: 'top' });
sr.reveal('.contact-input-text', { origin: 'left' });
sr.reveal('.contact-input-email', { origin: 'right' });
sr.reveal('.text-description', { origin: 'bottom' });
sr.reveal('.submitt-contact', { origin: 'bottom' });
sr.reveal('.contact-me-div', { origin: 'right' });


const navbar = document.querySelector('footer');
const navButtons = document.querySelectorAll('.NavigationBar, #home');

navButtons.forEach(button => {
    button.addEventListener('click', () => {

        navbar.classList.add('nav-active');

        
        setTimeout(() => {
            navbar.classList.remove('nav-active');
        }, 1500); 
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        
        navbar.classList.remove('nav-active');
    }
});