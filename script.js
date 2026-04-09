// Sikata United FC - Main JavaScript File
// Handles mobile menu, dropdowns, slideshow, gallery interactions, and contact form

// ── Mobile navigation ────────────────────────────────────────
function toggleMenu() {
  const nav   = document.querySelector('.nav-links');
  const btn   = document.querySelector('.mobile-menu-btn');
  const open  = nav.classList.toggle('nav-open');

  // Animate hamburger → X
  if (btn) btn.classList.toggle('menu-open', open);

  // Prevent body scroll while menu is open
  document.body.style.overflow = open ? 'hidden' : '';
}

// Close menu when any nav link is tapped
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu button event listener
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }
  
  // Close menu on nav link click
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      const nav = document.querySelector('.nav-links');
      const btn = document.querySelector('.mobile-menu-btn');
      if (nav) nav.classList.remove('nav-open');
      if (btn) btn.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside tap
  document.addEventListener('click', function (e) {
    const nav = document.querySelector('.nav-links');
    const btn = document.querySelector('.mobile-menu-btn');
    if (nav && nav.classList.contains('nav-open') &&
        !nav.contains(e.target) &&
        btn && !btn.contains(e.target)) {
      nav.classList.remove('nav-open');
      btn.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });
});

// ── Dropdown for mobile (touch friendly) ─────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.dropbtn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other dropdowns
          dropdowns.forEach(d => {
            if (d !== drop) d.classList.remove('active');
          });
          drop.classList.toggle('active');
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      dropdowns.forEach(drop => {
        drop.classList.remove('active');
      });
    }
  });
});

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

// ── Smooth scroll for navigation links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Don't interfere with dropdown toggles on mobile
    if (this.classList.contains('dropbtn')) return;
    
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ── Navbar background on scroll ──────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
  }
});

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.dropbtn)');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// ── Load fixtures from localStorage ──────────────────────────
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

// ── Render fixtures on the main page ─────────────────────────
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

// ── Form submission handling ─────────────────────────────────
function handleFormSubmissions() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Remove any existing listeners to avoid duplicates
    form.removeEventListener('submit', formSubmitHandler);
    form.addEventListener('submit', formSubmitHandler);
  });
}

function formSubmitHandler(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
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
}

// ── Animation on scroll (Intersection Observer) ──────────────
function initScrollAnimations() {
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
  const animatedElements = document.querySelectorAll('.gallery-item, .player-card, .fixture-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add visible class styling
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
}

// ── Stagger animation delays ─────────────────────────────────
function applyStaggerDelays() {
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });

  document.querySelectorAll('.player-card').forEach((item, i) => {
    item.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });
}

// ── Gallery item click handler (optional lightbox) ───────────
function initGalleryClicks() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img && img.src) {
        // Simple alert showing image - can be expanded to lightbox
        console.log('Gallery image clicked:', img.src);
        // Optional: open in new tab or lightbox
        // window.open(img.src, '_blank');
      }
    });
  });
}

// ── Initialize everything on DOM load ────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  console.log('Sikata United FC website loaded');
  
  // Render fixtures
  renderFixtures();
  
  // Handle form submissions
  handleFormSubmissions();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Apply stagger delays
  applyStaggerDelays();
  
  // Initialize gallery clicks
  initGalleryClicks();
  
  // Fix hero section alignment on window resize
  function fixHeroLayout() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    if (window.innerWidth <= 768 && heroImage) {
      // Mobile layout is handled by CSS
    }
  }
  
  window.addEventListener('resize', fixHeroLayout);
  fixHeroLayout();
});

// ── Export functions for potential use in admin panel ─────────
window.sikataUnited = {
  loadFixtures,
  renderFixtures,
  handleFormSubmissions,
  toggleMenu
};