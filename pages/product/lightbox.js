// Product Image Lightbox Functionality

(function () {
    // Create lightbox overlay
    const lightboxHTML = `
        <div class="lightbox-overlay" id="lightbox">
            <button class="lightbox-close" aria-label="Kapat">✕</button>
            <img class="lightbox-image" src="" alt="Tam ekran görünüm">
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const productMain = document.querySelector('.product-main img');

    // Open lightbox when clicking on main product image
    if (productMain) {
        productMain.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxImg.src = productMain.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close lightbox when clicking close button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
})();
