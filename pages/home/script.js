const products = [
    {
        id: "0001",
        code: "M-0001",
        mood: "Ferah & baharatlı, maskülen",
        desc: "Narenciye açılışına eşlik eden baharat dokunuşları ve maskülen amber taban.",
        images: ["../../assets/0001_1.jpg", "../../assets/0001_2.jpg", "../../assets/0001_3.jpg", "../../assets/0001_4.jpg", "../../assets/0001_5.jpg"],
        tags: ["ferah", "baharat", "maskülen"],
        category: "fresh", // Fresh & Ferah
        notes: {
            top: "Narenciye, Bergamot",
            heart: "Baharat Akorları, Lavanta",
            base: "Amber, Vetiver"
        },
        detail: "../product/0001/index.html"
    },
    {
        id: "0002",
        code: "M-0002",
        mood: "Fresh & odunsu",
        desc: "Temiz hisli, hafif odunsu gövde, gün boyu taze ve sportif.",
        images: ["../../assets/0002_1.jpg", "../../assets/0002_2.jpg", "../../assets/0002_3.jpg", "../../assets/0002_4.jpg", "../../assets/0002_5.jpg"],
        tags: ["fresh", "odunsu", "sportif"],
        category: "fresh", // Fresh & Ferah
        notes: {
            top: "Yeşil Notalar, Deniz Esintisi",
            heart: "Sedir Ağacı, Yasemin",
            base: "Vetiver, Misk"
        },
        detail: "../product/0002/index.html"
    },
    {
        id: "0003",
        code: "M-0003",
        mood: "Unisex, meyvemsi & tatlı",
        desc: "Meyvemsi açılış, yumuşak tatlılık ve unisex dengesi.",
        images: ["../../assets/0003_1.jpg", "../../assets/0003_2.jpg", "../../assets/0003_3.jpg", "../../assets/0003_4.jpg", "../../assets/0003_5.jpg"],
        tags: ["unisex", "meyvemsi", "tatlı"],
        category: "sweet", // Tatlı & Romantik
        notes: {
            top: "Şeftali, Mandalina",
            heart: "Gül, Yasemin",
            base: "Vanilya, Sandal Ağacı"
        },
        detail: "../product/0003/index.html"
    },
    {
        id: "0004",
        code: "M-0004",
        mood: "Ferah tatlı & sportif",
        desc: "Enerjik, modern ve hafif tatlı nüanslarla dinamik bir karakter.",
        images: ["../../assets/0004_1.jpg", "../../assets/0004_2.jpg", "../../assets/0004_3.jpg", "../../assets/0004_4.jpg", "../../assets/0004_5.jpg"],
        tags: ["ferah", "tatlı", "dinamik"],
        category: "special", // Niş & Özel
        notes: {
            top: "Limon, Elma",
            heart: "Lavanta, Tonka Fasulyesi",
            base: "Amber, Misk"
        },
        detail: "../product/0004/index.html"
    },
    {
        id: "0005",
        code: "M-0005",
        mood: "Tatlı, vanilya & amber",
        desc: "Sıcak vanilya-amber dokusu, akılda kalıcı ve davetkar.",
        images: ["../../assets/0005_1.jpg", "../../assets/0005_2.jpg", "../../assets/0005_3.jpg", "../../assets/0005_4.jpg", "../../assets/0005_5.jpg"],
        tags: ["vanilya", "amber", "sıcak"],
        category: "sweet", // Tatlı & Romantik
        notes: {
            top: "Bergamot, Portakal Çiçeği",
            heart: "Vanilya, İris",
            base: "Amber, Tonka Fasulyesi"
        },
        detail: "../product/0005/index.html"
    }
];

const productGrid = document.querySelector("#product-grid");
let currentFilter = 'all'; // Track current filter

function renderProducts(filter = 'all') {
    currentFilter = filter;

    // Filter products based on category
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    // Update heading to show filter status
    const collectionHeading = document.querySelector('#koleksiyon .section-heading');
    const filterText = {
        'all': 'Parfüm Koleksiyonu',
        'fresh': 'Fresh & Ferah Parfümler',
        'sweet': 'Tatlı & Romantik Parfümler',
        'special': 'Niş & Özel Parfümler'
    };

    if (collectionHeading) {
        collectionHeading.textContent = filterText[filter] || 'Parfüm Koleksiyonu';
    }

    // Show message if no products found
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="muted" style="text-align: center; padding: 40px;">Bu kategoride ürün bulunamadı.</p>';
        return;
    }

    const html = filteredProducts
        .map((p) => {
            const cover = p.images[0];
            const thumbs = p.images.slice(1, 4);
            return `
            <article class="card product-card" data-detail="${p.detail}">
                <div class="product-media">
                    <img src="${cover}" alt="${p.code} parfüm görseli" loading="lazy">
                    <div class="thumb-row">
                        ${thumbs
                    .map((t) => `<div class="thumb"><img src="${t}" alt="${p.code} detay" loading="lazy"></div>`)
                    .join("")}
                    </div>
                </div>
                <div class="card-body stack">
                    <div class="product-title">${p.code}</div>
                    <div class="product-desc">${p.desc}</div>
                    <div class="product-mood">${p.mood}</div>
                    <div class="tag-row">
                        ${p.tags.map((t) => `<span class="badge">${t}</span>`).join("")}
                    </div>
                    <div class="notes-preview muted" style="font-size: 12px; margin-top: 8px;">
                        <div><strong>Üst:</strong> ${p.notes.top}</div>
                        <div><strong>Kalp:</strong> ${p.notes.heart}</div>
                        <div><strong>Taban:</strong> ${p.notes.base}</div>
                    </div>
                </div>
            </article>`;
        })
        .join("");

    productGrid.innerHTML = html;

    // Add click handlers
    document.querySelectorAll(".product-card").forEach((card) => {
        const detail = card.getAttribute("data-detail");
        if (!detail) return;
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            window.location.href = detail;
        });
    });

    // Re-apply scroll animations
    applyScrollAnimations();
}

// Category filtering
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach((card, index) => {
        // Assign category based on index
        const categories = ['fresh', 'sweet', 'special'];
        const category = categories[index];

        card.style.cursor = 'pointer';
        card.setAttribute('data-category', category);

        card.addEventListener('click', () => {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active-category'));

            // Add active class to clicked card
            card.classList.add('active-category');

            // Filter products
            renderProducts(category);

            // Scroll to products section
            const productsSection = document.querySelector('#koleksiyon');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add "Show All" functionality to collection heading
    const collectionHeading = document.querySelector('#koleksiyon .section-heading');
    if (collectionHeading) {
        collectionHeading.style.cursor = 'pointer';
        collectionHeading.title = 'Tüm ürünleri göster';

        collectionHeading.addEventListener('click', () => {
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active-category'));

            // Show all products
            renderProducts('all');
        });
    }
}

// Smooth reveal animations on scroll
function applyScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe product cards with animation class
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        // Add stagger delay
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe category cards
    document.querySelectorAll('.category-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe feature cards
    document.querySelectorAll('.features-grid .panel').forEach((panel, index) => {
        panel.classList.add('animate-on-scroll');
        panel.style.animationDelay = `${index * 0.1}s`;
        observer.observe(panel);
    });

    // Observe section headings
    document.querySelectorAll('.section-heading').forEach(heading => {
        heading.classList.add('animate-scale');
        observer.observe(heading);
    });
}

// Initialize
renderProducts('all');
setupCategoryFilters();
applyScrollAnimations();
