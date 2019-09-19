
const Pool = require('pg').Pool
const cassandra = require('cassandra-driver');
const pool = new Pool({
  host: 'event-io.cxbutbbhppuw.us-east-1.rds.amazonaws.com',
  user: 'bootymage69',
  password: 'Penguin6130752',
  database: 'eventio_database',
  port: 5432
})

const client = new cassandra.Client({ contactPoints: ['3.229.137.212'], localDataCenter: 'datacenter1' });

const getFollowing = (request, response) => {


    const id = request.params.id;

    client.connect()
  .then(function () {
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
    console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
    console.log('Shutting down');
    return client.shutdown();
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

        response.status(200).json(results.rows);
      });



};


module.exports = {
  getFollowing
}
