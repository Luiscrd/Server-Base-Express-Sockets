import express from 'express';
import { Server as ioServer } from 'socket.io';
import http from 'http';
import colors from 'colors'
import { SERVER_PORT } from '../global/enviroment';

export default class Server {
    
    public app: express.Application;

    public port: number;

    public io: ioServer;

    private httpServer: http.Server;

    constructor() {
        
        this.app = express();

        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        this.io = new ioServer(this.httpServer);

        this.listenSockets();

    }

    private listenSockets() {

        console.log(colors.magenta('[Servers] Sockets: Listener'));

        this.io.on('connection', client => {

            console.log(colors.magenta('[Servers] Sockets: New Client connected'));

        })

    }

    start(callback: any) {

        this.httpServer.listen(this.port, callback);

    }


}