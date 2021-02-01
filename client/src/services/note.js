import api from "../api/api";

const services = {
  listFn: async ({ limit = 20, skip = 0 }) => {
    const response = await api.get(`/note?limit=${limit}&skip=${skip}`);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/note/${_id}`);
    return response;
  },

  createFn: async (note) => {
    const response = await api.post("/note", note);
    return response;
  },

  updateFn: async (_id, note) => {
    const response = await api.patch(`/note/${_id}`, note);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/note/${_id}`);
    return response;
  },
};

export default services;
