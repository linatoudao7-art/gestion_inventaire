import api from "./api";

const stockMovementService = {
    getAll: () => api.get("/stock-movements"),

    create: (data) => api.post("/stock-movements", data),

    history: (productId) => api.get(`/stock-movements/history/${productId}`)
};

export default stockMovementService;