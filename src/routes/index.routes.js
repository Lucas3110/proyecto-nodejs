import {Router} from 'express';


const router = Router()

router.get('/employees', (req, res) => res.send('obteniendo empleados'))







export default router