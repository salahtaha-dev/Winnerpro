import React, { useState } from "react";
import Coursescontainer from "../components/Pari/Coursescontainer";

const Administration = () => {
  const [colonne, setColonne] = useState(true);
  const handleColonnes = (e) => {
    if (colonne && e.target.id === "gerer_utilisateurs") setColonne(false);
    if (!colonne && e.target.id === "gerer_paris") setColonne(true);
    //console.log("setColonne engaged");
  };

  return (
    <div>
      <div className="main-container main-container-allparis">
        <div
          className="mesparis-container mesparis-container-allparis"
          style={{ width: "650px" }}
        >
          <div className="mesparis-titlecard">
            <label className="button-pari-base" >Dashboard</label>
          </div>
          <div
            className="mesparis-titlecard"
            style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0px" }}
          >
            <button
              className="button-pari button-pari-allpari"
              style={colonne ? { color: "#fcba03" } : {}}
              id="gerer_paris"
              onClick={handleColonnes}
            >
              Gérer les paris
            </button>
            <button
              className="button-pari button-pari-allpari"
              style={!colonne ? { color: "#fcba03" } : {}}
              id="gerer_utilisateurs"
              onClick={handleColonnes}
            >
              Gérer les utilisateurs
            </button>
          </div>
          {colonne ? <Coursescontainer sender="Administration" /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Administration;
