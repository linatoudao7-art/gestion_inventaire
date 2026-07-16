import api from "./api";

const inventoryService = {

    getAll: () => api.get("/inventory")

};

export default inventoryService;