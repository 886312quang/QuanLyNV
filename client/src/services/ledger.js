import api from "../api/api";

const services = {
  listFn: async (id) => {
    const response = await api.get(`/ledger?shift=${id}`);
    return response;
  },

  findFn: async (_id) => {
    const response = await api.get(`/ledger/${_id}`);
    return response;
  },

  createFn: async (ledger) => {
    const response = await api.post("/ledger", ledger);
    return response;
  },

  updateFn: async (id, ledger) => {
    const response = await api.patch(`/ledger/${id}`, ledger);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/ledger/${_id}`);
    return response;
  },
};

export default services;
