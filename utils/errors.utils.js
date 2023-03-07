// GESTION D'ERREURS
module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déja pris!";

  if (err.message.includes("email")) errors.email = "email incorrect!";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum!";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déja enregistré";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déja pris";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "email inconnu!";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas!";

  return errors;
};

module.exports.creerPariErrors = (err) => {
  let errors = {
    tag: "",
    libelle: "",
    description: "",
    nombremaxparieurs: "",
    ducatsmin: "",
    ducatsmax: "",
  };
  if (err.message.includes("tag")) errors.tag = "Tag incorrect!";

  if (err.message.includes("libelle")) errors.libelle = "Libellé incorrect!";

  if (err.message.includes("description"))
    errors.description = "Description incorrecte!";

  if (err.message.includes("nombremaxparieurs"))
    errors.nombremaxparieurs = "Nombre incorrect!";

  if (err.message.includes("ducatsmin"))
    errors.ducatsmin = "Nombre incorrect!";

  if (err.message.includes("ducatsmax"))
    errors.ducatsmax = "Nombre incorrect!";

  return errors;
};
