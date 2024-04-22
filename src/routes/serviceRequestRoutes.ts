import express from 'express';
import { Request, Response } from 'express';
import { openServiceRequest,
       getAllServiceRequests,
       updateServiceRequestController,
       deleteServiceRequestController  } from '../controllers/serviceRequestController'; 
import { authenticateToken } from '../middleware/Middleware'; 

const router = express.Router();

// Rota para abrir uma solicitação de serviço
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        await openServiceRequest(req, res);
    } catch (error) {
        console.error('Error in openServiceRequest route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota para obter todas as solicitações de serviço
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        await getAllServiceRequests(req, res);
    } catch (error) {
        console.error('Error getting service request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

  router.put('/service-requests/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      await updateServiceRequestController(req, res);
    } catch (error) {
      console.error('Error in updateServiceRequest route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.delete('/service-requests/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
      await deleteServiceRequestController(req, res);
    } catch (error) {
      console.error('Error in deleteServiceRequest route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;
