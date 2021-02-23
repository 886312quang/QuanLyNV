import api from "../api/api";

const services = {
  listFn: async (filter = {}) => {
    const response = await api.get("/user", filter);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/user/${_id}`);
    return response;
  },

  createFn: async (user) => {
    const response = await api.post("/auth/register", user);
    return response;
  },

  updateFn: async (_id, user) => {
    const response = await api.patch(`/user/${_id}`, user);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/user/${_id}`);
    return response;
  },
};

export default services;
