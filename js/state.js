class AppState {
  constructor() {
    this.STORAGE_KEY = "modern_ecommerce_app_state_v1";
    this.listeners = {};
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load stored state, using defaults:", e);
    }
    return this.getInitialState();
  }

  getInitialState() {
    return {
      isLoggedIn: true,
      user: JSON.parse(JSON.stringify(SEED_DATA.user)),
      addresses: JSON.parse(JSON.stringify(SEED_DATA.addresses)),
      cart: [
        {
          id: "cart_item_1",
          productId: "prod_phone_1",
          name: "Nebula Ultra 5G Pro",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&auto=format&fit=crop&q=80",
          price: 899,
          originalPrice: 1099,
          color: "Titanium Gray",
          size: "256 GB",
          quantity: 1,
          sku: "NEB-U5G-256",
          inStock: true
        },
        {
          id: "cart_item_2",
          productId: "prod_audio_2",
          name: "SonicPod True Wireless Earbuds",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
          price: 119,
          originalPrice: 159,
          color: "Glossy White",
          size: "Standard",
          quantity: 1,
          sku: "SON-POD-TWS",
          inStock: true
        }
      ],
      savedForLater: [],
      wishlist: ["prod_watch_1", "prod_laptop_1"],
      viewHistory: ["prod_phone_1", "prod_audio_1", "prod_watch_1"],
      appliedCoupon: null,
      orders: JSON.parse(JSON.stringify(SEED_DATA.orders)),
      returns: JSON.parse(JSON.stringify(SEED_DATA.returns)),
      reviews: JSON.parse(JSON.stringify(
        SEED_DATA.products.reduce((acc, p) => {
          if (p.reviews && p.reviews.length) {
            acc[p.id] = [...p.reviews];
          } else {
            acc[p.id] = [];
          }
          return acc;
        }, {})
      )),
      pendingReviews: [],
      notifications: JSON.parse(JSON.stringify(SEED_DATA.notifications)),
      recentSearches: ["wireless headphones", "ultra 5g pro", "running shoes", "smartwatch"],
      searchAnalytics: JSON.parse(JSON.stringify(SEED_DATA.searchAnalytics)),
      tickets: JSON.parse(JSON.stringify(SEED_DATA.tickets)),
      settings: {
        theme: "light", // light | dark
        deviceMode: "iphone", // iphone | android | responsive
        showAnalyticsBar: true
      },
      currentView: "home",
      viewParams: {}
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }

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
      this.listeners[event].forEach(cb => cb(data, this.state));
    }
    if (this.listeners["*"]) {
      this.listeners["*"].forEach(cb => cb({ event, data }, this.state));
    }
  }

  // --- Cart Management ---
  getCart() {
    return this.state.cart;
  }

  getCartCount() {
    return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  addToCart(productId, options = {}, quantity = 1) {
    const product = SEED_DATA.products.find(p => p.id === productId);
    if (!product) return false;

    const color = options.color || (product.variants?.colors?.[0]?.name || "Standard");
    const size = options.size || (product.variants?.sizes?.[0]?.name || "Standard");
    const sizeObj = product.variants?.sizes?.find(s => s.name === size);
    const priceDelta = sizeObj?.priceDelta || 0;
    const finalPrice = product.price + priceDelta;
    const finalOriginalPrice = product.originalPrice + priceDelta;

    const existingIndex = this.state.cart.findIndex(
      item => item.productId === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: "cart_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
        productId: product.id,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: finalPrice,
        originalPrice: finalOriginalPrice,
        color: color,
        size: size,
        quantity: quantity,
        sku: product.sku,
        inStock: product.inStock
      };
      this.state.cart.push(cartItem);
    }

    this.emit("cart:updated", { action: "add", productId });
    return true;
  }

  updateCartQuantity(cartItemId, delta) {
    const item = this.state.cart.find(i => i.id === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.state.cart = this.state.cart.filter(i => i.id !== cartItemId);
    }
    this.emit("cart:updated", { action: "update", cartItemId });
  }

  removeFromCart(cartItemId) {
    const item = this.state.cart.find(i => i.id === cartItemId);
    this.state.cart = this.state.cart.filter(i => i.id !== cartItemId);
    this.emit("cart:updated", { action: "remove", item });
  }

  saveForLater(cartItemId) {
    const item = this.state.cart.find(i => i.id === cartItemId);
    if (!item) return;
    this.state.cart = this.state.cart.filter(i => i.id !== cartItemId);
    this.state.savedForLater.push(item);
    this.emit("cart:updated", { action: "save_for_later", item });
  }

  moveToCartFromSaved(savedItemId) {
    const item = this.state.savedForLater.find(i => i.id === savedItemId);
    if (!item) return;
    this.state.savedForLater = this.state.savedForLater.filter(i => i.id !== savedItemId);
    this.state.cart.push(item);
    this.emit("cart:updated", { action: "move_to_cart", item });
  }

  removeSavedForLater(savedItemId) {
    this.state.savedForLater = this.state.savedForLater.filter(i => i.id !== savedItemId);
    this.emit("cart:updated", { action: "remove_saved" });
  }

  applyCoupon(code) {
    const coupon = SEED_DATA.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: "Invalid promo code. Try WELCOME10, SAVE20, or FREESHIP" };
    }

    const subtotal = this.getCartSubtotal();
    if (subtotal < coupon.minSpend) {
      return { success: false, message: `Minimum spend of $${coupon.minSpend} required for this coupon.` };
    }

    this.state.appliedCoupon = coupon;
    this.emit("coupon:applied", coupon);
    return { success: true, coupon, message: `Coupon ${coupon.code} applied successfully!` };
  }

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.emit("coupon:removed");
  }

  getCartSubtotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartTotals() {
    const subtotal = this.getCartSubtotal();
    let discount = 0;
    let deliveryFee = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
    const freeDeliveryThreshold = 50;
    const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

    if (this.state.appliedCoupon) {
      const c = this.state.appliedCoupon;
      if (c.discountType === "percentage") {
        discount = (subtotal * c.value) / 100;
      } else if (c.discountType === "fixed") {
        discount = Math.min(subtotal, c.value);
      } else if (c.discountType === "free_shipping") {
        deliveryFee = 0;
      }
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08; // 8% standard tax
    const total = Math.max(0, taxableAmount + deliveryFee + tax);

    return {
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      freeDeliveryThreshold,
      progressToFreeDelivery,
      freeDeliveryRemaining: Math.max(0, freeDeliveryThreshold - subtotal)
    };
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

  moveToCartFromWishlist(productId) {
    this.addToCart(productId);
    this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
    this.emit("wishlist:updated", { productId, added: false });
    this.emit("cart:updated", { action: "move_from_wishlist" });
  }

  addAllWishlistToCart() {
    this.state.wishlist.forEach(id => {
      this.addToCart(id);
    });
    this.state.wishlist = [];
    this.emit("wishlist:updated", { all: true });
  }

  // --- View History & Recommendations ---
  logProductView(productId) {
    this.state.viewHistory = this.state.viewHistory.filter(id => id !== productId);
    this.state.viewHistory.unshift(productId);
    if (this.state.viewHistory.length > 10) {
      this.state.viewHistory = this.state.viewHistory.slice(0, 10);
    }
    this.emit("history:viewed", productId);
  }

  getRecentlyViewed() {
    return this.state.viewHistory
      .map(id => SEED_DATA.products.find(p => p.id === id))
      .filter(Boolean);
  }

  getRecommendedProducts() {
    const viewed = this.getRecentlyViewed();
    const preferredCats = viewed.map(p => p.category);
    return SEED_DATA.products
      .filter(p => preferredCats.includes(p.category) || p.isPopular)
      .slice(0, 6);
  }

  // --- Search & Typo Tolerance ---
  addRecentSearch(term) {
    if (!term || term.trim().length < 2) return;
    const clean = term.trim();
    this.state.recentSearches = this.state.recentSearches.filter(t => t.toLowerCase() !== clean.toLowerCase());
    this.state.recentSearches.unshift(clean);
    if (this.state.recentSearches.length > 8) {
      this.state.recentSearches = this.state.recentSearches.slice(0, 8);
    }
    this.emit("search:updated");
  }

  clearRecentSearches() {
    this.state.recentSearches = [];
    this.emit("search:updated");
  }

  logSearchAnalytics(query, resultCount) {
    this.state.searchAnalytics.totalQueries += 1;
    if (resultCount === 0) {
      // track zero result
    }
    this.emit("analytics:searched", { query, resultCount });
  }

  levenshteinDistance(str1, str2) {
    const a = str1.toLowerCase();
    const b = str2.toLowerCase();
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

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
    if (!query || query.length < 3) return null;
    const clean = query.toLowerCase().trim();

    // Check exact matches
    const allKeywords = [
      ...SEED_DATA.products.map(p => p.name),
      ...SEED_DATA.products.map(p => p.brand),
      ...SEED_DATA.categories.map(c => c.name),
      "headphones", "smartphones", "smart watch", "running shoes", "earbuds", "laptop", "soundbar", "bomber jacket"
    ];

    let bestMatch = null;
    let minDistance = 999;

    for (const kw of allKeywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === clean) return null; // already exact match

      const dist = this.levenshteinDistance(clean, kwLower);
      // Distance threshold relative to length
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

    // Apply Faceted Filters
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

  // --- Orders & Checkout ---
  createOrder(orderPayload) {
    const orderNumber = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const today = new Date();
    const dateFormatted = today.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const timeFormatted = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const expectedDate = new Date();
    expectedDate.setDate(today.getDate() + 2);
    const expectedFormatted = expectedDate.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

    const newOrder = {
      id: orderNumber,
      orderNumber: orderNumber,
      date: dateFormatted,
      timestamp: timeFormatted,
      expectedDelivery: expectedFormatted,
      status: orderPayload.paymentMethod === "cod" ? "confirmed" : "confirmed",
      paymentStatus: orderPayload.paymentMethod === "cod" ? "Pay on Delivery" : "Paid Online",
      paymentMethod: orderPayload.paymentMethodLabel || "Credit Card",
      shippingAddress: orderPayload.address,
      deliveryPartner: {
        courier: "SwiftExpress Logistics",
        trackingCode: "SWIFT-" + Math.floor(10000 + Math.random() * 90000) + "-US",
        driverName: "Marcus Vance",
        driverPhone: "+1 (555) 678-1234",
        driverRating: 4.9,
        liveLocation: "Hub Dispatch Facility"
      },
      items: [...this.state.cart],
      subtotal: orderPayload.subtotal,
      discount: orderPayload.discount,
      deliveryCharge: orderPayload.deliveryFee,
      tax: orderPayload.tax,
      total: orderPayload.total,
      trackingTimeline: [
        { step: "confirmed", title: "Order Confirmed", desc: "Payment verified and inventory allocated", time: `${dateFormatted}, ${timeFormatted}`, completed: true },
        { step: "processing", title: "Processing Order", desc: "Automated routing sent to fulfillment hub", time: "Pending", completed: false },
        { step: "packed", title: "Packed at Warehouse", desc: "Quality inspected and tamper-sealed", time: "Pending", completed: false },
        { step: "shipped", title: "Shipped via Express", desc: "In transit with SwiftExpress Courier", time: "Pending", completed: false },
        { step: "out_for_delivery", title: "Out for Delivery", desc: "Courier driver en route", time: "Pending", completed: false },
        { step: "delivered", title: "Delivered", desc: "Package handed over with digital confirmation", time: `Expected by ${expectedFormatted}`, completed: false }
      ],
      canCancel: true,
      canReturn: false
    };

    this.state.orders.unshift(newOrder);
    // Clear cart and applied coupon
    this.state.cart = [];
    this.state.appliedCoupon = null;

    // Add confirmation notification
    this.addNotification({
      category: "orders",
      title: "Order Confirmed 🎉",
      message: `Your order #${orderNumber} for $${orderPayload.total.toFixed(2)} has been placed successfully.`,
      deepLink: "view_tracking",
      targetId: orderNumber
    });

    this.emit("order:created", newOrder);
    this.emit("cart:updated", { action: "cleared" });
    return newOrder;
  }

  cancelOrder(orderId, reason = "Changed mind") {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found" };

    if (["shipped", "out_for_delivery", "delivered"].includes(order.status)) {
      return { success: false, message: "Order has already shipped. You can request a return after delivery." };
    }

    order.status = "cancelled";
    order.cancelReason = reason;
    order.canCancel = false;
    order.trackingTimeline.push({
      step: "cancelled",
      title: "Order Cancelled",
      desc: `Cancellation requested: ${reason}. Refund initiated.`,
      time: "Just now",
      completed: true
    });

    this.addNotification({
      category: "orders",
      title: "Order Cancelled 🛑",
      message: `Order #${order.orderNumber} was cancelled. Refund of $${order.total.toFixed(2)} has been initiated.`,
      deepLink: "view_order_details",
      targetId: order.id
    });

    this.emit("order:updated", order);
    return { success: true, message: "Order successfully cancelled. Refund initiated." };
  }

  advanceOrderTracking(orderId) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order || order.status === "cancelled") return null;

    const stages = ["confirmed", "processing", "packed", "shipped", "out_for_delivery", "delivered"];
    const currentIndex = stages.indexOf(order.status);

    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      order.status = nextStage;

      // Update timeline
      const nowStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      order.trackingTimeline.forEach((t, i) => {
        if (i <= currentIndex + 1) {
          t.completed = true;
          if (t.time === "Pending") t.time = `Today, ${nowStr}`;
        }
      });

      if (nextStage === "delivered") {
        order.canReturn = true;
        order.canCancel = false;
      }

      this.addNotification({
        category: "shipping",
        title: `Package ${nextStage.replace(/_/g, " ").toUpperCase()} 📦`,
        message: `Status update for #${order.orderNumber}: Now ${nextStage.replace(/_/g, " ")}.`,
        deepLink: "view_tracking",
        targetId: order.id
      });

      this.emit("order:updated", order);
      return order;
    }
    return order;
  }

  // --- Address Book ---
  getAddresses() {
    return this.state.addresses;
  }

  getDefaultAddress() {
    return this.state.addresses.find(a => a.isDefault) || this.state.addresses[0];
  }

  addAddress(addressData) {
    const id = "addr_" + Date.now();
    const isFirst = this.state.addresses.length === 0;
    const newAddr = {
      id,
      ...addressData,
      isDefault: addressData.isDefault || isFirst
    };
    if (newAddr.isDefault) {
      this.state.addresses.forEach(a => (a.isDefault = false));
    }
    this.state.addresses.push(newAddr);
    this.emit("address:updated");
    return newAddr;
  }

  updateAddress(addressId, data) {
    const index = this.state.addresses.findIndex(a => a.id === addressId);
    if (index === -1) return false;

    if (data.isDefault) {
      this.state.addresses.forEach(a => (a.isDefault = false));
    }
    this.state.addresses[index] = { ...this.state.addresses[index], ...data };
    this.emit("address:updated");
    return true;
  }

  deleteAddress(addressId) {
    this.state.addresses = this.state.addresses.filter(a => a.id !== addressId);
    if (this.state.addresses.length > 0 && !this.state.addresses.some(a => a.isDefault)) {
      this.state.addresses[0].isDefault = true;
    }
    this.emit("address:updated");
  }

  setDefaultAddress(addressId) {
    this.state.addresses.forEach(a => {
      a.isDefault = a.id === addressId;
    });
    this.emit("address:updated");
  }

  // --- Returns & Refunds ---
  requestReturn(orderId, productId, reason, photoUrl = null, refundMethod = "Original Payment") {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found" };

    const item = order.items.find(i => i.productId === productId);
    if (!item) return { success: false, message: "Item not in order" };

    const retId = "RET-" + Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const refundAmount = (item.price * item.quantity) * 1.08;

    const returnObj = {
      id: retId,
      orderId: order.id,
      productId: item.productId,
      productName: item.name,
      image: item.image,
      reason: reason,
      photoUrl: photoUrl,
      status: "approved", // automated approval simulation
      refundAmount: refundAmount,
      refundMethod: refundMethod,
      requestDate: dateFormatted,
      erpStatus: `Sales Return SR-${Math.floor(5000 + Math.random() * 4000)} Generated`,
      timeline: [
        { title: "Return Requested", desc: `Reason: ${reason}`, date: "Today, Just now", done: true },
        { title: "Return Approved", desc: "Automated verification policy accepted", date: "Today, Just now", done: true },
        { title: "Pickup Scheduled", desc: "Doorstep courier pickup booked for tomorrow", date: "Tomorrow, 10 AM - 2 PM", done: false },
        { title: "Item Received at Hub", desc: "Warehouse quality inspection", date: "Pending", done: false },
        { title: "Refund Credited", desc: `Amount $${refundAmount.toFixed(2)} to ${refundMethod}`, date: "Pending", done: false }
      ]
    };

    this.state.returns.unshift(returnObj);
    order.canReturn = false;

    this.addNotification({
      category: "returns",
      title: "Return Request Approved 🔄",
      message: `Return #${retId} for ${item.name} is approved. Pickup scheduled for tomorrow.`,
      deepLink: "view_returns",
      targetId: retId
    });

    this.emit("returns:updated", returnObj);
    return { success: true, returnObj, message: "Return request submitted and approved!" };
  }

  // --- Reviews & Ratings ---
  getProductReviews(productId) {
    return this.state.reviews[productId] || [];
  }

  addReview(productId, rating, title, comment, photos = []) {
    const reviewId = "rev_" + Date.now();
    const dateFormatted = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

    const newRev = {
      id: reviewId,
      productId: productId,
      user: this.state.user.name,
      rating: Number(rating),
      date: dateFormatted,
      verified: true,
      title: title,
      comment: comment,
      photos: photos,
      helpful: 0,
      status: "approved" // automatically published
    };

    if (!this.state.reviews[productId]) {
      this.state.reviews[productId] = [];
    }
    this.state.reviews[productId].unshift(newRev);

    // Update product overall rating
    const product = SEED_DATA.products.find(p => p.id === productId);
    if (product) {
      const allRev = this.state.reviews[productId];
      const sum = allRev.reduce((acc, r) => acc + r.rating, 0);
      product.rating = Number((sum / allRev.length).toFixed(1));
      product.reviewCount = allRev.length;
    }

    this.emit("reviews:updated", { productId, newRev });
    return newRev;
  }

  voteReviewHelpful(productId, reviewId) {
    const revs = this.state.reviews[productId] || [];
    const rev = revs.find(r => r.id === reviewId);
    if (rev) {
      rev.helpful = (rev.helpful || 0) + 1;
      this.emit("reviews:updated", { productId });
    }
  }

  deleteReview(productId, reviewId) {
    if (!this.state.reviews[productId]) return;
    this.state.reviews[productId] = this.state.reviews[productId].filter(r => r.id !== reviewId);
    this.emit("reviews:updated", { productId });
  }

  // --- Notifications ---
  getNotifications() {
    return this.state.notifications;
  }

  getUnreadNotificationCount() {
    return this.state.notifications.filter(n => !n.read).length;
  }

  markNotificationRead(notifId) {
    const notif = this.state.notifications.find(n => n.id === notifId);
    if (notif) {
      notif.read = true;
      this.emit("notifications:updated");
    }
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => (n.read = true));
    this.emit("notifications:updated");
  }

  deleteNotification(notifId) {
    this.state.notifications = this.state.notifications.filter(n => n.id !== notifId);
    this.emit("notifications:updated");
  }

  addNotification(notifData) {
    const newNotif = {
      id: "notif_" + Date.now(),
      time: "Just now",
      read: false,
      ...notifData
    };
    this.state.notifications.unshift(newNotif);
    this.emit("notifications:updated", newNotif);
  }

  // --- Customer Support ---
  createSupportTicket(category, subject, orderId = null, initialMessage = "") {
    const ticketId = "TCK-" + Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const timeFormatted = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newTicket = {
      id: ticketId,
      subject,
      category,
      orderId,
      status: "In Progress",
      date: dateFormatted,
      messages: [
        { sender: "user", text: initialMessage, time: `${dateFormatted}, ${timeFormatted}` },
        { sender: "agent", text: "Thank you for reaching out! A dedicated customer care representative is reviewing your inquiry.", time: `${dateFormatted}, ${timeFormatted}` }
      ]
    };

    this.state.tickets.unshift(newTicket);
    this.emit("tickets:updated", newTicket);
    return newTicket;
  }

  sendChatMessage(ticketId, message) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const timeFormatted = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    ticket.messages.push({
      sender: "user",
      text: message,
      time: `Today, ${timeFormatted}`
    });

    // Auto agent reply simulation
    setTimeout(() => {
      let replyText = "We are checking our live ERP order records for you. Is there anything else you'd like to ask?";
      const lower = message.toLowerCase();
      if (lower.includes("where") || lower.includes("track") || lower.includes("status")) {
        replyText = "Your package is currently in transit with SwiftExpress courier! You can also view real-time location in Order Tracking.";
      } else if (lower.includes("refund") || lower.includes("return")) {
        replyText = "Refunds are processed within 48 hours of item receipt at our fulfillment center.";
      } else if (lower.includes("cancel")) {
        replyText = "Early-stage orders can be cancelled instantly via the Cancel button in My Orders.";
      }

      ticket.messages.push({
        sender: "agent",
        text: replyText,
        time: `Today, ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
      });
      this.emit("tickets:updated", ticket);
    }, 800);

    this.emit("tickets:updated", ticket);
  }

  // --- Account & Profile ---
  updateProfile(profileData) {
    this.state.user = { ...this.state.user, ...profileData };
    this.emit("user:updated", this.state.user);
  }

  updatePreferences(preferences) {
    this.state.user.preferences = { ...this.state.user.preferences, ...preferences };
    this.emit("user:updated", this.state.user);
  }

  toggle2FA() {
    this.state.user.twoFactorEnabled = !this.state.user.twoFactorEnabled;
    this.emit("user:updated", this.state.user);
    return this.state.user.twoFactorEnabled;
  }

  // --- Reset to Demo ---
  resetDemoData() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.state = this.getInitialState();
    this.emit("state:reset");
  }
}

// Global state singleton
const appState = new AppState();