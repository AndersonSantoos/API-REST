import express, { Request, Response } from "express";
import { registerUser, getUserByIdController, updateUserByIdController, deleteUserByIdController, login } from "../controllers/userController";
import { authenticateAdmin} from "../middleware/middlewareAdm";
import { authenticateToken} from "../middleware/Middleware";

const router = express.Router();

// Rota para registrar um novo usuário (apenas administradores podem acessar)
router.post("/register", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Rota para logar um administrador (apenas administradores podem acessar)
router.post('/login', async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

// Rota para buscar um usuário por ID (apenas administradores podem acessar)
router.get('/users/:userId', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdController(req, res);
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para atualizar um usuário por ID (apenas administradores podem acessar)
router.put('/users/:userId', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updateUser = await updateUserByIdController(req, res);
    res.status(200).json(updateUser);
  } catch (error) {
    console.error('Error in route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para excluir um usuário por ID (apenas administradores podem acessar)
router.delete('/users/:userId', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await deleteUserByIdController(req, res);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error in route:', error);
    res.status(500).json('Internal server error');
  }
});

export default router;
