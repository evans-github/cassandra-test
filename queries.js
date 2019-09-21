
const cassandra = require('cassandra-driver');
//const WebSocket = require('ws');
//const ws = new WebSocket('ws://ec2-3-229-137-212.compute-1.amazonaws.com:3000');


const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });

const getStreaming = (request, response) => {
    console.log('STREAMING BRO TEST 1');
    response.status(200).json("IM STREAMING");
};

const getFollowing = (request, response) => {


  const id = request.params.id;
  console.log("UserId: " + id);

  client.connect()
  .then(function () {
    return client.execute('SELECT * FROM test_keyspace.users');
  })
  .then(function (result) {
    const row = result.rows;
    console.log('Obtained row: ', row);
    response.status(200).json(result.rows);
  })
  .catch(function (err) {
    console.error('There was an error when connecting', err);
    return client.shutdown().then(() => { throw err; });
  });




};


module.exports = {
  getFollowing,
  getStreaming
}
