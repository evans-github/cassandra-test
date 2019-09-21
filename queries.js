
const cassandra = require('cassandra-driver');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });

const getFollowing = (request, response) => {

  wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('I got your message: ' + message);
  });


});


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
  getFollowing
}
