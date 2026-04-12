export const showToast = (message, type = 'success') => {
  const event = new CustomEvent('showToast', {
    detail: { message, type },
  });
  window.dispatchEvent(event);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};
