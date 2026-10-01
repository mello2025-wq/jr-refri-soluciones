// ==========================================================================
// JR REFRI SOLUCIONES - Interactive Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBody = firstItem.querySelector('.faq-body');
    firstItem.classList.add('active');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // 3. Quick Booking Form -> Pre-filled WhatsApp Redirect
  const quickForm = document.getElementById('quickBookingForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('formNombre').value.trim();
      const telefono = document.getElementById('formTelefono').value.trim();
      const servicio = document.getElementById('formServicio').value;
      const zona = document.getElementById('formZona').value;

      let mensaje = `Hola JR Refri Soluciones, deseo cotizar un servicio:\n`;
      mensaje += `👤 Nombre: ${nombre || 'No especificado'}\n`;
      if (telefono) mensaje += `📞 Teléfono: ${telefono}\n`;
      mensaje += `🛠️ Servicio: ${servicio}\n`;
      mensaje += `📍 Zona: ${zona}\n`;
      mensaje += `¿Podrían darme más información y disponibilidad?`;

      const encodedMessage = encodeURIComponent(mensaje);
      const whatsappUrl = `https://wa.me/50768163211?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }
});
