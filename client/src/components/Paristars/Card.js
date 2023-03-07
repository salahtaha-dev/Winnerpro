import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { parier_pariactions, getParis } from "../../actions/pari.actions";
import { getUser, parier_useractions } from "../../actions/user.actions";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";

// LA CARTE DES PARIS
const Card = (props) => {
  const [infos_supp_pari, set_infos_supp] = useState(false);
  const [range, setRange] = useState("");
  const [reponse_pari, setReponse_pari] = useState(false);
  const user = useSelector((state) => state.userReducer);
  //const pari = useSelector((state) => state.pariReducer);
  const dispatch = useDispatch();

  const handleInfos = (e) => {
    //if (e.target.id === "button_parier_0") {
    if (infos_supp_pari) set_infos_supp(false);
    if (!infos_supp_pari) set_infos_supp(true);
    //}
  };

  const handleSetPari = async (e) => {
    //if (e.target.id === "setPariTrue")
    e.preventDefault();
    var true_ou_false = "rien";
    if (e.target.id === "setPariTrue") true_ou_false = "setTrue";
    if (e.target.id === "setPariFalse") true_ou_false = "setFalse";
    // console.log(
    //   `${process.env.REACT_APP_API_URL}api/pari/admin/` +
    //     true_ou_false +
    //     `/` +
    //     props.pari._id
    // );
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}api/pari/admin/` +
          true_ou_false +
          `/` +
          props.pari._id
      )
      //TODO: FINIR LE .THEN() PROPREMENT
      .then((res) => {
        dispatch(getParis());
      })
      .catch((err) => console.log(err));
  };

  //gestion des évènements liés au clique de "valider le pari"
  const validerPari = () => {
    dispatch(
      parier_pariactions(props.pari._id, user._id, range, reponse_pari)
    ).then(dispatch(parier_useractions(props.pari._id, user._id, range)));
    //dispatch(getUser(user._id));
    dispatch(getParis());
    apresPari();
  };
  const apresPari = () => {
    set_infos_supp(false);
  };

  const supprimerPari = async (e) => {
    e.preventDefault();
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}api/pari/admin/deletePari/` +
          props.pari._id
      )
      //TODO: FINIR LE .THEN() PROPREMENT
      .then((res) => {
        dispatch(getParis());
      })
      .catch((err) => console.log(err));
  };

  const retributionPari = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}api/pari/parier/retributionPari/` +
          props.pari._id
      )
      //TODO: FINIR LE .THEN() PROPREMENT
      .then((res) => {
        dispatch(getParis());
        dispatch(getUser(user._id));
      })
      .catch((err) => console.log(err));
  };

  const resetPropsPari = async (e) => {
    e.preventDefault();
    //console.log("resetpropspari");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}api/pari/admin/resetProps/` +
          props.pari._id
      )
      //TODO: FINIR LE .THEN() PROPREMENT
      .then((res) => {
        dispatch(getParis());
      })
      .catch((err) => console.log(err));
  };
  var participants_length = props.pari.participants.length;
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {"Participants : " + participants_length}
    </Tooltip>
  );

  return (
    <>
      <div
        className={
          "course " +
          (props.sender === "AllParis" || props.sender === "Administration"
            ? "course-allparis"
            : "")
        }
      >
        {props.sender === "AllParis" || props.sender === "Administration" ? (
          <></>
        ) : (
          <div className="course-preview">
            <h2>Pari Stars</h2>
            <Link to="/All-paris">
              <button className="button-pari">
                Voir tous les paris <i className="fas fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        )}
        <div
          className={
            !infos_supp_pari && props.sender !== "Administration"
              ? "course-info course-info-hand unselectable"
              : "course-info"
          }
          onClick={
            !infos_supp_pari &&
            !props.pari.participants.includes(user._id) &&
            props.sender !== "Administration"
              ? handleInfos
              : null
          }
        >
          {props.sender === "Administration" ? (
            <></>
          ) : (
            <OverlayTrigger
              placement="right"
              delay={{}}
              overlay={renderTooltip}
            >
              <img
                src="https://i.imgur.com/R3AgMi5.png"
                alt="person"
                style={{ position: "absolute", right: "20px" }}
              ></img>
            </OverlayTrigger>
          )}

          <h6 style={{ width: "80%" }}>{props.pari.tag}</h6>
          <h2>{props.pari.libelle}</h2>
          {props.sender !== "Administration" ? (
            <h4>
              Le {props.pari.createdAt.substr(0, 10)} à{" "}
              {props.pari.createdAt.substr(11, 8)}
            </h4>
          ) : (
            <>
              <br></br>
              <h5>Créé par : </h5>
              <label>{props.pari.createur}</label>
              <br></br>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div>
                  <h5>Résultat actuel</h5>
                  <label>
                    {props.pari.resultat === "t"
                      ? "Oui est gagnante"
                      : props.pari.resultat === "f"
                      ? "Non est gagnant"
                      : props.pari.resultat}
                  </label>
                </div>
                <div>
                  <h5>Participants</h5>
                  <label>{props.pari.participants.length}</label>
                </div>

                {/*TODO: Ajouter la durée 2*/}
                {/* <div>
                  <h5>Durée restante</h5>
                  <label>{props.pari.duree}</label>
                </div> */}
              </div>
            </>
          )}
          {infos_supp_pari ? (
            props.sender !== "Administration" ? (
              <div>
                <hr />
                <h5 style={{ textAlign: "center" }}>
                  Informations supplémentaires
                </h5>
                <label>{props.pari.description}</label>
                <hr />
                <h5>Montant de votre mise en Ducats:</h5>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="range"
                      min={props.pari.ducatsmin}
                      max={
                        user.ducats > props.pari.ducatsmax
                          ? props.pari.ducatsmax
                          : user.ducats
                      }
                      onChange={(e) => {
                        setRange(e.target.value);
                      }}
                      value={range}
                      style={{ backgroundColor: "inherit" }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: "100px", marginLeft: "5px" }}
                      onChange={(e) => {
                        setRange(e.target.value);
                      }}
                      value={range}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <h5>Ducats min: {props.pari.ducatsmin}</h5>
                    <h5>Ducats max: {props.pari.ducatsmax}</h5>
                  </div>
                  <hr />
                  <h5>Votre réponse:</h5>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h5 style={{ marginRight: "10px" }}>Non</h5>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setReponse_pari(e.target.checked);
                        }}
                        value={reponse_pari}
                      />
                      <span className="slider round"></span>
                    </label>
                    <h5 style={{ marginLeft: "10px" }}>Oui</h5>
                  </div>
                  <br />
                </div>
                <button onClick={handleInfos} className="btn-parier-annuler">
                  Annuler
                </button>
                <button
                  className="btn-parier"
                  style={{ backgroundColor: "#4caf50" }}
                  onClick={validerPari}
                  alt="valider_pari"
                >
                  Valider
                </button>
              </div>
            ) : (
              <></>
            )
          ) : (
            <>
              {" "}
              {props.pari.participants.length !== 0 ? (
                props.pari.participants.includes(user._id) ? ( //&& !props.sender==="AllParis" ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    Vous avez parié sur cet évènement
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        {props.sender === "Administration" ? (
          <>
            {props.pari.resultat === "notYet" ? (
              <div
                style={{
                  backgroundColor: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                  justifyContent: "space-evenly",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  borderLeft: "1px solid #c8c8c8",
                }}
              >
                <h4 style={{ textAlign: "center" }}>Résultat</h4>
                <Button
                  variant="success"
                  id="setPariTrue"
                  onClick={handleSetPari}
                >
                  True
                </Button>
                <Button
                  variant="danger"
                  id="setPariFalse"
                  onClick={handleSetPari}
                >
                  False
                </Button>
              </div>
            ) : (
              <></>
            )}

            <div
              style={{
                backgroundColor: "inherit",
                display: "flex",
                flexDirection: "column",
                width: "200px",
                justifyContent: "space-evenly",
                paddingRight: "10px",
                paddingLeft: "10px",
                borderLeft: "1px solid #c8c8c8",
                minWidth: "155px",
              }}
            >
              {props.pari.resultat !== "notYet" ? (
                <Button variant="dark" onClick={resetPropsPari}>
                  Reset props
                </Button>
              ) : (
                <Button variant="dark" onClick={resetPropsPari} disabled>
                  Reset props
                </Button>
              )}
              {/*TODO: Ajouter la durée*/}
              {/* <Button variant="dark">Ecouler le pari</Button> */}

              {props.pari.resultat !== "Done" &&
              props.pari.resultat !== "notYet" ? (
                <Button variant="success" onClick={retributionPari}>
                  Retribution des gains
                </Button>
              ) : (
                <Button variant="success" onClick={retributionPari} disabled>
                  Retribution des gains
                </Button>
              )}

              <Button variant="danger" onClick={supprimerPari}>
                Supprimer pari
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Card;
