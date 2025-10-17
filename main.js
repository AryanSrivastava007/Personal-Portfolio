/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


// ===== Shrink header/logo on scroll =====
window.addEventListener('scroll', function () {
  const header = document.querySelector('.l-header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('header--shrink');
    document.body.classList.add('is-scrolled');
  } else {
    header.classList.remove('header--shrink');
    document.body.classList.remove('is-scrolled');
  }

  // Smoothly scale/fade the big hero title as we scroll (blend into navbar title)
  const heroTitle = document.querySelector('.home__title');
  if (heroTitle) {
    const max = 320;                      // extend distance for smoother change
    const p = Math.min(window.scrollY / max, 1);
    const scale = 1 - 0.10 * p;           // 1 → 0.9 (gentler)
    const opacity = 1 - 0.30 * p;         // 1 → 0.7 (still visible)
    const translateY = -6 * p;            // smaller lift
    heroTitle.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    heroTitle.style.opacity = opacity.toFixed(2);
  }
});

// ===== Bring hero text above photo when hovering the photo =====
(function () {
  const home = document.querySelector('.home');
  const homeImg = document.querySelector('.home__img');
  if (!home || !homeImg) return;
  homeImg.addEventListener('mouseenter', () => home.classList.add('hovering-photo'));
  homeImg.addEventListener('mouseleave', () => home.classList.remove('hovering-photo'));
})();

// ===== Skills progress animation & counting =====
(function () {
  const container = document.querySelector('.skills__container');
  if (!container) return;

  const startCounters = () => {
    const percents = container.querySelectorAll('.skills__percentage');
    percents.forEach((el) => {
      const target = parseInt(el.dataset.value || '0', 10);
      const duration = 1200; // ms
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / duration, 1);
        const val = Math.round(target * p);
        el.textContent = val + '%';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  const onReveal = () => {
    container.classList.add('skills--animate');
    startCounters();
    obs && obs.disconnect();
  };

  // Prefer IntersectionObserver for smooth trigger
  let obs = null;
  if ('IntersectionObserver' in window) {
    obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) onReveal();
      });
    }, { threshold: 0.25 });
    obs.observe(container);
  } else {
    // Fallback
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        onReveal();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
})();

// ===== Contact form: send via mailto (no backend required) =====
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  // CHANGE this to your destination email
  const RECEIVE_EMAIL = 'aryansrivastava04643@gmail.com';

  const nameEl = document.getElementById('contactName');
  const emailEl = document.getElementById('contactEmail');
  const msgEl = document.getElementById('contactMessage');
  const notice = document.getElementById('contactNotice');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = (nameEl.value || '').trim();
    const email = (emailEl.value || '').trim();
    const msg = (msgEl.value || '').trim();
    if(!name || !email || !msg){
      notice.textContent = 'Please fill out your name, email, and message.';
      notice.style.color = '#e74c3c';
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
    const mailto = `mailto:${RECEIVE_EMAIL}?subject=${subject}&body=${body}`;

    // Try opening the mail client
    window.location.href = mailto;

    // Friendly hint for users without a default mail app
    notice.innerHTML = 'If your email app did not open, <a href="' + mailto + '">click here</a> or email me at <strong>' + RECEIVE_EMAIL + '</strong>.';
    notice.style.color = '#2c3e50';
  });
})();