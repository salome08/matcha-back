const express = require('express');

const app = express();
const router = require('./routes');

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});