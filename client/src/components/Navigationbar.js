import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
import CreerPariButton from "./Pari/CreerPariButton";

const Navigationbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // LA BARRE DE NAVIGATION
  return (
    <div className="fixed-top">
      <Navbar style={{ backgroundColor: "#000000" }}>
        <NavLink exact to="/">
          <div className="logo">
            <Navbar.Brand>
              <img
                src="https://i.imgur.com/9ur8V4P.png"
                className="d-inline-block align-top"
                alt=""
              />{" "}
              {/* WinnerPro */}
            </Navbar.Brand>
          </div>
        </NavLink>
        <div>
          <h6 style={{ color: "white", paddingLeft: "20px" }}>
            FAMILLE, VIE SOCIALE, SANTÉ FINANCIÈRE
            <br></br>
            ÊTES-VOUS PRÊT À TOUT MISER?
            <br></br>POUR ÊTRE AIDÉ, APPELEZ LE 09-74-75-13-13 (APPEL NON
            SURTAXÉ)
          </h6>
        </div>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        <Form inline>
          <Nav className="mr-auto">
            {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info" className="mr-2">Search</Button>*/}
            {/* <Button variant="outline-info" className="mr-2">S'inscrire</Button> */}

            {uid ? ( // Vérifier si l'utilisatisateur est connecté pour afficher son pseudo et ducats
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingRight: "20px",
                  }}
                >
                  <img
                    alt="ducats"
                    src="https://i.imgur.com/7EsJ0UK.png"
                    className=""
                    style={{ width: "32px", alignSelf: "center" }}
                  ></img>
                  <h5 className="" style={{ color: "white" }}>
                    {userData.ducats}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingRight: "20px",
                  }}
                >
                  <img
                    alt="user"
                    src="https://i.imgur.com/wyy7SUo.png"
                    className=""
                    style={{ width: "32px", alignSelf: "center" }}
                  ></img>
                  <h5 className="" style={{ color: "white" }}>
                    {userData.pseudo}
                  </h5>
                </div>
                <Logout />
              </>
            ) : (
              <NavLink exact to="/login">
                <div className="login-button-navbar">
                  <Button variant="outline-info">Login</Button>
                </div>
              </NavLink>
            )}
          </Nav>
        </Form>
      </Navbar>

      {uid ? (
        <>
          <Navbar variant="dark" style={{ backgroundColor: "#000000" }}>
            <CreerPariButton />
            <Nav className="mr-auto">
              <Link to="/">
                <button className="button-pari">Home</button>
              </Link>
              <Link to="/All-paris">
                <button className="button-pari">Les paris</button>
              </Link>
              {userData.admin === true ? (
                <Link to="/Administration">
                  <button className="button-pari">Administration</button>
                </Link>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar>
        </>
      ) : (
        <></>
      )}

      {/* <Nav.Link href="#Flash">Paris flash</Nav.Link>
          <Nav.Link href="#Manuels">Paris manuels</Nav.Link> */}
    </div>
  );
};

export default Navigationbar;
