import { Request, Response } from 'express';
import logger from '../logger';
import { createPosition,
     findByPosition,
      findAllPosition,
       updatePosition,
        deletePosition } from '../repositories/positionRepository';

export const registerPositionController = async (req: Request, res: Response) => {
    try {
        const { position } = req.body;
        if (!position) {
            logger.error('Position is required');
            return res.status(400).send('Position is required');
        }
        await createPosition(position);
        logger.info('Registration sucessful');
        res.status(201).send('Registration successful');
    } catch (error) {
        logger.error('Internal Server Error', error);
        res.status(500).send('Internal Server Error');
    }
}

export const findByPositionController = async (req: Request, res: Response) => {
    try {
        const { position } = req.params;
        const foundPosition = await findByPosition(position);
        if (!foundPosition) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.status(200).json(foundPosition);
    } catch (error) {
        logger.error('Error finding position:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const findAllPositionController = async (req: Request, res: Response) => {
    try {
        const allPosition = await findAllPosition();
        res.status(200).json(allPosition);
    } catch (error) {
        logger.error('Error finding all positions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updatePositionController = async (req: Request, res: Response) => {
    try {
        const { positionId } = req.params;
        const newPositionName = req.body.position;
        await updatePosition(parseInt(positionId), newPositionName);
        res.status(200).json({ message: 'Position updated successfully'});
    } catch (error) {
        logger.error('Error updating position', error);
        res.status(500).json({ message: 'Error updating position'});
    }
}

export const deletePositionController = async (req: Request, res: Response) => {
    try {
        const { positionId } = req.params;
        await deletePosition(parseInt(positionId));
        res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
        logger.error('Error deleting position:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}