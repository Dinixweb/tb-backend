import Api404Error from '../../global/errors/ApiError404'
import Api400Error from '../../global/errors/Api400Error'
import * as Modals from '../../global/models/index'
import path from 'path'
import cloudinary from '../../global/utils/cloudinaryConfig'
import DatauriParser from 'datauri/parser'
import { randomUUID } from 'crypto'
import { Sequelize } from 'sequelize'


const parser = new DatauriParser();


/**
 * Create new post (feeds)
 * @param req 
 * @param res 
 * @returns 
 */
export async function CreatePost(req, res) {
    const { userId, postType, postTitle, postDescription, postAddress, postPrice, numberOfPersons } = req.body
    const ImageId = randomUUID()
    const postId = randomUUID();
    
    try {
        const extName = path.extname(req.file.originalname).toString();
        const file64 = parser.format(extName, req.file.buffer);
        const imagePath = file64.content;
        //const postPayload = { userId, postType, postTitle, postDescription }

        const profielImage = Modals.UserModels.ProfileImageUpload
        
       
        const uploadResponse = await cloudinary.uploader.upload(imagePath, { upload_preset: "Post", public_id: ImageId })

        profielImage['imageList'] = uploadResponse.secure_url
        profielImage['imageId'] = ImageId;
        profielImage['userAdPostId'] = postId

        //create a post        
        await Modals.UserModels.UserAds.create({
            postId:postId,
            userId: userId,
            postType: postType,
            postTitle: postTitle,
            postDescription: postDescription,
            postAddress: postAddress,
            postPrice: postPrice,
            numberOfPersons:numberOfPersons
        })
        await Modals.UserModels.ProfileImageUpload.create(profielImage)
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
    try {
        const UserFeeds = Modals.UserModels
        const allUserPost = await UserFeeds.UserAds.findAll({ include:{model:UserFeeds.ProfileImageUpload}})
        res.status(200).send(allUserPost);
    } catch (err) {
        console.log(err)
        return res.status(400).send(
            new Api404Error()
        )
    }
}

// Get Adverts based on userId
export async function getAllAdverts(req, res) {
    const {userId} =req.params
    try {
        const UserFeeds = Modals.UserModels
        const allUserPost = await UserFeeds.UserAds.findAll({
            include: [
                {model: UserFeeds.ProfileImageUpload},
                {
                    model: UserFeeds.ShownInterestModel,
                    include:[UserFeeds.default]
                }
            ], where: { userId: userId }
        })
        res.status(200).send(allUserPost);
    } catch (err) {
        console.log(err)
        return res.status(400).send(
            new Api404Error()
        )
    }
}


// Show Interest
export async function CreateInterest(req, res){
    const { userId, postId, location } = req.body
    try {
        const showInterest = Modals.UserModels.ShownInterestModel;
        showInterest['userAdPostId'] = postId;
        showInterest['clientAccountUserId'] = userId;
        showInterest['location'] = location

        const addInterest = Modals.UserModels.ShownInterestModel;
        addInterest['userAdPostId'] = postId
        await addInterest.create(showInterest)
        res.status(201).send({
            message:"Request sent successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(400).send(new Api400Error())
    }
}