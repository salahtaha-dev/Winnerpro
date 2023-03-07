import React, { useState } from "react";
import axios from "axios";

// PAGE D'INSCRIPTION
const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      withCredentials: true,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        //console.log(res);
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "15px" }}>
      <form className="container" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            required
            type="pseudo"
            className="form-control"
            name="pseudo"
            id="pseudo"
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
            value={pseudo}
          />
          <div
            className="pseudo error"
            style={{ fontWeight: "bold", color: "red" }}
          ></div>
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <div
            className="email error"
            style={{ fontWeight: "bold", color: "red" }}
          ></div>
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            required
            title="Doit contenir au moins un chiffre et une lettre majuscule et minuscule, et au moins 6 caractères ou plus"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            minLength="6"
            maxLength="20"
            type="password"
            name="password"
            id="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <div
            className="password error"
            style={{ fontWeight: "bold", color: "red" }}
          ></div>
          <br />
        </div>
        <div className="form-group"></div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            className="btn btn-primary"
            type="submit"
            value="S'inscrire"
          ></input>
        </div>
        {/*JSON.stringify(this.state)*/}
      </form>
    </div>
  );
};

export default SignUpForm;
