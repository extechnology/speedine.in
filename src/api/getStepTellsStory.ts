import axiosInstance from "./axiosInstance";

const getStepTellsStory = async () => {
  const res = await axiosInstance.get("/ui/step-tells-story/");
  return res.data;
};

export default getStepTellsStory;
