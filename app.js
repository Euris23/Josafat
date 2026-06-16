import { STORE_DATA } from './data.js';

// ==========================================
// 1. APPLICATION STATE
// ==========================================
let cart = JSON.parse(localStorage.getItem('apex_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('apex_wishlist')) || [];
let activeCategory = 'all';
let searchQuery = '';
let activeSort = 'default';
let activeCoupon = null;
let discountPercent = 0;

const COUPONS = {
  'APEX10': 10,
  'PROFIT10': 10,
  'APEX15': 15,
  'BEAST20': 20
};

// ==========================================
// 2. DOM ELEMENTS & EVENT LISTENERS INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic renders
  updateCategoryCounts();
  renderProducts();
  renderTestimonials();
  renderBlog();
  updateCartBadges();
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('main-navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa fa-times';
    } else {
      icon.className = 'fa fa-bars';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      navMenu.classList.remove('active');
      document.getElementById('menu-toggle').querySelector('i').className = 'fa fa-bars';
      
      // Update active class
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Search inputs interaction (navbar & sidebar search syncing)
  const searchInput = document.getElementById('search-input');
  const sidebarSearchInput = document.getElementById('sidebar-search-input');

  const syncSearch = (val) => {
    searchQuery = val.toLowerCase().trim();
    if (searchInput) searchInput.value = val;
    if (sidebarSearchInput) sidebarSearchInput.value = val;
    renderProducts();
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => syncSearch(e.target.value));
  }
  if (sidebarSearchInput) {
    sidebarSearchInput.addEventListener('input', (e) => syncSearch(e.target.value));
  }

  // Category filters click handler
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Sorting handler
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderProducts();
  });

  // Cart Drawer open/close
  document.getElementById('cart-toggle-btn').addEventListener('click', openCartDrawer);
  document.getElementById('cart-close-btn').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-overlay').addEventListener('click', closeCartDrawer);

  // Wishlist toggle
  document.getElementById('wishlist-toggle-btn').addEventListener('click', toggleWishlistCatalogView);

  // Apply coupon click
  document.getElementById('coupon-apply-btn').addEventListener('click', applyCouponCode);

  // Checkout modal trigger
  document.getElementById('cart-checkout-btn').addEventListener('click', openCheckoutModal);
  document.getElementById('checkout-close-btn').addEventListener('click', closeCheckoutModal);

  // Checkout Form Submission
  document.getElementById('checkout-form').addEventListener('submit', handleCheckoutSubmit);

  // Floating WhatsApp button trigger
  document.getElementById('wa-floating-btn').addEventListener('click', () => {
    if (cart.length > 0) {
      openCheckoutModal();
    } else {
      showToast('Añade productos al carrito antes de ordenar por WhatsApp', 'info');
      // Scroll user to catalog
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Special Offers Countdown Timer
  startSpecialOffersCountdown();

  // Buy Flash Sale Combo Button
  document.getElementById('buy-flash-btn').addEventListener('click', () => {
    // prod-10 is the Anabolic Beast Stack
    const flashProduct = STORE_DATA.products.find(p => p.id === 'prod-10');
    if (flashProduct) {
      addToCart(flashProduct.id, 1);
      openCartDrawer();
    }
  });

  // AI Advisor quiz click handlers
  initAiAdvisorQuiz();
});

// ==========================================
// 3. PRODUCT CATALOG RENDERING
// ==========================================
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  let filtered = [...STORE_DATA.products];

  // 1. Filter by category
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // 2. Filter by search query
  if (searchQuery !== '') {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.brand.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  // 3. Sorting
  if (activeSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update product count label
  document.getElementById('catalog-count-info').innerText = `Mostrando ${filtered.length} productos`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <i class="fa fa-circle-exclamation" style="font-size: 40px; color: var(--accent-blue); margin-bottom: 15px;"></i>
        <h4>No se encontraron suplementos</h4>
        <p>Prueba buscando con otros términos o seleccionando otra categoría.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Badge styling
    let badgeHTML = '';
    if (product.tag) {
      const tagClass = product.tag.toLowerCase().replace(/\s+/g, '-');
      badgeHTML = `<span class="product-tag tag-${tagClass}">${product.tag}</span>`;
    }

    // Wishlist active state
    const isWishlisted = wishlist.includes(product.id);
    const wishlistClass = isWishlisted ? 'wishlist-btn active' : 'wishlist-btn';

    // Stock levels styling
    const stockPercent = (product.stock / product.maxStock) * 100;
    const isLowStock = product.stock <= 5;
    const stockLabelClass = isLowStock ? 'stock-num low' : 'stock-num';
    const progressFillColor = isLowStock ? 'background: var(--accent-red); box-shadow: 0 0 10px rgba(255, 51, 102, 0.4);' : '';

    card.innerHTML = `
      ${badgeHTML}
      <button class="${wishlistClass}" data-id="${product.id}">
        <i class="${isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
      </button>
      <div class="product-img-wrap" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name" data-id="${product.id}">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">
            ${getStarRatingHTML(product.rating)}
          </div>
          <span>(${product.ratingCount})</span>
        </div>
        <div class="product-pricing">
          <span class="product-price">RD$ ${product.price.toLocaleString()}</span>
          <span class="product-old-price">RD$ ${product.originalPrice.toLocaleString()}</span>
          <span class="product-discount">-${product.discount}%</span>
        </div>
        <div class="product-stock-bar">
          <div class="stock-lbl-row">
            <span>Disponibilidad</span>
            <span class="${stockLabelClass}">${product.stock} disponibles</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${stockPercent}%; ${progressFillColor}"></div>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary quick-view-btn" data-id="${product.id}">Detalles</button>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Agregar <i class="fa fa-shopping-cart"></i></button>
        </div>
      </div>
    `;

    // Bind events to cards
    card.querySelector('.product-img-wrap').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.product-name').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.quick-view-btn').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(product.id, 1);
      openCartDrawer();
    });
    
    card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlistItem(product.id);
    });

    grid.appendChild(card);
  });
}

