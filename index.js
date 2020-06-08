const express = require('express');
const reddis = require('redis');

const app = express();
const client = reddis.createClient({
  host: 'redis-server',
  port: 6379,
});

client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('listen on port 8081');
});
