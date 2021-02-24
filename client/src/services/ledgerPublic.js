import api from "../api/api";

const services = {
  listFn: async ({ date, branch }) => {
    const response = await api.get(
      `/ledger/info?branch=${branch}&date=${date}`,
    );
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

  updateFn: async (_id, ledger) => {
    const response = await api.patch(`/ledger/${_id}`, ledger);
    return response;
  },

  destroyFn: async (_id) => {
    const response = await api.delete(`/ledger/${_id}`);
    return response;
  },
};

export default services;
