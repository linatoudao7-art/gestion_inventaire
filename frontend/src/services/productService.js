import api from "./api";

const productService = {
    getAll: () => api.get("/products"),

    getById: (id) => api.get(`/products/${id}`),

    create: (data) => api.post("/products", data),

    update: (id, data) => api.put(`/products/${id}`, data),

    remove: (id) => api.delete(`/products/${id}`),

    search: (search) => api.get(`/products?search=${search}`),
    
    filterByCategory: (categoryId) =>
    api.get(`/products?category=${categoryId}`),
};

export default productService;