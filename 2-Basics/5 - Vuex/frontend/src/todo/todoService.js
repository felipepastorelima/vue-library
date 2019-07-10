import axios from "axios";

const serverUrl = "http://localhost:3000";

export default {
  async list() {
    const response = await axios.get(`${serverUrl}/todo`);
    return response.data;
  },

  async create(todo) {
    const response = await axios.post(`${serverUrl}/todo`, todo);
    return response.data;
  },

  async destroy(id) {
    const response = await axios.delete(`${serverUrl}/todo/${id}`);
    return response.data;
  }
};
