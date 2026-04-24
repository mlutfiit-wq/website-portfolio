const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');
}

document.querySelector('.next').onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.querySelector('.prev').onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

function togglePopup(button) {
  // Cari menu yang ada di dalam container yang sama dengan tombol yang diklik
  const popup = button.nextElementSibling;
  
  // Tutup semua menu lain yang mungkin lagi kebuka
  document.querySelectorAll('.popup-menu').forEach(p => {
    if (p !== popup) p.classList.remove('show');
  });

  // Toggle menu yang diklik
  popup.classList.toggle('show');
}

// Tutup menu kalau user klik di luar gambar
window.onclick = function(event) {
  if (!event.target.matches('.btn-menu')) {
    document.querySelectorAll('.popup-menu').forEach(p => {
      p.classList.remove('show');
    });
  }
}

