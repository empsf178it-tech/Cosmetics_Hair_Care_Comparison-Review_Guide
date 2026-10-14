/* ==========================================================================
   FOLLICLE — Hair Care Comparison, Discovery & Review Platform
   Shared Master JavaScript ES6
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize datasets & local storage state
  initLocalStorage();

  // Initialize modular features defensively
  initScrollProgress();
  initCartDrawer();
  initNavigation();
  initHeroAnimations();
  initProductCatalog();
  initProductComparison();
  initHairQuiz();
  initReviewsPage();
  initDashboard();
  initAdmin();
  initToasts();
  initScrollReveal();
  initBackToTop();
  updateCartBadgeCount();
});

/* ==========================================
   1. LOCAL STORAGE & DATASETS
   ========================================== */
const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Botanical Silk Shampoo',
    brand: 'FOLLICLE Science',
    category: 'Shampoo',
    hairType: 'Straight',
    concerns: ['Dryness', 'Scalp Care'],
    price: 34.00,
    rating: 4.9,
    reviewCount: 128,
    image: 'assets/images/14.jpg',
    sulfateFree: true,
    ingredients: 'Rosemary Extract, Silk Amino Acids, Plant Squalane',
    fragrance: 'Eucalyptus & Sage',
    description: 'A gentle, botanical-infused cleanser that restores natural moisture balances without stripping essential scalp oils.'
  },
  {
    id: 'prod-2',
    name: 'Nourishing Lipid Conditioner',
    brand: 'FOLLICLE Science',
    category: 'Conditioner',
    hairType: 'Wavy',
    concerns: ['Frizz', 'Dryness'],
    price: 36.00,
    rating: 4.8,
    reviewCount: 95,
    image: 'assets/images/15.jpg',
    sulfateFree: true,
    ingredients: 'Argan Oil, Shea Lipids, Hydrolyzed Wheat Protein',
    fragrance: 'Warm Vanilla & Cedar',
    description: 'Rich moisture barrier protection that smooths wave patterns and seals split ends for silky manageable weightless shine.'
  },
  {
    id: 'prod-3',
    name: 'Deep Repair Botanical Mask',
    brand: 'Ritual BioLab',
    category: 'Hair Masks',
    hairType: 'Curly',
    concerns: ['Damaged Hair', 'Breakage'],
    price: 48.00,
    rating: 5.0,
    reviewCount: 210,
    image: 'assets/images/16.jpg',
    sulfateFree: true,
    ingredients: 'Aloe Vera Concentrate, Murumuru Butter, Phytokeratin',
    fragrance: 'Botanical Green Tea',
    description: 'Intense reconstructive treatment that penetrates core cuticle layers to rebuild broken keratin bonds in textured hair.'
  },
  {
    id: 'prod-4',
    name: 'Rosemary Scalp & Elixir Oil',
    brand: 'FOLLICLE Science',
    category: 'Hair Oils',
    hairType: 'Coily',
    concerns: ['Oily Scalp', 'Scalp Care'],
    price: 42.00,
    rating: 4.9,
    reviewCount: 312,
    image: 'assets/images/17.jpg',
    sulfateFree: true,
    ingredients: 'Organic Rosemary Oil, Cold-Pressed Jojoba, Peppermint',
    fragrance: 'Herbal Rosemary Mint',
    description: 'Targeted micro-circulatory scalp tonic formulation that calms inflammation and strengthens hair bulb roots.'
  },
  {
    id: 'prod-5',
    name: 'Clarifying Scalp Detox Serum',
    brand: 'Ritual BioLab',
    category: 'Scalp Care',
    hairType: 'Straight',
    concerns: ['Oily Scalp', 'Scalp Care'],
    price: 38.00,
    rating: 4.7,
    reviewCount: 84,
    image: 'assets/images/27.jpg',
    sulfateFree: true,
    ingredients: 'Salicylic Acid 2%, Tea Tree, Apple Cider Extract',
    fragrance: 'Citrus Zest',
    description: 'Exfoliates buildup, regulates sebum output, and refreshes congested hair follicles for weightless volume.'
  },
  {
    id: 'prod-6',
    name: 'Hydra-Shield Curl Leave-In',
    brand: 'FOLLICLE Science',
    category: 'Leave-in Treatments',
    hairType: 'Curly',
    concerns: ['Curl Definition', 'Frizz'],
    price: 32.00,
    rating: 4.8,
    reviewCount: 176,
    image: 'assets/images/38.jpg',
    sulfateFree: true,
    ingredients: 'Coconut Water, Marshmallow Root, Flaxseed Gel',
    fragrance: 'Fresh Coconut & Lime',
    description: 'Defines natural curl clump structures while locking in 72-hour moisture against humid environmental factors.'
  },
  {
    id: 'prod-7',
    name: 'Botanical Lift & Volume Mist',
    brand: 'PurePhyto Co.',
    category: 'Leave-in Treatments',
    hairType: 'Wavy',
    concerns: ['Dryness'],
    price: 29.00,
    rating: 4.6,
    reviewCount: 64,
    image: 'assets/images/39.jpg',
    sulfateFree: true,
    ingredients: 'Bambusa Extract, Rice Protein, Biotin',
    fragrance: 'White Floral',
    description: 'Weightless root-amplifying spray that adds touchable body and natural bounce without stiffness.'
  },
  {
    id: 'prod-8',
    name: 'Phyto-Protein Bond Restorer',
    brand: 'Ritual BioLab',
    category: 'Hair Masks',
    hairType: 'Coily',
    concerns: ['Damaged Hair', 'Breakage'],
    price: 54.00,
    rating: 4.9,
    reviewCount: 142,
    image: 'assets/images/44.jpg',
    sulfateFree: true,
    ingredients: 'Peptide Complex, Fermented Argan, Ceramides',
    fragrance: 'Unscented Pure',
    description: 'Clinical-grade molecular bond builder that reverses chemical stress and high heat styling structural damage.'
  },
  {
    id: 'prod-9',
    name: 'Scalp Refresh Exfoliating Scrub',
    brand: 'Ritual BioLab',
    category: 'Scalp Care',
    hairType: 'Straight',
    concerns: ['Oily Scalp', 'Scalp Care'],
    price: 39.00,
    rating: 4.8,
    reviewCount: 88,
    image: 'assets/images/46.jpg',
    sulfateFree: true,
    ingredients: 'Pink Himalayan Salt, Micro-Rosemary, Tea Tree',
    fragrance: 'Peppermint Breeze',
    description: 'Micro-exfoliating botanical scalp scrub that gently lifts dead skin cells and styling residue for healthier root growth.'
  },
  {
    id: 'prod-10',
    name: 'Sulfate-Free Botanical Shine Drops',
    brand: 'FOLLICLE Science',
    category: 'Hair Oils',
    hairType: 'Wavy',
    concerns: ['Frizz', 'Dryness'],
    price: 35.00,
    rating: 4.9,
    reviewCount: 114,
    image: 'assets/images/48.jpg',
    sulfateFree: true,
    ingredients: 'Camelia Seed Oil, Squalane, Macadamia Lipid',
    fragrance: 'Golden Jasmine',
    description: 'Weightless shine serum that tames flyaways and protects cuticle edges against humidity without greasiness.'
  },
  {
    id: 'prod-11',
    name: 'Hydrating Bamboo Leave-In Mist',
    brand: 'PurePhyto Co.',
    category: 'Leave-in Treatments',
    hairType: 'Straight',
    concerns: ['Dryness'],
    price: 31.00,
    rating: 4.7,
    reviewCount: 79,
    image: 'assets/images/21.jpg',
    sulfateFree: true,
    ingredients: 'Organic Bamboo Water, Panthenol B5, Aloe Juice',
    fragrance: 'Clean Linen & Mint',
    description: 'Ultrafine botanical conditioning mist that detangles wet hair and hydrates dry ends effortlessly.'
  },
  {
    id: 'prod-12',
    name: 'Ceramide Hair Renewal Serum',
    brand: 'FOLLICLE Science',
    category: 'Hair Oils',
    hairType: 'Curly',
    concerns: ['Damaged Hair', 'Frizz'],
    price: 46.00,
    rating: 5.0,
    reviewCount: 165,
    image: 'assets/images/41.jpg',
    sulfateFree: true,
    ingredients: 'Bio-Ceramides, Oat Kernel Lipid, Vitamin E',
    fragrance: 'Botanical Amber',
    description: 'Concentrated serum that reinforces fragile curl elasticity and restores lost cellular lipids in processed hair.'
  },
  {
    id: 'prod-13',
    name: 'Defining Curl Butter Cream',
    brand: 'Ritual BioLab',
    category: 'Hair Masks',
    hairType: 'Coily',
    concerns: ['Curl Definition', 'Dryness'],
    price: 44.00,
    rating: 4.8,
    reviewCount: 198,
    image: 'assets/images/42.jpg',
    sulfateFree: true,
    ingredients: 'Mango Butter, Raw Shea, Marshmallow Root Extract',
    fragrance: 'Tropical Vanilla',
    description: 'Ultra-rich defining butter that clumps coils, locks in deep hydration, and prevents shrinkage.'
  },
  {
    id: 'prod-14',
    name: 'Overnight Scalp Repair Tonic',
    brand: 'FOLLICLE Science',
    category: 'Scalp Care',
    hairType: 'Curly',
    concerns: ['Scalp Care', 'Breakage'],
    price: 42.00,
    rating: 4.9,
    reviewCount: 104,
    image: 'assets/images/26.jpg',
    sulfateFree: true,
    ingredients: 'Fermented Rice Water, Biotin, Lavender Extract',
    fragrance: 'Calming Lavender',
    description: 'No-rinse overnight scalp elixir that soothes tension, calms irritation, and encourages stronger follicle roots.'
  },
  {
    id: 'prod-15',
    name: 'Bio-Moisture Leave-In Milk',
    brand: 'PurePhyto Co.',
    category: 'Leave-in Treatments',
    hairType: 'Coily',
    concerns: ['Dryness', 'Frizz'],
    price: 33.00,
    rating: 4.8,
    reviewCount: 92,
    image: 'assets/images/45.jpg',
    sulfateFree: true,
    ingredients: 'Oat Milk, Coconut Water, Sweet Almond Oil',
    fragrance: 'Sweet Almond',
    description: 'Nourishing leave-in conditioning milk that softens dry strands and provides day-long moisture retention.'
  }
];

