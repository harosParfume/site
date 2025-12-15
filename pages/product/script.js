function setupGallery() {
    const mainImg = document.querySelector("[data-main-image]");
    const thumbs = document.querySelectorAll(".thumb-lg");
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const src = thumb.getAttribute("data-src");
            if (!src) return;
            mainImg.src = src;
            thumbs.forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });

    // ilkini aktif işaretle
    thumbs[0].classList.add("active");
}

document.addEventListener("DOMContentLoaded", setupGallery);

