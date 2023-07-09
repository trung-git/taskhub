const Finder = require("../models/finderModel");
const Tasker = require("../models/taskerModel");
const { ROLE } = require("./constantVariables");

const getObjectModel = (role) => {
  const masterRole = Object.entries(ROLE).map((v) => v[1]);
  if (!masterRole.includes(role)) {
    return false;
  }
  return role === ROLE.TASKER ? Tasker : Finder;
};


module.exports = { getObjectModel };
