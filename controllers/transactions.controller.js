const shortid = require("shortid");

const db = require('../db');

module.exports.index = (req, res) => {
  res.render("transactions/index", {
    transactions: db.get("transactions").value(),
  });
}

module.exports.getCreate = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
}

module.exports.isComplete = (req, res) => {
  db.get('transactions')
    .find({ id: req.params.id })
    .assign( { isComplete: true } )
    .write();
  res.redirect('/transactions');
};