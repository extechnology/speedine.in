import axiosInstance from "./axiosInstance";

const getUserAddress = async () => {
  const response = await axiosInstance.get(`/users/user-address/`);
  return response.data;
}

export default getUserAddress;