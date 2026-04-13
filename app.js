/* ══════════════════════════════════════════════
   IvoTech — App Logic
   Dynamic catalog loaded from catalog.json
   ══════════════════════════════════════════════ */

// ─── DATA ──────────────────────────────────────
let catalogData = null;


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

    // Close mobile menu when tapping outside
    document.addEventListener("click", (e) => {
        if (navLinks.classList.contains("open") &&
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target)) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("open");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("./catalog.json");
        if (!res.ok) throw new Error("No se pudo cargar el catálogo");
        catalogData = await res.json();
    } catch (e) {
        console.error("Error cargando catálogo:", e);
        return;
    }
    init();
});