function updateCategoryCounts() {
  // Update categories count dynamically
  const products = STORE_DATA.products;
  document.getElementById('count-all').innerText = products.length;

  const categories = [
    'Proteínas', 'Creatinas', 'Pre-entrenos', 'Quemadores de grasa', 
    'Vitaminas', 'Ganadores de peso', 'Aminoácidos', 'Colágeno', 
    'Energizantes', 'Combos'
  ];

  categories.forEach(cat => {
    const count = products.filter(p => p.category === cat).length;
    const elemId = `count-${cat.replace(/\s+/g, '-')}`;
    const elem = document.getElementById(elemId);
    if (elem) elem.innerText = count;
  });
}

function getStarRatingHTML(rating) {
  let html = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<i class="fa fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '<i class="fa fa-star-half-alt"></i>';
    } else {
      html += '<i class="fa-regular fa-star"></i>';
    }
  }
  return html;
}

// ==========================================
// 4. TESTIMONIALS & BLOG RENDERING
// ==========================================
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  container.innerHTML = '';

  STORE_DATA.testimonials.forEach(test => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';

    card.innerHTML = `
      <div class="before-after-container">
        <div class="ba-image">
          <img src="${test.beforeImg}" alt="Antes del entrenamiento" loading="lazy">
          <span class="ba-label">Antes</span>
        </div>
        <div class="ba-image">
          <img src="${test.afterImg}" alt="Después del entrenamiento" loading="lazy">
          <span class="ba-label" style="background: var(--accent-green); color: var(--bg-primary);">Después</span>
        </div>
      </div>
      <div class="testimonial-content">
        <div class="stars">
          ${getStarRatingHTML(test.stars)}
        </div>
        <p class="testimonial-comment">"${test.comment}"</p>
        <div class="testimonial-user">
          <div class="t-user-info">
            <h4>${test.name}</h4>
            <p>${test.achievement}</p>
          </div>
          <span style="font-size: 13px; color: var(--text-muted); font-weight:600;">Edad: ${test.age} años</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderBlog() {
  const container = document.getElementById('blog-grid');
  container.innerHTML = '';

  STORE_DATA.blog.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';

    card.innerHTML = `
      <div class="blog-img-wrap">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </div>
      <div class="blog-info">
        <div class="blog-meta">
          <span class="blog-category">${post.category}</span>
          <span>${post.date} &bull; ${post.readTime}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-desc">${post.shortDescription}</p>
        <span class="blog-read-more">Leer Artículo <i class="fa fa-arrow-right"></i></span>
      </div>
    `;

    card.querySelector('.blog-read-more').addEventListener('click', () => {
      alert(`ARTÍCULO: ${post.title}\n\n${post.content}\n\nCategoría: ${post.category} - Publicado: ${post.date}`);
    });

    container.appendChild(card);
  });
}

// ==========================================
// 5. DETAIL PRODUCT MODAL & TABS
// ==========================================
function openDetailModal(productId) {
  const product = STORE_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-detail-modal');
  const layout = document.getElementById('modal-product-detail-layout');
  
  // Set initial main image and thumbnail selection active state
  let thumbnailsHTML = '';
  product.images.forEach((imgUrl, idx) => {
    thumbnailsHTML += `
      <div class="thumb-img ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgUrl}" alt="${product.name} vista ${idx + 1}">
      </div>
    `;
  });

  // Tab panes content
  const benefitsListHTML = product.benefits.map(b => `<li>${b}</li>`).join('');
  const ingredientsListHTML = product.ingredients.map(i => `<li>${i}</li>`).join('');
  
  let nutritionTableHTML = '<table class="nutrition-table">';
  for (const [key, val] of Object.entries(product.nutritionTable)) {
    nutritionTableHTML += `<tr><td>${key}</td><td>${val}</td></tr>`;
  }
  nutritionTableHTML += '</table>';

  const faqsHTML = product.faqs.map(faq => `
    <div class="faq-item">
      <h5>${faq.question}</h5>
      <p>${faq.answer}</p>
    </div>
  `).join('');

  const reviewsHTML = product.reviews.map(rev => `
    <div class="review-item-detail">
      <div class="review-item-header">
        <div class="review-user-info">
          <img src="${rev.avatar}" alt="${rev.name}">
          <span class="review-user-name">${rev.name}</span>
        </div>
        <div class="stars" style="font-size: 10px;">
          ${getStarRatingHTML(rev.rating)}
        </div>
      </div>
      <p style="font-size: 12px; margin-top: 4px;">"${rev.comment}"</p>
      <span class="review-date" style="display:block; text-align:right; font-size:10px;">${rev.date}</span>
    </div>
  `).join('');

  // Related products (same category, excluding current)
  const related = STORE_DATA.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  let relatedHTML = '';
  if (related.length > 0) {
    relatedHTML = `
      <div class="related-products-section" style="margin-top: 24px;">
        <h4 style="font-family: var(--font-title); font-size: 14px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Productos Relacionados</h4>
        <div class="ai-recommended-grid" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom:0;">
          ${related.map(rel => `
            <div class="rec-card related-item-card" data-id="${rel.id}" style="padding: 8px; cursor: pointer;">
              <div class="rec-img" style="width: 50px; height: 50px;"><img src="${rel.image}"></div>
              <div class="rec-details">
                <span class="rec-name" style="font-size: 12px; font-weight:700;">${rel.name}</span>
                <span class="rec-price" style="font-size: 11px;">RD$ ${rel.price.toLocaleString()}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Inject detail layout
  layout.innerHTML = `
    <div class="detail-gallery">
      <div class="main-img-container" id="main-img-container">
        <img src="${product.images[0]}" alt="${product.name}" id="detail-main-img">
      </div>
      <div class="thumb-grid">
        ${thumbnailsHTML}
      </div>
    </div>
    
    <div class="detail-content">
      <div class="detail-header">
        <span class="detail-brand">${product.brand}</span>
        <h2 class="detail-name">${product.name}</h2>
        <div class="detail-rating-row">
          <div class="stars">
            ${getStarRatingHTML(product.rating)}
          </div>
          <span style="color: var(--text-secondary);">(${product.ratingCount} valoraciones de clientes)</span>
        </div>
        <div class="detail-meta-badges">
          <span class="detail-meta-badge"><i class="fa fa-shield-check" style="color: var(--accent-green);"></i> 100% Original</span>
          <span class="detail-meta-badge"><i class="fa fa-box-open" style="color: var(--accent-blue);"></i> Stock: ${product.stock} Uds</span>
        </div>
      </div>
      
      <div class="detail-pricing">
        <span class="detail-price">RD$ ${product.price.toLocaleString()}</span>
        <span class="detail-old-price">RD$ ${product.originalPrice.toLocaleString()}</span>
        <span class="detail-discount-badge">-${product.discount}% DESCUENTO</span>
      </div>
      
      <div class="detail-shipping-estimate">
        <i class="fa fa-truck-fast" style="color: var(--accent-green);"></i> Envío estimado: <span>¡Hoy mismo!</span> (Si ordenas antes de las 4:00 PM)
      </div>
      
      <!-- Interactive Tabs -->
      <div class="detail-tabs">
        <button class="tab-btn active" data-tab="tab-desc">Descripción</button>
        <button class="tab-btn" data-tab="tab-benefits">Beneficios</button>
        <button class="tab-btn" data-tab="tab-ingredients">Ingredientes</button>
        <button class="tab-btn" data-tab="tab-nutrition">Tabla Nutricional</button>
        <button class="tab-btn" data-tab="tab-faqs">FAQs</button>
        <button class="tab-btn" data-tab="tab-reviews">Opiniones</button>
      </div>
      
      <div class="tab-content-pane active" id="tab-desc">
        <p>${product.description}</p>
        <p style="margin-top: 10px;"><strong>Modo de Uso:</strong> ${product.usage}</p>
      </div>
      
      <div class="tab-content-pane" id="tab-benefits">
        <ul class="benefits-list-detail">
          ${benefitsListHTML}
        </ul>
      </div>
      
      <div class="tab-content-pane" id="tab-ingredients">
        <ul class="benefits-list-detail" style="list-style-type: square;">
          ${ingredientsListHTML}
        </ul>
      </div>
      
      <div class="tab-content-pane" id="tab-nutrition">
        ${nutritionTableHTML}
      </div>
      
      <div class="tab-content-pane" id="tab-faqs">
        <div class="faq-list">
          ${faqsHTML}
        </div>
      </div>
      
      <div class="tab-content-pane" id="tab-reviews">
        <div class="reviews-list-detail">
          ${reviewsHTML}
        </div>
      </div>
      
      <div class="detail-actions-row">
        <div class="qty-selector">
          <button class="qty-btn" id="modal-qty-minus"><i class="fa fa-minus"></i></button>
          <span class="qty-val" id="modal-qty-val">1</span>
          <button class="qty-btn" id="modal-qty-plus"><i class="fa fa-plus"></i></button>
        </div>
        <button class="btn btn-secondary glow-btn-green" id="modal-buy-now-btn">Comprar Ahora</button>
        <button class="btn btn-primary" id="modal-add-cart-btn">Añadir al Carrito <i class="fa fa-shopping-cart"></i></button>
      </div>
      
      ${relatedHTML}
    </div>
  `;

  // Gallery events
  const mainImg = document.getElementById('detail-main-img');
  const mainImgContainer = document.getElementById('main-img-container');
  
  // Image zoom effect on hover
  mainImgContainer.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = mainImgContainer.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    mainImg.style.transformOrigin = `${x}% ${y}%`;
    mainImg.style.transform = 'scale(1.8)';
  });
  mainImgContainer.addEventListener('mouseleave', () => {
    mainImg.style.transform = 'scale(1)';
  });

  // Thumbnails select handler
  document.querySelectorAll('.thumb-img').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const idx = parseInt(thumb.getAttribute('data-index'));
      mainImg.src = product.images[idx];
    });
  });

  // Related products clicks
  document.querySelectorAll('.related-item-card').forEach(relCard => {
    relCard.addEventListener('click', () => {
      const relId = relCard.getAttribute('data-id');
      openDetailModal(relId);
    });
  });

  // Quantity handlers
  let qtyVal = 1;
  const qtyValElem = document.getElementById('modal-qty-val');
  
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    if (qtyVal > 1) {
      qtyVal--;
      qtyValElem.innerText = qtyVal;
    }
  });
  
  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    if (qtyVal < product.stock) {
      qtyVal++;
      qtyValElem.innerText = qtyVal;
    } else {
      showToast(`Stock máximo alcanzado (${product.stock} disponibles)`, 'warning');
    }
  });

  // Modal active tab click handler
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Add to cart in modal
  document.getElementById('modal-add-cart-btn').addEventListener('click', () => {
    addToCart(product.id, qtyVal);
    closeDetailModal();
    openCartDrawer();
  });

  // Buy Now in modal
  document.getElementById('modal-buy-now-btn').addEventListener('click', () => {
    addToCart(product.id, qtyVal);
    closeDetailModal();
    openCheckoutModal();
  });

  // Open modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Modal close btn
  document.getElementById('modal-close-btn').addEventListener('click', closeDetailModal);
}

function closeDetailModal() {
  document.getElementById('product-detail-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 6. CART SYSTEM & LOCALSTORAGE
// ==========================================
function addToCart(productId, qty = 1) {
  const product = STORE_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    if (existing.quantity + qty <= product.stock) {
      existing.quantity += qty;
      showToast(`¡Añadido! ${product.name} x${qty} en el carrito`, 'success');
    } else {
      existing.quantity = product.stock;
      showToast(`Se ha ajustado al stock máximo disponible (${product.stock})`, 'warning');
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: qty
    });
    showToast(`¡Añadido! ${product.name} en el carrito`, 'success');
  }

  saveCart();
  updateCartBadges();
  renderCart();
}

function updateCartBadges() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').innerText = count;
  document.getElementById('cart-count-badge').innerText = count;
  
  // Show/Hide badge if empty
  const badges = [document.getElementById('cart-count'), document.getElementById('cart-count-badge')];
  badges.forEach(b => {
    if (count === 0) {
      b.style.display = 'none';
    } else {
      b.style.display = 'flex';
    }
  });
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa fa-shopping-basket cart-empty-icon"></i>
        <h3>Tu carrito está vacío</h3>
        <p>Parece que aún no has agregado ningún suplemento.</p>
        <button class="btn btn-primary" onclick="document.getElementById('cart-drawer').classList.remove('active'); document.getElementById('cart-overlay').classList.remove('active'); document.getElementById('catalogo').scrollIntoView({behavior: 'smooth'});" style="margin-top: 10px;">Ver Productos</button>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">RD$ ${item.price.toLocaleString()}</span>
        <div class="cart-item-bottom">
          <div class="cart-item-qty">
            <button class="qty-btn item-minus" data-id="${item.id}"><i class="fa fa-minus"></i></button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn item-plus" data-id="${item.id}"><i class="fa fa-plus"></i></button>
          </div>
          <button class="cart-item-remove remove-btn" data-id="${item.id}"><i class="fa fa-trash-alt"></i></button>
        </div>
      </div>
    `;

    // Bind item events
    cartItem.querySelector('.item-minus').addEventListener('click', () => adjustItemQty(item.id, -1));
    cartItem.querySelector('.item-plus').addEventListener('click', () => adjustItemQty(item.id, 1));
    cartItem.querySelector('.remove-btn').addEventListener('click', () => removeCartItem(item.id));

    container.appendChild(cartItem);
  });

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  updateCartTotals(subtotal);
}

function adjustItemQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const product = STORE_DATA.products.find(p => p.id === productId);
  
  if (item.quantity + delta > 0) {
    if (item.quantity + delta <= product.stock) {
      item.quantity += delta;
    } else {
      showToast(`Stock máximo alcanzado (${product.stock} disponibles)`, 'warning');
    }
  } else {
    removeCartItem(productId);
    return;
  }

  saveCart();
  updateCartBadges();
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadges();
  renderCart();
  showToast('Producto eliminado del carrito', 'info');
}

function updateCartTotals(subtotal) {
  document.getElementById('cart-subtotal').innerText = `RD$ ${subtotal.toLocaleString()}`;
  
  const discountRow = document.getElementById('cart-discount-row');
  const discountVal = document.getElementById('cart-discount-amount');
  const discountPercentLabel = document.getElementById('discount-percent');

  let discount = 0;
  if (activeCoupon && discountPercent > 0) {
    discount = subtotal * (discountPercent / 100);
    discountPercentLabel.innerText = discountPercent;
    discountVal.innerText = `-RD$ ${discount.toLocaleString()}`;
    discountRow.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
  }

  const finalTotal = subtotal - discount;
  document.getElementById('cart-total').innerText = `RD$ ${finalTotal.toLocaleString()}`;
  document.getElementById('checkout-total-val').innerText = `RD$ ${finalTotal.toLocaleString()}`;
}

