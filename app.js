/* ══════════════════════════════════════════════
   IvoTech — App Logic
   Dynamic catalog rendered from JSON data
   ══════════════════════════════════════════════ */

// ─── DATA ──────────────────────────────────────
const catalogData = {
    categories: [
        {
            id: "auriculares",
            name: "Auriculares",
            icon: "🎧",
            products: [
                {
                    id: "jbl-tune-110",
                    name: "JBL Tune 110",
                    price: 18500,
                    currency: "ARS",
                    image: "🎧",
                    badge: "Popular",
                    description: "Auriculares in-ear con sonido potente JBL Pure Bass. Cable plano anti-enredo, ligeros y cómodos para uso diario.",
                    specs: [
                        "Driver de 9mm",
                        "Respuesta de frecuencia: 20Hz – 20kHz",
                        "Micrófono integrado con botón",
                        "Cable plano anti-enredo",
                        "Conector Jack 3.5mm"
                    ]
                },
                {
                    id: "xaea-thunder",
                    name: "XAEA Thunder",
                    price: 12000,
                    currency: "ARS",
                    image: "🎧",
                    description: "Auriculares con graves profundos y diseño ergonómico. Ideales para escuchar música y gaming casual.",
                    specs: [
                        "Driver de 10mm de alta definición",
                        "Respuesta de frecuencia: 18Hz – 22kHz",
                        "Micrófono omnidireccional",
                        "Almohadillas de silicona intercambiables (S/M/L)",
                        "Cable reforzado de 1.2m"
                    ]
                }
            ]
        },
        {
            id: "cables",
            name: "Cables",
            icon: "🔌",
            products: [
                {
                    id: "cable-lightning",
                    name: "Cable Lightning 1m",
                    price: 8500,
                    currency: "ARS",
                    image: "🔌",
                    description: "Cable Lightning certificado para carga y sincronización de dispositivos Apple. Carga rápida y transferencia de datos estable.",
                    specs: [
                        "Longitud: 1 metro",
                        "Conector Lightning a USB-A",
                        "Carga rápida hasta 2.4A",
                        "Recubrimiento de nylon trenzado",
                        "Compatible con iPhone/iPad/iPod"
                    ]
                },
                {
                    id: "cable-type-c",
                    name: "Cable USB Type-C 1m",
                    price: 7000,
                    currency: "ARS",
                    image: "🔌",
                    badge: "Nuevo",
                    description: "Cable Type-C de alta velocidad para carga y datos. Compatible con la mayoría de dispositivos Android modernos.",
                    specs: [
                        "Longitud: 1 metro",
                        "Conector USB-C a USB-A",
                        "Carga rápida hasta 3A",
                        "Transferencia de datos hasta 480Mbps",
                        "Carcasa de aluminio reforzada"
                    ]
                }
            ]
        },
        {
            id: "cargadores",
            name: "Cargadores",
            icon: "🔋",
            products: [
                {
                    id: "xaea-optimum",
                    name: "XAEA Optimum Charger",
                    price: 15000,
                    currency: "ARS",
                    image: "🔋",
                    badge: "Top Ventas",
                    description: "Cargador de pared de carga rápida con doble puerto USB. Protección contra sobrecarga y sobrecalentamiento.",
                    specs: [
                        "Potencia: 18W carga rápida",
                        "Doble puerto USB-A",
                        "Protección inteligente IC",
                        "Entrada: 100-240V",
                        "Compacto y portátil"
                    ]
                },
                {
                    id: "xaea-type-c-charger",
                    name: "XAEA Cargador Type-C",
                    price: 14000,
                    currency: "ARS",
                    image: "🔋",
                    description: "Cargador compacto con puerto USB-C de carga rápida 20W. Compatible con Power Delivery para carga optimizada.",
                    specs: [
                        "Potencia: 20W PD",
                        "Puerto USB-C Power Delivery",
                        "Compatible con QC 3.0",
                        "Diseño compacto plegable",
                        "Indicador LED de carga"
                    ]
                }
            ]
        },
        {
            id: "fundas",
            name: "Fundas",
            icon: "📱",
            products: [
                {
                    id: "funda-magsafe",
                    name: "Funda MagSafe Premium",
                    price: 22000,
                    currency: "ARS",
                    image: "📱",
                    badge: "Premium",
                    description: "Funda con imanes MagSafe integrados para carga inalámbrica. Material de silicona suave con interior de microfibra.",
                    specs: [
                        "Compatible con carga MagSafe",
                        "Silicona líquida premium",
                        "Interior de microfibra",
                        "Protección ante caídas de 1.5m",
                        "Disponible para iPhone 13/14/15"
                    ]
                },
                {
                    id: "funda-metalizada",
                    name: "Funda Metalizada Elite",
                    price: 16000,
                    currency: "ARS",
                    image: "📱",
                    description: "Funda con acabado metalizado espejado de alta resistencia. Efecto cromado que destaca con estilo único.",
                    specs: [
                        "Acabado cromado espejado",
                        "Policarbonato reforzado",
                        "Bordes elevados para cámara y pantalla",
                        "Ultra delgada: 1.2mm",
                        "Compatible con carga inalámbrica"
                    ]
                }
            ]
        },
        {
            id: "smartwatch",
            name: "Smartwatch",
            icon: "⌚",
            products: [
                {
                    id: "amazfit-bip-5",
                    name: "Amazfit Bip 5",
                    price: 85000,
                    currency: "ARS",
                    image: "⌚",
                    badge: "Destacado",
                    description: "Smartwatch con pantalla ultra grande de 1.91\", GPS integrado, más de 120 modos deportivos y hasta 10 días de batería.",
                    specs: [
                        "Pantalla AMOLED de 1.91\"",
                        "GPS integrado de doble banda",
                        "Resistencia al agua 5 ATM",
                        "Batería de hasta 10 días",
                        "Sensor SpO2 y ritmo cardíaco 24/7"
                    ]
                },
                {
                    id: "redmi-watch-4",
                    name: "Redmi Watch 4",
                    price: 72000,
                    currency: "ARS",
                    image: "⌚",
                    description: "Smartwatch con pantalla AMOLED de 1.97\", cuerpo de aleación de aluminio, GPS y llamadas Bluetooth.",
                    specs: [
                        "Pantalla AMOLED de 1.97\"",
                        "Cuerpo de aleación de aluminio",
                        "Llamadas Bluetooth",
                        "Más de 150 modos deportivos",
                        "Batería de hasta 20 días"
                    ]
                },
                {
                    id: "xiaomi-band-8",
                    name: "Xiaomi Smart Band 8",
                    price: 38000,
                    currency: "ARS",
                    image: "⌚",
                    description: "Pulsera inteligente con pantalla AMOLED de 1.62\", más de 150 esferas de reloj, monitoreo de salud completo.",
                    specs: [
                        "Pantalla AMOLED de 1.62\"",
                        "Más de 150 esferas personalizables",
                        "Resistencia al agua 5 ATM",
                        "Monitoreo de SpO2 y sueño",
                        "Batería de hasta 16 días"
                    ]
                }
            ]
        }
    ]
};


