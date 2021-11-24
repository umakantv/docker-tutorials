const keys = require('./keys.js');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())

const {Pool} = require('pg')
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
});

pgClient.on('error', () => console.error('Lost pg connection'));

pgClient.query('CREATE TABLE IF NOT EXISTS values(number INT)')
	.catch(err => console.error(err))

const redis = require('redis')
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: 1000,
});

const redisPublisher = redisClient.duplicate()
redisClient.hset('values', 0, 1)

app.get('/', (req, res) => {
	res.send('Hi')
})

app.get('/values/all', async (req, res) => {
	const values = await pgClient.query('SELECT * from values');

	return res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
	redisClient.hgetall('values', (err, values) => {
		// console.log('Finished getting')
		if(err) {
			console.log(err);
			return res.status(500).send(err.message)
		}
		console.log({values});
		res.send(values);
	});
});

app.post('/values', async (req, res) => {
	const index = req.body.index;

	if (parseInt(index) > 40) {
		return res.status(422).send('Index too high');
	}

	redisClient.hset('values', index, 'We are calculating this.');
	redisPublisher.publish('insert', index);
	pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

	res.send({working: true});
});

app.listen(5000, (err) => {
	console.log('Listening on port 5000');
})
