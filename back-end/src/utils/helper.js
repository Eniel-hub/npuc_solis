const { readdir } = require("fs/promises");
const formData = require("form-data");
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const fs = require("fs");

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

function FormatDate(d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let Date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  return Date;
}

function GetCurrentDate() {
  let d = new Date();
  let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return date;
}

function getUrlFromImg(imgPath) {
  return new Promise((resolve, reject) => {
    const params = {
      host: process.env.CLOUD_HOST,
      key: process.env.CLOUD_KEY,
      action: process.env.CLOUD_ACTION,
      format: process.env.CLOUD_FORMAT,
    };

    let form = new formData();
    form.append("source", fs.createReadStream(imgPath));

    axios
      .post(
        `${params.host}?key=${params.key}&action=${params.action}&format=${params.format}`,
        form
      )
      .then((res) => {
        resolve(res.data.image.url);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

async function getPathOfImg(user_id) {
  const matchedFiles = [];
  const files = await readdir(`${process.cwd()}/public/profilepictures/`);
  for (const file of files) {
    const filename = path.parse(file).name;

    if (filename.match(`user_00${user_id}`)) {
      matchedFiles.push(file);
    }
  }
  return matchedFiles;
}

module.exports = {
  swap,
  toHash,
  FullName,
  FormatDate,
  GenPassword,
  EmptyOrRows,
  getPathOfImg,
  getUrlFromImg,
  GetCurrentDate,
};
