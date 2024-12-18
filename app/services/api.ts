import axios from 'axios';

const API_BASE_URL = 'https://beta.tripkolic.com/api/v1';

export const fetchTours = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/task/tours`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};
