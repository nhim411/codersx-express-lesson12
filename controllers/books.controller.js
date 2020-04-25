const shortid = require("shortid");

const db = require('../db');
//books index
module.exports.index = (req, res) => {
  res.render('./books', {
    books: db.get('books').value()
  });
};
//books delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
};
//books create
module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};
//books update
module.exports.getUpdate = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("./books/update", {
    book: book
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  db.get("books")
    .find({ id: id })
    .assign({ title: title, description: description })
    .write();
  res.redirect("/books");
};
