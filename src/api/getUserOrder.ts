import axiosInstance from "./axiosInstance";

const getUserOrder = async () => {
    const response = await axiosInstance.get("/users/user-order/");
    return response.data;
}

export default getUserOrder;