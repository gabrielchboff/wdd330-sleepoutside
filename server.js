import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

function loadCategory(category) {
  const filePath = path.join(__dirname, "dist", "json", `${category}.json`);
  try {
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return Array.isArray(data) ? data : data.Result || [];
  } catch {
    return [];
  }
}

app.get("/products/search/:category", (req, res) => {
  const products = loadCategory(req.params.category);
  res.json({ Result: products });
});

app.get("/product/:id", (req, res) => {
  const categories = ["tents", "backpacks", "sleeping-bags"];
  for (const cat of categories) {
    const products = loadCategory(cat);
    const found = products.find(
      (p) => p.Id.toLowerCase() === req.params.id.toLowerCase(),
    );
    if (found) return res.json({ Result: found });
  }
  res.status(404).json({ Result: null, error: "Product not found" });
});

app.post("/checkout", express.json(), (req, res) => {
  res.json({ orderId: Date.now(), ...req.body });
});

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
