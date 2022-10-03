import Api404Error from '../../global/errors/ApiError404'
import Api400Error from '../../global/errors/Api400Error'
import { UserModels } from '../../global/models'
import * as Modals from '../../global/models/index'


/**
 * Create new post (feeds)
 * @param req 
 * @param res 
 * @returns 
 */
export async function CreatePost(req, res) {
    const { userId, postType, postTitle, postDescription } = req.body
    
    try {
        const postPayload = { userId, postType, postTitle, postDescription }

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