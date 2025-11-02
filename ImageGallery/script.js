document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;
  let filteredItems = Array.from(galleryItems);

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });

      filteredItems = (filter === 'all') 
        ? Array.from(galleryItems)
        : Array.from(galleryItems).filter(item => 
            item.getAttribute('data-category') === filter
          );
    });
  });

  // Lightbox open
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      currentIndex = filteredItems.indexOf(this);
      openLightbox(currentIndex);
    });
  });

  function openLightbox(index) {
    if (filteredItems.length === 0) return;

    const item = filteredItems[index];
    const imgSrc = item.querySelector('img').getAttribute('src');
    const caption = item.querySelector('.image-caption').textContent;

    lightboxImg.setAttribute('src', imgSrc);
    lightboxCaption.textContent = caption;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function navigateLightbox(direction) {
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    openLightbox(currentIndex);
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox('prev'));
  nextBtn.addEventListener('click', () => navigateLightbox('next'));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') navigateLightbox('prev');
    else if (e.key === 'ArrowRight') navigateLightbox('next');
  });
});
