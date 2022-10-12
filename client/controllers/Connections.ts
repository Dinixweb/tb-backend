import Api404Error from '../../global/errors/ApiError404'
import Api400Error from '../../global/errors/Api400Error'
import * as Modals from '../../global/models/index'
import path from 'path'
import cloudinary from '../../global/utils/cloudinaryConfig'
import DatauriParser from 'datauri/parser'
import { v4 as uuidv4 } from 'uuid';
import { Op, where } from 'sequelize'




const parser = new DatauriParser();

export async function getMyConnections(req, res) {
    const { userId } = req.params;
    try {
        const connectionList = Modals.UserModels;
        const getAllConnection = await connectionList.Connection.findAll({include:{model:connectionList.default,attributes:['firstName','lastName']}, where:{senderUserId:userId}})
        res.status(200).send(getAllConnection)
    } catch (err) {
        res.status(404).send(
            new Api404Error()
        )
    }
} 
export async function addConnection(req, res) {
    const { senderUserId, receiverUserId } = req.body
    
    const payload = { senderUserId, receiverUserId }
   
    try {
        const connectionRef = Modals.UserModels.Connection;
        const isConnectionExist = await connectionRef.findAll({
            where: {
                receiverUserId: receiverUserId,
                senderUserId: senderUserId,
                requestStatus: {
                    [Op.or]: ['request pendind', 'request confirmed']
                }
            }
        });
        payload['clientAccountUserId'] = receiverUserId;
        if (isConnectionExist.length <= 0) {
            await connectionRef.create(payload);
            res.status(201).send({
                message: 'request sent successfully'
            })
        } else {
            return res.status(200).send({
                message: "connection already exist"
            })
        }
    } catch (err) {
        return res.status(400).send(
            new Api400Error(0)
        )
    }
}

export async function GetAllClients(req, res) {
    const { userId } = req.params;
    const { name, location, advertType } = req.query;
    try {
        const getAllClients = Modals.UserModels
        const clientList = getAllClients.default.findAll({ include: { model: getAllClients.Connection } })
        req.status(200).send(clientList)
    } catch (err) {
        res.status(404).send(new Api404Error())
    }
}