const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
require('dotenv').config();

// Product data with images and categories
const products = [
  { name: 'Floral Hair Bow Set', desc: 'Beautiful set of hair bows with floral patterns', price: 299, stock: 5, category: 'Hair Accessories', image: 'SnapInsta.to_552013831_17845949388570767_8440437977044307047_n.jpg' },
  { name: 'Crochet Hair Clips', desc: 'Handmade crochet hair clips in vibrant colors', price: 199, stock: 8, category: 'Crochet', image: 'SnapInsta.to_549157322_17844938268570767_1168043135457653910_n.jpg' },
  { name: 'Pearl Bow Clips', desc: 'Elegant bows with pearl embellishments', price: 349, stock: 6, category: 'Hair Accessories', image: 'SnapInsta.to_550445096_17845152810570767_1887886631313097403_n.jpg' },
  { name: 'Chunky Crochet Clips', desc: 'Statement crochet clips for bold looks', price: 249, stock: 4, category: 'Crochet', image: 'SnapInsta.to_551049572_17845457712570767_3755002059641277412_n.jpg' },
  { name: 'Pastel Hair Accessories Set', desc: 'Soft pastel colored hair clips and bows', price: 399, stock: 7, category: 'Hair Accessories', image: 'SnapInsta.to_543709170_17843794776570767_566654682893801381_n.jpg' },
  { name: 'Colorful Crochet Set', desc: 'Rainbow crochet hair accessories', price: 299, stock: 5, category: 'Crochet', image: 'SnapInsta.to_545184372_17844288981570767_2458621137955786403_n.jpg' },
  { name: 'Navy Blue Statement Bow', desc: 'Large navy blue bow with pearl details', price: 359, stock: 3, category: 'Hair Accessories', image: 'SnapInsta.to_567952260_17850588354570767_4307560492916011603_n.jpg' },
  { name: 'Handmade Jewelry Clips', desc: 'Crochet clips with jewelry embellishments', price: 449, stock: 2, category: 'Jewellery', image: 'SnapInsta.to_554123342_17846956392570767_723885504423143365_n.jpg' },
  { name: 'Pink Crochet Clips', desc: 'Soft pink handmade crochet hair clips', price: 229, stock: 6, category: 'Crochet', image: 'SnapInsta.to_571831997_17851966701570767_2501611300089811289_n.jpg' },
  { name: 'Blue Statement Clips', desc: 'Deep blue crochet clips with texture', price: 269, stock: 4, category: 'Crochet', image: 'SnapInsta.to_572939699_17851966710570767_1222236725077743583_n.jpg' },
  { name: 'Pearl Hair Accessories', desc: 'Elegant clips with pearl details', price: 379, stock: 5, category: 'Jewellery', image: 'SnapInsta.to_572389760_17851966719570767_7021154201850813927_n.jpg' },
  { name: 'Multi-color Bow Clips', desc: 'Vibrant multi-colored hair bows', price: 319, stock: 7, category: 'Hair Accessories', image: 'SnapInsta.to_572671533_17851644087570767_9150788901085961814_n.jpg' },
  { name: 'Gold Embroidered Clips', desc: 'Crochet clips with gold embroidery', price: 389, stock: 3, category: 'Jewellery', image: 'SnapInsta.to_572810904_17851644105570767_792808089714649659_n.jpg' },
  { name: 'Cream Colored Bows', desc: 'Soft cream colored hair bows with pearl trim', price: 329, stock: 6, category: 'Hair Accessories', image: 'SnapInsta.to_574497996_17851644096570767_4467072597876372238_n.jpg' },
  { name: 'Textured Crochet Set', desc: 'Crochet clips with interesting textures', price: 259, stock: 5, category: 'Crochet', image: 'SnapInsta.to_573156825_17851768494570767_5426120398673604251_n.jpg' },
  { name: 'Purple Bow Collection', desc: 'Beautiful purple bows with matches clips', price: 349, stock: 4, category: 'Hair Accessories', image: 'SnapInsta.to_573538949_17851768542570767_4251165529445031319_n.jpg' },
  { name: 'White Crochet Clips', desc: 'Pure white handmade crochet clips', price: 219, stock: 8, category: 'Crochet', image: 'SnapInsta.to_572715685_17851644069570767_5611561521008485471_n.jpg' },
  { name: 'Metallic Hair Accessories', desc: 'Shiny metallic crochet and clips', price: 399, stock: 3, category: 'Jewellery', image: 'SnapInsta.to_573078332_17851768506570767_9034829520607238728_n.jpg' },
  { name: 'Coral Bow Set', desc: 'Coral colored bows with pearl accents', price: 339, stock: 5, category: 'Hair Accessories', image: 'SnapInsta.to_572270076_17851768485570767_874187456479520618_n.jpg' },
  { name: 'Beaded Crochet Design', desc: 'Crochet clips with beaded embellishments', price: 419, stock: 2, category: 'Jewellery', image: 'SnapInsta.to_572985576_17852224482570767_3149549864458827722_n.jpg' },
  { name: 'Premium Pearl Clips', desc: 'High-quality clips with premium pearls', price: 459, stock: 2, category: 'Jewellery', image: 'SnapInsta.to_634350267_17865739467570767_3191157874411077955_n (1).jpg' },
  { name: 'Luxury Gold Bows', desc: 'Handmade luxury bows with gold details', price: 499, stock: 1, category: 'Jewellery', image: 'SnapInsta.to_630288118_17866060056570767_6192848798897490725_n.jpg' }
];

async function bulkAddProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blissbybena');
    console.log('✅ Connected to MongoDB');

    const uploadsDir = path.join(__dirname, '../uploads');
    const downloadsDir = path.join(process.env.USERPROFILE || 'C:\\Users\\hp', 'Downloads');

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Created uploads directory');
    }

    let addedCount = 0;
    let skippedCount = 0;

    // Add each product
    for (const productData of products) {
      try {
        // Check if product already exists
        const existing = await Product.findOne({ name: productData.name });
        if (existing) {
          console.log(`⏭️  Skipped: "${productData.name}" (already exists)`);
          skippedCount++;
          continue;
        }

        // Copy image if it exists
        let imagePath = null;
        if (productData.image) {
          const sourceImage = path.join(downloadsDir, productData.image);
          if (fs.existsSync(sourceImage)) {
            const destImage = path.join(uploadsDir, productData.image);
            fs.copyFileSync(sourceImage, destImage);
            imagePath = productData.image;
            console.log(`📸 Copied image: ${productData.image}`);
          } else {
            console.log(`⚠️  Warning: Image not found: ${productData.image}`);
          }
        }

        // Create product
        const product = new Product({
          name: productData.name,
          description: productData.desc,
          price: productData.price,
          stock: productData.stock,
          category: productData.category,
          image: imagePath ? `/uploads/${imagePath}` : null,
          featured: false
        });

        await product.save();
        console.log(`✅ Added: "${productData.name}" (₹${productData.price})`);
        addedCount++;
      } catch (error) {
        console.error(`❌ Error adding "${productData.name}":`, error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Bulk upload complete!`);
    console.log(`   Added: ${addedCount} products`);
    console.log(`   Skipped: ${skippedCount} products (duplicates)`);
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

bulkAddProducts();
