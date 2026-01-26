// Hero Carousel Functionality
class HeroCarousel {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.hero-carousel__slide');
    this.indicators = container.querySelectorAll('.hero-carousel__indicator');
    this.prevBtn = container.querySelector('.hero-carousel__prev');
    this.nextBtn = container.querySelector('.hero-carousel__next');
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    // Set up event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Auto-slide
    this.startAutoSlide();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.container.addEventListener('mouseleave', () => this.startAutoSlide());

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  goToSlide(index) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');

    // Animate content
    this.animateSlideContent();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  animateSlideContent() {
    const activeSlide = this.slides[this.currentSlide];
    const elements = activeSlide.querySelectorAll('[data-animate]');
    
    elements.forEach((el, index) => {
      const delay = parseFloat(el.getAttribute('data-delay')) || 0;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * 1000);
    });
  }
}

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      // Handle different formats (numbers, percentages, etc.)
      if (target.includes('+')) {
        element.textContent = Math.floor(current) + '+';
      } else if (target.includes('/')) {
        element.textContent = target; // Don't animate time-based values
      } else if (!isNaN(target)) {
        element.textContent = Math.floor(current);
      } else {
        element.textContent = target;
      }
    }
  }, 16);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Hero Carousel
  const carouselContainer = document.querySelector('.hero-carousel__container');
  if (carouselContainer) {
    new HeroCarousel(carouselContainer);
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Handle newsletter form submission
  const newsletterForm = document.querySelector('.footer__newsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.footer__input').value;
      if (email) {
        alert('Thank you for subscribing!');
        this.querySelector('.footer__input').value = '';
      }
    });
  }

  // Enhanced scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Handle elements with data-animate attribute
        const animatedElements = entry.target.querySelectorAll('[data-animate]');
        animatedElements.forEach((el, index) => {
          const delay = parseFloat(el.getAttribute('data-delay')) || 0;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay * 1000);
        });

        // Handle stat cards with counter animation
        if (entry.target.classList.contains('stat-card')) {
          entry.target.classList.add('animated');
          const numberEl = entry.target.querySelector('.stat-card__number');
          if (numberEl) {
            const targetValue = numberEl.getAttribute('data-count');
            if (targetValue) {
              setTimeout(() => {
                animateCounter(numberEl, targetValue);
              }, 300);
            }
          }
        }

        // Handle feature cards
        if (entry.target.classList.contains('feature-card')) {
          entry.target.classList.add('animated');
        }

        // Handle product cards
        if (entry.target.classList.contains('product-card')) {
          entry.target.classList.add('animated');
        }

        // Handle sections
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections and animated elements
  const sections = document.querySelectorAll('.featured-products, .about, .contact, .stats-section, .features-section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  // Observe stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    observer.observe(card);
  });

  // Observe feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    observer.observe(card);
  });

  // Observe product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    observer.observe(card);
  });

  // Parallax effect for hero carousel
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel && scrollTop < heroCarousel.offsetHeight) {
      const parallaxValue = scrollTop * 0.5;
      heroCarousel.style.transform = `translateY(${parallaxValue}px)`;
    }
    lastScrollTop = scrollTop;
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});