function applyCouponCode() {
  const couponInput = document.getElementById('coupon-input');
  const code = couponInput.value.toUpperCase().trim();

  if (code === '') {
    showToast('Ingresa un código de cupón', 'info');
    return;
  }

  if (COUPONS[code]) {
    activeCoupon = code;
    discountPercent = COUPONS[code];
    showToast(`¡Cupón aplicado! Descuento del ${discountPercent}%`, 'success');
    renderCart();
  } else {
    showToast('Código de cupón inválido', 'error');
  }
}

function saveCart() {
  localStorage.setItem('apex_cart', JSON.stringify(cart));
}

function openCartDrawer() {
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-drawer').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCartDrawer() {
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-drawer').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 7. WISHLIST MANAGEMENT
// ==========================================
function toggleWishlistItem(productId) {
  const idx = wishlist.indexOf(productId);
  const product = STORE_DATA.products.find(p => p.id === productId);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Eliminado de tus favoritos: ${product.name}`, 'info');
  } else {
    wishlist.push(productId);
    showToast(`¡Agregado a favoritos! ${product.name}`, 'success');
  }

  localStorage.setItem('apex_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  const count = wishlist.length;
  const badge = document.getElementById('wishlist-count');
  badge.innerText = count;
  if (count === 0) {
    badge.style.display = 'none';
  } else {
    badge.style.display = 'flex';
  }
}

function toggleWishlistCatalogView() {
  const btn = document.getElementById('wishlist-toggle-btn');
  const isViewingWishlist = btn.classList.contains('active');
  
  if (!isViewingWishlist) {
    btn.classList.add('active');
    btn.style.boxShadow = 'var(--glow-green)';
    btn.style.borderColor = 'var(--accent-green)';
    
    // Custom filter to show only wishlisted items
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    const filtered = STORE_DATA.products.filter(p => wishlist.includes(p.id));
    document.getElementById('catalog-count-info').innerText = `Favoritos: Mostrando ${filtered.length} productos`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
          <i class="fa fa-heart-crack" style="font-size: 40px; color: var(--accent-red); margin-bottom: 15px;"></i>
          <h4>Lista de favoritos vacía</h4>
          <p>Haz clic en el corazón de los productos para guardarlos aquí.</p>
        </div>
      `;
      return;
    }

    // Reuse rendering code but for wishlist items only
    renderSpecificProducts(filtered);
  } else {
    btn.classList.remove('active');
    btn.style.boxShadow = '';
    btn.style.borderColor = '';
    renderProducts();
  }
}

