// repositories/serviceRequestRepository.ts
import logger from '../logger';
import ServiceRequest from '../models/serviceRequest';

export const createServiceRequest = async (descricao: string, userId: number, positionId: number, email: string) => {
  try {
    return await ServiceRequest.create({ descricao, solicitacaoServico: descricao, userId, positionId, email });
  } catch (error) {
    logger.error('Error creating service request:', error);
    throw error;
  }
};

export const getAllServiceRequests = async () => {
  try {
    return await ServiceRequest.findAll();
  } catch (error) {
    logger.error('Error fetching service requests:', error);
    throw error;
  }
};

export const updateServiceRequest = async (id: number, solicitacaoServico: string) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(id);
    if (!serviceRequest) {
      throw new Error('Service request not found');
    }
    serviceRequest.solicitacaoServico = solicitacaoServico;
    await serviceRequest.save();
    return serviceRequest;
  } catch (error) {
    logger.error('Error updating service request:', error);
    throw error;
  }
};

export const deleteServiceRequest = async (id: number) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(id);
    if (!serviceRequest) {
      throw new Error('Service request not found');
    }
    await serviceRequest.destroy();
    return { message: 'Service request deleted successfully' };
  } catch (error) {
    logger.error('Error deleting service request:', error);
    throw error;
  }
};