const INGREDIENTS_DATA = [
  {
    name: 'Rosemary Essential Oil',
    category: 'Scalp Stimulant',
    image: 'assets/images/5.jpg',
    overview: 'Known for boosting micro-circulation in the scalp, strengthening hair follicles, and balancing natural sebum.',
    uses: 'Scalp Oils, Serums, Root Clarifiers'
  },
  {
    name: 'Cold-Pressed Argan Oil',
    category: 'Nourishing Lipid',
    image: 'assets/images/25.jpg',
    overview: 'Rich in essential fatty acids and Vitamin E. Provides smooth cuticle sealing and high shine without greasy residue.',
    uses: 'Conditioners, Hair Oils, Heat Protectors'
  },
  {
    name: 'Coconut Water & Butter',
    category: 'Hydration & Moisture',
    image: 'assets/images/44.jpg',
    overview: 'Delivers deep intracellular moisture to dry fibers, improving flexibility and elasticity against mechanical breakage.',
    uses: 'Leave-in Creams, Curl Butters, Masks'
  },
  {
    name: 'Aloe Vera Leaf Concentrate',
    category: 'Soothing Botanical',
    image: 'assets/images/49.jpg',
    overview: 'Contains natural proteolytic enzymes that repair dead skin cells on the scalp while acting as a gentle humectant.',
    uses: 'Gentle Shampoos, Scalp Tonics, Hydrating Mists'
  }
];

