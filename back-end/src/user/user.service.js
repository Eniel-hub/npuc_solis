const db = require('../_db/db.service');
const helper = require('../utils/helper');

//Get 
const GetUser = async (username) =>{
    const result = await db.Query(
        'SELECT * FROM student_login WHERE username = ?',
        [username]
    );
    const user = helper.EmptyOrRows(result);
    return user;
}

const CreateUser = async(newUser) =>{
    await db.Query(
        `INSERT INTO student_login (username, hash, salt)
        VALUES (?, ?, ?)`,
        [newUser.username, newUser.hash, newUser.salt]
    );
}

const ChangePassword = async (user) =>{
    await db.Query(
        `UPDATE student_login SET hash = ?, salt = ?
        WHERE username = ?`,
        [user.hash, user.salt, user.username]
    );
}

const AddProfilePicture = async (user) => {
    await db.Query(
        'INSER INTO student_login (profile_picture) VALUES ? WHERE username = ?',
        [user.profile_picture, user.username]
    )
}

const ChangeProfilePicture = async (user) => {
    await db.Query(
        'UPDATE student_login SET profile_picture = ? WHERE username = ?',
        [user.profile_picture, user.username]
    )
}

module.exports = {
    GetUser,
    CreateUser,
    ChangePassword,
    AddProfilePicture,
    ChangeProfilePicture
};