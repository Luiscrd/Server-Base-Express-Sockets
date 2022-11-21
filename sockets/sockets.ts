import { Socket } from 'socket.io';
import colors from 'colors'

export const connect = () => {

    console.log(colors.magenta('[Sockets] Client =>'), colors.green('(connected)'));

}

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {

        console.log(colors.magenta('[Sockets] Client =>'), colors.red('(disconnected)'));

    });

}

export const message = (client: Socket) => {

    client.on('message', (payload: { to: string, msg: string }) => {

        console.log(colors.magenta(`[Sockets] Message: (${payload.to}) => "${payload.msg}"`));

    });

}