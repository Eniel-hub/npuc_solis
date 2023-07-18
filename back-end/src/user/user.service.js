const db = require("../_db/db.service");
const helper = require("../utils/helper");

//Get
const GetUser = async (username) => {
  const result = await db.Query(
    "SELECT * FROM student_login WHERE username = ?",
    [username]
  );
  const user = helper.EmptyOrRows(result);
  return user;
};

const GetUserI = async (ID) => {
  const result = await db.Query(
    "SELECT * FROM student_login WHERE student_id = ?",
    [ID]
  );
  const user = helper.EmptyOrRows(result);
  return user;
};

const CreateUser = async (newUser) => {
  if (newUser.student_id) {
    await db.Query(
      `INSERT INTO student_login (username, hash, salt, student_id)
            VALUES (?, ?, ?, ?)`,
      [newUser.username, newUser.hash, newUser.salt, newUser.student_id]
    );
  } else {
    await db.Query(
      `INSERT INTO student_login (username, hash, salt)
            VALUES (?, ?, ?)`,
      [newUser.username, newUser.hash, newUser.salt]
    );
  }
};

const ChangePassword = async (user) => {
  await db.Query(
    `UPDATE student_login SET hash = ?, salt = ?
        WHERE username = ?`,
    [user.hash, user.salt, user.username]
  );
};

// const updateProfilePicture = async (user) => {
//   await db.Query(
//     "INSER INTO student_login (profile_picture) VALUES ? WHERE username = ?",
//     [user.profile_picture, user.username]
//   );
// };

const deleteAcc = async (user) => {
  await db.Query(`DELETE FROM student_login WHERE username = ?`, [
    user.username,
  ]);
};

const setProfilePicture = async (profilePicture, user) => {
  console.log(profilePicture);
  await db.Query(
    "UPDATE student_login SET profile_picture = ? WHERE username = ?",
    [profilePicture.data, user.username]
  );
};

module.exports = {
  GetUser,
  GetUserI,
  deleteAcc,
  CreateUser,
  ChangePassword,
  // updateProfilePicture,
  setProfilePicture,
};
