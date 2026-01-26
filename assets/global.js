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
  // Handle non-numeric values (like "24/7") - display immediately without animation
  if (target.includes('/') || isNaN(parseFloat(target.replace(/[^0-9.]/g, '')))) {
    element.textContent = target;
    return;
  }

  // Extract numeric value and suffix
  const numericMatch = target.match(/([\d.]+)([KMB]?\+?)/);
  if (!numericMatch) {
    element.textContent = target;
    return;
  }

  const numericValue = parseFloat(numericMatch[1]);
  const suffix = numericMatch[2] || '';
  const multiplier = suffix.includes('K') ? 1000 : suffix.includes('M') ? 1000000 : suffix.includes('B') ? 1000000000 : 1;
  const actualTarget = numericValue * multiplier;

  const start = 0;
  const increment = actualTarget / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= actualTarget) {
      // Format final value with suffix
      if (suffix.includes('K')) {
        element.textContent = numericValue + 'K' + (suffix.includes('+') ? '+' : '');
      } else if (suffix.includes('M')) {
        element.textContent = numericValue + 'M' + (suffix.includes('+') ? '+' : '');
      } else if (suffix.includes('B')) {
        element.textContent = numericValue + 'B' + (suffix.includes('+') ? '+' : '');
      } else {
        element.textContent = Math.floor(current) + (suffix.includes('+') ? '+' : '');
      }
      clearInterval(timer);
    } else {
      // Animate with proper formatting
      const displayValue = current / multiplier;
      if (suffix.includes('K')) {
        element.textContent = Math.floor(displayValue) + 'K' + (suffix.includes('+') ? '+' : '');
      } else if (suffix.includes('M')) {
        element.textContent = Math.floor(displayValue) + 'M' + (suffix.includes('+') ? '+' : '');
      } else if (suffix.includes('B')) {
        element.textContent = Math.floor(displayValue) + 'B' + (suffix.includes('+') ? '+' : '');
      } else {
        element.textContent = Math.floor(current) + (suffix.includes('+') ? '+' : '');
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

        // Handle testimonial cards
        if (entry.target.classList.contains('testimonial-card')) {
          entry.target.classList.add('animated');
        }

        // Handle sections
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections and animated elements
  const sections = document.querySelectorAll('.featured-products, .about, .contact, .stats-section, .features-section, .testimonials-section');
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

  // Observe testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
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

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.header__mobile-menu-toggle');
  const mobileNav = document.querySelector('.header__mobile-nav');
  
  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileNav.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Fix product links - ensure they work even if product.url is empty
  const productLinks = document.querySelectorAll('.product-card__link');
  productLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Check if href is invalid or empty
      if (!href || href === '#' || href.includes('undefined') || href.trim() === '') {
        e.preventDefault();
        // Redirect to collections page or home
        const collectionsUrl = window.routes?.collections_url || '/collections/all';
        window.location.href = collectionsUrl;
      }
    });
  });

  // Product Page Functionality
  initProductPage();
});

// Product Page Functions
function initProductPage() {
  // Product Image Gallery
  const thumbnails = document.querySelectorAll('.product-images__thumbnail');
  const featuredImage = document.getElementById('ProductImage');
  
  if (thumbnails.length > 0 && featuredImage) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const imageIndex = this.getAttribute('data-image-index');
        const thumbnailImg = this.querySelector('img');
        
        // Get high-resolution image URL
        let imageSrc = thumbnailImg.src;
        // Replace thumbnail size with high-res size
        imageSrc = imageSrc.replace(/width=\d+/, 'width=1200');
        
        // Create srcset for responsive images
        const srcset = [
          imageSrc.replace(/width=\d+/, 'width=600') + ' 600w',
          imageSrc.replace(/width=\d+/, 'width=900') + ' 900w',
          imageSrc.replace(/width=\d+/, 'width=1200') + ' 1200w',
          imageSrc.replace(/width=\d+/, 'width=1500') + ' 1500w'
        ].join(', ');
        
        // Update featured image with high resolution
        featuredImage.src = imageSrc;
        featuredImage.srcset = srcset;
        featuredImage.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px';
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Quantity Controls
  const quantityInput = document.querySelector('.product-form__quantity-input');
  const decreaseBtn = document.querySelector('[data-action="decrease"]');
  const increaseBtn = document.querySelector('[data-action="increase"]');

  if (quantityInput && decreaseBtn && increaseBtn) {
    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value) || 1;
      quantityInput.value = currentValue + 1;
    });

    quantityInput.addEventListener('change', function() {
      const value = parseInt(this.value) || 1;
      if (value < 1) {
        this.value = 1;
      }
    });
  }

  // Variant Selection
  const variantButtons = document.querySelectorAll('.product-form__option-value');
  const variantIdInput = document.getElementById('product-variant-id');
  
  if (variantButtons.length > 0) {
    // This would need to be populated with actual variant data from Shopify
    // For now, we'll just handle the UI interaction
    variantButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const option = this.getAttribute('data-option');
        const value = this.getAttribute('data-value');
        
        // Remove active class from siblings
        const siblings = this.parentElement.querySelectorAll('.product-form__option-value');
        siblings.forEach(sibling => {
          if (sibling.getAttribute('data-option') === option) {
            sibling.classList.remove('active');
          }
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Here you would update the variant ID based on selected options
        // This requires Shopify's variant selection logic
      });
    });
  }

  // Add to Cart Form Submission
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('#AddToCart');
      const originalText = submitButton.innerHTML;
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Adding to Cart...</span>';
      
      const formData = new FormData(this);
      
      try {
        const response = await fetch(window.routes.cart_add_url, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          // Show success message
          submitButton.innerHTML = '<span>✓ Added to Cart!</span>';
          submitButton.style.background = 'var(--color-success)';
          
          // Update cart count
          updateCartCount();
          
          // Redirect to cart or show notification
          setTimeout(() => {
            window.location.href = window.routes.cart_url;
          }, 1000);
        } else {
          throw new Error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        alert('Failed to add product to cart. Please try again.');
      }
    });
  }

  // Update cart count
  function updateCartCount() {
    fetch(window.routes.cart_url + '.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.querySelector('.header__cart-count');
        if (cartCount) {
          const itemCount = cart.item_count || 0;
          if (itemCount > 0) {
            cartCount.textContent = itemCount;
            cartCount.style.display = 'flex';
          } else {
            cartCount.style.display = 'none';
          }
        }
      })
      .catch(error => console.error('Error updating cart count:', error));
  }
}
