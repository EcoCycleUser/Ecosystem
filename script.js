// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Sample marketplace data
    const marketplaceItems = [
      {
        name: "Vegetable Peels",
        quantity: "20 kg",
        location: "Delhi",
        description: "Rich in organic content. Ideal for compost."
      },
      {
        name: "Fruit Waste",
        quantity: "15 kg",
        location: "Noida",
        description: "Fresh fruit waste from local markets."
      },
      {
        name: "Bakery Waste",
        quantity: "50 kg",
        location: "Greater Noida",
        description: "Perfect for organic mulch and compost."
      }
    ];
  
    const container = document.getElementById("marketplace-items");
  
    marketplaceItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "market-item";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p>${item.description}</p>
      `;
      container.appendChild(card);
    });
  
    // Join Form
    document.getElementById("join-form").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for joining Ecocycle as an Organizer!");
      this.reset();
    });
  
    // Contact Form
    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Your message has been sent successfully!");
      this.reset();
    });
  });
  
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', 
    mobileMenuBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
  );
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > lastScrollTop) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Form Validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    if (isValid) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Thank you for your submission!';
      form.appendChild(successMessage);

      // Reset form
      form.reset();

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
});

// Marketplace Filter
const wasteTypeFilter = document.getElementById('waste-type');
const sortByFilter = document.getElementById('sort-by');
const marketplaceItems = document.getElementById('marketplace-items');

wasteTypeFilter.addEventListener('change', filterItems);
sortByFilter.addEventListener('change', filterItems);

function filterItems() {
  const wasteType = wasteTypeFilter.value;
  const sortBy = sortByFilter.value;
  const items = Array.from(marketplaceItems.children);

  // Filter by waste type
  items.forEach(item => {
    if (wasteType === 'all' || item.dataset.type === wasteType) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Sort items
  const visibleItems = items.filter(item => item.style.display !== 'none');
  visibleItems.sort((a, b) => {
    const quantityA = parseInt(a.querySelector('.quantity').textContent);
    const quantityB = parseInt(b.querySelector('.quantity').textContent);

    switch (sortBy) {
      case 'quantity-low':
        return quantityA - quantityB;
      case 'quantity-high':
        return quantityB - quantityA;
      default:
        return 0;
    }
  });

  // Reorder items in the container
  visibleItems.forEach(item => {
    marketplaceItems.appendChild(item);
  });
}

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

testimonialSlider.addEventListener('mousedown', dragStart);
testimonialSlider.addEventListener('touchstart', dragStart);
testimonialSlider.addEventListener('mouseup', dragEnd);
testimonialSlider.addEventListener('touchend', dragEnd);
testimonialSlider.addEventListener('mousemove', drag);
testimonialSlider.addEventListener('touchmove', drag);

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  testimonialSlider.style.cursor = 'grabbing';
}

function dragEnd() {
  isDragging = false;
  testimonialSlider.style.cursor = 'grab';
}

function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
    testimonialSlider.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Animate Stats
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.hero-stats');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          stat.textContent = Math.floor(current).toLocaleString();
        }, 20);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Image Lazy Loading
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Form Redirect
function redirectToForm(type) {
  const form = document.getElementById('join-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
    // You can add additional logic here to pre-fill the form based on the type
  }
}

// Add loading state to buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    if (this.type === 'submit') {
      this.classList.add('loading');
      this.disabled = true;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
  });
});

// Add hover effect to cards
const cards = document.querySelectorAll('.market-item, .impact-card, .step');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for subscribing!';
    newsletterForm.appendChild(successMessage);
    
    // Reset form
    newsletterForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
}
  