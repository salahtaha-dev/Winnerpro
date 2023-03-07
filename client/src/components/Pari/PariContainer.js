import React from "react";
import { isEmpty } from "../../components/Utils";
import { useSelector } from "react-redux";

const PariContainer = () => {
  const user = useSelector((state) => state.userReducer);
  const paris = useSelector((state) => state.pariReducer);

  const a = () => {
    var result = false;
    for (var i = 0; i < paris.length; i++) {
      if (paris[i].participants.includes(user._id) && result === false) {
        result = true;
      }
    }
    if (result === false) return <div className="mesparis-paris">Vide</div>;
  };

  return (
    <div className="mesparis-pariscontainer">
      {a()}
      {!isEmpty(paris[0]) &&
        paris.map((pari) => {
          if (pari.participants.includes(user._id)) {
            return (
              <div className="mesparis-paris unselectable">
                <div
                  className="mesparis-paris-details-texte"
                  style={{ textAlign: "center" }}
                >
                  {pari.libelle}
                </div>
                <div className="mesparis-paris-details">
                  <h6>
                    Réponse :{" "}
                    {pari.choix[pari.participants.indexOf(user._id)]===true ? "Oui" : "Non"}
                  </h6>
                  <h6>
                    Ducats :{" "}
                    {"" + pari.montants[pari.participants.indexOf(user._id)]}
                  </h6>
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default PariContainer;
