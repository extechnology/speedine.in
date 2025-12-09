import axiosInstance from "./axiosInstance";

const getHeroCarousel = async () => {
  const response = await axiosInstance.get("/ui/carousel-image/");
  return response.data;
};

export default getHeroCarousel;
