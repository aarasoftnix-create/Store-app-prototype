/**
 * Seed Database for Storefront, Catalog, Search, PDP, and Reviews & Ratings
 * Team Module: Customer Storefront & Catalog Experience
 */

const SEED_DATA = {
  categories: [
    { id: "cat-electronics", name: "Electronics", icon: "📱", banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" },
    { id: "cat-audio", name: "Audio & Sound", icon: "🎧", banner: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80" },
    { id: "cat-wearables", name: "Wearables", icon: "⌚", banner: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
    { id: "cat-fashion", name: "Fashion & Style", icon: "👕", banner: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" },
    { id: "cat-footwear", name: "Footwear", icon: "👟", banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" },
    { id: "cat-smart-home", name: "Smart Home", icon: "🏠", banner: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80" }
  ],

  banners: [
    {
      id: "b1",
      title: "MEGA SUMMER SALE",
      subtitle: "Up to 50% Off Top Tech & Gear",
      ctaText: "Shop Catalog",
      targetView: "catalog",
      targetCategory: "all",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
      tag: "Limited Offer"
    },
    {
      id: "b2",
      title: "NEXT-GEN AUDIO",
      subtitle: "Immersive Studio Noise Cancellation",
      ctaText: "Explore Audio",
      targetView: "catalog",
      targetCategory: "cat-audio",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80",
      tag: "New Release"
    },
    {
      id: "b3",
      title: "SMART WEARABLES",
      subtitle: "Health & Fitness Bio-Tracking",
      ctaText: "View Watches",
      targetView: "catalog",
      targetCategory: "cat-wearables",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&auto=format&fit=crop&q=80",
      tag: "Trending"
    }
  ],

  products: [
    {
      id: "prod-1",
      name: "Nebula Ultra 5G Smartphone",
      brand: "Nebula",
      category: "cat-electronics",
      categoryName: "Electronics",
      subCategory: "Smartphones",
      sku: "NEB-U5G-256",
      price: 899.99,
      originalPrice: 1099.99,
      discountPercent: 18,
      rating: 4.8,
      reviewCount: 48,
      inStock: true,
      stockQuantity: 14,
      isFeatured: true,
      isDeal: true,
      isNew: true,
      isPopular: true,
      description: "Flagship 5G smartphone featuring a 6.8-inch AMOLED 120Hz ProMotion display, quad 200MP camera matrix, AI computational photography engine, and 5000mAh all-day battery.",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Cosmic Titanium", hex: "#4b5563" },
          { name: "Deep Obsidian", hex: "#111827" },
          { name: "Aurora Blue", hex: "#2563eb" }
        ],
        sizes: ["128 GB", "256 GB", "512 GB"]
      },
      specifications: {
        "Processor": "Octa-Core 3.4GHz Neural Chip",
        "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz",
        "Camera": "200MP Main + 50MP Periscope + 12MP Ultra-Wide",
        "Battery": "5000 mAh with 65W Fast Charging",
        "Operating System": "SoftnixOS 15 (Android 15 Based)",
        "Water Resistance": "IP68 Certified Water & Dust Resistant"
      }
    },
    {
      id: "prod-2",
      name: "SonicSoftnix Studio Wireless Headphones",
      brand: "SonicSoftnix",
      category: "cat-audio",
      categoryName: "Audio & Sound",
      subCategory: "Over-Ear Headphones",
      sku: "SA-PRO-ANC",
      price: 279.99,
      originalPrice: 349.99,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 92,
      inStock: true,
      stockQuantity: 8,
      isFeatured: true,
      isDeal: true,
      isNew: false,
      isPopular: true,
      description: "Audiophile-grade studio wireless headphones with hybrid active noise cancellation, custom 45mm titanium drivers, lossless spatial audio, and 40 hours of playback.",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Matte Black", hex: "#1f2937" },
          { name: "Silver Frost", hex: "#d1d5db" },
          { name: "Rose Champagne", hex: "#fbcfe8" }
        ],
        sizes: ["Standard"]
      },
      specifications: {
        "Driver Unit": "45mm Custom Titanium Drivers",
        "Noise Cancellation": "Hybrid Active Noise Cancellation (40dB)",
        "Battery Life": "Up to 40 hours with ANC on",
        "Bluetooth": "Bluetooth 5.3 with Multipoint Connect",
        "Weight": "250g Ultra-light memory foam",
        "Microphone": "4-mic beamforming array with ENC"
      }
    },
    {
      id: "prod-3",
      name: "PulseTech Apex Smart Fitness Watch",
      brand: "PulseTech",
      category: "cat-wearables",
      categoryName: "Wearables",
      subCategory: "Smartwatches",
      sku: "PT-APX-45",
      price: 199.99,
      originalPrice: 249.99,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 35,
      inStock: true,
      stockQuantity: 22,
      isFeatured: true,
      isDeal: false,
      isNew: true,
      isPopular: true,
      description: "Precision health and fitness tracker with sapphire crystal AMOLED touch display, ECG monitoring, blood oxygen sensor, dual-frequency GPS, and 50m water resistance.",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Graphite Black", hex: "#18181b" },
          { name: "Starlight Silver", hex: "#e2e8f0" },
          { name: "Midnight Green", hex: "#064e3b" }
        ],
        sizes: ["41mm", "45mm"]
      },
      specifications: {
        "Case Material": "Aerospace Aluminum & Sapphire Glass",
        "Sensors": "ECG, SpO2, Heart Rate, Skin Temp, Dual GPS",
        "Water Resistance": "5 ATM (50 meters)",
        "Battery Life": "7 Days Typical Usage",
        "Compatibility": "iOS & Android Compatible"
      }
    },
    {
      id: "prod-4",
      name: "AeroTech Pro 16 Ultrabook Laptop",
      brand: "AeroTech",
      category: "cat-electronics",
      categoryName: "Electronics",
      subCategory: "Laptops",
      sku: "AT-PR16-M3",
      price: 1499.99,
      originalPrice: 1699.99,
      discountPercent: 12,
      rating: 4.9,
      reviewCount: 64,
      inStock: true,
      stockQuantity: 6,
      isFeatured: true,
      isDeal: false,
      isNew: true,
      isPopular: false,
      description: "Ultra-sleek lightweight 16-inch creator laptop powered by next-gen 12-core silicon, 3.2K mini-LED 120Hz Liquid Retina display, 32GB unified RAM, and 1TB NVMe SSD.",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Space Gray", hex: "#374151" },
          { name: "Silver Metal", hex: "#cbd5e1" }
        ],
        sizes: ["16GB / 512GB", "32GB / 1TB"]
      },
      specifications: {
        "Processor": "12-Core High Performance Silicon",
        "Memory": "32GB High-Speed Unified RAM",
        "Storage": "1TB PCIe Gen4 NVMe SSD",
        "Display": "16.2-inch Mini-LED 3.2K, 1000 nits, 120Hz",
        "Weight": "1.62 kg"
      }
    },
    {
      id: "prod-5",
      name: "AeroSport Carbon Pro Running Shoes",
      brand: "AeroSport",
      category: "cat-footwear",
      categoryName: "Footwear",
      subCategory: "Athletic Shoes",
      sku: "AS-CRB-RUN",
      price: 159.99,
      originalPrice: 199.99,
      discountPercent: 20,
      rating: 4.6,
      reviewCount: 29,
      inStock: true,
      stockQuantity: 18,
      isFeatured: false,
      isDeal: true,
      isNew: false,
      isPopular: true,
      description: "Marathon-ready performance running shoes featuring a full-length carbon fiber propulsion plate, supercritical nitrogen-infused responsive foam, and breathable engineered mesh.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Crimson Red", hex: "#dc2626" },
          { name: "Volt Neon", hex: "#84cc16" },
          { name: "Stealth Black", hex: "#18181b" }
        ],
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
      },
      specifications: {
        "Plate": "Full-Length 3K Carbon Fiber Plate",
        "Midsole": "Supercritical Nitrogen Bio-Foam",
        "Drop": "8 mm Heel-to-Toe",
        "Weight": "195 grams (US 9)",
        "Outsole": "High-Abrasion Wet-Grip Rubber"
      }
    },
    {
      id: "prod-6",
      name: "UrbanTailor Waterproof Tech Bomber Jacket",
      brand: "UrbanTailor",
      category: "cat-fashion",
      categoryName: "Fashion & Style",
      subCategory: "Outerwear",
      sku: "UT-BMB-JKT",
      price: 129.99,
      originalPrice: 179.99,
      discountPercent: 28,
      rating: 4.7,
      reviewCount: 42,
      inStock: true,
      stockQuantity: 12,
      isFeatured: false,
      isDeal: true,
      isNew: true,
      isPopular: false,
      description: "Modern all-weather streetwear bomber jacket built with 3-layer waterproof breathable membrane, thermal insulation liner, taped waterproof seams, and magnetic closure utility pockets.",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Onyx Black", hex: "#09090b" },
          { name: "Olive Military", hex: "#3f6212" },
          { name: "Slate Khaki", hex: "#78716c" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
      },
      specifications: {
        "Material": "3-Layer GORE-Flex Technical Membrane",
        "Waterproof Rating": "20,000 mm Water Column",
        "Breathability": "15,000 g/m2/24h",
        "Pockets": "6 Magnetic & YKK Aquaguard Pockets",
        "Care": "Machine wash cold gentle"
      }
    },
    {
      id: "prod-7",
      name: "SoftnixHome Spatial 360 Smart Soundbar",
      brand: "SoftnixHome",
      category: "cat-smart-home",
      categoryName: "Smart Home",
      subCategory: "Home Audio",
      sku: "AH-SND-360",
      price: 349.99,
      originalPrice: 429.99,
      discountPercent: 19,
      rating: 4.8,
      reviewCount: 51,
      inStock: true,
      stockQuantity: 9,
      isFeatured: false,
      isDeal: false,
      isNew: true,
      isPopular: true,
      description: "Cinema-quality Dolby Atmos spatial audio soundbar with wireless subwoofer, room acoustic auto-calibration, WiFi multi-room streaming, and voice assistant integration.",
      images: [
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Midnight Charcoal", hex: "#1e293b" },
          { name: "Arctic White", hex: "#f8fafc" }
        ],
        sizes: ["Standard 38-inch"]
      },
      specifications: {
        "Audio Channels": "5.1.2 Dolby Atmos Spatial Audio",
        "Total Power": "420W Peak Output",
        "Connectivity": "HDMI eARC, Optical, Bluetooth 5.3, WiFi 6",
        "Voice Assistant": "Alexa, Google Assistant, AirPlay 2 Support"
      }
    },
    {
      id: "prod-8",
      name: "Nebula AeroPods Pro Wireless Earbuds",
      brand: "Nebula",
      category: "cat-audio",
      categoryName: "Audio & Sound",
      subCategory: "Earbuds",
      sku: "NEB-EAR-PRO",
      price: 149.99,
      originalPrice: 189.99,
      discountPercent: 21,
      rating: 4.7,
      reviewCount: 38,
      inStock: true,
      stockQuantity: 25,
      isFeatured: true,
      isDeal: true,
      isNew: false,
      isPopular: true,
      description: "True wireless earbuds with adaptive transparency mode, deep active noise cancellation, custom spatial audio with dynamic head tracking, and Qi wireless charging case.",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
      ],
      variants: {
        colors: [
          { name: "Gloss White", hex: "#ffffff" },
          { name: "Phantom Black", hex: "#0f172a" }
        ],
        sizes: ["Standard"]
      },
      specifications: {
        "Battery Life": "8 Hours (32 Hours with Case)",
        "Water Resistance": "IPX4 Sweat & Water Resistant",
        "Charging": "USB-C & Qi Wireless Fast Charging"
      }
    }
  ],

  reviews: {
    "prod-1": [
      {
        id: "rev-101",
        productId: "prod-1",
        user: "Michael Chen",
        rating: 5,
        date: "Aug 14, 2026",
        verified: true,
        title: "Unbelievable camera and battery!",
        comment: "The optical zoom is stunning and battery lasts a full 1.5 days easily. Premium build quality and display is ultra smooth.",
        photos: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&auto=format&fit=crop&q=80"
        ],
        helpful: 42
      },
      {
        id: "rev-102",
        productId: "prod-1",
        user: "Sarah Jenkins",
        rating: 5,
        date: "Aug 11, 2026",
        verified: true,
        title: "Best phone of the year",
        comment: "Lightning fast processing, pristine screen and super clean OS. Titanium edges feel great in the hand.",
        photos: [],
        helpful: 19
      },
      {
        id: "rev-103",
        productId: "prod-1",
        user: "David Rodriguez",
        rating: 4,
        date: "Aug 02, 2026",
        verified: true,
        title: "Great performance, slightly hefty",
        comment: "Flawless screen and speakers. It is a bit heavy, but the battery capacity completely justifies the weight.",
        photos: [],
        helpful: 8
      }
    ],
    "prod-2": [
      {
        id: "rev-201",
        productId: "prod-2",
        user: "Emma Watson",
        rating: 5,
        date: "Aug 16, 2026",
        verified: true,
        title: "Studio grade ANC is pure magic",
        comment: "I use these for 8 hours daily while coding in noisy cafes. The noise cancellation completely blocks out conversations.",
        photos: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
        ],
        helpful: 31
      },
      {
        id: "rev-202",
        productId: "prod-2",
        user: "Liam O'Connor",
        rating: 5,
        date: "Aug 08, 2026",
        verified: true,
        title: "Bass response is punchy and detailed",
        comment: "Exceptional soundstage. Trebles are crisp and the ear cushions are cloud-soft.",
        photos: [],
        helpful: 14
      }
    ],
    "prod-3": [
      {
        id: "rev-301",
        productId: "prod-3",
        user: "Marcus Vance",
        rating: 5,
        date: "Aug 15, 2026",
        verified: true,
        title: "Accurate GPS & Heart Rate tracking",
        comment: "Tracked my 10k run with pinpoint satellite accuracy. Battery easily lasted the full week.",
        photos: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
        ],
        helpful: 25
      }
    ]
  },

  searchAnalytics: {
    totalQueries: 1420,
    searchCTR: 89.4,
    zeroResultsRate: 1.2,
    popularTerms: ["wireless mouse", "smartphones", "headphones", "smart watch", "running shoes", "jacket", "soundbar", "laptop"]
  }
};
