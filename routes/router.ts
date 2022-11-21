import { BASE_URL, SERVER_PORT } from './../global/enviroment';
import { Router, Request, Response } from 'express';
import colors from 'colors'

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

    const body = req.body.body;

    const to = req.body.to;

    try {

        res.status(200).json({
            ok: true,
            msg: 'Eeverything is fine - POST',
            body,
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

    const id = req.params.id;

    try {

        res.status(200).json({
            ok: true,
            msg: 'Eeverything is fine - POST',
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

export default router;