function initLocalStorage() {
  if (!localStorage.getItem('follicle_cart')) {
    localStorage.setItem('follicle_cart', JSON.stringify([]));
  }
  if (!localStorage.getItem('follicle_compare')) {
    localStorage.setItem('follicle_compare', JSON.stringify(['prod-1', 'prod-2']));
  }
  const DEFAULT_REVIEWS = [
    {
      id: 'rev-1',
      name: 'Elena Vance',
      hairType: '2B Wavy',
      rating: 5,
      title: 'Transformed my natural wave texture!',
      text: 'After using the Silk Shampoo and Nourishing Conditioner for 3 weeks, my waves have zero frizz and bounce so gracefully.',
      date: '2026-09-28',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Marcus Chen',
      hairType: '3C Curly',
      rating: 5,
      title: 'Best scalp oil I have ever tested.',
      text: 'The Rosemary Scalp Elixir completely cleared up my dry scalp itchiness without leaving grease on my pillow.',
      date: '2026-10-02',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'Amara Okafor',
      hairType: '4C Coily',
      rating: 5,
      title: 'Deep moisture retention for high porosity coils.',
      text: 'The Defining Curl Butter Cream clumped my coils with zero crunch and protected my edges throughout protective styling.',
      date: '2026-10-05',
      verified: true
    },
    {
      id: 'rev-4',
      name: 'Chloe Davenport',
      hairType: '1A Straight',
      rating: 5,
      title: 'Weightless shine without weighing fine hair down.',
      text: 'Most oils make my straight hair look greasy by afternoon. The Botanical Shine Drops gave glass-like radiance without oily buildup.',
      date: '2026-10-08',
      verified: true
    },
    {
      id: 'rev-5',
      name: 'Julian Rivera',
      hairType: '2C Wavy',
      rating: 5,
      title: 'Scalp reset after months of gym buildup.',
      text: 'The Clarifying Scalp Detox Serum refreshed my scalp microbiome within two washes. My natural S-waves hold pattern all day.',
      date: '2026-10-10',
      verified: true
    },
    {
      id: 'rev-6',
      name: 'Sora Takahashi',
      hairType: '3B Curly',
      rating: 5,
      title: 'Hydra-Shield Curl Leave-in is a holy grail.',
      text: 'Living in high humidity used to ruin my ringlets. This leave-in seals the cuticle flawlessly and keeps spirals clumped.',
      date: '2026-10-12',
      verified: true
    }
  ];

  if (!localStorage.getItem('follicle_reviews') || JSON.parse(localStorage.getItem('follicle_reviews') || '[]').length < 6) {
    localStorage.setItem('follicle_reviews', JSON.stringify(DEFAULT_REVIEWS));
  }
}

/* Helper functions for LocalStorage */
function getCart() {
  return JSON.parse(localStorage.getItem('follicle_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('follicle_cart', JSON.stringify(cart));
  updateCartBadgeCount();
}

function getCompareList() {
  return JSON.parse(localStorage.getItem('follicle_compare') || '[]');
}

function saveCompareList(list) {
  localStorage.setItem('follicle_compare', JSON.stringify(list));
}

function updateCartBadgeCount() {
  const cart = getCart();
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = totalCount;
  });
  if (typeof renderCartDrawer === 'function') renderCartDrawer();
}

/* Scroll Progress Bar Initialization */
function initScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

