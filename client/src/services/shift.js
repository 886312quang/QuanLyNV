import api from "../api/api";

const services = {
  listFn: async ({ start, end, branch }) => {
    let urlBranch = branch ? `&branch=${branch}` : "";
    const response = await api.get(
      `/shift?start=${start}&end=${end}` + urlBranch,
    );
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/shift/${_id}`);
    return response;
  },

  createFn: async (shift) => {
    const response = await api.post("/shift", shift);
    return response;
  },

  updateFn: async (_id, shift) => {
    const response = await api.patch(`/shift/${_id}`, shift);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/shift/${_id}`);
    return response;
  },
};

export default services;
