import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });

})
router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload)


    res.json({
        ok: true,
        cuerpo,
        de,
    });

})
router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload)


    res.json({
        ok: true,
        cuerpo,
        de,
        id,
    });

})

// Servicio para obtener id de usuarios
router.get('/usuarios', async (req: Request, res: Response) => {
    const clientes:string[] = [];
    const server = Server.instance;
    await server.io.fetchSockets().then( socketsList => {
        socketsList.forEach(socket =>{
            clientes.push(socket.id)
        })
        res.json({
            ok: true,
            clientes
        });

    }).catch(error => {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    });
})
// Servicio para obtener detalle de usuarios
router.get('/usuarios/detalles', async (req: Request, res: Response) => {

   res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
});
})


export default router