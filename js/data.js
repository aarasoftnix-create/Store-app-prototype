const SEED_DATA = {
  user: {
    id: "usr_78901",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    tier: "Gold VIP Member",
    loyaltyPoints: 480,
    twoFactorEnabled: false,
    preferences: {
      notifications: {
        orderUpdates: true,
        promotions: true,
        newsletter: false,
        paymentAlerts: true
      },
      communication: {
        channels: {
          email: true,
          sms: true,
          push: true
        },
        frequency: "instant" // instant | daily | weekly
      }
    },
    loginHistory: [
      { id: "log_1", device: "iPhone 15 Pro (Safari)", location: "New York, USA", time: "Today at 09:20 AM", ip: "192.168.1.45", current: true },
      { id: "log_2", device: "MacBook Pro (Chrome)", location: "New York, USA", time: "Yesterday at 04:15 PM", ip: "192.168.1.12", current: false },
      { id: "log_3", device: "iPad Air (App)", location: "Boston, USA", time: "Aug 15, 2026", ip: "72.229.28.18", current: false }
    ]
  },

  addresses: [
    {
      id: "addr_1",
      label: "Home",
      tag: "home",
      fullName: "Alex Morgan",
      phone: "+1 (555) 234-5678",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Springfield",
      state: "OR",
      zip: "97477",
      country: "United States",
      isDefault: true
    },
    {
      id: "addr_2",
      label: "Work",
      tag: "work",
      fullName: "Alex Morgan (Design Studio)",
      phone: "+1 (555) 987-6543",
      street: "100 Innovation Way, Suite 300",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States",
      isDefault: false
    },
    {
      id: "addr_3",
      label: "Parents' House",
      tag: "other",
      fullName: "Eleanor Morgan",
      phone: "+1 (555) 345-6789",
      street: "45 Riverfront Drive",
      city: "Eugene",
      state: "OR",
      zip: "97401",
      country: "United States",
      isDefault: false
    }
  ],

  categories: [
    { id: "cat_electronics", name: "Electronics", icon: "📱", banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80", count: 8 },
    { id: "cat_audio", name: "Audio & Sound", icon: "🎧", banner: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80", count: 5 },
    { id: "cat_wearables", name: "Wearables", icon: "⌚", banner: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", count: 4 },
    { id: "cat_fashion", name: "Fashion & Style", icon: "👕", banner: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80", count: 6 },
    { id: "cat_footwear", name: "Footwear", icon: "👟", banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", count: 4 },
    { id: "cat_home", name: "Smart Home", icon: "🏠", banner: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80", count: 5 }
  ],

  banners: [
    {
      id: "ban_1",
      tag: "MEGA SUMMER SALE",
      title: "Up to 50% Off Top Tech",
      subtitle: "Exclusive flagship smartphones, laptops & noise cancelling audio",
      buttonText: "Shop Deals",
      targetCategory: "cat_electronics",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&auto=format&fit=crop&q=80",
      badge: "Limited Time"
    },
    {
      id: "ban_2",
      tag: "NEW ARRIVAL",
      title: "Softnix Pro Wireless ANC",
      subtitle: "Spatial audio with 40-hour battery life and studio lossless sound",
      buttonText: "Explore Now",
      targetProductId: "prod_audio_1",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      badge: "Trending"
    },
    {
      id: "ban_3",
      tag: "FASHION SPOTLIGHT",
      title: "Urban Athletics Collection",
      subtitle: "Breathable performance wear crafted for everyday movement",
      buttonText: "View Collection",
      targetCategory: "cat_fashion",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      badge: "New Season"
    }
  ],

  dealsCountdown: {
    hours: 14,
    minutes: 32,
    seconds: 45
  },

  coupons: [
    { code: "WELCOME10", discountType: "percentage", value: 10, minSpend: 30, description: "10% off on your first order" },
    { code: "SAVE20", discountType: "fixed", value: 20, minSpend: 100, description: "$20 instant savings on orders over $100" },
    { code: "FREESHIP", discountType: "free_shipping", value: 0, minSpend: 25, description: "Free standard delivery on any order" },
    { code: "VIP50", discountType: "fixed", value: 50, minSpend: 250, description: "$50 VIP discount on orders above $250" }
  ],

  products: [
    {
      id: "prod_phone_1",
      name: "Nebula Ultra 5G Pro",
      brand: "Nebula",
      category: "cat_electronics",
      categoryName: "Electronics",
      subCategory: "Smartphones",
      price: 899,
      originalPrice: 1099,
      rating: 4.8,
      reviewCount: 342,
      inStock: true,
      stockCount: 8,
      sku: "NEB-U5G-256",
      isFeatured: true,
      isNew: true,
      isPopular: true,
      isDeal: true,
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
      ],
      description: "The Nebula Ultra 5G Pro combines an aerospace-grade titanium frame with an ultra-vivid 120Hz Dynamic AMOLED display and breakthrough 200MP computational camera system. Engineered for creators and power users.",
      variants: {
        colors: [
          { name: "Titanium Gray", hex: "#717378", selected: true },
          { name: "Midnight Black", hex: "#1f2022", selected: false },
          { name: "Cosmic Blue", hex: "#2b4c7e", selected: false }
        ],
        sizes: [
          { name: "256 GB", priceDelta: 0, selected: true },
          { name: "512 GB", priceDelta: 120, selected: false },
          { name: "1 TB", priceDelta: 250, selected: false }
        ]
      },
      specifications: {
        "Display": "6.8\" Dynamic AMOLED 2X, 120Hz LTPO",
        "Processor": "Octa-core 4nm NextGen AI Chipset",
        "RAM & Storage": "12GB RAM, 256GB / 512GB / 1TB UFS 4.0",
        "Rear Camera": "200MP Main + 50MP Periscope 5x + 12MP Ultra-Wide",
        "Front Camera": "32MP Dual Pixel AF",
        "Battery": "5,000 mAh with 65W Fast Charging & 15W Wireless",
        "Water Resistance": "IP68 Certified (Submersible up to 1.5m)",
        "Warranty": "2 Years Official Manufacturer Warranty"
      },
      deliveryEstimate: "2-3 business days",
      reviews: [
        { id: "rev_1", user: "Michael Chen", rating: 5, date: "Aug 12, 2026", verified: true, title: "Unbelievable camera and battery!", comment: "The optical zoom is stunning and battery lasts a full 1.5 days easily. Premium build quality.", helpful: 42 },
        { id: "rev_2", user: "Sarah Jenkins", rating: 5, date: "Aug 05, 2026", verified: true, title: "Smooth UI, worth every penny", comment: "Display is the brightest I have ever seen outdoors. Seamless pairing with my headphones.", helpful: 19 },
        { id: "rev_3", user: "David Ross", rating: 4, date: "Jul 28, 2026", verified: true, title: "Great phone, slightly heavy", comment: "Outstanding screen and performance. Just a bit hefty in one hand.", helpful: 7 }
      ]
    },
    {
      id: "prod_audio_1",
      name: "Softnix Pro Wireless ANC Headphones",
      brand: "SonicSoftnix",
      category: "cat_audio",
      categoryName: "Audio & Sound",
      subCategory: "Headphones",
      price: 249,
      originalPrice: 329,
      rating: 4.9,
      reviewCount: 512,
      inStock: true,
      stockCount: 15,
      sku: "SON-AUR-ANC",
      isFeatured: true,
      isNew: false,
      isPopular: true,
      isDeal: true,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Industry-leading hybrid active noise cancellation with 40mm custom drivers for audiophile clarity. Features memory-foam cushioned earcups, multipoint Bluetooth 5.4, and up to 45 hours of playback with quick charge.",
      variants: {
        colors: [
          { name: "Matte Black", hex: "#1a1a1a", selected: true },
          { name: "Silver Pearl", hex: "#e2e8f0", selected: false },
          { name: "Sandstone Beige", hex: "#d6c7b2", selected: false }
        ],
        sizes: [
          { name: "Standard Over-Ear", priceDelta: 0, selected: true }
        ]
      },
      specifications: {
        "Driver Size": "40mm Custom High-Res Dynamic Drivers",
        "Noise Cancellation": "Hybrid Active Noise Cancellation (4 Mics)",
        "Battery Life": "45 Hours (ANC On), 60 Hours (ANC Off)",
        "Fast Charge": "10 min charge = 5 hours playtime",
        "Bluetooth": "Version 5.4 with LDAC, AAC, SBC",
        "Microphone": "6-mic array with AI Wind & Noise Reduction",
        "Weight": "250g Ultra-Lightweight Foldable Design"
      },
      deliveryEstimate: "Tomorrow by 8 PM",
      reviews: [
        { id: "rev_4", user: "Emily Watson", rating: 5, date: "Aug 14, 2026", verified: true, title: "Silence is golden!", comment: "Cancels out plane and office background noise completely. Sound profile is crisp and rich.", helpful: 88 }
      ]
    },
    {
      id: "prod_watch_1",
      name: "PulseFit Horizon Smartwatch",
      brand: "PulseTech",
      category: "cat_wearables",
      categoryName: "Wearables",
      subCategory: "Smartwatches",
      price: 189,
      originalPrice: 249,
      rating: 4.7,
      reviewCount: 228,
      inStock: true,
      stockCount: 22,
      sku: "PLS-HRZ-W1",
      isFeatured: true,
      isNew: true,
      isPopular: true,
      isDeal: false,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Your comprehensive health companion. Tracks ECG, SpO2, continuous heart rate, sleep stages, and over 120 sports modes. Features an Always-On AMOLED screen with sapphire crystal glass and 14-day battery life.",
      variants: {
        colors: [
          { name: "Obsidian Black", hex: "#111827", selected: true },
          { name: "Rose Gold", hex: "#e0a899", selected: false },
          { name: "Alpine Green", hex: "#2d5a27", selected: false }
        ],
        sizes: [
          { name: "42mm Case", priceDelta: 0, selected: true },
          { name: "46mm Case", priceDelta: 30, selected: false }
        ]
      },
      specifications: {
        "Display": "1.43\" AMOLED 466x466, Always-On Display",
        "Sensors": "Bio-Tracker PPG, Optical HR, SpO2, ECG, Barometer, GPS",
        "Waterproofing": "5 ATM (50 meters swim proof)",
        "Battery Life": "Up to 14 days normal use / 7 days heavy use",
        "Compatibility": "iOS 14.0+ and Android 9.0+"
      },
      deliveryEstimate: "2-3 business days",
      reviews: []
    },
    {
      id: "prod_laptop_1",
      name: "AeroBook Pro 15 M-Max",
      brand: "AeroTech",
      category: "cat_electronics",
      categoryName: "Electronics",
      subCategory: "Laptops",
      price: 1399,
      originalPrice: 1599,
      rating: 4.9,
      reviewCount: 184,
      inStock: true,
      stockCount: 5,
      sku: "AER-B15-PRO",
      isFeatured: true,
      isNew: true,
      isPopular: true,
      isDeal: true,
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Ultra-thin aerospace aluminum chassis housing next-generation 14-core processing power. 3.2K Liquid Retina XDR screen with 120Hz ProMotion and up to 22 hours of battery endurance.",
      variants: {
        colors: [
          { name: "Space Gray", hex: "#4b5563", selected: true },
          { name: "Starlight Silver", hex: "#e5e7eb", selected: false }
        ],
        sizes: [
          { name: "16GB RAM / 512GB SSD", priceDelta: 0, selected: true },
          { name: "32GB RAM / 1TB SSD", priceDelta: 300, selected: false }
        ]
      },
      specifications: {
        "Processor": "M-Max 14-Core CPU, 30-Core GPU",
        "Display": "15.3\" Liquid Retina XDR, 3024x1964, 120Hz",
        "Memory": "16GB / 32GB Unified High-Speed Memory",
        "Storage": "512GB / 1TB Ultra NVMe PCIe 4.0",
        "Ports": "3x Thunderbolt 4, MagSafe 3, HDMI 2.1, SDXC Slot",
        "Weight": "1.58 kg (3.48 lbs)"
      },
      deliveryEstimate: "Next-Day Delivery Available",
      reviews: []
    },
    {
      id: "prod_shoe_1",
      name: "Velocity Foam Runner X9",
      brand: "AeroSport",
      category: "cat_footwear",
      categoryName: "Footwear",
      subCategory: "Running Shoes",
      price: 129,
      originalPrice: 160,
      rating: 4.6,
      reviewCount: 410,
      inStock: true,
      stockCount: 30,
      sku: "AER-RUN-X9",
      isFeatured: false,
      isNew: true,
      isPopular: true,
      isDeal: false,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Engineered with supercritical nitrogen-infused foam midsole providing 85% energy return. Breathable seamless knit upper locks down your foot for marathon training or daily sprints.",
      variants: {
        colors: [
          { name: "Flame Red", hex: "#dc2626", selected: true },
          { name: "Stealth Black", hex: "#0f172a", selected: false },
          { name: "Volt Neon", hex: "#84cc16", selected: false }
        ],
        sizes: [
          { name: "US 8", priceDelta: 0, selected: false },
          { name: "US 9", priceDelta: 0, selected: true },
          { name: "US 10", priceDelta: 0, selected: false },
          { name: "US 11", priceDelta: 0, selected: false }
        ]
      },
      specifications: {
        "Midsole": "Supercritical Nitrogen Foam Cushioning",
        "Upper": "Engineered Recycled FlyKnit Mesh",
        "Outsole": "Durable High-Traction Carbon Rubber",
        "Drop": "8mm Heel-to-Toe Offset",
        "Weight": "215g (Men's US 9)"
      },
      deliveryEstimate: "2-3 business days",
      reviews: []
    },
    {
      id: "prod_fashion_1",
      name: "Minimalist Merino Wool Bomber Jacket",
      brand: "UrbanTailor",
      category: "cat_fashion",
      categoryName: "Fashion & Style",
      subCategory: "Jackets",
      price: 165,
      originalPrice: 220,
      rating: 4.8,
      reviewCount: 95,
      inStock: true,
      stockCount: 12,
      sku: "URB-MRN-JKT",
      isFeatured: true,
      isNew: false,
      isPopular: false,
      isDeal: true,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Crafted from 100% fine Australian Merino wool with natural thermoregulation and water-repellent coating. Features clean matte YKK dual zippers and hidden interior media pockets.",
      variants: {
        colors: [
          { name: "Charcoal Heather", hex: "#374151", selected: true },
          { name: "Deep Navy", hex: "#1e3a8a", selected: false },
          { name: "Camel", hex: "#b45309", selected: false }
        ],
        sizes: [
          { name: "S", priceDelta: 0, selected: false },
          { name: "M", priceDelta: 0, selected: true },
          { name: "L", priceDelta: 0, selected: false },
          { name: "XL", priceDelta: 0, selected: false }
        ]
      },
      specifications: {
        "Material": "100% Extra-fine Australian Merino Wool",
        "Lining": "Breathable Japanese Cupro Silk Blend",
        "Hardware": "Matte Black YKK Dual Zippers",
        "Care": "Dry Clean or Gentle Wool Wash"
      },
      deliveryEstimate: "3-4 business days",
      reviews: []
    },
    {
      id: "prod_home_1",
      name: "Lumina Smart Ambient Soundbar & Lamp",
      brand: "SoftnixHome",
      category: "cat_home",
      categoryName: "Smart Home",
      subCategory: "Audio & Lighting",
      price: 199,
      originalPrice: 259,
      rating: 4.7,
      reviewCount: 140,
      inStock: true,
      stockCount: 18,
      sku: "AUR-LUM-S1",
      isFeatured: false,
      isNew: true,
      isPopular: true,
      isDeal: false,
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Elevate your room with synchronized ambient reactive lighting and 360-degree room-filling acoustic sound. Integrates seamlessly with Apple HomeKit, Google Assistant, and Alexa.",
      variants: {
        colors: [
          { name: "Nordic Walnut", hex: "#78350f", selected: true },
          { name: "Glacier White", hex: "#f8fafc", selected: false }
        ],
        sizes: [
          { name: "Standard 30W", priceDelta: 0, selected: true }
        ]
      },
      specifications: {
        "Audio Output": "30W Stereo with Passive Bass Radiator",
        "Lighting": "16 Million Colors RGBW + Circadian Rhythm Mode",
        "Connectivity": "Wi-Fi 6, Bluetooth 5.3, AirPlay 2, Spotify Connect",
        "App Control": "iOS & Android Lumina Companion App"
      },
      deliveryEstimate: "2-3 business days",
      reviews: []
    },
    {
      id: "prod_audio_2",
      name: "SonicPod True Wireless Earbuds",
      brand: "SonicSoftnix",
      category: "cat_audio",
      categoryName: "Audio & Sound",
      subCategory: "Earbuds",
      price: 119,
      originalPrice: 159,
      rating: 4.8,
      reviewCount: 680,
      inStock: true,
      stockCount: 40,
      sku: "SON-POD-TWS",
      isFeatured: true,
      isNew: false,
      isPopular: true,
      isDeal: true,
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80"
      ],
      description: "Pocket-sized audio powerhouse with adaptive transparency mode, wireless charging Qi case, and crystal-clear voice beamforming microphones.",
      variants: {
        colors: [
          { name: "Glossy White", hex: "#ffffff", selected: true },
          { name: "Matte Graphite", hex: "#334155", selected: false }
        ],
        sizes: [
          { name: "Standard", priceDelta: 0, selected: true }
        ]
      },
      specifications: {
        "Battery": "8 hrs per bud (32 hrs total with case)",
        "Water Resistance": "IPX5 Sweat & Rain resistant",
        "Charging": "USB-C + Qi Wireless Charging",
        "Codecs": "AAC, SBC, aptX Adaptive"
      },
      deliveryEstimate: "Tomorrow by 8 PM",
      reviews: []
    }
  ],

  orders: [
    {
      id: "ORD-10245",
      orderNumber: "ORD-10245",
      date: "20 Aug 2026",
      timestamp: "10:15 AM",
      expectedDelivery: "22 Aug 2026",
      status: "out_for_delivery", // payment_pending | confirmed | processing | packed | shipped | out_for_delivery | delivered | cancelled
      paymentStatus: "Paid Online",
      paymentMethod: "Credit Card (Visa ending in 4242)",
      shippingAddress: {
        fullName: "Alex Morgan",
        street: "742 Evergreen Terrace, Apt 4B",
        city: "Springfield",
        state: "OR",
        zip: "97477",
        phone: "+1 (555) 234-5678"
      },
      deliveryPartner: {
        courier: "SwiftExpress Logistics",
        trackingCode: "SWIFT-98234-US",
        driverName: "Marcus Vance",
        driverPhone: "+1 (555) 678-1234",
        driverRating: 4.9,
        liveLocation: "3.2 miles away • Approaching Main St."
      },
      items: [
        {
          productId: "prod_phone_1",
          name: "Nebula Ultra 5G Pro",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&auto=format&fit=crop&q=80",
          variant: "Titanium Gray / 256 GB",
          quantity: 1,
          price: 899
        },
        {
          productId: "prod_audio_2",
          name: "SonicPod True Wireless Earbuds",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
          variant: "Glossy White",
          quantity: 1,
          price: 119
        }
      ],
      subtotal: 1018,
      discount: 20,
      deliveryCharge: 0,
      tax: 81.44,
      total: 1079.44,
      trackingTimeline: [
        { step: "confirmed", title: "Order Confirmed", desc: "Payment verified and inventory allocated", time: "20 Aug, 10:15 AM", completed: true },
        { step: "processing", title: "Processing Order", desc: "Automated routing sent to nearest fulfillment center", time: "20 Aug, 11:30 AM", completed: true },
        { step: "packed", title: "Packed at Warehouse", desc: "Quality checked and safely packed with tamper seal", time: "20 Aug, 02:45 PM", completed: true },
        { step: "shipped", title: "Shipped via Express", desc: "In transit with SwiftExpress Courier #SWIFT-98234-US", time: "21 Aug, 08:00 AM", completed: true },
        { step: "out_for_delivery", title: "Out for Delivery", desc: "Driver Marcus Vance is en route with your package", time: "22 Aug, 09:30 AM", completed: true, current: true },
        { step: "delivered", title: "Delivered", desc: "Package handed over with digital signature", time: "Expected by 02:00 PM", completed: false }
      ],
      canCancel: false,
      canReturn: false
    },
    {
      id: "ORD-10198",
      orderNumber: "ORD-10198",
      date: "14 Aug 2026",
      timestamp: "03:40 PM",
      expectedDelivery: "16 Aug 2026",
      status: "delivered",
      paymentStatus: "Paid Online",
      paymentMethod: "Apple Pay",
      shippingAddress: {
        fullName: "Alex Morgan",
        street: "742 Evergreen Terrace, Apt 4B",
        city: "Springfield",
        state: "OR",
        zip: "97477",
        phone: "+1 (555) 234-5678"
      },
      deliveryPartner: {
        courier: "FedEx Express",
        trackingCode: "FDX-449102-US",
        driverName: "Sarah Connor",
        driverPhone: "+1 (555) 432-8765"
      },
      items: [
        {
          productId: "prod_audio_1",
          name: "Softnix Pro Wireless ANC Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
          variant: "Matte Black",
          quantity: 1,
          price: 249
        }
      ],
      subtotal: 249,
      discount: 24.90,
      deliveryCharge: 0,
      tax: 17.93,
      total: 242.03,
      trackingTimeline: [
        { step: "confirmed", title: "Order Confirmed", desc: "Payment verified", time: "14 Aug, 03:40 PM", completed: true },
        { step: "processing", title: "Processing Order", desc: "Fulfillment center processing", time: "14 Aug, 05:00 PM", completed: true },
        { step: "packed", title: "Packed at Warehouse", desc: "Order packed and labeled", time: "14 Aug, 08:30 PM", completed: true },
        { step: "shipped", title: "Shipped", desc: "Transferred to FedEx Hub", time: "15 Aug, 06:15 AM", completed: true },
        { step: "out_for_delivery", title: "Out for Delivery", desc: "Courier on route", time: "16 Aug, 10:00 AM", completed: true },
        { step: "delivered", title: "Delivered Successfully", desc: "Handed to resident at front door", time: "16 Aug, 01:25 PM", completed: true, current: true }
      ],
      canCancel: false,
      canReturn: true
    },
    {
      id: "ORD-10082",
      orderNumber: "ORD-10082",
      date: "02 Aug 2026",
      timestamp: "11:20 AM",
      expectedDelivery: "05 Aug 2026",
      status: "delivered",
      paymentStatus: "Paid Online",
      paymentMethod: "Credit Card (Visa ending in 4242)",
      shippingAddress: {
        fullName: "Alex Morgan",
        street: "742 Evergreen Terrace, Apt 4B",
        city: "Springfield",
        state: "OR",
        zip: "97477",
        phone: "+1 (555) 234-5678"
      },
      items: [
        {
          productId: "prod_shoe_1",
          name: "Velocity Foam Runner X9",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
          variant: "Flame Red / US 9",
          quantity: 1,
          price: 129
        }
      ],
      subtotal: 129,
      discount: 0,
      deliveryCharge: 0,
      tax: 10.32,
      total: 139.32,
      canCancel: false,
      canReturn: true
    }
  ],

  returns: [
    {
      id: "RET-5012",
      orderId: "ORD-10082",
      productId: "prod_shoe_1",
      productName: "Velocity Foam Runner X9",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
      reason: "Size is slightly tight, need a half size larger",
      status: "approved", // requested | approved | pickup_scheduled | received | refund_processed
      refundAmount: 139.32,
      refundMethod: "Original Payment (Visa ending in 4242)",
      requestDate: "06 Aug 2026",
      erpStatus: "Sales Return SR-8821 Generated",
      timeline: [
        { title: "Return Requested", desc: "Customer submitted return with item condition photo", date: "06 Aug, 02:30 PM", done: true },
        { title: "Return Approved", desc: "Automated approval policy verified within 15-day window", date: "06 Aug, 03:00 PM", done: true },
        { title: "Pickup Scheduled", desc: "Courier pickup booked for 08 Aug between 10am-2pm", date: "07 Aug, 09:00 AM", done: true },
        { title: "Item Received at Hub", desc: "Quality inspection passed", date: "09 Aug, 04:10 PM", done: true },
        { title: "Refund Credited", desc: "Funds transferred to original card account", date: "10 Aug, 11:15 AM", done: true }
      ]
    }
  ],

  notifications: [
    {
      id: "notif_1",
      category: "shipping",
      title: "Out for Delivery! 🚚",
      message: "Order #ORD-10245 is out for delivery. Marcus Vance will arrive by 2:00 PM.",
      time: "10 mins ago",
      read: false,
      deepLink: "view_tracking",
      targetId: "ORD-10245"
    },
    {
      id: "notif_2",
      category: "orders",
      title: "Order Confirmed 🎉",
      message: "Your payment of $1,079.44 for #ORD-10245 was successful.",
      time: "2 hours ago",
      read: false,
      deepLink: "view_order_details",
      targetId: "ORD-10245"
    },
    {
      id: "notif_3",
      category: "returns",
      title: "Refund Processed 💰",
      message: "Refund of $139.32 for return #RET-5012 has been sent to your Visa card.",
      time: "10 Aug 2026",
      read: true,
      deepLink: "view_returns",
      targetId: "RET-5012"
    },
    {
      id: "notif_4",
      category: "promos",
      title: "Exclusive 20% Flash Coupon ⚡",
      message: "Use code SAVE20 at checkout for $20 off on orders over $100 today!",
      time: "Yesterday",
      read: true,
      deepLink: "view_cart",
      targetId: null
    }
  ],

  faqs: [
    {
      category: "Orders & Shipping",
      question: "How do I track my delivery in real-time?",
      answer: "You can track your package by visiting 'My Orders' > 'Track Package'. You will see a live 6-stage milestone tracker, courier tracking code, driver contact information, and live map radar."
    },
    {
      category: "Orders & Shipping",
      question: "Can I cancel my order after placing it?",
      answer: "Orders can be cancelled free of charge while in 'Confirmed' or 'Processing' state. Once an order is 'Packed' or 'Shipped', please wait for delivery and submit a seamless return."
    },
    {
      category: "Payments & Pricing",
      question: "What payment methods are supported?",
      answer: "We support Visa, Mastercard, American Express, Apple Pay, Google Pay, UPI / Instant NetBanking, and Cash on Delivery (COD)."
    },
    {
      category: "Returns & Refunds",
      question: "What is your return and refund policy?",
      answer: "We offer a 15-day hassle-free return window for all eligible items. Once you submit a return request, our courier will pick up the package from your doorstep and refunds are credited in 2-3 business days."
    },
    {
      category: "Account & Security",
      question: "How do I manage my saved shipping addresses?",
      answer: "Navigate to 'My Account' > 'Address Book'. You can add new addresses, tag them as Home/Work/Other, edit details, delete old locations, or assign a default delivery address."
    }
  ],

  tickets: [
    {
      id: "TCK-4081",
      subject: "Inquiry regarding express shipping availability",
      category: "Delivery Issue",
      orderId: "ORD-10245",
      status: "Resolved",
      date: "19 Aug 2026",
      messages: [
        { sender: "user", text: "Is express shipping available for Springfield?", time: "19 Aug, 09:12 AM" },
        { sender: "agent", text: "Hello Alex! Yes, next-day express delivery is fully supported for your zip code 97477.", time: "19 Aug, 09:15 AM" }
      ]
    }
  ],

  searchAnalytics: {
    totalQueries: 1420,
    clickThroughRate: "89.4%",
    avgConversionRate: "14.2%",
    zeroResultRate: "1.1%",
    popularTerms: ["Wireless Headphones", "Nebula Ultra 5G", "Smart Watch", "Running Shoes", "Bomber Jacket", "Ambient Soundbar"]
  }
};