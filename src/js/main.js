import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productListElement = document.querySelector(".product-list");

const productList = new ProductList("tents", productListElement);
productList.init();
