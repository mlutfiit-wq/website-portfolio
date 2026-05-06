const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  if (slides.length > 0) { // Cek apakah ada slide
    slides.forEach(slide => slide.classList.remove('active'));
    slides[i].classList.add('active');
  }
}

// Perbaikan: Pakai variabel dan cek apakah tombolnya ada (biar gak error null)
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.next');

if (nextBtn) {
  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };
}

function togglePopup(button) {
  const popup = button.nextElementSibling;
  document.querySelectorAll('.popup-menu').forEach(p => {
    if (p !== popup) p.classList.remove('show');
  });
  if (popup) popup.classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.btn-menu')) {
    document.querySelectorAll('.popup-menu').forEach(p => {
      p.classList.remove('show');
    });
  }
}

// BAGIAN FILTER
document.addEventListener('DOMContentLoaded', function() {
    const mainBtn = document.getElementById('filter-main-btn');
    const panel = document.getElementById('filter-panel');
    const tagBtns = document.querySelectorAll('.tag-btn');
    const applyBtn = document.getElementById('apply-filter');
    const resetBtn = document.getElementById('reset-filter');
    const cards = document.querySelectorAll('.card-char');

    let selections = { rank: [], element: [], class:[] };

    // 1. Toggle Panel (Buka-Tutup)
    mainBtn.onclick = (e) => {
        e.stopPropagation();
        panel.classList.toggle('show');
    };

    // 2. Pilih Tag
    tagBtns.forEach(btn => {
        btn.onclick = () => {
            const type = btn.dataset.type;
            const val = btn.dataset.value;
            btn.classList.toggle('active');

            if (btn.classList.contains('active')) {
                selections[type].push(val);
            } else {
                selections[type] = selections[type].filter(v => v !== val);
            }
        };
    });

    // 3. Eksekusi Filter
    applyBtn.onclick = () => {
        cards.forEach(card => {
            const cRank = card.dataset.rank;
            const cElem = (card.dataset.element || "").split(' ');
             const cClass = (card.dataset.class || "").split(' ');

            const matchRank = selections.rank.length === 0 || selections.rank.includes(cRank);
            const matchClass = selections.class.length === 0 || cClass.some(e => selections.class.includes(e));
            const matchElem = selections.element.length === 0 || cElem.some(e => selections.element.includes(e));

            card.style.display = (matchRank && matchElem && matchClass) ? 'block' : 'none';
        });
        panel.classList.remove('show'); // Tutup panel setelah terapkan
    };

    // 4. Reset Filter
    resetBtn.onclick = () => {
        tagBtns.forEach(b => b.classList.remove('active'));
        selections = { rank: [], element: [], class: [] };
        cards.forEach(c => c.style.display = 'block');
    };

    // Tutup panel kalau klik di luar
    window.onclick = (e) => {
        if (!panel.contains(e.target) && e.target !== mainBtn) {
            panel.classList.remove('show');
        }
    };
});