import express, { Request, Response } from 'express';
import { registerAdministrator,
     getAdministratorByIdController,
      findByEmailAdministratorController,
       updateAdministratorByIdController,
        deleteAdministratorByIdController, 
        loginAdministrator} from '../controllers/administratorController';
import { authenticateAdmin } from '../middleware/middlewareAdm';

const router = express.Router();

router.post('/administrators', async (req: Request, res: Response) => {
    try {
        await registerAdministrator(req, res);
    } catch (error) {
        console.error('Error in registerAdministrator route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/loginAdm', async (req: Request, res: Response) => {
    try {
        await loginAdministrator(req, res);
    } catch (error) {
        console.error('Error while loginAdministrator', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/administrators/:id', async (req: Request, res: Response) => {
    try {
        await getAdministratorByIdController(req, res);
    } catch (error) {
        console.error('Error in getAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/administrators', async (req: Request, res: Response) => {
    try {
        await findByEmailAdministratorController(req, res);
    } catch (error) {
        console.error('Error in findByEmailAdministrator route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/administrators/:id', async (req: Request, res: Response) => {
    try {
        await updateAdministratorByIdController(req, res);
    } catch (error) {
        console.error('Error in updateAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/administrators/:id', async (req: Request, res: Response) => {
    try {
        await deleteAdministratorByIdController(req, res);
    } catch (error) {
        console.error('Error in deleteAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota protegida para o painel do administrador
router.get("/admin/dashboard", authenticateAdmin, (req, res) => {
    res.send("Painel do Administrador");
});

export default router;
