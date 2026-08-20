/**
 * Main Controller for Storefront, Catalog, Search, PDP, and Reviews & Ratings
 * Team Module: Customer Storefront & Catalog Experience
 */

class StorefrontApp {
  constructor() {
    this.currentView = "home";
    this.viewHistory = ["home"];
    this.catalogFilters = {
      category: "all",
      brands: [],
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      inStockOnly: false,
      isDealOnly: false
    };
    this.catalogSort = "featured";
    this.catalogViewMode = "grid"; // 'grid' or 'list'
    this.activeBannerIndex = 0;
    this.bannerInterval = null;
    this.currentPDPProduct = null;
    this.selectedPDPVariant = { color: null, size: null };

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupEventListeners();
    this.startBannerCarousel();
    this.startDealCountdown();
    this.navigate("home");
  }

  // --- Theme Management ---
  setupTheme() {
    const savedTheme = localStorage.getItem("storefront_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("storefront_theme", next);
    this.showToast(`Switched to ${next.toUpperCase()} mode`);
  }

  // --- Device Frame Switcher ---
  setDeviceMode(mode) {
    const container = document.getElementById("deviceContainer");
    if (!container) return;
    container.classList.remove("mode-iphone", "mode-android", "mode-responsive");
    container.classList.add(`mode-${mode}`);

    document.querySelectorAll(".emulator-toolbar .tool-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-mode-${mode}`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  // --- Navigation & Routing ---
  navigate(viewName, params = {}) {
    if (this.currentView !== viewName) {
      this.viewHistory.push(viewName);
    }
    this.currentView = viewName;

    // Hide all view containers
    document.querySelectorAll(".view-container").forEach(el => {
      el.classList.remove("active");
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add("active");
      const appContent = document.getElementById("appMainContent");
      if (appContent) appContent.scrollTop = 0;
    }

    // Update bottom nav highlights
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-view") === viewName);
    });

    // Render corresponding view
    switch (viewName) {
      case "home":
        this.renderHome();
        break;
      case "catalog":
        if (params.category) this.catalogFilters.category = params.category;
        this.renderCatalog();
        break;
      case "search":
        this.renderSearch(params.query);
        break;
      case "pdp":
        this.renderPDP(params.productId);
        break;
      case "reviews":
        this.renderReviews(params.productId);
        break;
    }
  }

  goBack() {
    if (this.viewHistory.length > 1) {
      this.viewHistory.pop(); // Remove current
      const prev = this.viewHistory[this.viewHistory.length - 1];
      this.navigate(prev);
    } else {
      this.navigate("home");
    }
  }

  // --- Event Listeners ---
  setupEventListeners() {
    appState.subscribe("wishlist:updated", () => {
      this.updateWishlistBadges();
      if (this.currentView === "catalog") this.renderCatalog();
      if (this.currentView === "home") this.renderHome();
    });

    appState.subscribe("reviews:updated", (data) => {
      if (this.currentView === "reviews") this.renderReviews(data.productId);
    });

    appState.subscribe("state:reset", () => {
      this.showToast("Demo Data Reset ✓");
      this.navigate("home");
    });
  }

  updateWishlistBadges() {
    const count = appState.getWishlist().length;
    const badge = document.getElementById("wishlistHeaderBadge");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
  }

  // --- Toast Notification ---
  showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastSlideDown 0.3s ease forwards";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- Modal Overlay ---
  openModal(contentHtml) {
    const overlay = document.getElementById("appModalOverlay");
    if (!overlay) return;
    overlay.innerHTML = contentHtml;
    overlay.classList.add("active");
  }

  closeModal() {
    const overlay = document.getElementById("appModalOverlay");
    if (overlay) {
      overlay.classList.remove("active");
      overlay.innerHTML = "";
    }
  }

  // =========================================================================
  // MODULE 1: HOME / STOREFRONT
  // =========================================================================
  renderHome() {
    const container = document.getElementById("view-home");
    if (!container) return;

    const categories = SEED_DATA.categories;
    const banners = SEED_DATA.banners;
    const featuredProducts = SEED_DATA.products.filter(p => p.isFeatured);
    const newArrivals = SEED_DATA.products.filter(p => p.isNew);
    const flashDeals = SEED_DATA.products.filter(p => p.isDeal);
    const popularProducts = SEED_DATA.products.filter(p => p.isPopular);
    const recentlyViewed = appState.getRecentlyViewedProducts();

    container.innerHTML = `
      <!-- Quick Search Bar Banner -->
      <div class="home-search-trigger" onclick="app.navigate('search')">
        <span class="search-icon">🔍</span>
        <span class="placeholder-text">Search wireless mouse, headphones, laptops...</span>
        <span class="search-kbd-hint">Scan</span>
      </div>

      <!-- Hero Banner Carousel -->
      <div class="banner-carousel-wrapper">
        <div class="banner-track" id="homeBannerTrack">
          ${banners.map((b, idx) => `
            <div class="banner-slide ${idx === this.activeBannerIndex ? "active" : ""}" style="background-image: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url('${b.image}');">
              <span class="banner-tag">${b.tag}</span>
              <h2 class="banner-title">${b.title}</h2>
              <p class="banner-sub">${b.subtitle}</p>
              <button class="banner-cta-btn" onclick="app.navigate('${b.targetView}', { category: '${b.targetCategory}' })">
                ${b.ctaText} →
              </button>
            </div>
          `).join("")}
        </div>
        <div class="banner-dots">
          ${banners.map((_, idx) => `
            <span class="banner-dot ${idx === this.activeBannerIndex ? "active" : ""}" onclick="app.setActiveBanner(${idx})"></span>
          `).join("")}
        </div>
      </div>

      <!-- Categories Circular Strip -->
      <div class="section-container">
        <div class="section-header">
          <h3 class="section-title">Shop by Category</h3>
          <button class="section-link-btn" onclick="app.navigate('catalog', { category: 'all' })">View All →</button>
        </div>
        <div class="categories-scroll-strip">
          ${categories.map(c => `
            <div class="category-circle-card" onclick="app.navigate('catalog', { category: '${c.id}' })">
              <div class="category-icon-bubble">${c.icon}</div>
              <span class="category-name">${c.name}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Flash Deals Section with Live Countdown -->
      <div class="section-container flash-deal-section">
        <div class="section-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:18px;">⚡</span>
            <h3 class="section-title" style="color:var(--danger);">Flash Deals</h3>
          </div>
          <div class="deal-countdown-box" id="dealCountdownBadge">
            <span class="countdown-label">Ends in:</span>
            <span class="countdown-digits" id="dealCountdownTimer">04:22:15</span>
          </div>
        </div>
        <div class="products-horizontal-strip">
          ${flashDeals.map(p => this.renderProductCardHtml(p, "horizontal")).join("")}
        </div>
      </div>

      <!-- New Arrivals Strip -->
      <div class="section-container">
        <div class="section-header">
          <h3 class="section-title">🔥 New Arrivals</h3>
          <button class="section-link-btn" onclick="app.navigate('catalog')">See More</button>
        </div>
        <div class="products-horizontal-strip">
          ${newArrivals.map(p => this.renderProductCardHtml(p, "horizontal")).join("")}
        </div>
      </div>

      <!-- Trending & Popular Products (2-Column Grid) -->
      <div class="section-container">
        <div class="section-header">
          <h3 class="section-title">⭐ Trending & Popular</h3>
          <span style="font-size:11px; color:var(--text-muted);">Top customer favorites</span>
        </div>
        <div class="products-grid-2col">
          ${popularProducts.map(p => this.renderProductCardHtml(p, "grid")).join("")}
        </div>
      </div>

      <!-- Personalized "Recommended For You" -->
      <div class="section-container">
        <div class="section-header">
          <h3 class="section-title">✨ Recommended For You</h3>
          <span style="font-size:11px; color:var(--primary); font-weight:700;">Personalized</span>
        </div>
        <div class="products-grid-2col">
          ${featuredProducts.map(p => this.renderProductCardHtml(p, "grid")).join("")}
        </div>
      </div>

      <!-- Recently Viewed Section -->
      ${recentlyViewed.length > 0 ? `
        <div class="section-container" style="margin-bottom:24px;">
          <div class="section-header">
            <h3 class="section-title">🕒 Recently Viewed</h3>
            <span style="font-size:11px; color:var(--text-muted);">${recentlyViewed.length} items</span>
          </div>
          <div class="products-horizontal-strip">
            ${recentlyViewed.map(p => this.renderProductCardHtml(p, "horizontal")).join("")}
          </div>
        </div>
      ` : ""}
    `;
  }

  startBannerCarousel() {
    if (this.bannerInterval) clearInterval(this.bannerInterval);
    this.bannerInterval = setInterval(() => {
      if (this.currentView === "home") {
        this.activeBannerIndex = (this.activeBannerIndex + 1) % SEED_DATA.banners.length;
        this.updateBannerSlide();
      }
    }, 4500);
  }

  setActiveBanner(idx) {
    this.activeBannerIndex = idx;
    this.updateBannerSlide();
  }

  updateBannerSlide() {
    const slides = document.querySelectorAll(".banner-slide");
    const dots = document.querySelectorAll(".banner-dot");
    slides.forEach((s, idx) => s.classList.toggle("active", idx === this.activeBannerIndex));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === this.activeBannerIndex));
  }

  startDealCountdown() {
    let secondsLeft = 4 * 3600 + 22 * 60 + 15;
    setInterval(() => {
      if (secondsLeft > 0) secondsLeft--;
      const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
      const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
      const secs = String(secondsLeft % 60).padStart(2, "0");
      const el = document.getElementById("dealCountdownTimer");
      if (el) el.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  // =========================================================================
  // MODULE 2: CATALOG & FACETED FILTERS
  // =========================================================================
  renderCatalog() {
    const container = document.getElementById("view-catalog");
    if (!container) return;

    const filtered = appState.searchProducts("", this.catalogFilters, this.catalogSort);
    const categories = SEED_DATA.categories;

    container.innerHTML = `
      <!-- Catalog Top Header Bar -->
      <div class="catalog-header-bar">
        <h2 style="font-size:16px; font-weight:800;">Catalog (${filtered.length})</h2>
        <div style="display:flex; gap:6px;">
          <!-- Filter Drawer Trigger Button -->
          <button class="tool-btn ${this.hasActiveFilters() ? "active" : ""}" onclick="app.openFilterDrawer()">
            ⚙️ Filters ${this.getActiveFilterCountBadge()}
          </button>
          <!-- Grid / List Switcher -->
          <button class="tool-btn" onclick="app.toggleCatalogViewMode()">
            ${this.catalogViewMode === "grid" ? "☰ List" : "⊞ Grid"}
          </button>
        </div>
      </div>

      <!-- Horizontal Category Pills -->
      <div class="catalog-category-pills">
        <button class="filter-pill ${this.catalogFilters.category === "all" ? "active" : ""}" onclick="app.setCatalogCategory('all')">
          All Products
        </button>
        ${categories.map(c => `
          <button class="filter-pill ${this.catalogFilters.category === c.id ? "active" : ""}" onclick="app.setCatalogCategory('${c.id}')">
            ${c.icon} ${c.name}
          </button>
        `).join("")}
      </div>

      <!-- Sorting Bar -->
      <div class="catalog-sorting-bar">
        <span style="font-size:12px; color:var(--text-muted);">Sort by:</span>
        <select class="sort-select" onchange="app.setCatalogSort(this.value)">
          <option value="featured" ${this.catalogSort === "featured" ? "selected" : ""}>Featured</option>
          <option value="price_asc" ${this.catalogSort === "price_asc" ? "selected" : ""}>Price: Low to High</option>
          <option value="price_desc" ${this.catalogSort === "price_desc" ? "selected" : ""}>Price: High to Low</option>
          <option value="rating" ${this.catalogSort === "rating" ? "selected" : ""}>Customer Rating</option>
          <option value="newest" ${this.catalogSort === "newest" ? "selected" : ""}>New Arrivals</option>
        </select>
      </div>

      <!-- Products Listing Grid / List -->
      ${filtered.length > 0 ? `
        <div class="${this.catalogViewMode === "grid" ? "products-grid-2col" : "products-list-1col"}" style="padding: 12px 16px;">
          ${filtered.map(p => this.renderProductCardHtml(p, this.catalogViewMode)).join("")}
        </div>
      ` : `
        <div class="empty-state-box">
          <div style="font-size:40px;">🛍️</div>
          <h4 style="font-size:16px; font-weight:800; margin-top:8px;">No Products Found</h4>
          <p style="font-size:12px; color:var(--text-muted); margin:4px 0 16px 0;">Try adjusting your filters or price range</p>
          <button class="tool-btn active" onclick="app.resetCatalogFilters()">Reset All Filters</button>
        </div>
      `}
    `;
  }

  setCatalogCategory(catId) {
    this.catalogFilters.category = catId;
    this.renderCatalog();
  }

  setCatalogSort(sortVal) {
    this.catalogSort = sortVal;
    this.renderCatalog();
  }

  toggleCatalogViewMode() {
    this.catalogViewMode = this.catalogViewMode === "grid" ? "list" : "grid";
    this.renderCatalog();
  }

  hasActiveFilters() {
    return (
      this.catalogFilters.category !== "all" ||
      this.catalogFilters.brands.length > 0 ||
      this.catalogFilters.maxPrice < 2000 ||
      this.catalogFilters.minRating > 0 ||
      this.catalogFilters.inStockOnly ||
      this.catalogFilters.isDealOnly
    );
  }

  getActiveFilterCountBadge() {
    let count = 0;
    if (this.catalogFilters.category !== "all") count++;
    if (this.catalogFilters.brands.length > 0) count += this.catalogFilters.brands.length;
    if (this.catalogFilters.maxPrice < 2000) count++;
    if (this.catalogFilters.minRating > 0) count++;
    if (this.catalogFilters.inStockOnly) count++;
    if (this.catalogFilters.isDealOnly) count++;
    return count > 0 ? `<span class="filter-count-badge">${count}</span>` : "";
  }

  resetCatalogFilters() {
    this.catalogFilters = {
      category: "all",
      brands: [],
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      inStockOnly: false,
      isDealOnly: false
    };
    this.renderCatalog();
    this.closeModal();
    this.showToast("Filters reset");
  }

  openFilterDrawer() {
    const brands = Array.from(new Set(SEED_DATA.products.map(p => p.brand)));

    const modalContent = `
      <div class="bottom-sheet">
        <div class="sheet-header">
          <h3>Faceted Filters</h3>
          <button onclick="app.closeModal()">✕</button>
        </div>
        
        <div class="sheet-body">
          <!-- Price Range Filter -->
          <div class="filter-group">
            <label class="filter-group-title">
              <span>Max Price</span>
              <strong id="priceDisplayVal">$${this.catalogFilters.maxPrice}</strong>
            </label>
            <input type="range" class="range-slider" min="50" max="2000" step="25" value="${this.catalogFilters.maxPrice}" 
              oninput="document.getElementById('priceDisplayVal').textContent = '$' + this.value; app.catalogFilters.maxPrice = Number(this.value);" />
          </div>

          <!-- Brand Checkboxes -->
          <div class="filter-group">
            <label class="filter-group-title">Brands</label>
            <div class="brand-checkboxes-grid">
              ${brands.map(b => `
                <label class="checkbox-label">
                  <input type="checkbox" value="${b}" ${this.catalogFilters.brands.includes(b) ? "checked" : ""} onchange="app.toggleBrandFilter('${b}')" />
                  <span>${b}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Minimum Rating Filter -->
          <div class="filter-group">
            <label class="filter-group-title">Customer Rating</label>
            <div style="display:flex; gap:6px;">
              <button class="tool-btn ${this.catalogFilters.minRating === 4 ? "active" : ""}" onclick="app.catalogFilters.minRating = 4; app.renderCatalog(); app.closeModal();">4★ & above</button>
              <button class="tool-btn ${this.catalogFilters.minRating === 3 ? "active" : ""}" onclick="app.catalogFilters.minRating = 3; app.renderCatalog(); app.closeModal();">3★ & above</button>
              <button class="tool-btn ${this.catalogFilters.minRating === 0 ? "active" : ""}" onclick="app.catalogFilters.minRating = 0; app.renderCatalog(); app.closeModal();">All</button>
            </div>
          </div>

          <!-- Availability & Deals Toggles -->
          <div class="filter-group">
            <label class="filter-group-title">Availability & Offers</label>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <label class="checkbox-label">
                <input type="checkbox" ${this.catalogFilters.inStockOnly ? "checked" : ""} onchange="app.catalogFilters.inStockOnly = this.checked;" />
                <span>In-Stock Items Only</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" ${this.catalogFilters.isDealOnly ? "checked" : ""} onchange="app.catalogFilters.isDealOnly = this.checked;" />
                <span>Flash Deals Only</span>
              </label>
            </div>
          </div>
        </div>

        <div class="sheet-footer">
          <button class="tool-btn" style="flex:1;" onclick="app.resetCatalogFilters()">Reset</button>
          <button class="apply-filter-btn" style="flex:2;" onclick="app.renderCatalog(); app.closeModal();">Apply Filters</button>
        </div>
      </div>
    `;
    this.openModal(modalContent);
  }

  toggleBrandFilter(brand) {
    if (this.catalogFilters.brands.includes(brand)) {
      this.catalogFilters.brands = this.catalogFilters.brands.filter(b => b !== brand);
    } else {
      this.catalogFilters.brands.push(brand);
    }
  }

  // =========================================================================
  // MODULE 3: INTELLIGENT SEARCH & TYPO-TOLERANCE
  // =========================================================================
  renderSearch(initialQuery = "") {
    const container = document.getElementById("view-search");
    if (!container) return;

    const recent = appState.state.recentSearches;
    const popular = appState.state.searchAnalytics.popularTerms;
    const analytics = appState.state.searchAnalytics;

    container.innerHTML = `
      <!-- Search Header with Dedicated Back Button -->
      <div class="search-header-bar">
        <button onclick="app.goBack()" class="search-back-btn" title="Go Back">
          ←
        </button>
        <div class="search-input-wrap">
          <span class="search-input-icon">🔍</span>
          <input type="text" id="mainSearchInput" class="search-input-field" placeholder="Search wireless mouse, headphones..." value="${initialQuery}" autofocus oninput="app.handleSearchInput(this.value)" onkeydown="if(event.key === 'Enter') app.performSearch(this.value)" />
          <button class="search-clear-btn" onclick="document.getElementById('mainSearchInput').value = ''; app.handleSearchInput('')">✕</button>
        </div>
        <button onclick="app.goBack()" style="font-size:13px; font-weight:700; color:var(--primary); cursor:pointer;">Cancel</button>
      </div>

      <!-- Autocomplete Dropdown & Typo Suggestion Box -->
      <div id="typoSuggestionArea"></div>
      <div id="autocompleteResultsArea"></div>

      <!-- Search Results Area -->
      <div id="searchResultsArea">
        <!-- Recent Searches -->
        ${recent.length > 0 ? `
          <div class="search-section-box">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; font-weight:700;">🕒 Recent Searches</span>
              <button onclick="app.clearRecentSearches()" style="font-size:11px; color:var(--text-muted); cursor:pointer;">Clear All</button>
            </div>
            <div class="search-chips-wrap">
              ${recent.map(r => `
                <div class="search-tag-chip" onclick="app.performSearch('${r}')">
                  <span>${r}</span>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Trending Popular Searches -->
        <div class="search-section-box">
          <span style="font-size:13px; font-weight:700;">🔥 Trending Searches</span>
          <div class="search-chips-wrap">
            ${popular.map(p => `
              <div class="search-tag-chip" onclick="app.performSearch('${p}')">
                <span>🔥 ${p}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Search Analytics Simulator Card -->
        <div class="search-analytics-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--text-main);">📊 Search Engine Analytics Log</strong>
            <span style="font-size:10px; background:var(--primary-light); color:var(--primary); padding:2px 6px; border-radius:4px; font-weight:700;">Live Search</span>
          </div>
          <div class="analytics-grid">
            <div class="analytics-stat-box">
              <div class="analytics-stat-value">${analytics.totalQueries}</div>
              <div style="color:var(--text-muted);">Total Searches</div>
            </div>
            <div class="analytics-stat-box">
              <div class="analytics-stat-value">${analytics.searchCTR}%</div>
              <div style="color:var(--text-muted);">Search CTR</div>
            </div>
            <div class="analytics-stat-box">
              <div class="analytics-stat-value">${analytics.zeroResultsRate}%</div>
              <div style="color:var(--text-muted);">Zero-Result Rate</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (initialQuery) {
      this.performSearch(initialQuery);
    }
  }

  handleSearchInput(val) {
    const q = val.trim();
    const typoArea = document.getElementById("typoSuggestionArea");
    const autoArea = document.getElementById("autocompleteResultsArea");

    if (q.length < 2) {
      if (typoArea) typoArea.innerHTML = "";
      if (autoArea) autoArea.innerHTML = "";
      return;
    }

    // Autocomplete Dropdown
    const matches = SEED_DATA.products.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);

    // Typo Tolerance Check
    const typoCorrection = appState.findTypoCorrection(q);

    if (typoArea) {
      if (typoCorrection && matches.length === 0) {
        typoArea.innerHTML = `
          <div class="typo-suggestion-banner" onclick="app.performSearch('${typoCorrection}')">
            <span>Did you mean: <strong>${typoCorrection}</strong>?</span>
            <span style="font-size:10px; background:var(--primary); color:#fff; padding:2px 6px; border-radius:4px;">Typo Tolerant</span>
          </div>
        `;
      } else {
        typoArea.innerHTML = "";
      }
    }

    if (autoArea) {
      if (matches.length > 0) {
        autoArea.innerHTML = `
          <div class="autocomplete-dropdown">
            ${matches.map(m => `
              <div class="autocomplete-item" onclick="app.navigate('pdp', { productId: '${m.id}' })">
                <img src="${m.images[0]}" class="autocomplete-thumb" alt="${m.name}" />
                <div style="flex:1;">
                  <div class="autocomplete-title">${m.name}</div>
                  <div class="autocomplete-meta">${m.brand} • ${m.categoryName} • $${m.price}</div>
                </div>
                <span style="font-size:12px; color:var(--text-muted);">→</span>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        autoArea.innerHTML = "";
      }
    }
  }

  performSearch(query) {
    const clean = query.trim();
    if (!clean) return;

    appState.addRecentSearch(clean);
    const input = document.getElementById("mainSearchInput");
    if (input) input.value = clean;

    const typoArea = document.getElementById("typoSuggestionArea");
    const autoArea = document.getElementById("autocompleteResultsArea");
    if (typoArea) typoArea.innerHTML = "";
    if (autoArea) autoArea.innerHTML = "";

    const resultsArea = document.getElementById("searchResultsArea");
    if (!resultsArea) return;

    const results = appState.searchProducts(clean);

    resultsArea.innerHTML = `
      <div style="padding: 12px 16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:13px; font-weight:700;">Results for "${clean}" (${results.length})</span>
          <button onclick="app.renderSearch('')" style="font-size:11px; color:var(--primary); font-weight:700; cursor:pointer;">Reset Search</button>
        </div>

        ${results.length > 0 ? `
          <div class="products-grid-2col">
            ${results.map(p => this.renderProductCardHtml(p, "grid")).join("")}
          </div>
        ` : `
          <div class="empty-state-box">
            <div style="font-size:40px;">🔍</div>
            <h4 style="font-size:16px; font-weight:800; margin-top:8px;">No matching items</h4>
            <p style="font-size:12px; color:var(--text-muted); margin:4px 0 16px 0;">Try searching for "headphones", "smartphones", or "shoes"</p>
          </div>
        `}
      </div>
    `;
  }

  clearRecentSearches() {
    appState.clearRecentSearches();
    this.renderSearch("");
    this.showToast("Search history cleared");
  }

  // =========================================================================
  // MODULE 4: PRODUCT DETAILS VIEW (PDP)
  // =========================================================================
  renderPDP(productId) {
    const container = document.getElementById("view-pdp");
    if (!container) return;

    const product = SEED_DATA.products.find(p => p.id === productId) || SEED_DATA.products[0];
    this.currentPDPProduct = product;
    appState.recordRecentlyViewed(product.id);

    const isInWish = appState.isInWishlist(product.id);
    const reviews = appState.getProductReviews(product.id);
    const similar = SEED_DATA.products.filter(p => p.category === product.category && p.id !== product.id);

    this.selectedPDPVariant = {
      color: product.variants.colors[0]?.name || null,
      size: product.variants.sizes[0] || null
    };

    container.innerHTML = `
      <!-- PDP Top Navigation Bar -->
      <div class="pdp-top-bar">
        <button class="pdp-nav-btn" onclick="app.goBack()">←</button>
        <span class="pdp-nav-title">${product.name}</span>
        <button class="pdp-nav-btn" onclick="app.toggleWishlistPDP('${product.id}')">
          <span style="color:${isInWish ? "#ef4444" : "var(--text-main)"}; font-size:18px;">${isInWish ? "♥" : "♡"}</span>
        </button>
      </div>

      <!-- Main Photo Gallery & Thumbnail Carousel -->
      <div class="pdp-gallery-wrap">
        <img src="${product.images[0]}" id="mainPDPImage" class="pdp-main-image" alt="${product.name}" />
        <div class="pdp-thumbnails-strip">
          ${product.images.map((img, idx) => `
            <img src="${img}" class="pdp-thumb ${idx === 0 ? "active" : ""}" onclick="app.switchPDPImage('${img}', this)" alt="Thumbnail ${idx+1}" />
          `).join("")}
        </div>
      </div>

      <!-- Product Information Body -->
      <div class="pdp-body">
        <div class="pdp-brand-tag">${product.brand}</div>
        <h1 class="pdp-title">${product.name}</h1>

        <!-- Rating Row (Clickable to read reviews) -->
        <div class="pdp-rating-row" onclick="app.navigate('reviews', { productId: '${product.id}' })" style="cursor:pointer;" title="Read verified reviews">
          <span class="rating-stars">★★★★★</span>
          <span class="rating-number">${product.rating}</span>
          <span class="review-count">(${reviews.length} Verified Reviews)</span>
          <span style="margin-left:auto; font-size:11px; color:var(--primary); font-weight:700;">Read All →</span>
        </div>

        <!-- Pricing Row -->
        <div class="pdp-price-row">
          <span class="pdp-current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="pdp-original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
          ${product.discountPercent ? `<span class="pdp-discount-badge">${product.discountPercent}% OFF</span>` : ""}
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:14px;">Includes all customer taxes • Free shipping on orders over $50</div>

        <!-- Stock Urgency Alert -->
        <div class="pdp-stock-status">
          <span class="stock-pill ${product.stockQuantity <= 10 ? "stock-urgent" : "stock-available"}">
            ${product.stockQuantity <= 10 ? `⚠️ Only ${product.stockQuantity} units left in stock - order soon!` : `✓ In Stock (${product.stockQuantity} available)`}
          </span>
        </div>

        <!-- Color Variant Selector -->
        ${product.variants.colors.length > 0 ? `
          <div class="pdp-variant-section">
            <div class="variant-label">
              <span>Color:</span>
              <strong id="selectedColorName">${this.selectedPDPVariant.color}</strong>
            </div>
            <div class="color-swatches-wrap">
              ${product.variants.colors.map((c, idx) => `
                <button class="color-swatch-btn ${idx === 0 ? "active" : ""}" style="background-color: ${c.hex};" 
                  title="${c.name}" onclick="app.selectPDPColor('${c.name}', this)"></button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Size / Storage Variant Selector -->
        ${product.variants.sizes.length > 1 ? `
          <div class="pdp-variant-section">
            <div class="variant-label">
              <span>Size / Storage:</span>
              <strong id="selectedSizeName">${this.selectedPDPVariant.size}</strong>
            </div>
            <div class="size-pills-wrap">
              ${product.variants.sizes.map((s, idx) => `
                <button class="size-pill-btn ${idx === 0 ? "active" : ""}" onclick="app.selectPDPSize('${s}', this)">${s}</button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Pincode Delivery Estimator -->
        <div class="pdp-delivery-box">
          <div style="font-size:12px; font-weight:700; margin-bottom:4px;">🚚 Delivery Options</div>
          <div style="display:flex; gap:6px;">
            <input type="text" id="pdpZipInput" placeholder="Enter Zip/Pincode (e.g. 90210)" class="zip-input" value="97201" />
            <button class="tool-btn active" onclick="app.checkPincodeDelivery()">Check</button>
          </div>
          <div id="pdpDeliveryEstimateText" style="font-size:11px; color:var(--success); font-weight:600; margin-top:6px;">
            ✓ Standard Delivery by Friday, Aug 22 • Express available
          </div>
        </div>

        <!-- Description -->
        <div class="pdp-description-section">
          <h4 style="font-size:13px; font-weight:800; margin-bottom:6px;">Product Overview</h4>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">${product.description}</p>
        </div>

        <!-- Customer-Safe Specifications Table -->
        <div class="pdp-specs-section">
          <h4 style="font-size:13px; font-weight:800; margin-bottom:8px;">Customer Specifications</h4>
          <div class="specs-table">
            <div class="spec-row">
              <span class="spec-label">Customer SKU</span>
              <span class="spec-value">${product.sku}</span>
            </div>
            ${Object.entries(product.specifications).map(([key, val]) => `
              <div class="spec-row">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${val}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Similar Related Products Carousel -->
        ${similar.length > 0 ? `
          <div class="pdp-similar-section">
            <h4 style="font-size:13px; font-weight:800; margin-bottom:8px;">Similar Products</h4>
            <div class="products-horizontal-strip">
              ${similar.map(p => this.renderProductCardHtml(p, "horizontal")).join("")}
            </div>
          </div>
        ` : ""}
      </div>

      <!-- Sticky Bottom Action Bar -->
      <div class="pdp-sticky-bottom-bar">
        <button class="pdp-action-icon-btn" onclick="app.toggleWishlistPDP('${product.id}')" title="Add to Wishlist">
          <span style="color:${isInWish ? "#ef4444" : "var(--text-main)"}; font-size:18px;">${isInWish ? "♥" : "♡"}</span>
        </button>
        <button class="pdp-action-icon-btn" onclick="app.navigate('reviews', { productId: '${product.id}' })" title="Customer Reviews">
          ⭐
        </button>
        <button class="pdp-cta-primary-btn" onclick="app.showToast('Item saved to your favorites! ❤️');">
          Save Item
        </button>
      </div>
    `;
  }

  switchPDPImage(imgUrl, thumbEl) {
    const main = document.getElementById("mainPDPImage");
    if (main) main.src = imgUrl;
    document.querySelectorAll(".pdp-thumb").forEach(t => t.classList.remove("active"));
    if (thumbEl) thumbEl.classList.add("active");
  }

  selectPDPColor(colorName, btnEl) {
    this.selectedPDPVariant.color = colorName;
    const label = document.getElementById("selectedColorName");
    if (label) label.textContent = colorName;
    document.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
  }

  selectPDPSize(sizeName, btnEl) {
    this.selectedPDPVariant.size = sizeName;
    const label = document.getElementById("selectedSizeName");
    if (label) label.textContent = sizeName;
    document.querySelectorAll(".size-pill-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
  }

  checkPincodeDelivery() {
    const zip = document.getElementById("pdpZipInput")?.value || "97201";
    const text = document.getElementById("pdpDeliveryEstimateText");
    if (text) {
      text.textContent = `✓ Delivery available to ${zip} in 2-3 business days! Free shipping verified.`;
      this.showToast(`Delivery confirmed for ${zip}`);
    }
  }

  toggleWishlistPDP(productId) {
    const added = appState.toggleWishlist(productId);
    this.showToast(added ? "Added to Wishlist ❤️" : "Removed from Wishlist");
    this.renderPDP(productId);
  }

  // =========================================================================
  // MODULE 5: REVIEWS & RATINGS (Customer Reviews & Breakdown)
  // =========================================================================
  renderReviews(productId) {
    const container = document.getElementById("view-reviews");
    if (!container) return;

    const product = SEED_DATA.products.find(p => p.id === productId) || SEED_DATA.products[0];
    const reviews = appState.getProductReviews(product.id);

    container.innerHTML = `
      <div class="reviews-header-bar">
        <button onclick="app.navigate('pdp', { productId: '${product.id}' })" class="reviews-back-btn">← Back to Product</button>
        <span class="reviews-badge">🔒 Verified Purchases Only</span>
      </div>

      <div class="reviews-content-body">
        <!-- Product Summary Header -->
        <div class="reviews-product-summary-card">
          <img src="${product.images[0]}" class="reviews-prod-thumb" alt="${product.name}" />
          <div>
            <div style="font-size:14px; font-weight:800;">${product.name}</div>
            <div style="font-size:11px; color:var(--text-muted);">${product.brand} • ${product.categoryName}</div>
          </div>
        </div>

        <!-- Rating Score & Distribution Box -->
        <div class="reviews-score-card">
          <div class="rating-big-box">
            <div class="rating-big-number">${product.rating}</div>
            <div style="color:#f59e0b; font-size:16px; margin:4px 0;">★★★★★</div>
            <div style="font-size:11px; color:var(--text-muted);">${reviews.length} customer ratings</div>
          </div>
          <div class="rating-progress-breakdown">
            <div class="progress-row"><span>5★</span><div class="progress-track"><div class="progress-fill" style="width:85%;"></div></div><span>85%</span></div>
            <div class="progress-row"><span>4★</span><div class="progress-track"><div class="progress-fill" style="width:12%;"></div></div><span>12%</span></div>
            <div class="progress-row"><span>3★</span><div class="progress-track"><div class="progress-fill" style="width:3%;"></div></div><span>3%</span></div>
            <div class="progress-row"><span>2★</span><div class="progress-track"><div class="progress-fill" style="width:0%;"></div></div><span>0%</span></div>
            <div class="progress-row"><span>1★</span><div class="progress-track"><div class="progress-fill" style="width:0%;"></div></div><span>0%</span></div>
          </div>
        </div>

        <!-- Verified Reviews Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin:16px 0 10px 0;">
          <h3 style="font-size:14px; font-weight:800;">Customer Reviews (${reviews.length})</h3>
          <span style="font-size:11px; color:var(--text-muted);">Sorted by Most Helpful</span>
        </div>

        <!-- Reviews List -->
        ${reviews.length > 0 ? reviews.map(rev => `
          <div class="review-item-card">
            <div class="review-item-header">
              <div>
                <strong>${rev.user}</strong>
                ${rev.verified ? `<span class="verified-buyer-tag">✓ Verified Buyer (Delivered)</span>` : ""}
              </div>
              <span style="font-size:11px; color:var(--text-subtle);">${rev.date}</span>
            </div>
            <div style="color:#f59e0b; font-size:12px; margin-bottom:4px;">
              ${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}
            </div>
            <h5 style="font-size:13px; font-weight:700; margin-bottom:4px;">${rev.title}</h5>
            <p style="font-size:12px; color:var(--text-muted); line-height:1.4;">${rev.comment}</p>
            
            ${rev.photos && rev.photos.length > 0 ? `
              <div class="review-photo-preview-grid">
                ${rev.photos.map(p => `<img src="${p}" class="review-photo-thumb" alt="Product Review Photo" onclick="window.open('${p}', '_blank')" />`).join("")}
              </div>
            ` : ""}

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:11px;">
              <button onclick="app.voteReviewHelpful('${product.id}', '${rev.id}')" style="color:var(--text-muted); cursor:pointer;">
                👍 Helpful (${rev.helpful || 0})
              </button>
            </div>
          </div>
        `).join("") : `
          <div class="empty-state-box">
            <div style="font-size:36px;">⭐</div>
            <p style="font-size:12px; color:var(--text-muted); margin-top:6px;">No reviews yet for this item</p>
          </div>
        `}
      </div>
    `;
  }

  voteReviewHelpful(productId, reviewId) {
    appState.voteReviewHelpful(productId, reviewId);
    this.showToast("Thank you for your feedback! 👍");
  }

  // =========================================================================
  // HELPER: Reusable Product Card HTML Template
  // =========================================================================
  renderProductCardHtml(product, mode = "grid") {
    const isInWish = appState.isInWishlist(product.id);

    return `
      <div class="product-card ${mode === "horizontal" ? "product-card-horizontal" : mode === "list" ? "product-card-list" : "product-card-grid"}" 
        onclick="app.navigate('pdp', { productId: '${product.id}' })">
        
        <div class="product-card-img-wrap">
          <img src="${product.images[0]}" class="product-img" alt="${product.name}" loading="lazy" />
          
          <!-- Badges -->
          ${product.isDeal ? `<span class="product-badge badge-deal">-${product.discountPercent}%</span>` : ""}
          ${product.isNew && !product.isDeal ? `<span class="product-badge badge-new">NEW</span>` : ""}
          
          <!-- Heart Button -->
          <button class="wishlist-heart-btn ${isInWish ? "active" : ""}" 
            onclick="event.stopPropagation(); app.toggleProductWishlist('${product.id}')" title="Add to Wishlist">
            ${isInWish ? "♥" : "♡"}
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-brand">${product.brand}</div>
          <h4 class="product-title">${product.name}</h4>
          
          <div class="product-rating-row">
            <span class="rating-star">★</span>
            <span>${product.rating}</span>
            <span style="font-size:10px; color:var(--text-subtle);">(${product.reviewCount})</span>
          </div>

          <div class="product-price-row">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  toggleProductWishlist(productId) {
    const added = appState.toggleWishlist(productId);
    this.showToast(added ? "Saved to Favorites ❤️" : "Removed from Favorites");
  }
}

// Global Application Controller Instance
const app = new StorefrontApp();
