const mongoose = require("mongoose");

const PariSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
    },
    libelle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nombremaxparieurs: {
      type: Number,
      required: true,
    },
    ducatsmin: {
      type: Number,
      required: true,
    },
    ducatsmax: {
      type: Number,
      required: true,
    },
    duree: {
      type: String,
      required: true,
    },
    createur: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
    montants: {
      type: [String],
      required: true,
    },
    choix: {
      type: [Boolean],
      required: true,
    },
    resultat:{
      type:String,
    },
  },
  {
    timestamps: true,
  }
);

// PariSchema.statics.pari = async function (idpari, ducats) {
//   const pari = await this.findOne({ idpari });

// };

module.exports = mongoose.model("pari", PariSchema);
