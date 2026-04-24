// Silverwood Real Estate — shared behaviors

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('visible'));
  }

  // Mailto form handler — builds a mailto: link from contact form fields
  const form = document.querySelector('form.contact-form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const to = form.dataset.mailto || 'brandonbecker.realestate@gmail.com';
      const name = (form.elements['name'] || {}).value || '';
      const email = (form.elements['email'] || {}).value || '';
      const subject = (form.elements['subject'] || {}).value || 'Inquiry via silverwood-realestate.com';
      const message = (form.elements['message'] || {}).value || '';
      const body = `${message}\n\n—\nFrom: ${name}\nReply-to: ${email}`;
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
    });
  }
});
