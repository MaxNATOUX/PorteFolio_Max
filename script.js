document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulaire-contact");
    const confirmation = document.getElementById("confirmation");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        confirmation.textContent = "Merci pour votre message !";
        confirmation.style.color = "green";

        // Réinitialiser les champs du formulaire
        form.reset();
    });
});

// progrss bar
document.querySelectorAll('#competence .skill').forEach(skill => {
  const percentage = skill.getAttribute('data-percentage');
  const label = skill.getAttribute('data-label');
  const color = skill.getAttribute('data-color');

  skill.style.setProperty('--color', color);

  skill.innerHTML = `
    <svg>
      <circle class="bg" cx="60" cy="60" r="50"></circle>
      <circle class="progress" cx="60" cy="60" r="50"></circle>
    </svg>
    <div class="text">
      <div class="value">${percentage}%</div>
      <div class="label">${label}</div>
    </div>
  `;

  const progressCircle = skill.querySelector('.progress');
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  setTimeout(() => {
    progressCircle.style.strokeDashoffset = offset;
  }, 100);
});
// Fonction pour créer les progress bars circulaires
function generateSkillCircle(skill) {
  const percentage = skill.getAttribute('data-percentage');
  const label = skill.getAttribute('data-label');
  const color = skill.getAttribute('data-color');

  skill.style.setProperty('--color', color);

  skill.innerHTML = `
    <svg>
      <circle class="bg" cx="60" cy="60" r="50"></circle>
      <circle class="progress" cx="60" cy="60" r="50"></circle>
    </svg>
    <div class="text">
      <div class="value">${percentage}%</div>
      <div class="label">${label}</div>
    </div>
  `;
}

// Fonction d’animation des progress bars
function animateSkillCircle(skill) {
  const percentage = skill.getAttribute('data-percentage');
  const progressCircle = skill.querySelector('.progress');
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  progressCircle.style.strokeDashoffset = offset;
}

// Initialisation : création des cercles
document.querySelectorAll('#competence .skill').forEach(skill => {
  generateSkillCircle(skill);
  skill.classList.add('not-visible'); // Pour effet de fade-in
});

// BONUS CSS injecté pour fade-in (si pas déjà dans le CSS)
const styleFade = document.createElement('style');
styleFade.innerHTML = `
  #competence .not-visible {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  #competence .visible {
    opacity: 1;
    transform: scale(1);
  }
`;
document.head.appendChild(styleFade);

// Observer pour déclencher l’animation quand visible
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      animateSkillCircle(entry.target);
      entry.target.classList.add('visible', 'animated');
      entry.target.classList.remove('not-visible');
      obs.unobserve(entry.target); // Ne pas ré-animer plusieurs fois
    }
  });
}, {
  threshold: 0.5 // Quand la moitié de l'élément est visible
});

// Cible toutes les skills
document.querySelectorAll('#competence .skill').forEach(skill => {
  observer.observe(skill);
});
// Scroll to top button

let lastScroll = 0;
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Ne rien faire si peu de scroll
    if (currentScroll < 100) {
        scrollToTopBtn.style.display = "none";
        lastScroll = currentScroll;
        return;
    }

    // Si on descend → afficher le bouton
    if (currentScroll > lastScroll) {
        scrollToTopBtn.style.display = "block";
    } 
    // Si on remonte → cacher le bouton
    else {
        scrollToTopBtn.style.display = "none";
    }

    lastScroll = currentScroll;
});

// Action quand on clique sur le bouton
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fonction pour effet de fade-in
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      entry.target.classList.remove('section-hidden');
      observer.unobserve(entry.target); // une seule fois
    }
  });
}, {
  threshold: 0.2 // Quand 20% de la section est visible
});

sections.forEach(section => {
  section.classList.add('section-hidden');
  sectionObserver.observe(section);
});

//fonction typing text
const text = "Max A. NATOUX — Développeur Web Passionné 💻";
const target = document.getElementById("typing-text");
let index = 0;

function type() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(type, 80);
  }
}
type();
