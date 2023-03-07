const PariModel = require("../models/pari.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

const { creerPariErrors } = require("../utils/errors.utils");

module.exports.readParis = async (req, res) => {
  PariModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.creerPari = async (req, res) => {
  const newPari = new PariModel({
    tag: req.body.tag,
    libelle: req.body.libelle,
    description: req.body.description,
    nombremaxparieurs: req.body.nombremaxparieurs,
    ducatsmin: req.body.ducatsmin,
    ducatsmax: req.body.ducatsmax,
    duree: req.body.duree,
    createur: req.body.createur,
    participants: [],
    montants: [],
    choix: [],
    resultat: "notYet",
  });

  try {
    const pari = await newPari.save();
    return res.status(201).json(pari);
  } catch (err) {
    console.log(err);
    const errors = creerPariErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.parier = async (req, res) => {
  /*console.log(
    "essai controleur avec ducats=" +
      req.body.ducats_paries +
      " , user id =  " +
      req.body.id +
      ", pari id= " +
      req.params.id +
      " et ducats min/max = " +
      req.body.ducatsmin +
      " / " +
      req.body.ducatsmax //+
      //" , et réponse =" + req.body.choix
  );*/
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  // if (req.body.ducats==0) return

  const ducatsmin_max = await PariModel.findById(req.params.id).exec();
  // console.log(
  //   "find() = " + ducatsmin_max.ducatsmin + " / " + ducatsmin_max.ducatsmax
  // );

  if (
    Number(req.body.ducats_paries) <= ducatsmin_max.ducatsmax &&
    Number(req.body.ducats_paries) >= ducatsmin_max.ducatsmin
  ) {
    //TODO : REPLACE CHOIX BOOLEAN VALUES BY STRING "0" OR "1"
    PariModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          //createur: req.body.createur,
          participants: req.body.id,
        },
        $push: {
          montants: req.body.ducats_paries,
          choix: req.body.choix,
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $inc: { ducats: -Number(req.body.ducats_paries) },
      },
      { new: true },
      (err, docs) => {
        if (!err) console.log("success");
        else console.log("Update error : " + err);
      }
    );
  } else console.log("Erreur lors de la saisie des ducats, veuillez réessayer"); // A MODIFIER
};

//TODO: CHANGER LE RESULTAT A "done" APRES RETRIBUTION
//
module.exports.retributionPari = async (req, res) => {
  //récurer les data du pari concerné
  pari = await PariModel.findById(req.params.id).exec();

  //récuperer le montant total parié
  total_parie = pari.montants.reduce((a, b) => Number(a) + Number(b), 0);
  //console.log(total_parie);

  //récupérer les id des participants

  //on trie les id: gagnants/perdants
  var indexes_false = [];
  var indexes_true = [];

  pari.choix.forEach((element, index) => {
    if (element === false) {
      indexes_false.push(index);
    }
    if (element === true) {
      indexes_true.push(index);
    }
  });

  //montant total de ceux qui ont parié true
  var montant_true = [];
  for (var i = 0; i < indexes_true.length; i++) {
    montant_true.push(pari.montants[indexes_true[i]]);
  }

  //montant total de ceux qui ont parié false
  var montant_false = [];
  for (var i = 0; i < indexes_false.length; i++) {
    montant_false.push(pari.montants[indexes_false[i]]);
  }

  //somme des montants true|false
  somme_montants_false = montant_false.reduce(
    (a, b) => Number(a) + Number(b),
    0
  );
  somme_montants_true = montant_true.reduce((a, b) => Number(a) + Number(b), 0);

  // console.log(indexes_false);
  // console.log(indexes_true);

  var ids_false = [];
  var ids_true = [];

  indexes_false.forEach((element) => {
    ids_false.push(pari.participants[element]);
  });

  indexes_true.forEach((element) => {
    ids_true.push(pari.participants[element]);
  });

  //console.log("false :");
  //console.log(ids_false);
  //console.log("true :");
  //console.log(ids_true);

  //distribuer la somme entre les gagnants
  //
  //Si le résultat du pari est 'false'
  if (pari.resultat === "f") {
    ids_false.forEach(async (element, index) => {
      var montant_pari = pari.montants[pari.participants.indexOf(element)];
      //Le site prend 2% des gains
      var somme_deductible = 0.02 * somme_montants_false;
      var somme_ttc = somme_montants_false - somme_deductible;
      //
      var ratio_f = montant_pari / somme_ttc;
      //Arrondir les Ducats.
      var result = Math.round(ratio_f * total_parie);
      //console.log("result = " + result);
      await UserModel.findByIdAndUpdate(
        element,
        {
          $inc: { ducats: result },
        },
        {
          new: true,
        },
        (err, docs) => {
          if (err) console.log("Update error : " + err);
        }
      );
    });

    PariModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          resultat: "Done",
        },
      },
      { new: true },
      (err, docs) => {
        if (err) console.log("Update error : " + err);
      }
    );
  }
  //
  //Si le résultat du pari est 'true'
  if (pari.resultat === "t") {
    ids_true.forEach(async (element, index) => {
      var montant_pari = pari.montants[pari.participants.indexOf(element)];
      //Le site prend 2% des gains
      var somme_deductible = 0.02 * somme_montants_true;
      var somme_ttc = somme_montants_true - somme_deductible;
      //
      var ratio_t = montant_pari / somme_ttc;
      //Arrondir les Ducats.
      var result = Math.round(ratio_t * total_parie);
      console.log("result = " + result);
      await UserModel.findByIdAndUpdate(
        element,
        {
          $inc: { ducats: result },
        },
        {
          new: true,
        },
        (err, docs) => {
          if (err) console.log("Update error : " + err);
        }
      );
    });

    PariModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          resultat: "Done",
        },
      },
      { new: true },
      (err, docs) => {
        if (err) console.log("Update error : " + err);
      }
    );
  }
  //
  //
  //TODO :Mettre à jour l'attribut result à "done" pour éviter les retributions après la première fois
  //
  res.status(200).send(pari.resultat);
};
//

module.exports.deletePari = async (req, res) => {
  //console.log("hello delete pari");
  pari = await PariModel.findById(req.params.id).exec();
  if (!ObjectID.isValid(req.params.id)) {
    //|| pari.createur !== req.body.id) {
    return res.status(400).send("ERREUR ID  : " + req.params.id);
  }

  //TODO à terminer
  try {
    await PariModel.remove({ _id: pari._id }).exec();
    res.status(200).json({ message: "successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//TODO: OPTIMISER LE CODE EN DESSOUS ET AJOUTER
//      DES CONTRÔLES (doit être !== "notYet" par exemple).
//
module.exports.pariSetTrue = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PariModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        resultat: "t",
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
module.exports.pariSetFalse = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PariModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        resultat: "f",
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
//

module.exports.resetPropsPari = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PariModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        resultat: "notYet",
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
