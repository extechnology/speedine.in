import Hero from "../components/home/Hero";
import NewArrival from "../components/home/NewArrival";
import StepTellsStory from "../components/home/StepTellsStory";
import Thumbnail from "../components/home/Thumbnail";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <NewArrival />
      </div>
      <div>
        <Thumbnail />
      </div>
      <div>
        <StepTellsStory />
      </div>
    </>
  );
};

export default Home;
