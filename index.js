const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(config.port, () => console.log(`App is running on url: http://localhost:${config.port}`))
