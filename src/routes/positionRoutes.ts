// Rotas de posições (positions)
import express, { Request, Response } from 'express';
import { registerPositionController, findByPositionController, findAllPositionController, updatePositionController, deletePositionController } from '../controllers/positionController';
import { authenticateAdmin} from "../middleware/middlewareAdm";

const router = express.Router();

// Rota para registrar uma nova posição (apenas administradores podem acessar)
router.post('/registerPosition', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        await registerPositionController(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// Rota para buscar uma posição única (apenas administradores podem acessar)
router.get('/getUnique', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        await findByPositionController(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// Rota para buscar todas as posições (apenas administradores podem acessar)
router.get('/getAny', authenticateAdmin, async (req: Request, res: Response) => {
    try {
        await findAllPositionController(req, res)
    } catch (error) {
        console.log('Error in route', error)
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

// Rota para atualizar uma posição por ID (apenas administradores podem acessar)
router.put('/:positionId', authenticateAdmin, async (req, res) => {
    try {
        await updatePositionController(req, res);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para excluir uma posição por ID (apenas administradores podem acessar)
router.delete('/:positionId', authenticateAdmin, async (req, res) => {
    try {
        await deletePositionController(req, res);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
