// ── Mobile navigation - Simple toggle ────────────────────────
function toggleMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// ── Slideshow ────────────────────────────────────────────────
(function () {
  var slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  var idx = 0;

  function next() {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }

  // Kick off — first slide already has .active in HTML
  setInterval(next, 4000);
})();
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Load fixtures from localStorage
function loadFixtures() {
  const stored = localStorage.getItem('sikata_fixtures');
  if (stored) {
    return JSON.parse(stored);
  }
  // Default fixtures if nothing in localStorage
  return [
    { id: 1, homeTeam: 'Sikata United', awayTeam: 'Kakamega Stars', date: '2026-04-05', time: '15:00', venue: 'Bungoma Stadium', status: 'Upcoming' },
    { id: 2, homeTeam: 'Mumias FC', awayTeam: 'Sikata United', date: '2026-04-12', time: '16:00', venue: 'Mumias Complex', status: 'Upcoming' },
    { id: 3, homeTeam: 'Sikata United', awayTeam: 'Webuye City', date: '2026-04-19', time: '15:00', venue: 'Bungoma Stadium', status: 'Upcoming' },
    { id: 4, homeTeam: 'Malava United', awayTeam: 'Sikata United', date: '2026-04-26', time: '16:30', venue: 'Malava Grounds', status: 'Upcoming' }
  ];
}

// Render fixtures on the main page
function renderFixtures() {
  const fixtures = loadFixtures();
  const container = document.querySelector('.fixtures-list');
  
  if (!container) return;
  
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  container.innerHTML = fixtures.map(f => {
    const dateObj = new Date(f.date);
    const month = months[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const time24 = f.time;
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const time = `${hour12}:${minutes} ${ampm}`;
    
    return `
      <div class="fixture-card">
        <div class="fixture-date">
          <p class="date">${month} ${day}</p>
        </div>
        <div class="fixture-match">
          <p class="team">${f.homeTeam}</p>
          <p class="vs">VS</p>
          <p class="team">${f.awayTeam}</p>
        </div>
        <div class="fixture-info">
          <p class="time">${time}</p>
          <p class="venue">${f.venue}</p>
          <span class="status">${f.status}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Form submission with contact email
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Get contact email from localStorage or use default
    const contactEmail = localStorage.getItem('sikata_contact_email') || 'sikataunited@gmail.com';
    
    // Create mailto link with form data
    const subject = encodeURIComponent('New Message from Sikata United Website');
    const body = encodeURIComponent(
      `Name: ${data.name || 'Not provided'}\n` +
      `Email: ${data.email || 'Not provided'}\n\n` +
      `Message:\n${data.message || 'No message'}`
    );
    
    // Open email client
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    
    // Show confirmation
    alert('Thank you for your message! Your email client will open to send the message.');
    
    // Reset form
    this.reset();
  });
});

// Initialize fixtures on page load
document.addEventListener('DOMContentLoaded', function() {
  renderFixtures();
});

// Add animation on scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .player-card, .fixture-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(el);
});

// Add visible class styling via JS
const style = document.createElement('style');
style.textContent = `
  .gallery-item.visible,
  .player-card.visible,
  .fixture-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Stagger animation delays
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.player-card').forEach((item, i) => {
  item.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sikata United FC website loaded');
});
