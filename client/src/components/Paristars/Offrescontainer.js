import React from "react";
import OffreCard from "./OffreCard";

// CREATION DE COMPOSANT POUR "offres"
const Offrescontainer = () => {
  return (
    <>
      <div className="offres-container">
        <div
          className="mesparis-titlecard"
          style={{
            width: "300px",
            marginBottom: "10px",
            borderBottomLeftRadius: "0.25rem",
            borderBottomRightRadius: "0.25rem",
          }}
        >
          <div className="offres-preview">
            <h2>Offres</h2>
          </div>
        </div>
        <div class={"grid"}>
          <OffreCard />
          {/* <OffreCard /> */}
        </div>
        {/* <div className="course-container">
          <Card />
        </div> */}
      </div>
    </>
  );
};

export default Offrescontainer;
