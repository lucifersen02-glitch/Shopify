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
    // Preserve existing structure if it has a plus-sign span
    const existingPlus = element.querySelector('.plus-sign');
    if (existingPlus) {
      element.innerHTML = target.replace('+', '<span class="plus-sign" style="font-weight: 900; letter-spacing: 0;">+</span>');
    } else {
      element.textContent = target;
    }
    return;
  }

  // Extract numeric value and suffix
  const numericMatch = target.match(/([\d.]+)([KMB]?)(\+?)/);
  if (!numericMatch) {
    element.textContent = target;
    return;
  }

  const numericValue = parseFloat(numericMatch[1]);
  const suffix = numericMatch[2] || '';
  const hasPlus = numericMatch[3] === '+';
  const multiplier = suffix.includes('K') ? 1000 : suffix.includes('M') ? 1000000 : suffix.includes('B') ? 1000000000 : 1;
  const actualTarget = numericValue * multiplier;

  const start = 0;
  const increment = actualTarget / (duration / 16); // 60fps
  let current = start;

  // Helper function to format with styled plus sign
  const formatWithPlus = (value, suffixText) => {
    const plusHtml = hasPlus ? '<span class="plus-sign" style="font-weight: 900; letter-spacing: 0;">+</span>' : '';
    return value + suffixText + plusHtml;
  };

  const timer = setInterval(() => {
    current += increment;
    if (current >= actualTarget) {
      // Format final value with suffix and styled plus
      if (suffix.includes('K')) {
        element.innerHTML = formatWithPlus(numericValue + 'K', '');
      } else if (suffix.includes('M')) {
        element.innerHTML = formatWithPlus(numericValue + 'M', '');
      } else if (suffix.includes('B')) {
        element.innerHTML = formatWithPlus(numericValue + 'B', '');
      } else {
        element.innerHTML = formatWithPlus(Math.floor(current), '');
      }
      clearInterval(timer);
    } else {
      // Animate with proper formatting
      const displayValue = current / multiplier;
      if (suffix.includes('K')) {
        element.innerHTML = formatWithPlus(Math.floor(displayValue) + 'K', '');
      } else if (suffix.includes('M')) {
        element.innerHTML = formatWithPlus(Math.floor(displayValue) + 'M', '');
      } else if (suffix.includes('B')) {
        element.innerHTML = formatWithPlus(Math.floor(displayValue) + 'B', '');
      } else {
        element.innerHTML = formatWithPlus(Math.floor(current), '');
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
  const imageContainer = document.getElementById('productImageContainer');
  
  if (thumbnails.length > 0 && featuredImage) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const imageIndex = this.getAttribute('data-image-index');
        const thumbnailImg = this.querySelector('img');
        
        // Get high-resolution image URL
        let imageSrc = thumbnailImg.src;
        // Replace thumbnail size with high-res size
        imageSrc = imageSrc.replace(/width=\d+/, 'width=1200');
        
        // Get zoom image URL (higher resolution)
        let zoomImageSrc = imageSrc.replace(/width=\d+/, 'width=2000');
        
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
        featuredImage.setAttribute('data-zoom-image', zoomImageSrc);
        
        // Update zoom result image
        const zoomResultImg = document.getElementById('zoomResultImage');
        if (zoomResultImg) {
          zoomResultImg.src = zoomImageSrc;
        }
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Image Zoom on Hover - Flipkart Style
  if (imageContainer && featuredImage) {
    const zoomLens = document.getElementById('zoomLens');
    const zoomResult = document.getElementById('zoomResult');
    const zoomResultImg = document.getElementById('zoomResultImage');
    
    // Only enable zoom on non-touch devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && zoomLens && zoomResult && zoomResultImg) {
      // Set zoom image and wait for it to load
      const zoomImageSrc = featuredImage.getAttribute('data-zoom-image') || featuredImage.src.replace(/width=\d+/, 'width=2000');
      
      // Ensure zoom image is loaded before enabling zoom
      let zoomImageLoaded = false;
      zoomResultImg.onload = function() {
        zoomImageLoaded = true;
        zoomResultImg.style.display = 'block';
      };
      zoomResultImg.onerror = function() {
        console.error('Failed to load zoom image');
        zoomImageLoaded = false;
      };
      zoomResultImg.src = zoomImageSrc;
      zoomResultImg.style.display = 'none';
      
      // Wait for featured image to load
      let featuredImageLoaded = false;
      if (featuredImage.complete && featuredImage.naturalWidth > 0) {
        featuredImageLoaded = true;
      } else {
        featuredImage.onload = function() {
          featuredImageLoaded = true;
        };
      }
      
      // Wait for images to load to get accurate dimensions
      const updateZoomDimensions = () => {
        if (!featuredImageLoaded || featuredImage.naturalWidth === 0) {
          return null;
        }
        
        const containerRect = imageContainer.getBoundingClientRect();
        
        // Get actual displayed image dimensions (accounting for object-fit: contain)
        const containerAspect = containerRect.width / containerRect.height;
        const imageAspect = featuredImage.naturalWidth / featuredImage.naturalHeight;
        
        let displayedImageWidth, displayedImageHeight, imageOffsetX, imageOffsetY;
        
        if (imageAspect > containerAspect) {
          // Image is wider - fit to width
          displayedImageWidth = containerRect.width;
          displayedImageHeight = containerRect.width / imageAspect;
          imageOffsetX = 0;
          imageOffsetY = (containerRect.height - displayedImageHeight) / 2;
        } else {
          // Image is taller - fit to height
          displayedImageWidth = containerRect.height * imageAspect;
          displayedImageHeight = containerRect.height;
          imageOffsetX = (containerRect.width - displayedImageWidth) / 2;
          imageOffsetY = 0;
        }
        
        return {
          containerRect,
          displayedImageWidth,
          displayedImageHeight,
          imageOffsetX,
          imageOffsetY,
          naturalWidth: featuredImage.naturalWidth,
          naturalHeight: featuredImage.naturalHeight
        };
      };
      
      // Lens size (adjustable)
      const lensSize = 150;
      zoomLens.style.width = lensSize + 'px';
      zoomLens.style.height = lensSize + 'px';
      
      // Zoom result size
      const zoomResultSize = 400;
      zoomResult.style.width = zoomResultSize + 'px';
      zoomResult.style.height = zoomResultSize + 'px';
      
      imageContainer.addEventListener('mouseenter', function() {
        if (!featuredImageLoaded || !zoomImageLoaded) return;
        zoomLens.classList.add('active');
        zoomResult.classList.add('active');
      });
      
      imageContainer.addEventListener('mouseleave', function() {
        zoomLens.classList.remove('active');
        zoomResult.classList.remove('active');
      });
      
      imageContainer.addEventListener('mousemove', function(e) {
        if (!zoomLens.classList.contains('active') || !featuredImageLoaded || !zoomImageLoaded) return;
        
        const dims = updateZoomDimensions();
        if (!dims) return;
        
        const { containerRect, displayedImageWidth, displayedImageHeight, imageOffsetX, imageOffsetY, naturalWidth, naturalHeight } = dims;
        
        // Calculate mouse position relative to container
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;
        
        // Calculate mouse position relative to the actual displayed image
        const imageX = mouseX - imageOffsetX;
        const imageY = mouseY - imageOffsetY;
        
        // Check if mouse is over the actual image (not padding area)
        if (imageX < 0 || imageX > displayedImageWidth || imageY < 0 || imageY > displayedImageHeight) {
          zoomLens.classList.remove('active');
          zoomResult.classList.remove('active');
          return;
        }
        
        // Calculate lens position (centered on cursor, but relative to container)
        let lensX = mouseX - lensSize / 2;
        let lensY = mouseY - lensSize / 2;
        
        // Keep lens within image bounds (not container bounds)
        const minLensX = imageOffsetX;
        const maxLensX = imageOffsetX + displayedImageWidth - lensSize;
        const minLensY = imageOffsetY;
        const maxLensY = imageOffsetY + displayedImageHeight - lensSize;
        
        lensX = Math.max(minLensX, Math.min(lensX, maxLensX));
        lensY = Math.max(minLensY, Math.min(lensY, maxLensY));
        
        zoomLens.style.left = lensX + 'px';
        zoomLens.style.top = lensY + 'px';
        
        // Calculate zoom result position (to the right of image)
        const zoomResultX = containerRect.right + 20;
        const zoomResultY = containerRect.top;
        
        zoomResult.style.left = zoomResultX + 'px';
        zoomResult.style.top = zoomResultY + 'px';
        
        // Calculate the position in the zoom image
        // Map the lens position relative to displayed image to the zoom image
        const lensRelativeX = lensX - imageOffsetX;
        const lensRelativeY = lensY - imageOffsetY;
        
        // Calculate ratio between displayed image and natural image
        const scaleX = naturalWidth / displayedImageWidth;
        const scaleY = naturalHeight / displayedImageHeight;
        
        // Calculate position in zoom image (which is 2x the natural size)
        // The zoom image is displayed at 200% size, so we need to position it correctly
        const zoomRatio = 2; // 2x zoom
        
        // Calculate the center point of the lens in the displayed image coordinates
        const lensCenterX = lensRelativeX + lensSize / 2;
        const lensCenterY = lensRelativeY + lensSize / 2;
        
        // Convert to natural image coordinates
        const naturalX = lensCenterX * scaleX;
        const naturalY = lensCenterY * scaleY;
        
        // Convert to zoom image coordinates (2x size)
        const zoomX = naturalX * zoomRatio;
        const zoomY = naturalY * zoomRatio;
        
        // Position the zoom image so the center aligns with the zoom result center
        // The zoom result is 400x400, so center is at 200,200
        const translateX = (zoomResultSize / 2) - zoomX;
        const translateY = (zoomResultSize / 2) - zoomY;
        
        // Apply transform to show the correct area
        zoomResultImg.style.transform = `translate(${translateX}px, ${translateY}px)`;
        zoomResultImg.style.width = (naturalWidth * zoomRatio) + 'px';
        zoomResultImg.style.height = (naturalHeight * zoomRatio) + 'px';
      });
      
      // Update dimensions on window resize
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (zoomLens.classList.contains('active')) {
            // Trigger a mousemove to recalculate
            const event = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: event.clientX,
              clientY: event.clientY
            });
            imageContainer.dispatchEvent(event);
          }
        }, 100);
      });
    }
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