/* Offcanvas Cart Slide Drawer Initialization */
function initCartDrawer() {
  let drawer = document.getElementById('cartSlideDrawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'cartSlideDrawer';
    drawer.className = 'cart-slide-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <h5 class="font-heading mb-0"><i class="bi bi-bag text-forest me-2"></i> Your Hair Care Ritual Cart</h5>
        <button class="nav-icon-btn" id="cartDrawerCloseBtn"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody">
        <!-- Cart Items rendered dynamically -->
      </div>
      <div class="cart-drawer-footer">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fw-bold">Subtotal Ritual:</span>
          <span class="fs-4 font-heading text-forest" id="cartDrawerSubtotal">$0.00</span>
        </div>
        <a href="shop.html" class="btn-follicle-primary w-100 text-center">Proceed to Checkout Ritual <i class="bi bi-arrow-right"></i></a>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const closeBtn = document.getElementById('cartDrawerCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  // Open drawer when clicking on any navbar cart button
  document.querySelectorAll('.nav-icon-btn[title="Cart"], a[href="shop.html"] .cart-count-badge').forEach(el => {
    const parentBtn = el.closest('a') || el;
    parentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  renderCartDrawer();
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');
  if (!body || !subtotalEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-x fs-1 text-muted mb-3 d-block"></i>
        <p class="mb-3">Your hair care cart is currently empty.</p>
        <a href="shop.html" class="btn-follicle-secondary btn-follicle-sm" onclick="closeCartDrawer()">Explore Formulas</a>
      </div>
    `;
    subtotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  body.innerHTML = cart.map(item => {
    const prod = PRODUCTS_DATA.find(p => p.id === item.id) || { name: 'Item', price: 0, image: '' };
    const itemTotal = prod.price * item.quantity;
    total += itemTotal;

    return `
      <div class="cart-item-row">
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
        <div class="flex-grow-1">
          <h6 class="mb-1 fs-7 fw-bold">${prod.name}</h6>
          <div class="text-forest fw-bold fs-7">$${prod.price.toFixed(2)}</div>
          <div class="d-flex align-items-center gap-2 mt-2">
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="fs-7 fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="btn btn-link text-danger p-0" onclick="removeFromCart('${item.id}')"><i class="bi bi-trash"></i></button>
      </div>
    `;
  }).join('');

  subtotalEl.textContent = `$${total.toFixed(2)}`;
}

window.openCartDrawer = function() {
  const drawer = document.getElementById('cartSlideDrawer');
  if (drawer) {
    renderCartDrawer();
    drawer.classList.add('open');
  }
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cartSlideDrawer');
  if (drawer) drawer.classList.remove('open');
};

window.updateCartQty = function(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart(cart);
  renderCartDrawer();
};

window.removeFromCart = function(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartDrawer();
};

/* ==========================================
   2. NAVIGATION & MOBILE SIDEBAR TOGGLE
   ========================================== */
function initNavigation() {
  // Top Navbar Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileNavDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (mobileNavDrawer) {
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('open') && 
          !mobileNavDrawer.contains(e.target) && 
          mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Dashboard Sidebar Toggle
  const sidebarMobileToggle = document.getElementById('sidebarMobileToggle');
  const sidebar = document.getElementById('sidebarFollicle');

  if (sidebarMobileToggle && sidebar) {
    sidebarMobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !sidebarMobileToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
}

/* ==========================================
   3. HERO ANIMATIONS & MOUSE TRACKING
   ========================================== */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Desktop Interactive 3D Gyroscope Tilt & Depth Parallax
  if (window.innerWidth > 992) {
    const visualWrapper = document.querySelector('.hero-visual-wrapper');
    const mainCard = document.querySelector('.hero-main-img-card');
    const subCircle = document.querySelector('.hero-sub-img-circle');
    const ingredientCard = document.querySelector('.hero-ingredient-card');
    const badgeTag = document.querySelector('.hero-tag-badge');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;

    heroSection.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX = (x / rect.width) * 2;   // -1 to 1
      mouseY = (y / rect.height) * 2;  // -1 to 1

      // Subtle background orbit circle translation
      document.querySelectorAll('.orbit-circle').forEach((circle, index) => {
        const factor = (index + 1) * 6;
        circle.style.transform = `translate3d(${mouseX * factor}px, ${mouseY * factor}px, 0)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
    });

    const heroTitle = document.querySelector('.hero-title');
    const heroEyebrow = document.querySelector('.hero-eyebrow');

    // Smooth RAF loop for buttery 60fps 3D tilt easing
    function animate3DTilt() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const tiltY = currentX * 14;  // Rotate around Y axis
      const tiltX = -currentY * 12; // Rotate around X axis

      if (heroTitle) {
        heroTitle.style.transform = `rotateY(${tiltY * 0.4}deg) rotateX(${tiltX * 0.4}deg) translateZ(16px)`;
      }
      if (heroEyebrow) {
        heroEyebrow.style.transform = `translate3d(${currentX * 6}px, ${currentY * 4}px, 10px)`;
      }
      if (mainCard) {
        mainCard.style.transform = `rotateY(${tiltY - 4}deg) rotateX(${tiltX + 2}deg) translateZ(42px)`;
      }
      if (subCircle) {
        subCircle.style.transform = `rotateY(${tiltY * 1.3}deg) rotateX(${tiltX * 1.3}deg) translate3d(${currentX * 18}px, ${currentY * 16}px, 85px) rotate(6deg)`;
      }
      if (ingredientCard) {
        ingredientCard.style.transform = `rotateY(${tiltY * 1.2}deg) rotateX(${tiltX * 1.2}deg) translate3d(${currentX * 10}px, ${-currentY * 10}px, 105px) rotate(-2deg)`;
      }
      if (badgeTag) {
        badgeTag.style.transform = `translate3d(${currentX * 14}px, ${currentY * 12}px, 95px)`;
      }

      requestAnimationFrame(animate3DTilt);
    }

    animate3DTilt();
  }
}

/* ==========================================
   4. PRODUCT CATALOG & FILTERS (shop.html)
   ========================================== */
function initProductCatalog() {
  const catalogGrid = document.getElementById('productCatalogGrid');
  if (!catalogGrid) return;

  let currentProducts = [...PRODUCTS_DATA];
  const isHomepage = !document.getElementById('shopSearchInput') || window.location.pathname.endsWith('index.html');
  if (isHomepage) {
    currentProducts = PRODUCTS_DATA.slice(0, 9);
  }

  const resultsCount = document.getElementById('resultsCount');
  const activeFiltersContainer = document.getElementById('activeFiltersContainer');
  const searchInput = document.getElementById('shopSearchInput');
  const sortSelect = document.getElementById('shopSortSelect');
  const sulfateCb = document.getElementById('filterSulfateFree');

  function renderGrid(products) {
    if (resultsCount) {
      resultsCount.textContent = `Showing ${products.length} curated botanical formula${products.length === 1 ? '' : 's'}`;
    }

    if (products.length === 0) {
      catalogGrid.innerHTML = `
        <div class="col-12 text-center py-5" style="grid-column: 1 / -1;">
          <div class="p-5 rounded-4 bg-white border text-center max-w-500 mx-auto">
            <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
            <h4 class="font-heading mb-2">No Matching Formulas Found</h4>
            <p class="text-muted small mb-4">No hair care formulas match your active filters or search terms. Try loosening your filter criteria.</p>
            <button class="btn btn-follicle-secondary" id="resetFiltersBtn">Clear All Filters</button>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          resetAllFilters();
        });
      }
      return;
    }

    catalogGrid.innerHTML = products.map(prod => `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-img-container">
          <div class="product-badges">
            ${prod.sulfateFree ? '<span class="badge-tag badge-sulfate-free">SULFATE-FREE</span>' : ''}
          </div>
          <div class="product-actions-floating">
            <button class="btn-compare-icon ${getCompareList().includes(prod.id) ? 'active' : ''}" title="Compare Formula" onclick="toggleCompareProduct('${prod.id}', this)">
              <i class="bi bi-arrow-left-right"></i>
            </button>
          </div>
          <div class="d-flex align-items-center justify-content-center h-100 w-100">
            <img src="${prod.image}" alt="${prod.name}">
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-brand">${prod.brand}</div>
          <h3 class="product-title">${prod.name}</h3>
          <div class="product-rating">
            <i class="bi bi-star-fill star-icon"></i>
            <span class="rating-score">${prod.rating.toFixed(1)}</span>
            <span class="rating-count">(${prod.reviewCount})</span>
          </div>
          <div class="product-ingredients-snippet">${prod.ingredients}</div>
          <div class="product-card-divider"></div>
          <div class="product-card-footer">
            <span class="product-price">$${prod.price.toFixed(2)}</span>
            <button class="btn-add-cart-pill" onclick="addToCart('${prod.id}', this)" title="Add to Cart">
              <i class="bi bi-bag"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderActiveFilterChips(activeList) {
    if (!activeFiltersContainer) return;
    if (activeList.length === 0) {
      activeFiltersContainer.innerHTML = '';
      activeFiltersContainer.style.display = 'none';
      return;
    }

    activeFiltersContainer.style.display = 'flex';
    activeFiltersContainer.innerHTML = `
      <span class="small font-weight-bold text-muted me-2">ACTIVE:</span>
      ${activeList.map(item => `
        <span class="active-filter-badge">
          ${item.label}
          <i class="bi bi-x-circle-fill" onclick="${item.removeAction}"></i>
        </span>
      `).join('')}
      <button class="btn btn-link btn-sm text-decoration-none text-muted p-0 ms-2 small" onclick="window.follicleResetAllFilters()">Clear all</button>
    `;
  }

  function applyFilters() {
    let filtered = [...PRODUCTS_DATA];
    const activeChips = [];

    // Search query
    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.ingredients.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
      activeChips.push({
        label: `"${searchInput.value.trim()}"`,
        removeAction: `document.getElementById('shopSearchInput').value=''; window.follicleApplyFilters();`
      });
    }

    // Quick filter chip category
    const activeQuickChip = document.querySelector('.quick-filter-chip.active');
    const quickCat = activeQuickChip ? activeQuickChip.getAttribute('data-category') : 'all';
    if (quickCat && quickCat !== 'all') {
      if (quickCat === 'sulfate-free') {
        filtered = filtered.filter(p => p.sulfateFree);
        activeChips.push({
          label: 'Sulfate-Free',
          removeAction: `window.follicleSetQuickFilter('all');`
        });
      } else {
        filtered = filtered.filter(p => p.category.toLowerCase() === quickCat.toLowerCase());
        activeChips.push({
          label: quickCat,
          removeAction: `window.follicleSetQuickFilter('all');`
        });
      }
    }

    // Hair type checkboxes
    const checkedHairTypes = Array.from(document.querySelectorAll('.filter-hairtype:checked')).map(cb => cb.value);
    if (checkedHairTypes.length > 0) {
      filtered = filtered.filter(p => checkedHairTypes.includes(p.hairType));
      checkedHairTypes.forEach(ht => {
        activeChips.push({
          label: `${ht} Hair`,
          removeAction: `document.querySelector('.filter-hairtype[value="${ht}"]').checked=false; window.follicleApplyFilters();`
        });
      });
    }

    // Category checkboxes
    const checkedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
    if (checkedCategories.length > 0) {
      filtered = filtered.filter(p => checkedCategories.includes(p.category));
      checkedCategories.forEach(cat => {
        activeChips.push({
          label: cat,
          removeAction: `document.querySelector('.filter-category[value="${cat}"]').checked=false; window.follicleApplyFilters();`
        });
      });
    }

    // Concerns checkboxes
    const checkedConcerns = Array.from(document.querySelectorAll('.filter-concern:checked')).map(cb => cb.value);
    if (checkedConcerns.length > 0) {
      filtered = filtered.filter(p => p.concerns && checkedConcerns.some(c => p.concerns.includes(c)));
      checkedConcerns.forEach(con => {
        activeChips.push({
          label: con,
          removeAction: `document.querySelector('.filter-concern[value="${con}"]').checked=false; window.follicleApplyFilters();`
        });
      });
    }

    // Sulfate free checkbox
    if (sulfateCb && sulfateCb.checked) {
      filtered = filtered.filter(p => p.sulfateFree);
      if (quickCat !== 'sulfate-free') {
        activeChips.push({
          label: 'Sulfate-Free Only',
          removeAction: `document.getElementById('filterSulfateFree').checked=false; window.follicleApplyFilters();`
        });
      }
    }

    // Sorting
    if (sortSelect) {
      if (sortSelect.value === 'price-low') filtered.sort((a,b) => a.price - b.price);
      if (sortSelect.value === 'price-high') filtered.sort((a,b) => b.price - a.price);
      if (sortSelect.value === 'rating') filtered.sort((a,b) => b.rating - a.rating);
      if (sortSelect.value === 'name-az') filtered.sort((a,b) => a.name.localeCompare(b.name));
    }

    renderActiveFilterChips(activeChips);
    renderGrid(filtered);
  }

  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.filter-input').forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'text') input.value = '';
    });
    document.querySelectorAll('.quick-filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-category') === 'all');
    });
    if (sortSelect) sortSelect.value = 'featured';
    applyFilters();
  }

  window.follicleApplyFilters = applyFilters;
  window.follicleResetAllFilters = resetAllFilters;
  window.follicleSetQuickFilter = function(category) {
    document.querySelectorAll('.quick-filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-category') === category);
    });
    applyFilters();
  };

  // Quick filter chip clicks
  document.querySelectorAll('.quick-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-category');
      window.follicleSetQuickFilter(cat);
    });
  });

  // View switchers (3-column vs 4-column)
  const view3Btn = document.getElementById('viewCols3Btn');
  const view4Btn = document.getElementById('viewCols4Btn');
  if (view3Btn && view4Btn) {
    view3Btn.addEventListener('click', () => {
      catalogGrid.classList.remove('grid-4-cols');
      view3Btn.classList.add('active');
      view4Btn.classList.remove('active');
    });
    view4Btn.addEventListener('click', () => {
      catalogGrid.classList.add('grid-4-cols');
      view4Btn.classList.add('active');
      view3Btn.classList.remove('active');
    });
  }

  // Filter Listeners
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
    const searchClear = document.getElementById('shopSearchClear');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
      });
    }
  }

  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
  document.querySelectorAll('.filter-input').forEach(input => {
    input.addEventListener('change', applyFilters);
  });

  const sidebarReset = document.getElementById('sidebarResetBtn');
  if (sidebarReset) sidebarReset.addEventListener('click', resetAllFilters);

  // Initial render
  renderGrid(currentProducts);

  // Check URL query parameters on shop page
  if (!isHomepage) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const hairTypeParam = urlParams.get('hairType');
    const categoryParam = urlParams.get('category');

    let shouldFilter = false;
    if (searchParam && searchInput) {
      searchInput.value = searchParam;
      shouldFilter = true;
    }
    if (hairTypeParam) {
      const htCb = document.querySelector(`.filter-hairtype[value="${hairTypeParam}"]`);
      if (htCb) {
        htCb.checked = true;
        shouldFilter = true;
      }
    }
    if (categoryParam) {
      const catCb = document.querySelector(`.filter-category[value="${categoryParam}"]`);
      if (catCb) {
        catCb.checked = true;
        shouldFilter = true;
      }
    }
    if (shouldFilter) {
      applyFilters();
    }
  }
}

