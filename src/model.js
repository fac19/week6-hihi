const db = require("./database/connection");

// functions that select/insert data to the DB go here

function deleteListing(id) {

    return db.query("DELETE FROM posts WHERE id = $1", [id])
        .then(result => {
            // console.log("QUERY RESULTS:", result);
            return result.rowCount === 1;
        });

}


function getOnlyPostsTable() {
    return db.query("SELECT * FROM posts;")
        .then(result => {
            console.log("IN QUERY", result.rows);
            return result.rows;
        });
}

function getAllUsers() {
   return db.query(`SELECT * FROM users;`)
    .then(result => {
        return result.rows;
    }); 
}

function getAllListings() {
    return db.query(
        `SELECT posts.title, posts.time, posts.category, posts.post
        FROM posts
        RIGHT JOIN users
        ON users.id = posts.user_id 

        `
        ).then(result => {
         return result.rows;
     }); 
 }

//  function allPosts(request, response) {
//     db.query(
//       `
//       SELECT users.username, blog_posts.text_content
//       FROM blog_posts 
//       LEFT JOIN users
//       ON users.id = blog_posts.user_id
//       ORDER BY users.id;
//       `
//     ).then(result => {
//       const posts = result.rows;
//       const postsList = posts.map(
//         post => `
//         <li>
//           <p>${post.text_content}</p>
//           <div>${post.username}</p>
//         </li>
//       `
//       );
//       response.writeHead(200, { "content-type": "text/html" });
//       response.end(`<ul>${postsList.join("")}</ul>`);
//     });
//   }


module.exports = { deleteListing, getOnlyPostsTable, getAllUsers };
