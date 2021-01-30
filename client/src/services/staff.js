import api from "../api/api";

const services = {
  listFn: async (filter = {}) => {
    const response = await api.get("/staff", filter);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/staff/${_id}`);
    return response;
  },

  createFn: async (staff) => {
    const response = await api.post("/staff", staff);
    return response;
  },

  updateFn: async (_id, staff) => {
    const response = await api.patch(`/staff/${_id}`, staff);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/staff/${_id}`);
    return response;
  },
};

export default services;
