import Administrator from '../models/Administrator';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { createAdministrator,
    getAdministratorById,
    findByEmailAdministrator,
    updateAdministratorById,
    deleteAdministratorById
 } from './../repositories/administratorRepository';

export const registerAdministrator = async (req: Request, res: Response) => {
    try {
        const { nome, cargo, email, senha, confirmSenha, isAdmin } = req.body;
        if(!nome || !cargo || !email || !senha || !confirmSenha || !isAdmin) {
            console.error('All fields are required');
        }
        if(confirmSenha !== confirmSenha) {
            console.error('Senhas do not match');
            return res.status(400).send('Senhas do not match')
        }
        const hashedSenha = await bcrypt.hash(senha, 10);
        await createAdministrator(nome, cargo, email, hashedSenha, isAdmin);
        console.log('Registration successful');
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).send('Internal Server Error')
    }
}

export const getAdministratorByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const administrator = await getAdministratorById(parseInt(id, 10));
        if(!administrator) {
            return res.status(404).send('Administrator not found');
        }
        res.status(200).json(administrator);
    } catch (error) {
        console.error('Error in getAdministratorByIdController', error);
        res.status(500).json({ error: 'Internal server error'})
    }
}

export const findByEmailAdministratorController = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Invalid email parameter' });
        }
        const administrator = await findByEmailAdministrator(email);
        if (!administrator) {
            return res.status(404).json({ error: 'Administrator not found' });
        }
        res.status(200).json(administrator);
    } catch (error) {
        console.error('Error in findByEmailAdministratorController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateAdministratorByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const administratorId = parseInt(id, 10);
        const newData = req.body;
        const updatedAdministrator = await updateAdministratorById(administratorId, newData);
        res.status(200).json(updatedAdministrator);
    } catch (error) {
        console.error('Error in updateAdministratorByIdController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteAdministratorByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const administratorId = parseInt(id, 10);
        const result = await deleteAdministratorById(administratorId);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error in deleteAdministratorByIdController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginAdministrator = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        const administrator = await Administrator.findOne({ where: { email } });
        if (!administrator) {
            return res.status(401).send('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(senha, administrator.senha);
        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }
        const token = jwt.sign({ email: administrator.email, isAdmin: administrator.isAdmin }, process.env.JWT_SECRET as string);
        req.session.token = token;
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};