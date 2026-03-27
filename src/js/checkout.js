import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (checkout.orderTotal === 0) {
      checkout.calculateOrderTotal();
    }
    try {
      const response = await checkout.checkout(form);
      console.log("Order response:", response);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  });
