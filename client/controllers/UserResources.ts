import Api404Error from "../../global/errors/ApiError404";
import Api400Error from "../../global/errors/Api400Error";
import * as Modals from "../../global/models/index";
import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
import { v4 as uuidv4 } from "uuid";

const parser = new DatauriParser();

/**
 * Create new post (feeds)
 * @param req
 * @param res
 * @returns
 */
export async function CreatePost(req, res) {
  const {
    userId,
    postType,
    postTitle,
    postDescription,
    postAddress,
    postPrice,
    numberOfPersons,
  } = req.body;
  //const ImageId = uuidv4();
  const postId = uuidv4();

  try {
    // const extName = path.extname(req.file.originalname).toString();
    // const file64 = parser.format(extName, req.file.buffer);
    // const imagePath = file64.content;
    //const postPayload = { userId, postType, postTitle, postDescription }

    // const profielImage = Modals.UserModels.ProfileImageUpload;

    // const uploadResponse = await cloudinary.uploader.upload(imagePath, {
    //   upload_preset: "Post",
    //   public_id: ImageId,
    // });

    //profielImage["imageList"] = uploadResponse.secure_url;
    // profielImage["imageId"] = ImageId;
    // profielImage["userAdPostId"] = postId;

    //create a post
    await Modals.UserModels.UserAds.create({
      postId: postId,
      userId: userId,
      postType: postType,
      postTitle: postTitle,
      postDescription: postDescription,
      postAddress: postAddress,
      postPrice: postPrice,
      numberOfPersons: numberOfPersons,
    });
    //await Modals.UserModels.ProfileImageUpload.create(profielImage);
    res.status(201).send({
      message: "post created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(new Api400Error());
  }
}

export async function getAllPost(req, res) {
  try {
    const UserFeeds = Modals.UserModels;
    const allUserPost = await UserFeeds.UserAds.findAll({
      include: {
        model: UserFeeds.default,
        attributes: ["firstName", "lastName", "profileImage"],
      },
    });
    res.status(200).send(allUserPost);
  } catch (err) {
    console.log(err);
    return res.status(400).send(new Api404Error());
  }
}

// Get Adverts based on userId
export async function getAllAdverts(req, res) {
  const { userId } = req.params;
  try {
    const UserFeeds = Modals.UserModels;
    const allUserPost = await UserFeeds.UserAds.findAll({
      include: [
        {
          model: UserFeeds.ProfileImageUpload,
          attributes: ["imageId", "imageList"],
        },
        {
          model: UserFeeds.ShownInterestModel,
          attributes: ["interestId", "location", "interestCount"],
          include: [
            {
              model: UserFeeds.default,
              attributes: ["userId", "firstName", "lastName"],
            },
          ],
        },
      ],
      where: { userId: userId },
    });
    res.status(200).send(allUserPost);
  } catch (err) {
    console.log(err);
    return res.status(400).send(new Api404Error());
  }
}

// Show Interest
export async function CreateInterest(req, res) {
  const { userId, postId, location } = req.body;
  try {
    const showInterest = Modals.UserModels.ShownInterestModel;
    showInterest["userAdPostId"] = postId;
    showInterest["clientAccountUserId"] = userId;
    showInterest["location"] = location;
    showInterest["interestCount"] = 1;

    const interestExist = await Modals.UserModels.ShownInterestModel.findAll({
      attributes: ["userAdPostId", "clientAccountUserId"],
    });
    const addUserInterest = async () => {
      const addInterest = Modals.UserModels.ShownInterestModel;
      addInterest["userAdPostId"] = postId;
      await addInterest.create(showInterest);
      return res.status(201).send({
        message: "Request sent successfully",
      });
    };
    if (interestExist.length <= 0) {
      addUserInterest();
    } else {
      for (const data of interestExist) {
        if (
          data.userAdPostId === postId &&
          data.clientAccountUserId === userId
        ) {
          return res
            .status(400)
            .send({ message: "user interest already added" });
        } else {
          addUserInterest();
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(new Api400Error());
  }
}

export async function createSplit(req, res) {
  const { postId, userId, userInterestedList, adPrice, paidAmount } = req.body;
  const payload = { postId, userId, userInterestedList, adPrice, paidAmount };
  const splitId = uuidv4();
  try {
    payload["splitId"] = splitId;
    const createNewSplit = Modals.UserModels.SplitModel;
    const addSplit = await createNewSplit.create(payload);
    if (!addSplit)
      return res
        .status(400)
        .send({ message: "unable to create split check payload" });

    const addNewInterestList = [];
    const createSplitList = Modals.UserModels.UserInterested;
    for (const data of userInterestedList) {
      data["splitListSplitId"] = splitId;
      addNewInterestList.push(createSplitList.create(data));
    }
    await Promise.all(addNewInterestList);
    res.status(200).send({ message: "split created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send(new Api400Error());
  }
}

export async function getSplitRequest(req, res) {
  const { userId } = req.params;
  try {
    const splitModelQuery = Modals.UserModels;
    const getInSplitRequest = await splitModelQuery.SplitModel.findAll({
      include: { model: splitModelQuery.UserInterested },
      where: { userId: userId },
    });
    res.status(200).send(getInSplitRequest);
  } catch (err) {
    return res.status(404).send(new Api404Error());
  }
}
export async function acceptSplitRequest(req, res) {
  const { splitId, userId } = req.body;
  const payload = { splitId, userId };
  try {
    const acceptSplit = Modals.UserModels;
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function PNRSearch(req, res) {
  const { prnNumber, firstName } = req.params;
}
