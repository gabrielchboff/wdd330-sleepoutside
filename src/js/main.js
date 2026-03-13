import ProductList from './ProductList.mjs';

const productListElement = document.querySelector('.product-list');

const productList = new ProductList('tents', productListElement);
productList.init();