/* Global Add to Cart helper with snip animations */
window.addToCart = function(productId, btnEl) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadgeCount();

  // Micro-bounce navbar cart badges
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.classList.remove('bounce');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bounce');
  });

  // Micro-feedback on button
  if (btnEl) {
    const originalContent = btnEl.innerHTML;
    btnEl.innerHTML = '<i class="bi bi-check2"></i> Added';
    btnEl.classList.add('btn-added-state');
    setTimeout(() => {
      btnEl.innerHTML = originalContent;
      btnEl.classList.remove('btn-added-state');
    }, 1200);
  }

  const prod = PRODUCTS_DATA.find(p => p.id === productId) || { name: 'Item' };
  showToast(`Added "${prod.name}" to your hair care cart.`);
  openCartDrawer();
};

/* Global Toggle Compare helper with badge update */
window.toggleCompareProduct = function(productId, btnEl) {
  let compareList = getCompareList();
  const index = compareList.indexOf(productId);
  if (index > -1) {
    compareList.splice(index, 1);
    showToast('Removed formula from comparison list.');
  } else {
    if (compareList.length >= 4) {
      showToast('You can compare up to 4 formulas at a time.');
      return;
    }
    compareList.push(productId);
    showToast('Added formula to comparison list.');
  }
  saveCompareList(compareList);
  
  // Update button state on all buttons
  document.querySelectorAll(`.btn-compare-icon[onclick*="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', compareList.includes(productId));
  });
};


/* ==========================================
   6. COMPARISON PAGE (compare.html)
   ========================================== */
function initProductComparison() {
  const compareTableBody = document.getElementById('compareTableBody');
  if (!compareTableBody) return;

  function renderComparison() {
    const listIds = getCompareList();
    const products = listIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);

    if (products.length === 0) {
      const emptyHtml = `
        <div class="empty-compare-card text-center p-4 p-sm-5 bg-white rounded-4 border mx-auto" style="max-width: 500px; width: 100%;">
          <div class="empty-icon-wrap mb-3 mx-auto d-flex align-items-center justify-content-center" style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-cream); color: var(--color-forest); font-size: 1.6rem;">
            <i class="bi bi-arrow-left-right"></i>
          </div>
          <h4 class="mb-2 font-heading">No Formulas Selected</h4>
          <p class="text-muted small mb-4">Choose 2 to 4 botanical formulas from the shop to view a side-by-side ingredient and suitability analysis.</p>
          <a href="shop.html" class="btn btn-follicle-primary btn-follicle-sm w-100">
            <i class="bi bi-flower1"></i> Browse Hair Care Shop
          </a>
        </div>
      `;

      // Set for table body
      compareTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="p-0 border-0 bg-transparent">
            ${emptyHtml}
          </td>
        </tr>
      `;

      // Set for mobile card view if exists
      const mobileContainer = document.getElementById('compareMobileCards');
      if (mobileContainer) {
        mobileContainer.innerHTML = emptyHtml;
      }
      return;
    }

    const rows = [
      { label: 'Product Image', render: p => `<div class="d-flex align-items-center justify-content-center p-2"><img src="${p.image}" alt="${p.name}" style="height: 120px; max-width: 100%; object-fit: contain;"></div>` },
      { label: 'Name & Brand', render: p => `<strong>${p.name}</strong><br><small class="text-muted">${p.brand}</small>` },
      { label: 'Price', render: p => `<span class="fw-bold fs-5">$${p.price.toFixed(2)}</span>` },
      { label: 'Hair Type', render: p => `<span class="badge-tag badge-lilac">${p.hairType}</span>` },
      { label: 'Sulfate Free', render: p => p.sulfateFree ? '<span class="text-success font-weight-bold"><i class="bi bi-check-circle-fill"></i> Yes</span>' : 'No' },
      { label: 'Key Ingredients', render: p => `<span class="small">${p.ingredients}</span>` },
      { label: 'Rating', render: p => `<i class="bi bi-star-fill text-warning"></i> ${p.rating} <small class="text-muted">(${p.reviewCount})</small>` },
      { label: 'Fragrance Profile', render: p => p.fragrance || 'Not specified' },
      { label: 'Actions', render: p => `
        <button class="btn btn-follicle-primary btn-follicle-sm w-100 mb-2" onclick="addToCart('${p.id}')">Add to Cart</button>
        <button class="btn btn-outline-danger btn-follicle-sm w-100" onclick="removeCompare('${p.id}')">Remove</button>
      ` }
    ];

    // 1. Desktop Table HTML
    compareTableBody.innerHTML = rows.map(r => `
      <tr>
        <th>${r.label}</th>
        ${products.map(p => `<td>${r.render(p)}</td>`).join('')}
      </tr>
    `).join('');

    // 2. Mobile Responsive Stacked Cards (Zero horizontal scroll)
    const mobileContainer = document.getElementById('compareMobileCards');
    if (mobileContainer) {
      mobileContainer.innerHTML = products.map((p, idx) => `
        <div class="compare-mobile-card mb-4 bg-white rounded-4 border p-3 p-sm-4 shadow-sm position-relative">
          <div class="d-flex align-items-start justify-content-between gap-3 mb-3 pb-3 border-bottom">
            <div class="d-flex align-items-center gap-3">
              <div style="width: 68px; height: 68px; border-radius: 12px; background: #F8F5EF; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding: 4px;">
                <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: contain;">
              </div>
              <div>
                <span class="badge-tag badge-sage mb-1" style="font-size: 0.65rem;">Formula 0${idx + 1}</span>
                <h5 class="font-heading mb-0 fs-6">${p.name}</h5>
                <small class="text-muted">${p.brand}</small>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="Remove formula" onclick="removeCompare('${p.id}')">
              <i class="bi bi-trash fs-6"></i>
            </button>
          </div>

          <div class="compare-mobile-specs d-flex flex-column gap-2 mb-3">
            <div class="d-flex justify-content-between align-items-center py-1 border-bottom-dashed">
              <span class="text-muted small fw-medium">Price</span>
              <span class="fw-bold fs-6">$${p.price.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center py-1 border-bottom-dashed">
              <span class="text-muted small fw-medium">Hair Type</span>
              <span class="badge-tag badge-lilac">${p.hairType}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center py-1 border-bottom-dashed">
              <span class="text-muted small fw-medium">Sulfate-Free</span>
              <span>${p.sulfateFree ? '<span class="text-success fw-bold small"><i class="bi bi-check-circle-fill"></i> Verified</span>' : 'Standard'}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center py-1 border-bottom-dashed">
              <span class="text-muted small fw-medium">Rating</span>
              <span class="small fw-bold"><i class="bi bi-star-fill text-warning"></i> ${p.rating} <span class="text-muted font-normal">(${p.reviewCount})</span></span>
            </div>
            <div class="py-1 border-bottom-dashed">
              <div class="text-muted small fw-medium mb-1">Key Actives &amp; Ingredients:</div>
              <div class="small text-dark lh-sm">${p.ingredients}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center py-1">
              <span class="text-muted small fw-medium">Fragrance</span>
              <span class="small text-end">${p.fragrance || 'Botanical Pure'}</span>
            </div>
          </div>

          <button class="btn btn-follicle-primary btn-follicle-sm w-100" onclick="addToCart('${p.id}')">
            <i class="bi bi-bag"></i> Add to Cart • $${p.price.toFixed(2)}
          </button>
        </div>
      `).join('');
    }
  }

  window.removeCompare = function(id) {
    let list = getCompareList().filter(item => item !== id);
    saveCompareList(list);
    renderComparison();
  };

  const clearBtn = document.getElementById('clearCompareBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      saveCompareList([]);
      renderComparison();
    });
  }

  renderComparison();
}

