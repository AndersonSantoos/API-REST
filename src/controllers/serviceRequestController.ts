import { Request, Response } from "express";
import logger from "../logger";
import * as serviceRequestRepository from "../repositories/serviceRequestRepository";
import { findByEmailAndPosition } from "../repositories/userRepository";
declare module "express" {
  interface Request {
    user?: { email: string; positionId: number };
  }
}

const rolesWithPermissionToCreate = [1, 2]; // Lista de cargos permitidos representados como números

export const openServiceRequest = async (req: Request, res: Response) => {
  try {
    const { descricao } = req.body;
    const user = req.user;

    // Verificar se o usuário está autenticado
    if (!user || !user.email || !user.positionId) {
      return res.status(401).send("Unauthorized");
    }
    const { email, positionId } = user;

    // Verificar se o positionId do usuário está na lista de cargos permitidos para criar solicitações
    if (!positionId || !rolesWithPermissionToCreate.includes(positionId)) {
      logger.info("PositionId do usuário:", positionId);
      return res
        .status(403)
        .send("User is not allowed to create service requests");
    }

    // Buscar o usuário pelo email e positionId para garantir que ele existe e tem permissões adequadas
    const foundUser = await findByEmailAndPosition(email, positionId);

    if (!foundUser) {
      return res.status(404).send("User not found");
    }
    await serviceRequestRepository.createServiceRequest(
      descricao,
      foundUser.id,
      positionId,
      email
    );
    res.status(201).send("Service request created successfully");
  } catch (error) {
    logger.error("Error opening service request:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllServiceRequests = async (req: Request, res: Response) => {
  try {
    const serviceRequests =
      await serviceRequestRepository.getAllServiceRequests();
    res.json(serviceRequests);
  } catch (error) {
    logger.error("Error fetching service requests:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateServiceRequestController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { solicitacaoServico } = req.body;
  try {
    const updatedServiceRequest =
      await serviceRequestRepository.updateServiceRequest(
        parseInt(id),
        solicitacaoServico
      );
    return res.status(200).json(updatedServiceRequest);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update service request" });
  }
};

export const deleteServiceRequestController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await serviceRequestRepository.deleteServiceRequest(parseInt(id));
    return res
      .status(200)
      .json({ message: "Service request deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete service request" });
  }
};
