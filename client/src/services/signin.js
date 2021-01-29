import api from "../api/api";

const fetchSignin = async (username, password) => {
  const response = await api.post("auth/login", {
    username,
    password,
  });
  return response;
};

export { fetchSignin };