/* ==========================================
   7. HAIR QUIZ SYSTEM (hair-quiz.html)
   ========================================== */
function initHairQuiz() {
  const quizForm = document.getElementById('hairQuizForm');
  if (!quizForm) return;

  let currentStep = 1;
  const totalSteps = 6;

  const quizState = {
    hairPattern: '',
    concern: '',
    scalpType: '',
    washFrequency: '',
    approach: '',
    budget: ''
  };

  function updateQuizUI() {
    document.querySelectorAll('.quiz-step').forEach(step => {
      step.style.display = 'none';
    });
    const activeStepEl = document.getElementById(`quizStep${currentStep}`);
    if (activeStepEl) activeStepEl.style.display = 'block';

    const fillPercent = (currentStep / totalSteps) * 100;
    const fillEl = document.getElementById('quizProgressFill');
    if (fillEl) fillEl.style.width = `${fillPercent}%`;

    const prevBtn = document.getElementById('quizPrevBtn');
    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
  }

  // Handle radio selection styling
  quizForm.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
      const name = e.target.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
        const card = radio.closest('.quiz-option-card');
        if (card) card.classList.remove('selected');
      });
      const card = e.target.closest('.quiz-option-card');
      if (card) card.classList.add('selected');
    }
  });

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizUI();
      } else {
        // Complete Quiz
        localStorage.setItem('follicle_quiz_results', JSON.stringify({
          completed: true,
          date: new Date().toLocaleDateString(),
          recommendation: 'Botanical Silk Routine & Rosemary Scalp Elixir'
        }));

        document.getElementById('quizFormWrapper').style.display = 'none';
        document.getElementById('quizResultsWrapper').style.display = 'block';
      }
    });
  }

  const prevBtn = document.getElementById('quizPrevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizUI();
      }
    });
  }

  updateQuizUI();
}


