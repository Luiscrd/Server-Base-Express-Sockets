import { Socket, Server } from 'socket.io';
import colors from 'colors'
import { ListUsers } from '../classes/list-users';
import { User } from '../classes/user';

export const connectedUsers = new ListUsers();

export const connectClient = (client: Socket, io: Server) => {

    const user = new User(client.id);

    connectedUsers.add(user);

    console.log(colors.magenta('[Sockets] Client =>'), colors.green('(connected)'));

}

export const disconnect = (client: Socket, io: Server) => {

    client.on('disconnect', () => {

        connectedUsers.deleteUser(client.id);
     
        console.log(colors.magenta('[Sockets] Client =>'), colors.red('(disconnected)'));

        io.emit('actived-users', connectedUsers.getList());

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

        connectedUsers.updateName(client.id, payload.name, payload.img)

        console.log(colors.magenta(`[Sockets] User config: ${payload.name}`));

        // io.emit('new-message', payload);

        io.emit('actived-users', connectedUsers.getList());

        callback({
            ok: true,
            msg: `User ${payload.name}, configurado`,
            img: payload.img,
            id: client.id
        })

    });

}

export const seendUsers = (client: Socket, io: Server) => {

    client.on('seend-users', () => {

        io.to(client.id).emit('actived-users', connectedUsers.getList());

    });

}