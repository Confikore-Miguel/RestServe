require('dotenv').config();

const Server = require('./models/server')

const serve= new Server();

serve.listen();