import { BASE_URL, SERVER_PORT } from './../global/enviroment';
import { Router, Request, Response } from 'express';
import colors from 'colors'
import Server from '../classes/server';
import { connectedUsers } from '../sockets/sockets';

const router = Router();

console.log(colors.green(`[Routes/] Messages: ${BASE_URL}:${SERVER_PORT}/messages`));

// GET Basic request
router.get('/messages', (req: Request, res: Response) => {

    try {

        res.status(200).json({
            ok: true,
            msg: 'Eeverything is fine - GET'
        });

        console.log(colors.green('[Routes/] GET: Response ok from /messages'));

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Server Error - GET'
        });

        console.log(colors.red('[Routes/] GET: Error from /messages'));
        console.log(colors.red(`[Routes/] ${error}`));

    }

});

// POST With elements in the body
router.post('/messages', (req: Request, res: Response) => {

    const msg = req.body.msg;

    const to = req.body.to;

    const payload = {
        to,
        msg
    }

    const server = Server.instance;

    server.io.emit('new-message', payload)

    try {

        res.status(200).json({
            ok: true,
            msg,
            to
        });

        console.log(colors.green('[Routes/] POST: Response ok from /messages'));

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Server Error - POST'
        });

        console.log(colors.red('[Routes/] POST: Error from /messages'));
        console.log(colors.red(`[Routes/] ${error}`));

    }

});

// POST With elements in the url
router.post('/messages/:id', (req: Request, res: Response) => {

    const msg = req.body.msg;

    const to = req.body.to;

    const id = req.params.id;

    const payload = {
        to,
        msg
    }

    const server = Server.instance;

    server.io.in(id).emit('priavate-message', payload)

    try {

        res.status(200).json({
            ok: true,
            msg,
            to,
            id
        });

        console.log(colors.green('[Routes/] POST: Response ok from /messages'));

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Server Error - POST'
        });

        console.log(colors.red('[Routes/] POST: Error from /messages'));
        console.log(colors.red(`[Routes/] ${error}`));

    }

});

router.get('/users', (req: Request, res: Response) => {

    const server = Server.instance;

    try {

        server.io.fetchSockets().then((sokets) => {

            const clients: Object[] = [];

            sokets.forEach(socket => clients.push(socket.id))

            res.status(200).json({
                ok: true,
                clients
            });

        }).catch(error => {

            res.status(500).json({
                ok: false,
                error
            });

        });

        console.log(colors.green('[Routes/] GET: Response ok from /messages'));

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });

        console.log(colors.red('[Routes/] GET: Error from /messages'));
        console.log(colors.red(`[Routes/] ${error}`));

    }

});

router.get('/users/details', (req: Request, res: Response) => {

    try {

        res.status(200).json({
            ok: true,
            clients: connectedUsers.getList()
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });

        console.log(colors.red('[Routes/] GET: Error from /messages'));
        console.log(colors.red(`[Routes/] ${error}`));

    }

});

export default router;