import { React } from "react";
import TitleCard from "./TitleCard";
import Coursescontainer from "../Pari/Coursescontainer";

const Starscontainer = () => {
  return (
    <div className="stars-container">
      <TitleCard />
      <Coursescontainer />
    </div>
  );
};

export default Starscontainer;
