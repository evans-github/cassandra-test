
const Pool = require('pg').Pool
const pool = new Pool({
  host: 'event-io.cxbutbbhppuw.us-east-1.rds.amazonaws.com',
  user: 'bootymage69',
  password: 'Penguin6130752',
  database: 'eventio_database',
  port: 5432
})

const getFollowing = (request, response) => {


    const id = request.params.id;


      var query_following =
      `SELECT f.following_id, u.username, u.name, u.profile_pic FROM table_following f
      LEFT JOIN users u ON
      f.following_id = u.user_id WHERE f.user_id = $1`;

      pool.query(query_following, [id], (error, results) => {
        if(error){
          throw error;
        }

        response.status(200).json(results.rows);
      });



};


module.exports = {
  getFollowing
}
