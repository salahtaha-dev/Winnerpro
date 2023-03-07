import React from "react";
import Offrescontainer from "./Offrescontainer";
import Starscontainer from "./Starscontainer";
import PariContainer from "../Pari/PariContainer";
// PAGE DES OFFRES
const Starsoffres = () => {
  return (
    <div className="main-container">
      <div className="stars-offres">
        <Starscontainer />
        <Offrescontainer />
      </div>
      <div className="centre-notification">
        <div className="mesparis-container">
          {/* {paris.map((pari, index) => {})} */}
          <div className="mesparis-titlecard">
            <h3>Mes Paris</h3>
          </div>
          <PariContainer />
        </div>
        <div className="mesparis-container">
          <div className="mesparis-titlecard">
            <h3>Notifications</h3>
          </div>
          <div className="mesparis-paris"></div>
        </div>
        <a
          style={{ textAlign: "center" }}
          href="mailto:aminebarbouch@gmail.com,salah2017ccf@gmail.com,soumareadama95@gmail.com"
        >
          Signaler un conflit à un admin
        </a>
      </div>
    </div>
  );
};

export default Starsoffres;
