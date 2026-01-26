import axiosInstance from "./axiosInstance";

const getShippingCharge = async () => {
  const response = await axiosInstance.get("users/shipping-charge/");
  return response.data;
}

export default getShippingCharge;