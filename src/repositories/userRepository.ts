import User from '../models/User';
import Position from '../models/Position';
import logger from '../logger';

export const createUser = async (email: string, fullName: string, positionId: number, password: string) => {
  try {
    return await User.create({ email, fullName, positionId, password });
  } catch (error) {
    logger.error('Error creating user:', error);
    throw error;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw new Error('Error while fetching user by ID');
  }
}

export const updateUserById = async (userId: number, newData: Partial<User>) => {
  try {
    const user = await User.findByPk(userId);
    if(!user) {
      throw new Error('User not found');
    }
    await User.update(newData, { where: { id: userId}});
    return user;
  } catch (error) {
    throw new Error('Error while updating user by ID');
  }
}

export const deleteUserById = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    if(!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return 'User deleted successfully';
  } catch (error) {
    throw new Error('Error while deleting user by ID')
  }
}

export const getAPIKey = async (id: number, apiKey: string) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.apiKey = apiKey;
      await user.save();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    logger.error('Error updating user API key:', error);
    throw error;
  }
};

export const findByEmailAndPosition = async (email: string, positionId: number) => {
  try {
    const user = await User.findOne({
      where: { email, positionId }, // Incluindo o positionId como filtro
      include: [{ model: Position, as: 'position' }]
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const findByEmail = async (email: string) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    logger.error('Error finding user:', error);
    throw error;
  }
};
