import axiosInstance from "./axiosInstance";

const getThumbNail = async () => {
  const res = await axiosInstance.get("/ui/thumb-nail/");
  return res.data;
};

export default getThumbNail;
