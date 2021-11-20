const express = require('express');
const redis = require('redis');

const client = redis.createClient({
	host: 'redis-server',
	port: 6379
});
client.set('visits', 0);
const app = express();

app.get('/', (req, res) => {
	client.get('visits', (err, visits) => {
		client.set('visits', parseInt(visits) + 1);
		if(err) {
			return res.status(400).json({
				status: 'error',
				message: err.message
			});
		}
		res.send('Number of visits ' + visits);
	})
})

app.listen(8080, () => {
	console.log('🚀 Server is listening at 8080');
})
