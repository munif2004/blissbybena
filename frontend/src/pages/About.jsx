import { Heart, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-bliss-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage-50 to-transparent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl text-sage-900 mb-6">
            About BlissByBena
          </h1>
          <p className="text-xl text-sage-700">
            Handmade with love, crafted with care
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-bliss-white rounded-lg p-8 shadow-md mb-12">
          <h2 className="font-serif text-3xl text-sage-900 mb-6">
            Our Story
          </h2>

          <div className="space-y-6 text-sage-700 leading-relaxed">
            <p>
              BlissByBena began as a passion project, transforming creative visions
              into tangible pieces of wearable art. Each product is meticulously
              handcrafted with attention to detail and a deep love for the craft.
            </p>

            <p>
              What started as a personal hobby has blossomed into a thriving business
              dedicated to bringing handmade joy to people around the world. We believe
              in the power of slow fashion and the beauty of artisanal creation.
            </p>

            <p>
              Every crochet item, every piece of jewelry, and every hair accessory
              carries a piece of our heart. We take pride in creating products that
              are not just beautiful, but also meaningful and sustainable.
            </p>

            <p>
              Our commitment is simple: to create beautiful, high-quality handmade
              items that bring happiness to our customers. We believe that true luxury
              lies in the care, attention, and love that goes into each creation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-bliss-white rounded-lg p-6">
            <Heart className="w-12 h-12 text-sage-500 mb-4" />
            <h3 className="font-serif text-xl text-sage-900 mb-4">Made with Love</h3>
            <p className="text-sage-600">
              Every piece is created with passion, care, and dedication to quality.
            </p>
          </div>

          <div className="bg-bliss-white rounded-lg p-6">
            <Leaf className="w-12 h-12 text-sage-500 mb-4" />
            <h3 className="font-serif text-xl text-sage-900 mb-4">Sustainable</h3>
            <p className="text-sage-600">
              We focus on sustainable practices and materials for a better future.
            </p>
          </div>

          <div className="bg-bliss-white rounded-lg p-6">
            <Sparkles className="w-12 h-12 text-sage-500 mb-4" />
            <h3 className="font-serif text-xl text-sage-900 mb-4">Unique Designs</h3>
            <p className="text-sage-600">
              Each design is unique and reflects our commitment to individuality.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-serif text-3xl text-sage-900 mb-6">
            Ready to explore our collection?
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-sage-500 text-white px-8 py-3 rounded-lg hover:bg-sage-600 transition font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