// ─── STATE ─────────────────────────────────────
let activeCategory = "all";
let searchQuery = "";
let cart = [];


// ─── DOM REFS ──────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const categoriesGrid = $("#categories-grid");
const productsGrid   = $("#products-grid");
const filterTabs     = $("#filter-tabs");
const noResults      = $("#no-results");
const searchBar      = $("#search-bar");
const searchInput    = $("#search-input");
const modal          = $("#product-modal");
const modalBody      = $("#modal-body");
const statProducts   = $("#stat-products");
const statCategories = $("#stat-categories");
const cartCount      = $("#cart-count");


// ─── HELPERS ───────────────────────────────────
function formatPrice(num) {
    return num.toLocaleString("es-AR");
}

function getAllProducts() {
    const products = [];
    catalogData.categories.forEach(cat => {
        cat.products.forEach(p => {
            products.push({ ...p, categoryId: cat.id, categoryName: cat.name });
        });
    });
    return products;
}

function getFilteredProducts() {
    let products = getAllProducts();
    if (activeCategory !== "all") {
        products = products.filter(p => p.categoryId === activeCategory);
    }
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.categoryName.toLowerCase().includes(q)
        );
    }
    return products;
}


// ─── RENDER: CATEGORIES ────────────────────────
function renderCategories() {
    categoriesGrid.innerHTML = catalogData.categories.map(cat => `
        <div class="category-card" data-category="${cat.id}" tabindex="0" role="button" aria-label="Ver ${cat.name}">
            <span class="category-icon">${cat.icon}</span>
            <div class="category-name">${cat.name}</div>
            <div class="category-count">${cat.products.length} producto${cat.products.length > 1 ? 's' : ''}</div>
        </div>
    `).join("");

    // Click handlers
    categoriesGrid.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            activeCategory = card.dataset.category;
            syncFilterTabs();
            renderProducts();
            document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
        });
    });
}


