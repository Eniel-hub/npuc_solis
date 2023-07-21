const db = require("../_db/db.service");
const helper = require("../utils/helper");

//Get
const GetUser = async (ID) => {
  const result = await db.Query("SELECT * FROM web_admin_user WHERE ID = ?", [
    ID,
  ]);
  const admin = helper.EmptyOrRows(result);
  return admin;
};

const ChangePassword = async (admin) => {
  await db.Query(
    `UPDATE web_admin_user SET hash = ?, salt = ?
        WHERE ID = ?`,
    [admin.hash, admin.salt, admin.ID]
  );
};

module.exports = {
  GetUser,
  ChangePassword,
};
