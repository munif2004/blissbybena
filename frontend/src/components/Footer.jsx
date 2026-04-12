export default function Footer() {
  return (
    <footer className="bg-sage-900 text-bliss-beige mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">BlissByBena</h3>
            <p className="text-sm text-bliss-beige/80">Handmade with love, crafted with care.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-bliss-beige/80">
              <li><a href="/" className="hover:text-bliss-beige transition">Home</a></li>
              <li><a href="/shop" className="hover:text-bliss-beige transition">Shop</a></li>
              <li><a href="/about" className="hover:text-bliss-beige transition">About</a></li>
              <li><a href="/contact" className="hover:text-bliss-beige transition">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-bliss-beige/80">
              <li><a href="/shop?category=Crochet Items" className="hover:text-bliss-beige transition">Crochet Items</a></li>
              <li><a href="/shop?category=Jewellery" className="hover:text-bliss-beige transition">Jewellery</a></li>
              <li><a href="/shop?category=Hair Accessories" className="hover:text-bliss-beige transition">Hair Accessories</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-bliss-beige/80">
              <li><a href="https://instagram.com" target="_blank" className="hover:text-bliss-beige transition">Instagram</a></li>
              <li><a href="https://wa.me" target="_blank" className="hover:text-bliss-beige transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-800 pt-8">
          <p className="text-center text-sm text-bliss-beige/60">
            © 2024 BlissByBena. All handmade with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