// ─── RENDER: FILTER TABS ───────────────────────
function renderFilterTabs() {
    filterTabs.innerHTML = `<button class="filter-tab active" data-category="all">Todos</button>` +
        catalogData.categories.map(cat =>
            `<button class="filter-tab" data-category="${cat.id}">${cat.icon} ${cat.name}</button>`
        ).join("");

    filterTabs.querySelectorAll(".filter-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            activeCategory = tab.dataset.category;
            syncFilterTabs();
            renderProducts();
        });
    });
}

function syncFilterTabs() {
    filterTabs.querySelectorAll(".filter-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.category === activeCategory);
    });
}


// ─── RENDER: PRODUCTS ──────────────────────────
function renderProducts() {
    const products = getFilteredProducts();

    if (products.length === 0) {
        productsGrid.style.display = "none";
        noResults.style.display = "block";
        return;
    }

    productsGrid.style.display = "grid";
    noResults.style.display = "none";

    productsGrid.innerHTML = products.map((p, i) => `
        <div class="product-card" data-id="${p.id}" style="animation-delay: ${i * 0.06}s" tabindex="0">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            <div class="product-image-wrap">
                <span class="product-emoji">${p.image}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${p.categoryName}</div>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">$${formatPrice(p.price)}</span>
                        <span class="product-price-currency"> ${p.currency}</span>
                    </div>
                    <button class="product-action" aria-label="Ver ${p.name}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    // Click to open modal
    productsGrid.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const product = getAllProducts().find(p => p.id === card.dataset.id);
            if (product) openModal(product);
        });
    });
}


// ─── MODAL ─────────────────────────────────────
function openModal(product) {
    modalBody.innerHTML = `
        <div class="modal-image">${product.image}</div>
        <div class="modal-content">
            <div class="modal-category">${product.categoryName}</div>
            <h2 class="modal-name">${product.name}</h2>
            <div class="modal-price">$${formatPrice(product.price)} <span>${product.currency}</span></div>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-specs-title">Especificaciones</div>
            <div class="modal-specs">
                ${product.specs.map(s => `
                    <div class="spec-item">
                        <span class="spec-dot"></span>
                        ${s}
                    </div>
                `).join("")}
            </div>
            <button class="modal-btn" id="add-to-cart-btn">
                Consultar por WhatsApp
            </button>
        </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    // WhatsApp button
    const waBtn = document.getElementById("add-to-cart-btn");
    waBtn.addEventListener("click", () => {
        const msg = encodeURIComponent(`Hola! Estoy interesado en el producto: ${product.name} ($${formatPrice(product.price)} ${product.currency})`);
        window.open(`https://wa.me/5491100000000?text=${msg}`, "_blank");
    });
}

function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}


// ─── SEARCH ────────────────────────────────────
function toggleSearch() {
    searchBar.classList.toggle("open");
    if (searchBar.classList.contains("open")) {
        searchInput.focus();
    } else {
        searchInput.value = "";
        searchQuery = "";
        renderProducts();
    }
}


// ─── NAVBAR SCROLL ─────────────────────────────
function handleScroll() {
    const navbar = $("#navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Active nav link
    const sections = ["hero", "categorias", "productos", "contacto"];
    const scrollPos = window.scrollY + 100;

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle("active", scrollPos >= top && scrollPos < bottom);
    });
}


// ─── ANIMATED COUNTER ──────────────────────────
function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current;
    }, 30);
}


// ─── INIT ──────────────────────────────────────
function init() {
    renderCategories();
    renderFilterTabs();
    renderProducts();

    // Stats
    const allProducts = getAllProducts();
    animateCounter(statProducts, allProducts.length);
    animateCounter(statCategories, catalogData.categories.length);

    // Events
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Search
    $("#search-toggle").addEventListener("click", toggleSearch);
    $("#search-close").addEventListener("click", toggleSearch);
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Modal
    $("#modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // Hamburger
    const hamburger = $("#hamburger");
    const navLinks = $("#nav-links");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("open");
        });
    });
}

document.addEventListener("DOMContentLoaded", init);
