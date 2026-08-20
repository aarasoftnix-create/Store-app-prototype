# ⚡ SoftnixStore — Storefront, Catalog, Search, PDP & Reviews Module

This repository contains the standalone, fully-functional implementation of the **Customer Storefront & Catalog Experience** module for the SoftnixStore E-Commerce application.

Designed for team collaboration and modular integration, this module covers all customer-facing discovery, browsing, searching, product details, and verified review inspection flows.

---

## 📱 Included Features & Flowchart Implementation

### 1. 🏠 Home / Storefront
- **Hero Promotional Banners**: Auto-playing banner carousel with slide indicators, category CTAs, and dynamic tags.
- **Categories Strip**: Circular animated category cards with direct catalog category routing.
- **Flash Deals with Live Ticking Timer**: Real-time countdown timer (`hh:mm:ss`) highlighting discounted items.
- **New Arrivals**: Horizontally scrollable new product releases.
- **Trending & Popular**: 2-Column grid of customer favorite items.
- **Personalized Recommendations**: Dynamic "Recommended For You" product suggestions.
- **Recently Viewed Strip**: Automatically tracks and remembers the last viewed products in `localStorage`.

### 2. 🛍️ Products / Catalog
- **Customer-Safe Catalog**: Decoupled from internal ERP costs, supplier IDs, and batch data.
- **Grid & List Views**: 2-Column Grid and 1-Column List layouts with seamless toggle.
- **Subcategories & Brand Chips**: Quick filtering by product categories and brands.
- **Faceted Filters Drawer**:
  - Interactive Maximum Price Range Slider ($50 to $2,000).
  - Brand checkboxes with multi-selection.
  - Minimum Customer Rating (4★ & above, 3★ & above, All).
  - In-Stock Only and Flash Deals Only toggle switches.
- **Sorting Options**: Sort by Featured, Price (Low to High), Price (High to Low), Customer Rating, and New Arrivals.

### 3. 🔎 Intelligent Search & Typo-Tolerance
- **Instant Search Input**: Debounced search with clear button and dedicated **`← Back`** button.
- **Autocomplete Dropdown**: Appears on typing 2+ characters with product thumbnails, brand, category, and price hints.
- **Levenshtein Distance Typo-Tolerance Algorithm**: Intelligently detects and suggests corrections for mistyped queries (e.g. typing `"wirls mous"` suggests *"Did you mean: Wireless Mouse?"*).
- **Recent Searches History**: Persists customer search queries with one-tap search and "Clear All" button.
- **Trending Search Tags**: Quick search chips for top trending terms.
- **Search Analytics Dashboard**: Real-time query counters, search CTR (89.4%), and zero-result rates.

### 4. 📦 Product Details View (PDP)
- **Interactive Photo Gallery**: Main high-resolution viewer with animated thumbnail carousel.
- **Dynamic Variant Selectors**:
  - Color picker swatches with active outline indicators.
  - Size / Storage capacity pills.
- **Stock Urgency Alert**: Visual indicators (`Only X units left in stock - order soon!`).
- **Pincode Delivery Estimator**: Postal code checker calculating delivery dates.
- **Customer Specifications Table**: Customer-safe technical specifications.
- **Similar Products Carousel**: Related items from the same category.
- **Sticky Bottom Action Bar**: Quick access to Wishlist and customer reviews.

### 5. ⭐ Reviews & Ratings
- **Customer Ratings Summary**: Overall score, star rating, and 5-star distribution breakdown bars.
- **Verified Buyer Reviews**: Reviews showing star ratings, review dates, verified buyer tags, and customer unboxing photos.
- **Helpful Upvote System**: Interactive upvote button with live counter feedback.
- **Dedicated Read-Only Product Reviews View**: Accessible by tapping product rating rows.

---

## 🛠️ Project Structure

```
ecommerce-storefront-catalog-search/
├── index.html        # Main HTML entry point & mobile device emulator
├── css/
│   └── styles.css    # Complete CSS design system, themes, and animations
├── js/
│   ├── data.js       # Seed catalog database, categories, banners & reviews
│   ├── state.js      # Reactive state manager, localStorage & typo algorithm
│   └── app.js        # Controller handling routing, search, PDP, and reviews
└── README.md         # Module documentation
```

---

## 🚀 How to Run

1. Open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox).
2. Alternatively, run a lightweight local HTTP server:
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js (npx)
   npx serve .
   ```
   and navigate to `http://localhost:8080`.

---

## 🌿 How to Push to Your Git Repository

To push your section into your team repository or branch:

```bash
# Navigate into the project folder
cd ecommerce-storefront-catalog-search

# Initialize git (if new)
git init
git add .
git commit -m "feat(storefront): implement storefront, catalog, search, pdp, and reviews module"

# Add your team repository remote and push
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```
