import { loadHeaderFooter, alertMessage, setLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.order-summary');
checkout.init();

document.querySelector('#zip').addEventListener('blur', () => {
  checkout.calculateOrderTotal();
});

document
  .querySelector('#checkout-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (checkout.orderTotal === 0) {
      checkout.calculateOrderTotal();
    }
    try {
      await checkout.checkout(form);
      setLocalStorage('so-cart', []);
      window.location.href = '/checkout/success.html';
    } catch (err) {
      let message = 'An error occurred during checkout.';
      const res = err.message;
      if (typeof res === 'string') {
        message = res;
      } else if (res.errors) {
        if (Array.isArray(res.errors)) {
          message = res.errors.join('<br>');
        } else {
          message = Object.values(res.errors).join('<br>');
        }
      } else if (res.message) {
        message = res.message;
      }
      alertMessage(message);
    }
  });