function renderSpecificProducts(productsList) {
  const grid = document.getElementById('products-grid');
  productsList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const isWishlisted = wishlist.includes(product.id);
    const wishlistClass = isWishlisted ? 'wishlist-btn active' : 'wishlist-btn';
    const stockPercent = (product.stock / product.maxStock) * 100;

    let badgeHTML = '';
    if (product.tag) {
      const tagClass = product.tag.toLowerCase().replace(/\s+/g, '-');
      badgeHTML = `<span class="product-tag tag-${tagClass}">${product.tag}</span>`;
    }

    card.innerHTML = `
      ${badgeHTML}
      <button class="${wishlistClass}" data-id="${product.id}">
        <i class="fa-solid fa-heart"></i>
      </button>
      <div class="product-img-wrap" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name" data-id="${product.id}">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${getStarRatingHTML(product.rating)}</div>
          <span>(${product.ratingCount})</span>
        </div>
        <div class="product-pricing">
          <span class="product-price">RD$ ${product.price.toLocaleString()}</span>
          <span class="product-old-price">RD$ ${product.originalPrice.toLocaleString()}</span>
          <span class="product-discount">-${product.discount}%</span>
        </div>
        <div class="product-stock-bar">
          <div class="stock-lbl-row">
            <span>Disponibilidad</span>
            <span>${product.stock} disponibles</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width: ${stockPercent}%;"></div></div>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary quick-view-btn" data-id="${product.id}">Detalles</button>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Agregar <i class="fa fa-shopping-cart"></i></button>
        </div>
      </div>
    `;

    card.querySelector('.product-img-wrap').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.product-name').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.quick-view-btn').addEventListener('click', () => openDetailModal(product.id));
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(product.id, 1);
      openCartDrawer();
    });
    
    card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlistItem(product.id);
      toggleWishlistCatalogView(); // refresh current view
      toggleWishlistCatalogView();
    });

    grid.appendChild(card);
  });
}

