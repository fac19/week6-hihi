const db = require("./database/connection");

// THE BELOW DOES NOT PROTECT AGAINST SQL INJECTION FOR POST REQUESTS
// function getTools(filter){
//     return db.query(`SELECT * FROM user_input WHERE category LIKE '${filter}'`).then(result => result.rows);;
// }

// THE BELOW DOES PROTECT AGAINST SQL INJECTION (HOPEFULLY)
function getTools(filter) {
  return db
    .query("SELECT * FROM user_input WHERE category LIKE ($1)", [`${filter}`])
    .then((result) => result.rows);
}

function createTool(userEntry) {
  const values = [
    userEntry.category,
    userEntry.tool_name,
    userEntry.tool_description,
    userEntry.tool_link,
    userEntry.added_by,
    userEntry.love,
  ];
  return db.query(
    "INSERT INTO user_input(category, tool_name, tool_description, tool_link, added_by, love) VALUES($1, $2, $3, $4, $5, $6)",
    values
  );
}

function addLove(id) {
  return db.query(`
    UPDATE user_input
    SET love = love + 1
    WHERE id = ${id}
    `);
}

function checkOriginalUsername(data) {
  const values = [data.username, data.password];

  return db
    .query("SELECT * FROM users WHERE username = $1", [data.username])
    .then((match) => {
      return !match.rowCount;
      //returns false if username already exists
    });
}

function createNewUser(data) {
  const values = [data.username, data.password];
  return db.query(
    `INSERT INTO users(username, password) VALUES($1, $2)`,
    values
  );
}

function getSpecificUser(username) {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((match) => {
      return !!match.rowCount;
      //returns true if user exists
    });
}

function getUsers() {
  return db.query(`SELECT * FROM users`).then((result) => result.rows);
}

function deletePostFromDatabase(deleteId) {
  return db.query(`DELETE FROM user_input WHERE id = $1`, [+deleteId]);
}

module.exports = {
  getTools,
  createTool,
  addLove,
  checkOriginalUsername,
  createNewUser,
  getSpecificUser,
  getUsers,
  deletePostFromDatabase,
};
