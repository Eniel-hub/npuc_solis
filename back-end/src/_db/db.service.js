const dbconfig = require('./db.config')[0];
const mysql = require('promise-mysql2');

//create a new connection to the databse
const ConnectToDatabase = async () =>{
  let connection = mysql.createConnection(dbconfig);
  console.log(`connected to database ${dbconfig.database}...`)
  return connection;
}

//end the connection with the database
const EndConnection = (connection) =>{
  console.log(`connection with database ${dbconfig.database} ended.`)
  connection.end();
}

//execute the query
async function Query (sql, parms) {
    let conn = await ConnectToDatabase()
    let [result, ] = await conn.query(sql, parms);
    EndConnection(conn);
  return result;
}

  
module.exports = { Query };