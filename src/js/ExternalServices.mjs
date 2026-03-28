async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);
    return Array.isArray(data) ? data : data.Result || [];
  }
  async findProductById(id) {
    const categories = ["tents", "backpacks", "sleeping-bags"];
    for (const cat of categories) {
      const products = await this.getData(cat);
      const found = products.find(
        (p) => p.Id.toLowerCase() === id.toLowerCase(),
      );
      if (found) return found;
    }
    return null;
  }
  async checkout(payload) {
    return { orderId: Date.now(), ...payload };
  }
}
