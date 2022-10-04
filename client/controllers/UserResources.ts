import Api404Error from '../../global/errors/ApiError404'
import Api400Error from '../../global/errors/Api400Error'
import * as Modals from '../../global/models/index'
import path from 'path'
import cloudinary from '../../global/utils/cloudinaryConfig'
import DatauriParser from 'datauri/parser'
import { randomUUID } from 'crypto'

const parser = new DatauriParser();


/**
 * Create new post (feeds)
 * @param req 
 * @param res 
 * @returns 
 */
export async function CreatePost(req, res) {
    const { userId, postType, postTitle, postDescription } = req.body
    const ImageId = randomUUID()
    
    try {
        const extName = path.extname(req.file.originalname).toString();
        const file64 = parser.format(extName, req.file.buffer);
        const imagePath = file64.content;
        const postPayload = { userId, postType, postTitle, postDescription }

        const uploadResponse = await cloudinary.uploader.upload(imagePath, { upload_preset: "Post", public_id: ImageId })
        
        await Modals.UserModels.UserAds.create(postPayload)
        res.status(201).send({
            message:"post created successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send(
            new Api400Error()
        )
  }
}

export async function getAllPost(req, res) {
    const  {userId} = req.params
    try {
        const allUserPost = await Modals.UserModels.UserAds.findAll()
        console.log(allUserPost)
        res.status(200).send(allUserPost);
    } catch (err) {
        return res.status(400).send(
            new Api404Error()
        )
    }
}