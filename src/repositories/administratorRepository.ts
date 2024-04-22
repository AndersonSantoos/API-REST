import Administrator from '../models/Administrator';

export const createAdministrator = async (nome: string, cargo: string, email: string, senha: string, isAdmin: boolean) => {
    try {
        return await Administrator.create({ nome, cargo, email, senha, isAdmin });
    } catch (error) {
        console.error('Error creatind administrator', error);
        throw error;
    }
}

export const getAdministratorById = async (id: number) => {
    try {
        const administrator = await Administrator.findByPk(id);
        return administrator;
    } catch (error) {
        throw new Error('Error while fetching user by ID');
    }
}

export const findByEmailAdministrator = async (email: string) => {
    try {
        return await Administrator.findOne({ where: { email }});
    } catch (error) {
        console.error('Error finding administrator', error);
        throw error;
    }
}

export const updateAdministratorById = async (id: number, newData: Partial<Administrator>) => {
        try {
            const administrator = await Administrator.findByPk(id);
            if(!administrator) {
                throw new Error('User not found');
            }
            await Administrator.update(newData, { where: {id: id}});
            return administrator;
        } catch (error) {
            throw new Error('Error while updating administrator by ID');
        }
}

export const deleteAdministratorById = async (id: number) => {
    try {
        const administrator = await Administrator.findByPk(id);
        if(!administrator) {
            throw new Error('Administrator not found');
        }
        await administrator.destroy();
        return 'Administrator deleted successfully';
    } catch (error) {
        throw new Error('Error while deleting administrator by ID');
    }
}