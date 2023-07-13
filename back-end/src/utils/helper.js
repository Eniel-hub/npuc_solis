const crypto = require("crypto");

function EmptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function isEmpty(arr) {
  if (arr.length === 0) return true;
  return false;
}

function FullName(fname, lname, midname) {
  return `${fname}, ${lname} ${midname}`;
}

function swap([first, second]) {
  let temp = first;
  first = second;
  second = temp;
  return [first, second];
}

function toHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 60, "sha512").toString("hex");
}

function GenPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = toHash(password, salt);
  return { salt, hash };
}

function GetCurrentDate() {
  let d = new Date();
  let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return date;
}

module.exports = {
  EmptyOrRows,
  FullName,
  swap,
  toHash,
  GenPassword,
  GetCurrentDate,
};
