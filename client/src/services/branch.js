import api from "../api/api";

const services = {
  listFn: async (filter = {}) => {
    const response = await api.get("/branch", filter);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/branch/${_id}`);
    return response;
  },

  createFn: async (branch) => {
    const response = await api.post("/branch", branch);
    return response;
  },

  updateFn: async (_id, branch) => {
    const response = await api.patch(`/branch/${_id}`, branch);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/branch/${_id}`);
    return response;
  },
};

export default services;
