import { React, useState } from "react";
import Coursescontainer from "../components/Pari/Coursescontainer";
import PariContainer from "../components/Pari/PariContainer";

const AllParis = () => {
  const [colonne, setColonne] = useState(true);
  const handleColonnes = (e) => {
    if (colonne && e.target.id === "mes_paris") setColonne(false);
    if (!colonne && e.target.id === "tous_les_paris") setColonne(true);
    //console.log("setColonne engaged");
  };

  return (
    <>
      <div className="main-container main-container-allparis">
        <div className="mesparis-container mesparis-container-allparis">
          <div className="mesparis-titlecard">
            <button
              className="button-pari button-pari-allpari"
              style={colonne ? { color: "#fcba03" } : {}}
              id="tous_les_paris"
              onClick={handleColonnes}
            >
              Tous les paris
            </button>
            <button
              className="button-pari button-pari-allpari"
              style={!colonne ? { color: "#fcba03" } : {}}
              id="mes_paris"
              onClick={handleColonnes}
            >
              Mes Paris Misés
            </button>
          </div>
          {colonne ? <Coursescontainer sender="AllParis" /> : <PariContainer />}
        </div>
      </div>
    </>
  );
};

export default AllParis;
