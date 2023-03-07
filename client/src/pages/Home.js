import React, { useContext } from "react";
import Starsoffres from "../components/Paristars";
import "../styles/components/paristars-card.css";
import { UidContext } from "../components/AppContext";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {/* <h4>Bonjour, page d'accueil</h4> */}
      {uid ? (
        <Starsoffres />
      ) : (
        <h2 style={{ textAlign: "center", marginTop:"150px"}}>
          Vous n'êtes pas connecté, veuillez vous connecter
        </h2>
      )}
    </div>
  );
};

export default Home;
