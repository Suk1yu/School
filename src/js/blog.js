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
  item.addEventListener('click', function(event) {
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

// Perbarui tampilan menu saat resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 790 && isMenuOpen) {
    closeMenu();
  }
});

// Smooth scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
      
      // Tutup menu mobile jika terbuka
      if (window.innerWidth <= 790 && isMenuOpen) {
        closeMenu();
      }
    }
  });
});

// Animasi untuk stat counter (simple version)
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const targetNumber = parseInt(statNumber.textContent.replace('+', ''));
        let currentNumber = 0;
        const increment = targetNumber / 50;
        
        const updateNumber = () => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            statNumber.textContent = targetNumber + (statNumber.textContent.includes('+') ? '+' : '');
          } else {
            statNumber.textContent = Math.floor(currentNumber) + (statNumber.textContent.includes('+') ? '+' : '');
            setTimeout(updateNumber, 30);
          }
        };
        
        updateNumber();
        observer.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(statNumber => observer.observe(statNumber));
}

// Image Slider Functionality
const slider = document.getElementById('imageSlider');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = 3;

// Fungsi untuk mengganti slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const translateX = -slideIndex * 33.333;
  slider.style.transform = `translateX(${translateX}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Otomatis ganti slide setiap 4 detik
let slideInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}, 4000);

// Event listener untuk dots
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    const slideIndex = parseInt(this.getAttribute('data-slide'));
    goToSlide(slideIndex);
    
    // Reset interval setelah klik manual
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 4000);
  });
});

// Hentikan slider saat hover
slider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 4000);
});