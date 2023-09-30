require('dotenv').config()
const http = require('http')
const app = require('./index')
const server = http.createServer(app);
const port = process.env.PORT
server.listen(port)

app.listen(console.log(`O servidor está On na porta ${port}`))