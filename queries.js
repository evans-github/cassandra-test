
const Pool = require('pg').Pool
const cassandra = require('cassandra-driver');
const pool = new Pool({
  host: 'event-io.cxbutbbhppuw.us-east-1.rds.amazonaws.com',
  user: 'bootymage69',
  password: 'Penguin6130752',
  database: 'eventio_database',
  port: 5432
})

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });

const getFollowing = (request, response) => {


  const id = request.params.id;

  client.connect()
  .then(function () {
    return client.execute('SELECT * FROM test_keyspace.users');
  })
  .then(function (result) {
    const row = result.rows[0];
    console.log('Obtained row: ', row);
    response.status(200).json(result.row);
  })
  .catch(function (err) {
    console.error('There was an error when connecting', err);
    return client.shutdown().then(() => { throw err; });
  });





      var query_following =
      `SELECT f.following_id, u.username, u.name, u.profile_pic FROM table_following f
      LEFT JOIN users u ON
      f.following_id = u.user_id WHERE f.user_id = $1`;

      pool.query(query_following, [id], (error, results) => {
        if(error){
          throw error;
        }

        console.log("Results: " + JSON.stringify(results));
        //response.status(200).json(results.rows);
      });



};


module.exports = {
  getFollowing
}
