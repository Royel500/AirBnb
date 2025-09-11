import axios from 'axios';

const axiosSecure = axios.create({
  baseURL:'http://localhost:3500/'
});

const useAxiosecure = () => {
  return axiosSecure; // ✅ No token logic, just return instance
};

export default useAxiosecure;
