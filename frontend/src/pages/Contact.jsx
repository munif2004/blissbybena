import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { showToast } from '../utils/helpers';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // For now, just send via WhatsApp or email
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

    // Send via WhatsApp
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');

    showToast('Message sent! We will respond soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-bliss-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage-50 to-transparent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl text-sage-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-sage-700">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-3xl text-sage-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* WhatsApp */}
              <a
                href="https://wa.me/923219251439"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-6 bg-bliss-white rounded-lg hover:shadow-lg transition"
              >
                <Phone className="w-6 h-6 text-sage-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sage-900 mb-2">WhatsApp</h3>
                  <p className="text-sage-600">Chat with us on WhatsApp</p>
                  <p className="text-sage-500 font-semibold mt-2">+92 321 9251439</p>
                </div>
              </a>

              

              {/* Instagram */}
              <a
                href="https://www.instagram.com/blissbybena/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-6 bg-bliss-white rounded-lg hover:shadow-lg transition"
              >
                <MapPin className="w-6 h-6 text-sage-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sage-900 mb-2">Instagram</h3>
                  <p className="text-sage-600">Follow us on Instagram</p>
                  <p className="text-sage-500 font-semibold mt-2">@blissbybena</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-bliss-white rounded-lg p-8 shadow-md">
              <h2 className="font-serif text-2xl text-sage-900 mb-6">Send us a Message</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
