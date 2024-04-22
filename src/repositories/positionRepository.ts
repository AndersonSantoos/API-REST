import Position from '../models/Position';

export const createPosition = async ( position: string ) => {
    try {
        return await Position.create({ position });
    } catch (error) {
        console.error('Error creating position');
        throw error;
    }
}

export const findByPosition = async ( position: string ) => {
    try {
        return await Position.findOne({ where: { position }})
    } catch (error) {
        console.log('Error finding position');
        throw error;
    }
}

export const findAllPosition = async () => {
    try {
        return await Position.findAll();
    } catch (error) {
        console.log('Erro ao encontrar todos os cargos');
        throw error;
    }
}

export const updatePosition = async (positionId: number, newPositionName: string) => {
    try {
        const position = await Position.findByPk(positionId);
        if (!position) {
            throw new Error('Position not found');
        }
        position.position = newPositionName;
        return await position.save();
    } catch (error) {
        console.error('Error updating position');
        throw error;
    }
}

export const deletePosition = async (positionId: number) => {
    try {
        const position = await Position.findByPk(positionId);
        if (!position) {
            throw new Error('Position not found');
        }
        return await position.destroy();
    } catch (error) {
        console.error('Error deleting position');
        throw error;
    }
}