// ==========================================
// 8. CHECKOUT FORM & WHATSAPP GENERATION
// ==========================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Tu carrito está vacío', 'info');
    return;
  }
  closeCartDrawer();
  document.getElementById('checkout-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const address = document.getElementById('client-address').value.trim();
  const city = document.getElementById('client-city').value.trim();
  const payment = document.getElementById('client-payment').value;
  const comments = document.getElementById('client-comments').value.trim() || 'Sin comentarios adicionales';

  if (!name || !phone || !email || !address || !city || !payment) {
    showToast('Por favor, rellena todos los campos obligatorios (*)', 'error');
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = activeCoupon ? (subtotal * (discountPercent / 100)) : 0;
  const total = subtotal - discount;

  // Format order items list
  let itemsText = '';
  cart.forEach((item, idx) => {
    itemsText += `📦 ${item.name} x${item.quantity} - RD$ ${(item.price * item.quantity).toLocaleString()}\n`;
  });

  // Coupon text formatting
  let couponText = '';
  if (activeCoupon) {
    couponText = `Descuento Aplicado: ${activeCoupon} (-${discountPercent}%: RD$ ${discount.toLocaleString()})\n`;
  }

  // Construct message template
  const message = `Hola, deseo realizar el siguiente pedido:

👤 Nombre: ${name}
📞 Teléfono: ${phone}
📧 Correo: ${email}
📍 Dirección: ${address}
🏙 Ciudad: ${city}

🛒 Productos:
${itemsText}
${couponText}💰 Total: RD$ ${total.toLocaleString()}
💳 Método de pago: ${payment}
📝 Comentarios: ${comments}

Gracias.`;

  // Encode message for URI
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/18295705931?text=${encodedMsg}`;

  // Reset cart state and local storage after initiating order redirection
  cart = [];
  saveCart();
  updateCartBadges();
  closeCheckoutModal();
  showToast('Redirigiendo a WhatsApp para confirmar pedido...', 'success');

  // Delay opening slightly for user feedback
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 1000);
}

// ==========================================
// 9. AI ADVISOR LOGIC
// ==========================================
let quizSelectedGoal = null;

function initAiAdvisorQuiz() {
  const goalOptions = document.querySelectorAll('.goal-option');
  const nextBtn = document.getElementById('ai-next-btn');

  goalOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      goalOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      quizSelectedGoal = opt.getAttribute('data-goal');
      nextBtn.removeAttribute('disabled');
    });
  });

  nextBtn.addEventListener('click', () => {
    if (!quizSelectedGoal) return;
    
    // Switch to loading step
    document.getElementById('ai-step-start').classList.remove('active');
    document.getElementById('ai-step-loading').classList.add('active');

    // Simulate tech processing loading
    setTimeout(() => {
      document.getElementById('ai-step-loading').classList.remove('active');
      showAiQuizResults(quizSelectedGoal);
    }, 1500);
  });

  document.getElementById('ai-restart-btn').addEventListener('click', () => {
    document.getElementById('ai-step-results').classList.remove('active');
    document.getElementById('ai-step-start').classList.add('active');
    // Clear selection
    goalOptions.forEach(o => o.classList.remove('selected'));
    quizSelectedGoal = null;
    nextBtn.setAttribute('disabled', 'true');
  });

  document.getElementById('ai-add-all-btn').addEventListener('click', () => {
    const recommendedIds = getRecommendedIdsForGoal(quizSelectedGoal);
    recommendedIds.forEach(id => {
      addToCart(id, 1);
    });
    showToast('¡Se agregaron todos los productos sugeridos!', 'success');
    openCartDrawer();
  });
}

function showAiQuizResults(goal) {
  document.getElementById('selected-goal-label').innerText = goal;
  const resultsGrid = document.getElementById('ai-recommended-products');
  resultsGrid.innerHTML = '';

  const recommendedIds = getRecommendedIdsForGoal(goal);
  const products = STORE_DATA.products.filter(p => recommendedIds.includes(p.id));

  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'rec-card';
    item.style.cursor = 'pointer';

    item.innerHTML = `
      <div class="rec-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="rec-details">
        <span class="product-brand" style="font-size: 9px; margin-bottom: 2px;">${product.brand}</span>
        <h4 class="rec-name">${product.name}</h4>
        <span class="rec-price">RD$ ${product.price.toLocaleString()}</span>
      </div>
    `;

    item.addEventListener('click', () => openDetailModal(product.id));

    resultsGrid.appendChild(item);
  });

  document.getElementById('ai-step-results').classList.add('active');
}

function getRecommendedIdsForGoal(goal) {
  switch (goal) {
    case 'Masa muscular':
      return ['prod-1', 'prod-2', 'prod-6', 'prod-10'];
    case 'Perder grasa':
      return ['prod-4', 'prod-1', 'prod-7'];
    case 'Energía':
      return ['prod-3', 'prod-9', 'prod-5'];
    case 'Rendimiento':
      return ['prod-2', 'prod-3', 'prod-7'];
    case 'Recuperación':
      return ['prod-7', 'prod-8', 'prod-5'];
    default:
      return ['prod-1', 'prod-2'];
  }
}

// ==========================================
// 10. SPECIAL OFFERS COUNTDOWN TIMER
// ==========================================
function startSpecialOffersCountdown() {
  const hElem = document.getElementById('cd-hours');
  const mElem = document.getElementById('cd-mins');
  const sElem = document.getElementById('cd-secs');

  function updateTimer() {
    const now = new Date();
    // End of current day (midnight)
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = endOfDay - now; // milliseconds

    if (diff <= 0) {
      hElem.innerText = '00';
      mElem.innerText = '00';
      sElem.innerText = '00';
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    hElem.innerText = String(hours).padStart(2, '0');
    mElem.innerText = String(mins).padStart(2, '0');
    sElem.innerText = String(secs).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================
// 11. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = 'info') {
  // Check if a toast container already exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 2000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Create toast card
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: rgba(13, 13, 20, 0.95);
    border-left: 4px solid var(--accent-blue);
    color: white;
    padding: 14px 20px;
    border-radius: var(--radius-sm);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-size: 13px;
    font-weight: 500;
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 280px;
    max-width: 380px;
    transform: translateX(-120%);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
    opacity: 0;
  `;

  // Apply colors based on type
  let icon = 'info-circle';
  if (type === 'success') {
    toast.style.borderLeftColor = 'var(--accent-green)';
    toast.style.boxShadow = '0 10px 30px rgba(0, 255, 102, 0.1)';
    icon = 'check-circle';
  } else if (type === 'warning') {
    toast.style.borderLeftColor = '#f59e0b';
    icon = 'triangle-exclamation';
  } else if (type === 'error') {
    toast.style.borderLeftColor = 'var(--accent-red)';
    icon = 'circle-xmark';
  }

  toast.innerHTML = `
    <i class="fa fa-${icon}" style="color: ${toast.style.borderLeftColor}; font-size:16px;"></i>
    <div style="flex-grow:1;">${message}</div>
  `;

  container.appendChild(toast);

  // Animate Entrance
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 50);

  // Animate Exit & Remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-120%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 400);
  }, 3500);
}
