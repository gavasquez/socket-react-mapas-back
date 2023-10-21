const Marcadores = require("./marcadores");


class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
        this.marcadores = new Marcadores();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            //TODO: Marcadores Activos
            socket.emit('marcador-activos', this.marcadores.activos);

            //TODO: Marcador Nuevo
            socket.on('marcador-nuevo', (marcador) => {
                this.marcadores.agregarMarcador(marcador);
                //* broadcast para que emita a todos los demas clientes y uno al que lo creo porque a el que lo creo ya le aparece.
                socket.broadcast.emit('marcador-nuevo', marcador);
            });
            //TODO: Marcador Actualizado
            socket.on('marcador-actualizado', (marcador) => {
                this.marcadores.actualizarMarcador(marcador);
                socket.broadcast.emit('marcador-actualizado', marcador);
            });
        });
    }


}


module.exports = Sockets;