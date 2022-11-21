import { Socket, Server } from 'socket.io';
import colors from 'colors'

export const connect = () => {

    console.log(colors.magenta('[Sockets] Client =>'), colors.green('(connected)'));

}

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {

        console.log(colors.magenta('[Sockets] Client =>'), colors.red('(disconnected)'));

    });

}

export const message = (client: Socket, io: Server) => {

    client.on('message', (payload: { to: string, msg: string, date: string }) => {

        console.log(colors.magenta(`[Sockets] Message: (${payload.to}) -${payload.date}- => "${payload.msg}"`));

        io.emit('new-message', payload);

    });

}

export const configUser = (client: Socket, io: Server) => {

    client.on('config-user', (payload: { name: string, img: string }, callback: Function) => {

        console.log(colors.magenta(`[Sockets] User config: ${payload.name}`));

        // io.emit('new-message', payload);

        callback({
            ok: true,
            msg: `User ${payload.name}, configurado`,
            img: payload.img
        })

    });

}