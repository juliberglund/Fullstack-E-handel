import { Core } from '@strapi/strapi';

const sampleProducts = [
  {
    name: 'Premium Wireless Headphones',
    price: 129.99,
    description:
      'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    category: 'Electronics',
    inStock: true,
    slug: 'premium-wireless-headphones',
  },
  {
    name: 'Smart Watch Series 9',
    price: 399.99,
    description:
      'Latest generation smartwatch with health tracking, GPS, and water resistance. Stay connected and healthy.',
    category: 'Electronics',
    inStock: true,
    slug: 'smart-watch-series-9',
  },
  {
    name: 'Leather Laptop Bag',
    price: 89.99,
    description:
      'Genuine leather laptop bag with multiple compartments. Fits laptops up to 15 inches. Elegant and durable design.',
    category: 'Accessories',
    inStock: true,
    slug: 'leather-laptop-bag',
  },
  {
    name: 'Mechanical Keyboard RGB',
    price: 149.99,
    description:
      'Gaming mechanical keyboard with RGB backlighting, Cherry MX switches, and customizable macro keys.',
    category: 'Electronics',
    inStock: true,
    slug: 'mechanical-keyboard-rgb',
  },
  {
    name: 'Wireless Mouse Pro',
    price: 49.99,
    description:
      'Ergonomic wireless mouse with precision sensor, long battery life, and customizable buttons for productivity.',
    category: 'Electronics',
    inStock: true,
    slug: 'wireless-mouse-pro',
  },
  {
    name: '4K Ultra HD Monitor 27"',
    price: 449.99,
    description:
      '27-inch 4K monitor with HDR support, 144Hz refresh rate, and USB-C connectivity. Perfect for work and gaming.',
    category: 'Electronics',
    inStock: true,
    slug: '4k-ultra-hd-monitor-27',
  },
  {
    name: 'Coffee Maker Deluxe',
    price: 179.99,
    description:
      'Programmable coffee maker with thermal carafe, 12-cup capacity, and adjustable brew strength. Start your day right.',
    category: 'Home & Kitchen',
    inStock: true,
    slug: 'coffee-maker-deluxe',
  },
  {
    name: 'Yoga Mat Premium',
    price: 34.99,
    description:
      'Extra-thick yoga mat with non-slip surface and carrying strap. Perfect for yoga, pilates, and exercise routines.',
    category: 'Sports & Fitness',
    inStock: true,
    slug: 'yoga-mat-premium',
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    description:
      'Waterproof portable speaker with 360-degree sound, 20-hour battery, and voice assistant compatibility.',
    category: 'Electronics',
    inStock: true,
    slug: 'portable-bluetooth-speaker',
  },
  {
    name: 'Running Shoes Pro',
    price: 129.99,
    description:
      'Lightweight running shoes with cushioned sole and breathable mesh upper. Designed for comfort and performance.',
    category: 'Sports & Fitness',
    inStock: true,
    slug: 'running-shoes-pro',
  },
  {
    name: 'Desk Lamp LED',
    price: 39.99,
    description:
      'Adjustable LED desk lamp with multiple brightness levels and color temperatures. Eye-friendly lighting solution.',
    category: 'Home & Office',
    inStock: true,
    slug: 'desk-lamp-led',
  },
  {
    name: 'Wireless Charging Pad',
    price: 24.99,
    description:
      'Fast wireless charging pad compatible with Qi-enabled devices. Sleek design with LED indicator.',
    category: 'Electronics',
    inStock: true,
    slug: 'wireless-charging-pad',
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 19.99,
    description:
      'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
    category: 'Accessories',
    inStock: true,
    slug: 'stainless-steel-water-bottle',
  },
  {
    name: 'Backpack Travel 40L',
    price: 69.99,
    description:
      'Durable travel backpack with laptop compartment, multiple pockets, and USB charging port. Perfect for trips and daily commute.',
    category: 'Accessories',
    inStock: true,
    slug: 'backpack-travel-40l',
  },
  {
    name: 'Gaming Chair Ergonomic',
    price: 299.99,
    description:
      'Ergonomic gaming chair with lumbar support, adjustable armrests, and 360-degree rotation. Comfort for long sessions.',
    category: 'Home & Office',
    inStock: false,
    slug: 'gaming-chair-ergonomic',
  },
];

export async function seed(strapi: Core.Strapi) {
  try {
    console.log('🌱 Starting database seed...');

    const existingProducts = await strapi.entityService.findMany(
      'api::product.product',
      {
        limit: 1,
      }
    );

    if (existingProducts && existingProducts.length > 0) {
      console.log('✅ Products already exist. Skipping seed.');
      return;
    }

    console.log(`📦 Creating ${sampleProducts.length} products...`);

    for (const productData of sampleProducts) {
      await strapi.entityService.create('api::product.product', {
        data: {
          ...productData,
          publishedAt: new Date(),
        },
      });
    }

    console.log('✅ Database seed completed successfully!');
    console.log(`📊 Created ${sampleProducts.length} products`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
