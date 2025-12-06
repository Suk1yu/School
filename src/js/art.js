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

  // Perbarui tampilan menu saat resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 790 && isMenuOpen) {
      closeMenu();
    }
  });
}

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