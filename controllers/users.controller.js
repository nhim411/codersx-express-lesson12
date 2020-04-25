const shortid = require("shortid");

const db = require("../db");
//users index
module.exports.index = (req, res) => {
  res.render("./users", {
    users: db.get("users").value()
  });
};
//users delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};
//users create
module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is required");
  }
  if (req.body.name.length > 30) {
    errors.push("Name must be less than 30 charaters");
  }
  if (errors.length) {
    res.render('./users', {
      users: db.get("users").value(),
      errors: errors,
      values: req.body
    });
    return;
  }
    db.get("users").push(req.body).write();
    res.redirect("/users");

};
//users update
module.exports.getUpdate = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("./users/update", {
    user: user
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  db.get("users")
    .find({ id: id })
    .assign({ name: name })
    .write();
  res.redirect("/users");
};
