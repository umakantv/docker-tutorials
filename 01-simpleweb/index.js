const express = require('express');

const app = express();

function logger(req, res, next) {
	console.log(new Date(), req.method, req.url);
	next();
}

app.get('/', (req, res, next) => {
	res.send('Hi there.');
	next();
})

app.use(logger);

app.listen(8080, () => {
	console.log('🚀 Server running at 8080');
})