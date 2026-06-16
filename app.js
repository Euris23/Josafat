import { STORE_DATA } from './data.js';

// ==========================================
// 1. ESTADO DE LA TIENDA (Simplificado)
// ==========================================
let cart = JSON.parse(localStorage.getItem('apex_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';

// ==========================================
// 2. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Renderizado inicial
  renderProducts();
  renderCart();
  
  // Evento del buscador
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Eventos de botones de categorías
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Evento de envío del formulario
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
});

// ==========================================
// 3. RENDERIZADO DE PRODUCTOS
// ==========================================
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  let filtered = [...STORE_DATA.products];

  // Filtro por categoría
  if (activeCategory !== 'all') {
    if (activeCategory === 'Otros') {
      // Agrupar las que no sean Proteínas, Creatinas o Pre-entrenos
      const mainCategories = ['Proteínas', 'Creatinas', 'Pre-entrenos', 'Quemadores de grasa'];
      filtered = filtered.filter(p => !mainCategories.includes(p.category));
    } else {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
  }

  // Filtro por buscador
  if (searchQuery !== '') {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.brand.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  // Si no hay productos
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <i class="fa fa-info-circle" style="font-size: 32px; color: var(--text-muted); margin-bottom: 12px;"></i>
        <p>No encontramos suplementos con esa descripción.</p>
      </div>
    `;
    return;
  }

  // Inyectar tarjetas
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-pricing">
          <span class="product-price">RD$ ${product.price.toLocaleString()}</span>
          <span class="product-old-price">RD$ ${product.originalPrice.toLocaleString()}</span>
          <span class="product-discount">-${product.discount}%</span>
        </div>
        <button class="btn btn-add-cart add-btn" data-id="${product.id}">
          <i class="fa fa-shopping-basket"></i> Agregar al Pedido
        </button>
      </div>
    `;

    card.querySelector('.add-btn').addEventListener('click', () => {
      addToCart(product.id);
    });

    grid.appendChild(card);
  });
}

// ==========================================
// 4. SISTEMA DEL CARRITO
// ==========================================
function addToCart(productId) {
  const product = STORE_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  
  // Auto scroll suave hacia la sección del pedido al agregar un producto
  const orderSection = document.getElementById('mi-pedido');
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function adjustQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('apex_cart', JSON.stringify(cart));
  updateCartBadges();
}

function updateCartBadges() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById('cart-badge-count');
  if (badge) {
    badge.innerText = count;
  }
}

// ==========================================
// 5. RENDERIZADO DEL CARRITO E INLINE TOTALS
// ==========================================
function renderCart() {
  const listContainer = document.getElementById('cart-items-list');
  const checkoutBtn = document.querySelector('.btn-checkout');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  updateCartBadges();

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa fa-shopping-basket cart-empty-icon"></i>
        <p>Aún no has seleccionado productos.</p>
        <p style="font-size:12px; color: var(--text-muted);">Elige tus suplementos en el catálogo de arriba para armar tu pedido.</p>
      </div>
    `;
    
    document.getElementById('cart-subtotal').innerText = 'RD$ 0';
    document.getElementById('cart-total').innerText = 'RD$ 0';
    
    // Deshabilitar botón de WhatsApp si está vacío
    if (checkoutBtn) {
      checkoutBtn.setAttribute('disabled', 'true');
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.cursor = 'not-allowed';
    }
    return;
  }

  // Habilitar botón de WhatsApp si tiene ítems
  if (checkoutBtn) {
    checkoutBtn.removeAttribute('disabled');
    checkoutBtn.style.opacity = '1';
    checkoutBtn.style.cursor = 'pointer';
  }

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item';

    itemRow.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">RD$ ${item.price.toLocaleString()} c/u</span>
      </div>
      <div class="cart-item-actions">
        <div class="cart-qty-selector">
          <button type="button" class="cart-qty-btn minus-btn">-</button>
          <span class="cart-qty-val">${item.quantity}</span>
          <button type="button" class="cart-qty-btn plus-btn">+</button>
        </div>
        <button type="button" class="cart-item-remove remove-btn" title="Eliminar"><i class="fa fa-trash-can"></i></button>
      </div>
    `;

    // Asignar eventos de cantidad
    itemRow.querySelector('.minus-btn').addEventListener('click', () => adjustQty(item.id, -1));
    itemRow.querySelector('.plus-btn').addEventListener('click', () => adjustQty(item.id, 1));
    itemRow.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.id));

    listContainer.appendChild(itemRow);
  });

  // Mostrar costos
  document.getElementById('cart-subtotal').innerText = `RD$ ${subtotal.toLocaleString()}`;
  document.getElementById('cart-total').innerText = `RD$ ${subtotal.toLocaleString()}`;
}

// ==========================================
// 6. CHECKOUT FORM & WHATSAPP REDIRECT
// ==========================================
function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Tu pedido está vacío. Agrega productos antes de enviar.');
    return;
  }

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const address = document.getElementById('client-address').value.trim();
  const city = document.getElementById('client-city').value.trim();
  const payment = document.getElementById('client-payment').value;
  const comments = document.getElementById('client-comments').value.trim() || 'Sin comentarios adicionales';

  if (!name || !phone || !address || !city || !payment) {
    alert('Por favor completa todos los campos marcados con asterisco (*).');
    return;
  }

  // Generar la lista de productos
  let itemsText = '';
  let subtotal = 0;
  cart.forEach((item, index) => {
    const totalItemPrice = item.price * item.quantity;
    subtotal += totalItemPrice;
    itemsText += `${index + 1}. 📦 ${item.name} (x${item.quantity}) - RD$ ${totalItemPrice.toLocaleString()}\n`;
  });

  // Estructura del mensaje de WhatsApp
  const message = `¡Hola APEX SUPPS! Deseo confirmar el siguiente pedido:

👤 Datos de Entrega:
- Nombre: ${name}
- Teléfono/WA: ${phone}
- Dirección: ${address}
- Ciudad: ${city}

🛒 Productos Solicitados:
${itemsText}
💰 Total del Pedido: RD$ ${subtotal.toLocaleString()}
💳 Método de Pago: ${payment}
📝 Notas: ${comments}

¡Quedo a la espera de su confirmación!`;

  // Codificar el enlace de WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/18295705931?text=${encodedMessage}`;

  // Limpiar carrito tras iniciar la compra
  cart = [];
  saveCart();
  renderCart();
  
  // Limpiar formulario
  document.getElementById('checkout-form').reset();

  // Redirigir al usuario
  alert('¡Felicidades! Tu pedido se ha preparado. Serás redirigido a WhatsApp para confirmar la entrega con nuestro asesor.');
  window.open(waUrl, '_blank');
}
