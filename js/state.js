/**
 * Central State Management Engine for Storefront, Catalog, Search, PDP, and Reviews
 * Handles localStorage persistence, event emitter, Levenshtein typo tolerance, and analytics.
 */

class StorefrontState {
  constructor() {
    this.STORAGE_KEY = "storefront_catalog_search_state_v1";
    this.listeners = {};
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required properties exist
        return {
          wishlist: parsed.wishlist || [],
          recentlyViewed: parsed.recentlyViewed || [],
          recentSearches: parsed.recentSearches || ["headphones", "smartphones", "running shoes"],
          reviews: parsed.reviews || JSON.parse(JSON.stringify(SEED_DATA.reviews)),
          searchAnalytics: parsed.searchAnalytics || JSON.parse(JSON.stringify(SEED_DATA.searchAnalytics))
        };
      }
    } catch (e) {
      console.warn("Could not load state from localStorage, using seed data", e);
    }

    return {
      wishlist: ["prod-1", "prod-2"],
      recentlyViewed: ["prod-1", "prod-3"],
      recentSearches: ["headphones", "smartphones", "running shoes"],
      reviews: JSON.parse(JSON.stringify(SEED_DATA.reviews)),
      searchAnalytics: JSON.parse(JSON.stringify(SEED_DATA.searchAnalytics))
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  resetDemoData() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.state = this.loadInitialState();
    this.saveState();
    this.emit("state:reset");
  }

  // --- Pub/Sub Event Emitter ---
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    this.saveState();
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in event listener for ${event}:`, e);
        }
      });
    }
  }

  // --- Wishlist Management ---
  getWishlist() {
    return this.state.wishlist;
  }

  isInWishlist(productId) {
    return this.state.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    const exists = this.isInWishlist(productId);
    if (exists) {
      this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
    } else {
      this.state.wishlist.push(productId);
    }
    this.emit("wishlist:updated", { productId, added: !exists });
    return !exists;
  }

  // --- Recently Viewed Products ---
  recordRecentlyViewed(productId) {
    if (!productId) return;
    this.state.recentlyViewed = this.state.recentlyViewed.filter(id => id !== productId);
    this.state.recentlyViewed.unshift(productId);
    if (this.state.recentlyViewed.length > 10) {
      this.state.recentlyViewed = this.state.recentlyViewed.slice(0, 10);
    }
    this.emit("recently_viewed:updated");
  }

  getRecentlyViewedProducts() {
    return this.state.recentlyViewed
      .map(id => SEED_DATA.products.find(p => p.id === id))
      .filter(Boolean);
  }

  // --- Search History & Analytics ---
  addRecentSearch(term) {
    if (!term || typeof term !== "string") return;
    const clean = term.trim();
    if (clean.length < 2) return;

    this.state.recentSearches = this.state.recentSearches.filter(t => t.toLowerCase() !== clean.toLowerCase());
    this.state.recentSearches.unshift(clean);
    if (this.state.recentSearches.length > 8) {
      this.state.recentSearches = this.state.recentSearches.slice(0, 8);
    }
    this.state.searchAnalytics.totalQueries += 1;
    this.emit("search:updated");
  }

  clearRecentSearches() {
    this.state.recentSearches = [];
    this.emit("search:updated");
  }

  // --- Levenshtein Distance Typo-Tolerance Algorithm ---
  levenshteinDistance(str1, str2) {
    const a = str1.toLowerCase();
    const b = str2.toLowerCase();
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  findTypoCorrection(query) {
    if (!query || query.trim().length < 3) return null;
    const clean = query.trim().toLowerCase();

    const allKeywords = [
      ...SEED_DATA.products.map(p => p.name),
      ...SEED_DATA.products.map(p => p.brand),
      ...SEED_DATA.categories.map(c => c.name),
      "headphones", "smartphones", "smart watch", "running shoes", "earbuds", "laptop", "soundbar", "wireless mouse"
    ];

    let bestMatch = null;
    let minDistance = 999;

    for (const kw of allKeywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === clean) return null; // already exact match

      const dist = this.levenshteinDistance(clean, kwLower);
      if (dist <= 3 && dist < minDistance && dist > 0) {
        minDistance = dist;
        bestMatch = kw;
      }
    }

    return bestMatch;
  }

  searchProducts(query, filters = {}, sortBy = "featured") {
    let results = [...SEED_DATA.products];
    const q = (query || "").toLowerCase().trim();

    if (q.length > 0) {
      results = results.filter(p => {
        const titleMatch = p.name.toLowerCase().includes(q);
        const brandMatch = p.brand.toLowerCase().includes(q);
        const catMatch = p.categoryName.toLowerCase().includes(q);
        const subCatMatch = (p.subCategory || "").toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        return titleMatch || brandMatch || catMatch || subCatMatch || descMatch;
      });

      // If direct match returned 0, try fuzzy typo match
      if (results.length === 0 && q.length >= 3) {
        results = SEED_DATA.products.filter(p => {
          const distTitle = this.levenshteinDistance(q, p.name.slice(0, q.length + 3));
          const distBrand = this.levenshteinDistance(q, p.brand);
          return distTitle <= 2 || distBrand <= 2;
        });
      }
    }

    // Faceted Filters
    if (filters.category && filters.category !== "all") {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.brands && filters.brands.length > 0) {
      results = results.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.minRating) {
      results = results.filter(p => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      results = results.filter(p => p.inStock);
    }
    if (filters.isDealOnly) {
      results = results.filter(p => p.isDeal);
    }

    // Sort
    if (sortBy === "price_asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // featured default
      results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return results;
  }

  // --- Reviews & Ratings ---
  getProductReviews(productId) {
    return this.state.reviews[productId] || [];
  }

  voteReviewHelpful(productId, reviewId) {
    const revs = this.state.reviews[productId] || [];
    const rev = revs.find(r => r.id === reviewId);
    if (rev) {
      rev.helpful = (rev.helpful || 0) + 1;
      this.emit("reviews:updated", { productId });
    }
  }
}

// Global Singleton State Instance
const appState = new StorefrontState();
