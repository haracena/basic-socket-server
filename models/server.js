// servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path'); // viene en express
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http Server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configs */
    });
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('server corriendo en puerto 8080');
    });

    // Inicializar sockets
    this.configurarSockets();
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    // Desplegar directorio public
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }
}

module.exports = Server;
