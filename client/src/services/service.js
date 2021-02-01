import api from "../api/api";

const services = {
  listFn: async (filter = {}) => {
    const response = await api.get("/service", filter);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/service/${_id}`);
    return response;
  },

  createFn: async (service) => {
    const response = await api.post("/service", service);
    return response;
  },

  updateFn: async (_id, service) => {
    const response = await api.patch(`/service/${_id}`, service);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/service/${_id}`);
    return response;
  },
};

export default services;
