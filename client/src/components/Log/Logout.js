import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Button } from "react-bootstrap";

// gestion des cookies
const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  //Decpnnexion
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };
 
  return (
    <>
      <div className="login-button-navbar" onClick={logout}>
        <Button variant="outline-danger" alt="logout">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Logout;
