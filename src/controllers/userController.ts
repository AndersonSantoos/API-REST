// userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../logger';
import Position from '../models/Position';
import { createUser,
          findByEmailAndPosition,
            getAPIKey,
              findByEmail,
                getUserById,
                  updateUserById,
                    deleteUserById } from '../repositories/userRepository';
  
// Controlador para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, fullName, positionId, password, confirmPassword } = req.body;
    if (!email || !fullName || !positionId || !password || !confirmPassword) {
      logger.error('All fields are required');
      return res.status(400).send('All fields are required');
    }
    if (password !== confirmPassword) {
      logger.error('Passwords do not match');
      return res.status(400).send('Passwords do not match');
    }
    // Verifica se o cargo (positionId) fornecido na requisição existe na tabela Position
    const position = await Position.findByPk(parseInt(positionId)); // Convertendo para número
    if (!position) {
      logger.error('Position not found');
      return res.status(404).send('Position not found');
    }
    // Agora que temos o cargo válido, criamos o usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, fullName, position.id, hashedPassword); // Passa o ID do cargo
    logger.info('Registration successful');
    res.status(201).send('Registration successful');
  } catch (error) {
    logger.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(parseInt(userId, 10));
    if(!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByIdController', error);
    res.status(500).json({ error: 'Internal server error'})
  }
};

export const updateUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newData = req.body;
    const updateUser = await updateUserById(parseInt(userId, 10), newData);
    res.status(200).json(updateUser);
  } catch (error) {
    console.error('Error in updateUserByIdController', error);
    res.status(500).json({ error: 'Internal server error'});
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserById(parseInt(userId, 10));
    return result; // retornar o resultado para ser tratado na rota
  } catch (error) {
    console.error('Error in deleteUserByIdController:', error);
    throw new Error('Error while deleting user by ID');
  }
};
// Controlador para fazer login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, positionId } = req.body;

    if (!email || !password || !positionId) {
      logger.error('Email, password, and positionId are required');
      return res.status(400).send('Email, password, and positionId are required');
    } 
    const user = await findByEmailAndPosition(email, parseInt(positionId)); // Convertendo para número
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.error('Invalid credentials');
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ email: user.email, positionId: user.positionId }, process.env.JWT_SECRET as string);
    req.session.token = token;
    logger.info('Login successful');
    res.status(200).send('Login successful');
  } catch (error) {
    logger.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controlador para gerar uma chave de API
export const generateAPIKey = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      console.error('Invalid user data');
      return res.status(403).send('Invalid user data');
    }
    const user = await findByEmail(req.user.email); // Busca o usuário pelo email
    if (!user) {
      console.error('User not found');
      return res.status(404).send('User not found');
    }
    if (!user.positionId) { // Verifica se positionId está presente no usuário
      console.error('PositionId not found');
      return res.status(400).send('PositionId not found');
    }
    if (user.apiKey) {
      console.error('User already has an API key');
      return res.status(400).send('User already has an API key');
    }
    const apiKey = generateAPIKeyIfNeeded();
    await getAPIKey(user.id, apiKey); // Passa o ID do usuário
    res.json({ apiKey });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Função para gerar uma chave de API aleatória, caso necessário
const generateAPIKeyIfNeeded = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 32;
  let apiKey = '';
  for (let i = 0; i < length; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return apiKey;
};
