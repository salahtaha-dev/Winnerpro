import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { useState } from "react";
import axios from "axios";
import { getParis } from "../../actions/pari.actions";

//CREATION ET GESTION DES EVENEMENTS LIES AU CLICK DU BOUTON "créer pari"
const CreerPariButton = () => {
  const user = useSelector((state) => state.userReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [nombremaxparieurs, setnombremaxparieurs] = useState("");
  const [ducatsmin, setDucatsmin] = useState("");
  const [ducatsmax, setDucatsmax] = useState("");
  const createur = user.pseudo;

  const duree = "5000";
// Gestion d'erreurs de saisie
  const tagError = document.querySelector(".tag.error");
  const libelleError = document.querySelector(".libelle.error");
  const descriptionError = document.querySelector(".description.error");
  const nombremaxparieursError = document.querySelector(
    ".nombremaxparieurs.error"
  );
  const ducatsminError = document.querySelector(".ducatsmin.error");
  const ducatsmaxError = document.querySelector(".ducatsmax.error");

  const handleCreerPari = async (e) => {
    //console.log("Requete lancer pari");
    e.preventDefault();

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/pari`,
      withCredentials: true,
      data: {
        tag,
        libelle,
        description,
        ducatsmin,
        ducatsmax,
        nombremaxparieurs,
        duree,
        createur,
      },
    })
      .then((res) => {
        //console.log(res);
        if (res.data.errors) {
          tagError.innerHTML = res.data.errors.tag;
          libelleError.innerHTML = res.data.errors.libelle;
          descriptionError.innerHTML = res.data.errors.description;
          nombremaxparieursError.innerHTML = res.data.errors.nombremaxparieurs;
          ducatsminError.innerHTML = res.data.errors.ducatsmin;
          ducatsmaxError.innerHTML = res.data.errors.ducatsmax;
        } else {
          handleClose();
          resetForm();
          dispatch(getParis());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
// valeur de départ du formulaire de création de pari
  const resetForm = () => {
    setTag("");
    setLibelle("");
    setDescription("");
    setnombremaxparieurs("");
    setDucatsmin("");
    setDucatsmax("");
  };

  return (
    <>
      <button className="button-pari" onClick={handleShow}>
        Créer un pari
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Créer votre pari:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container" id="creer-pari-form">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="form-group">
                <label>Tag</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="tag"
                  id="tag"
                  autoComplete="off"
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                  value={tag}
                />
                <div
                  className="tag error"
                  style={{ fontWeight: "bold", color: "red" }}
                ></div>
                <br />
              </div>
              <div className="form-group">
                <label>Libellé</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="libelle"
                  id="libelle"
                  autoComplete="off"
                  onChange={(e) => {
                    setLibelle(e.target.value);
                  }}
                  value={libelle}
                />
                <div
                  className="libelle error"
                  style={{ fontWeight: "bold", color: "red" }}
                ></div>
                <br />
              </div>
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                required
                type="text"
                name="description"
                id="description"
                className="form-control"
                autoComplete="off"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
              <div
                className="description error"
                style={{ fontWeight: "bold", color: "red" }}
              ></div>
              <br />
            </div>
            <div className="form-group">
              <label>Nombre de Parieurs max</label>
              <input
                required
                type="text"
                className="form-control"
                name="nombremaxparieurs"
                id="nombremaxparieurs"
                autoComplete="off"
                onChange={(e) => {
                  setnombremaxparieurs(e.target.value);
                }}
                value={nombremaxparieurs}
              />
              <div
                className="nombremaxparieurs error"
                style={{ fontWeight: "bold", color: "red" }}
              ></div>
              <br />
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="form-group">
                <label>Ducats min</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="ducatsmin"
                  id="ducatsmin"
                  autoComplete="off"
                  onChange={(e) => {
                    setDucatsmin(e.target.value);
                  }}
                  value={ducatsmin}
                />
                <div
                  className="ducatsmin error"
                  style={{ fontWeight: "bold", color: "red" }}
                ></div>
                <br />
              </div>
              <div className="form-group">
                <label>Ducats max</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="ducatsmax"
                  id="ducatsmax"
                  autoComplete="off"
                  onChange={(e) => {
                    setDucatsmax(e.target.value);
                  }}
                  value={ducatsmax}
                />
                <div
                  className="ducatsmax error"
                  style={{ fontWeight: "bold", color: "red" }}
                ></div>
                <br />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCreerPari}>
            Valider
          </Button>
          {/* <Button variant="primary" >
            Valider
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreerPariButton;
