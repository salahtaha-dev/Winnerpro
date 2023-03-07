import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
// Création de la page login
const Log = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(true);
  const [colonne, setColonne] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
      setColonne(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
      setColonne(false);
    }
  };

  return (
    <>
      <div className="main-container main-container-allparis">
        <div
          className="mesparis-container mesparis-container-allparis"
          style={{ width: "650px" }}
        >
          <div
            className="mesparis-titlecard"
            style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0px" }}
          >
            <button
              className="button-pari button-pari-allpari"
              onClick={handleModals}
              id="register"
              style={colonne ? { color: "#fcba03" } : {}}
            >
              S'inscrire
            </button>
            <button
              className="button-pari button-pari-allpari"
              onClick={handleModals}
              id="login"
              style={!colonne ? { color: "#fcba03" } : {}}
            >
              Se connecter
            </button>
          </div>

          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </>
  );
};

export default Log;