/* ==========================================
   9. REVIEWS PAGE (reviews.html)
   ========================================== */
function initReviewsPage() {
  const reviewsGrid = document.getElementById('reviewsGrid');
  if (!reviewsGrid) return;

  const reviews = JSON.parse(localStorage.getItem('follicle_reviews') || '[]');

  window.renderReviews = function(filterType = 'all') {
    let filtered = reviews;
    if (filterType !== 'all') {
      filtered = reviews.filter(r => {
        const typeStr = (r.hairType || '').toLowerCase();
        if (filterType === 'straight') return typeStr.includes('straight') || typeStr.includes('1');
        if (filterType === 'wavy') return typeStr.includes('wavy') || typeStr.includes('2');
        if (filterType === 'curly') return typeStr.includes('curly') || typeStr.includes('3');
        if (filterType === 'coily') return typeStr.includes('coily') || typeStr.includes('4');
        return true;
      });
    }

    if (filtered.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted mb-0">No reviews found for this hair pattern yet. Be the first to share your experience!</p>
        </div>
      `;
      return;
    }

    reviewsGrid.innerHTML = filtered.map(rev => `
      <div class="col-md-6">
        <div class="review-card h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h5 class="mb-1">${rev.name}</h5>
              <span class="badge-tag badge-lilac">${rev.hairType}</span>
            </div>
            <div class="text-warning">
              ${'<i class="bi bi-star-fill"></i>'.repeat(rev.rating)}
            </div>
          </div>
          <h6 class="font-weight-bold mb-2">"${rev.title}"</h6>
          <p class="mb-3 text-muted">${rev.text}</p>
          <div class="small text-muted mt-auto pt-2 border-top review-card-footer">
            <span class="review-date">Submitted on ${rev.date}</span>
            ${rev.verified ? '<span class="text-success review-badge"><i class="bi bi-patch-check-fill"></i> Verified Purchase</span>' : '<span class="text-muted review-badge">Community Member</span>'}
          </div>
        </div>
      </div>
    `).join('');
  };

  window.filterReviewCards = function(category) {
    document.querySelectorAll('.btn-outline-dark.rounded-pill').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
      event.target.classList.add('active');
    }
    window.renderReviews(category);
  };

  window.renderReviews('all');

  const form = document.getElementById('writeReviewForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRev = {
        id: `rev-${Date.now()}`,
        name: document.getElementById('revName').value,
        hairType: document.getElementById('revHairType').value,
        rating: parseInt(document.getElementById('revRating').value),
        title: document.getElementById('revTitle').value,
        text: document.getElementById('revText').value,
        date: new Date().toISOString().split('T')[0],
        verified: false
      };
      reviews.unshift(newRev);
      localStorage.setItem('follicle_reviews', JSON.stringify(reviews));
      showToast('Thank you! Your review has been submitted for moderation.');
      form.reset();
      initReviewsPage();
    });
  }
}


/* ==========================================
   12. CLIENT DASHBOARD
   ========================================== */
function initDashboard() {
  const userNameEl = document.getElementById('dashUserName');
  if (!userNameEl) return;

  const user = JSON.parse(localStorage.getItem('follicle_user') || '{"name":"Guest Explorer","email":"guest@follicle.com","hairType":"Not specified"}');
  userNameEl.textContent = user.name;
  document.getElementById('dashHairType').textContent = user.hairType;
  document.getElementById('dashEmail').textContent = user.email;

  const sub = JSON.parse(localStorage.getItem('follicle_active_subscription') || '{"plan":"None","status":"Inactive"}');
  const subEl = document.getElementById('dashSubStatus');
  if (subEl) subEl.textContent = `${sub.plan} (${sub.status})`;
}

/* ==========================================
   13. ADMIN DASHBOARD (admin.html)
   ========================================== */
function initAdmin() {
  const adminTable = document.getElementById('adminProductsTable');
  if (!adminTable) return;

  function renderAdminProducts() {
    adminTable.innerHTML = PRODUCTS_DATA.map(p => `
      <tr>
        <td><img src="${p.image}" style="width: 40px; height: 40px; object-fit: contain;"></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.brand}</td>
        <td>$${p.price.toFixed(2)}</td>
        <td><span class="badge bg-success">Active</span></td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('Edit modal loaded.')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="showToast('Product status updated.')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  renderAdminProducts();
}

/* ==========================================
   14. TOAST NOTIFICATION SYSTEM
   ========================================== */
function initToasts() {
  if (!document.querySelector('.follicle-toast-container')) {
    const container = document.createElement('div');
    container.className = 'follicle-toast-container';
    document.body.appendChild(container);
  }
}

window.showToast = function(message) {
  const container = document.querySelector('.follicle-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'follicle-toast';
  toast.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

/* ==========================================
   15. GLOBAL SCROLL REVEAL & STAGGER ANIMATIONS
   ========================================== */
function initScrollReveal() {
  const animTargets = document.querySelectorAll('section > .container-custom, .card-follicle, .product-card, .review-card, .ingredient-card, .feature-icon-wrapper');
  
  animTargets.forEach((el, idx) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
      const mod = idx % 4;
      if (mod === 1) el.classList.add('stagger-1');
      else if (mod === 2) el.classList.add('stagger-2');
      else if (mod === 3) el.classList.add('stagger-3');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================
   16. FLOATING BACK TO TOP (EXCEPT DASHBOARD)
   ========================================== */
function initBackToTop() {
  // Exclude dashboard page
  if (document.body.classList.contains('page-dashboard') || window.location.pathname.endsWith('dashboard.html')) {
    return;
  }

  let btn = document.getElementById('backToTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.className = 'back-to-top-btn';
    btn.title = 'Back to top';
    btn.innerHTML = '<i class="bi bi-arrow-up fs-5"></i>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
