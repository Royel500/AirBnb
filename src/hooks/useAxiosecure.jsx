import axios from 'axios';

const axiosSecure = axios.create({
  baseURL:'https://airbnb-server-xi.vercel.app/'
});

const useAxiosecure = () => {
  return axiosSecure; // ✅ No token logic, just return instance
};

export default useAxiosecure;
