const bodyParser = require("body-parser");
const express = require("express");
const uuid = require("uuid");

const router = express.Router();

router.use(bodyParser.json());

const dpas = [
  {
    "_id": 1,
    "title":"DPA - Nestlé vs NY",
    "text":"Texte intégrale du jugement (Long), à terme peut etre un fichier à télécharger",
    "date":"25/07/2019",
    "amount":"100$",
    "labels":[
      "Endettement Excessif",
      "Défaut de conseil"
    ]
  },
  {
    "_id": 2,
    "title":"DPA - ACME vs NY",
    "text":"Texte intégrale du jugement",
    "date":"03/04/2010",
    "amount":"40000$",
    "labels":[
      "Défaut de conseil"
    ]
  }
];

router.get("/api/dpas", (req, res) => {
  const orderedDpas = dpas.sort((t1, t2) => t2._id - t1._id);
  res.send(orderedDpas);
});

router.post("/api/dpa", (req, res) => {
  const { title, text } = req.body;
  const newDpa = {
    _id: uuid(),
    title: title,
    text: text
  };
  dpas.push(newDpa);
  res.send({ message: "DPA Saved" });
});

module.exports = router;
