import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/user.actions";

const OffreCard = () => {
  const user = useSelector((state) => state.userReducer);
  const [visible_un, setVisibleUn] = useState(true);
  const [visible_deux, setVisibleDeux] = useState(true);
  const dispatch = useDispatch();

  const profiterOffre = async (e) => {
    var ducats_n;
    if (e.target.id === "un") {
      setVisibleUn(false);
      ducats_n = 1000;
    }
    if (e.target.id === "deux") {
      setVisibleDeux(false);
      ducats_n = 500;
    }

    e.preventDefault();
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/offre/`,
      withCredentials: true,
      data: {
        id_user: user._id,
        numero_offre: e.target.id,
        ducats: ducats_n,
      },
    }).then(() => {
      dispatch(getUser(user._id));
    });
  };

  return (
    <>
      {user.offres ? (
        !user.offres.includes("un") ? (
          <>
            <div
              class={"grid__item " + (visible_un ? "" : "grid__item__shrunk")}
              style={{ width: "inherit" }}
            >
              <div class="card" style={{ width: "inherit", height: "inherit" }}>
                <img
                  class="card__img"
                  src="https://i.imgur.com/kqd9bxj.gif"
                  alt="Offre bienvenue"
                />
                <div class="card__content">
                  <h1 class="card__header">Bienvenue, {user.pseudo} !</h1>
                  <p class="card__text">
                    Comme bonus de Bienvenue, vous recevrez
                    <strong> 1000 Ducats</strong> gratos!
                  </p>
                  <button class="card__btn" id="un" onClick={profiterOffre}>
                    Profiter <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {user.offres ? (
        !user.offres.includes("deux") ? (
          <>
            <div
              class={"grid__item " + (visible_deux ? "" : "grid__item__shrunk")}
              style={{ width: "inherit" }}
            >
              <div class="card" style={{ width: "inherit", height: "inherit" }}>
                <img
                  class="card__img"
                  src="https://i.imgur.com/U9dAl72.gif"
                  alt="Offre 2"
                  style={{ height: "180px" }}
                />
                <div class="card__content">
                  <h1 class="card__header">500 Ducats offerts !</h1>
                  <p class="card__text">
                    Vous recevrez
                    <strong> 500 Ducats</strong> comme bonus de fidelité!
                  </p>
                  <button class="card__btn" id="deux" onClick={profiterOffre}>
                    Profiter <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default OffreCard;
