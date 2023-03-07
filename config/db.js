const mongoose = require("mongoose");
// CONNEXION A LA BASE DE DONNEES
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.vwjr3.mongodb.net/projet-pari",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFondAndModify: false
        }
    )
    // cntroleur de connexion:
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Erreur de connexion à la base de données MongoDB", err));