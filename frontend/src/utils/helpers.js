// Toast notification system
export const showToast = (message, type = 'success') => {
  const event = new CustomEvent('showToast', {
    detail: { message, type },
  });
  window.dispatchEvent(event);
};

// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

// Local storage helpers
export const cartStorage = {
  get: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  set: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  add: (product, quantity = 1) => {
    const cart = cartStorage.get();
    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    cartStorage.set(cart);
    return cart;
  },

  remove: (productId) => {
    const cart = cartStorage.get();
    const filtered = cart.filter((item) => item.id !== productId);
    cartStorage.set(filtered);
    return filtered;
  },

  update: (productId, quantity) => {
    const cart = cartStorage.get();
    const item = cart.find((item) => item.id === productId);

    if (item) {
      item.quantity = quantity;
    }

    cartStorage.set(cart);
    return cart;
  },

  clear: () => {
    localStorage.removeItem('cart');
  },
};
