// Variabel global
const menuOverlay = document.getElementById('menuOverlay');
const menuButton = document.getElementById('menuButton');
let isMenuOpen = false;

// Fungsi untuk membuka menu (mobile only)
function openMenu(){
  if (window.innerWidth <= 790) {
    menuOverlay.classList.add('active');
    menuButton.classList.add('active');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
  }
}

// Fungsi untuk menutup menu
function closeMenu(){
  menuOverlay.classList.remove('active');
  menuButton.classList.remove('active');
  document.body.style.overflow = 'auto';
  isMenuOpen = false;
}

// Fungsi untuk toggle menu (buka/tutup) - mobile only
function toggleMenu(){
  if (window.innerWidth <= 790) {
    if(isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
}

// Event listeners hanya untuk mobile
if (menuButton) {
  menuButton.addEventListener('click', toggleMenu);
}

// Tutup menu saat klik di luar area menu (mobile only)
document.addEventListener('click', function(event) {
  if (window.innerWidth <= 790) {
    if (!menuOverlay.contains(event.target) && !menuButton.contains(event.target) && isMenuOpen) {
      closeMenu();
    }
  }
});

// Tutup menu dengan tombol ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && isMenuOpen) {
    closeMenu();
  }
});

// Tambahkan efek klik pada menu item
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
    // Efek ripple
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size/2;
    const y = event.clientY - rect.top - size/2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(93, 173, 226, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    // Hapus ripple setelah animasi selesai
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Tutup menu setelah klik (opsional)
    if (window.innerWidth <= 790) {
      setTimeout(() => {
        closeMenu();
      }, 300);
    }
  });
});

// Animasi typing dengan teks berganti
const textArray = [
  "Welcome Everyone ",
  "Create Amazing Experiences",
  "Build Digital Creative"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = textArray[textIndex];
  const animatedText = document.getElementById('animatedText');
  
  if (isDeleting) {
    // Menghapus teks
    animatedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Mengetik teks
    animatedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  // Jika teks sudah selesai diketik
  if (!isDeleting && charIndex === currentText.length) {
    // Tunggu sebentar sebelum mulai menghapus
    typingSpeed = 1500;
    isDeleting = true;
  } 
  // Jika teks sudah selesai dihapus
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    // Pindah ke teks berikutnya
    textIndex++;
    if (textIndex >= textArray.length) {
      textIndex = 0;
    }
    typingSpeed = 500;
  }
  
  setTimeout(typeText, typingSpeed);
}

// Tambahkan style untuk animasi ripple
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mulai animasi typing setelah halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(typeText, 1000);
  
  // Perbarui tampilan menu saat resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 790 && isMenuOpen) {
      closeMenu();
    }
  });
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const faqItem = this.closest('.faq-item');
    faqItem.classList.toggle('active');
    
    // Close other FAQ items if needed (optional - comment out if you want multiple open)
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
  });
});

// Also allow clicking on the entire question area
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const faqItem = this.closest('.faq-item');
    const toggleButton = this.querySelector('.faq-toggle');
    
    if (toggleButton) {
      toggleButton.click();
    } else {
      faqItem.classList.toggle('active');
      
      // Close other FAQ items if needed (optional - comment out if you want multiple open)
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });
    }
  });
});

// Carousel Functionality
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.autoplayToggle = document.getElementById('autoplayToggle');
    this.autoplayIcon = this.autoplayToggle.querySelector('i');
    
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 4000; // 4 seconds
    this.isAutoplay = true;
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    // Initialize first slide
    this.showSlide(this.currentSlide);
    
    // Event Listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Indicator clicks
    this.indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      });
    });
    
    // Autoplay toggle
    this.autoplayToggle.addEventListener('click', () => this.toggleAutoplay());
    
    // Swipe/Touch support
    this.addSwipeSupport();
    
    // Start autoplay
    this.startAutoplay();
  }
  
  showSlide(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });
    
    // Update indicators
    this.indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    this.slides[index].classList.add('active');
    this.slides[index].style.opacity = '1';
    
    // Update active indicator
    this.indicators[index].classList.add('active');
    
    // Update slide number
    document.querySelectorAll('.slide-number').forEach((num, i) => {
      num.textContent = `${i + 1} / ${this.totalSlides}`;
    });
    
    // Update current slide
    this.currentSlide = index;
    
    // Reset transitioning flag after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1000);
  }
  
  nextSlide() {
    if (this.isTransitioning) return;
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(nextIndex);
    
    // Reset autoplay timer
    if (this.isAutoplay) {
      this.resetAutoplay();
    }
  }
  
  prevSlide() {
    if (this.isTransitioning) return;
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prevIndex);
    
    // Reset autoplay timer
    if (this.isAutoplay) {
      this.resetAutoplay();
    }
  }
  
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;
    this.showSlide(index);
    
    // Reset autoplay timer
    if (this.isAutoplay) {
      this.resetAutoplay();
    }
  }
  
  startAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
    
    this.isAutoplay = true;
    this.autoplayIcon.className = 'fas fa-pause';
    this.autoplayToggle.querySelector('span').textContent = 'Auto-play';
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
    
    this.isAutoplay = false;
    this.autoplayIcon.className = 'fas fa-play';
    this.autoplayToggle.querySelector('span').textContent = 'Play';
  }
  
  toggleAutoplay() {
    if (this.isAutoplay) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }
  
  resetAutoplay() {
    if (this.isAutoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
  
  addSwipeSupport() {
    const track = document.querySelector('.carousel-track');
    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50;
    
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', () => {
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          // Swipe left - next slide
          this.nextSlide();
        } else {
          // Swipe right - previous slide
          this.prevSlide();
        }
      }
    });
    
    // Mouse drag support
    track.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      endX = startX;
      
      const mouseMoveHandler = (e) => {
        endX = e.clientX;
      };
      
      const mouseUpHandler = () => {
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > swipeThreshold) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel();
  
  // Pause autoplay when user hovers over carousel
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  
  carouselWrapper.addEventListener('mouseenter', () => {
    if (carousel.isAutoplay) {
      carousel.stopAutoplay();
    }
  });
  
  carouselWrapper.addEventListener('mouseleave', () => {
    if (!carousel.isAutoplay) {
      carousel.startAutoplay();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const carouselSection = document.querySelector('.carousel-section');
    const rect = carouselSection.getBoundingClientRect();
    
    // Only trigger if carousel is in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') {
        carousel.prevSlide();
      } else if (e.key === 'ArrowRight') {
        carousel.nextSlide();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        carousel.toggleAutoplay();
      }
    }
  });
});

// Feature cards hover effects enhancement
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.icon-wrapper');
    icon.style.transform = 'scale(1.1) rotate(5deg)';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.icon-wrapper');
    icon.style.transform = 'scale(1) rotate(0deg)';
  });
  
  // Click effect
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.feature-link')) {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    }
  });
});

// Untuk mengganti icon dengan gambar, uncomment bagian di HTML dan tambahkan class ini:
// .icon-wrapper { background: transparent; }
// .icon-image { filter: none; }