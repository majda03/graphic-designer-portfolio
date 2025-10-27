const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const thumbnails = document.querySelectorAll('.thumb');
const closeBtn = document.querySelector('.close');

let currentIndex = 0;
let imageList = [];

thumbnails.forEach((thumb, index) => {
  imageList.push(thumb.src);
  thumb.addEventListener('click', () => {
    currentIndex = index;
    lightboxImg.src = thumb.src;
    lightbox.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.style.display = 'none';
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % imageList.length;
    lightboxImg.src = imageList[currentIndex];
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    lightboxImg.src = imageList[currentIndex];
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('portfolio-lightbox-img');
  const lightboxTitle = document.getElementById('portfolio-lightbox-title');
  const lightboxDesc = document.getElementById('portfolio-lightbox-description');
  const closeBtn = document.querySelector('.close-portfolio');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = item.querySelector('h3').textContent;
      lightboxDesc.textContent = item.querySelector('p').textContent;

      lightbox.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Klikom na pozadinu (ali ne i na sliku) zatvori
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // ESC za zatvaranje
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('portfolio-lightbox-img');
  const lightboxTitle = document.getElementById('portfolio-lightbox-title');
  const lightboxDesc = document.getElementById('portfolio-lightbox-description');
  const closeBtn = document.querySelector('.close-portfolio');

  let currentIndex = -1;

  function showImage(index) {
    if (index < 0) index = portfolioItems.length -1;
    if (index >= portfolioItems.length) index = 0;
    currentIndex = index;
    const item = portfolioItems[index];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.querySelector('h3').textContent;
    lightboxDesc.textContent = item.querySelector('p').textContent;
    lightbox.classList.add('active');
  }

  portfolioItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      showImage(i);
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    currentIndex = -1;
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      currentIndex = -1;
    }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      currentIndex = -1;
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    }
  });

  // Scroll to change image: scroll up => prev, scroll down => next
  lightbox.addEventListener('wheel', e => {
    if (!lightbox.classList.contains('active')) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      showImage(currentIndex - 1);
    } else if (e.deltaY > 0) {
      showImage(currentIndex + 1);
    }
  }, { passive: false });
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('left-arrow')) {
    e.stopPropagation();
    if (typeof currentIndex !== 'undefined' && currentIndex !== -1) {
      showImage(currentIndex - 1);
    }
  }

  if (e.target.classList.contains('right-arrow')) {
    e.stopPropagation();
    if (typeof currentIndex !== 'undefined' && currentIndex !== -1) {
      showImage(currentIndex + 1);
    }
  }
});
// -- KLIK NA STRELCU za gornji album (lightbox sa id="lightbox")
document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  lightboxImg.src = imageList[currentIndex];
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  lightboxImg.src = imageList[currentIndex];
});

// -- KLIK NA STRELCU za portfolio lightbox (id="portfolio-lightbox")
document.querySelector('.left-arrow').addEventListener('click', (e) => {
  e.stopPropagation();
  if (typeof currentIndex !== 'undefined' && currentIndex !== -1) {
    showImage(currentIndex - 1);
  }
  
});

document.querySelector('.right-arrow').addEventListener('click', (e) => {
  e.stopPropagation();
  if (typeof currentIndex !== 'undefined' && currentIndex !== -1) {
    showImage(currentIndex + 1);
  }
});
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// KLIK NA MICE ZA STRELICU (mišem)
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

if (leftArrow) {
  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex !== -1) {
      showImage(currentIndex - 1);
    }
  });
}

if (rightArrow) {
  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex !== -1) {
      showImage(currentIndex + 1);
    }
  });
}