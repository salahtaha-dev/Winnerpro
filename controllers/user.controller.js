const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  //console.log(req.params);
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } // console.log(docs)}
    else console.log("ID inconnu" + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  /*try{
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {

                }
            }
        )
    }*/
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.profiterOffre = async (req, res) => {
  //Mise a jour et retribution des pari
  UserModel.findByIdAndUpdate(
    req.body.id_user,
    {
      $addToSet: {
        offres: req.body.numero_offre,
      },
      $inc: {
        ducats: req.body.ducats,
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
  //
};
