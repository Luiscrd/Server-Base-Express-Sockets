import express from 'express';
import { Server as ioServer } from 'socket.io';
import http from 'http';
import colors from 'colors'
import { SERVER_PORT } from '../global/enviroment';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    
    public app: express.Application;

    public port: number;

    public io: ioServer;

    private httpServer: http.Server;

    private constructor() {
        
        this.app = express();

        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        this.io = new ioServer(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });

        this.listenSockets();

    }

    public static get instance() {

        return this._instance || (this._instance = new this());

    }

    private listenSockets() {

        console.log(colors.magenta('[Servers] Sockets: Listener'));

        this.io.on('connection', client => {

            socket.connect();

            // console.log(colors.magenta('[Servers] Sockets: Client =>'), colors.green('(connected)'));

            socket.message(client);

            socket.disconnect(client);

        })

    }

    start(callback: any) {

        this.httpServer.listen(this.port, callback);

    }


}