import { Socket } from 'socket.io';
import colors from 'colors'

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {

        console.log(colors.magenta('[Sockets] Client =>'), colors.red('(disconnected)'));

    })

}