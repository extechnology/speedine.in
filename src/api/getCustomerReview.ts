import axiosInstance from "./axiosInstance";

const getCustomerReview = async () => {
  const response = await axiosInstance.get("/ui/about-us-customer-review/");
  return response.data;
};

export default getCustomerReview;
