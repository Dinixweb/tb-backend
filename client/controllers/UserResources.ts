import Api404Error from "../../global/errors/ApiError404";
import Api400Error from "../../global/errors/Api400Error";
import * as Modals from "../../global/models/index";
import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import sequelize from "sequelize/types/sequelize";
import * as _ from "lodash";
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
    link,
  } = req.body;
  //const ImageId = uuidv4();
  const postId = uuidv4();
  const adId = uuidv4();

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
      advertId: adId,
      adRerunTimes: 1,
      postType: postType,
      link: link,
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

export async function RemovePost(req, res) {
  const { postId, userId } = req.body;
  try {
    const deletePost = Modals.UserModels.UserAds;
    await deletePost.destroy({ where: { userId: userId, postId: postId } });
    res.status(200).send({ message: "post deleted successfully" });
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

// Get all Feeds
export async function getAllPost(req, res) {
  const { adType, minPrice, maxPrice, offset, limit } = req.query;
  try {
    const offsetInt: number = parseInt(offset, 10);
    const limitInt: number = parseInt(limit, 10);
    const UserFeeds = Modals.UserModels;
    if (!offset || !limit)
      return res.status(400).send({
        message:
          "api requires page limit and offset in order to fetch required data",
      });
    if (adType && !minPrice && !maxPrice) {
      const allUserPost = await UserFeeds.UserAds.findAll({
        limit: limitInt,
        offset: offsetInt,
        where: { postType: adType },
        include: {
          model: UserFeeds.default,
          attributes: ["firstName", "lastName", "profileImage"],
        },
      });

      return res.status(200).send(allUserPost);
    } else if (adType !== "" && minPrice && maxPrice) {
      const allUserPost = await UserFeeds.UserAds.findAll({
        limit: limitInt,
        offset: offsetInt,
        where: {
          postType: adType,
          postPrice: { [Op.between]: [minPrice, maxPrice] },
        },
        include: {
          model: UserFeeds.default,
          attributes: ["firstName", "lastName", "profileImage"],
        },
      });
      return res.status(200).send(allUserPost);
    } else {
      const allUserPost = await UserFeeds.UserAds.findAll({
        limit: limitInt,
        offset: offsetInt,
        include: {
          model: UserFeeds.default,
          attributes: ["firstName", "lastName", "profileImage"],
        },
      });
      return res.status(200).send(allUserPost);
    }
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

export async function createWishlist(req, res) {
  const payload = { ...req.body };
  try {
    const addWishlist = Modals.UserModels;
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function emailParserResource(req, res) {
  const payload = { ...req.body };
  try {
    res.send(req.body);
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function CreateTravelRecord(req, res) {
  const payload = { ...req.body };
  const setupType = payload["setupRef"];
  try {
    const addTravelRecord = Modals.UserModels.TravelersModel;
    if (setupType !== "initial")
      return res
        .status(400)
        .send({ message: "check to ensure the right setup ref" });
    const getUserPnr = await addTravelRecord.findAll({
      where: { pnrNumber: payload["pnrNumber"] },
    });
    if (getUserPnr.length >= 1)
      return res.send({ message: "pnr record already added" });
    await addTravelRecord.create(payload);
    res.status(201).send({ message: "pnr record addded successfully" });
  } catch (err) {
    console.log(err);
    res.send(new Api400Error());
  }
}
export async function UpdateTravelRecord(req, res) {
  const payload = { ...req.body };

  const setupType = payload["finalStage"];
  try {
    const addTravelRecord = Modals.UserModels.TravelersModel;
    if (!setupType) return;
    await addTravelRecord.update(payload, {
      where: { travellerId: payload["travellerId"] },
    });
  } catch (err) {
    res.send(new Api400Error());
  }
}

export async function GetAllPnrRecord(req, res) {
  // eslint-disable-next-line prefer-const
  let {
    departureAirport,
    destination,
    dateFrom,
    dateTo,
    saveWishlist,
    searchType,
  } = req.query;
  const { userId } = req.params;
  try {
    if (!departureAirport)
      return res.send({
        message: "search requires departureAiport",
      });
    const getAllRecord = Modals.UserModels.TravelersModel;
    const userProfile = Modals.UserModels.default;

    let clause = new Object();
    if (departureAirport && destination && dateFrom && dateTo) {
      clause = { departureAirport, destination, dateFrom, dateTo };
    } else if (departureAirport && destination && dateFrom) {
      clause = { departureAirport, destination, dateFrom };
    } else if (departureAirport && destination) {
      clause = { departureAirport, destination };
    } else if (departureAirport && !destination) {
      clause = { departureAirport };
    } else if (destination && !departureAirport) {
      clause = { destination };
    }
    const PNRSearch = async () => {
      let allRecords = await getAllRecord.findAll({
        where: { ...clause },
        attributes: [
          "travellerId",
          "firstName",
          "surName",
          "userId",
          "image",
          "dateFrom",
          "departureDate",
          "departureAirport",
          "destination",
        ],
      });

      const addWish = Modals.UserModels.AddWishListModel;
      if (saveWishlist === "true") {
        destination = !destination ? "" : destination;
        departureAirport = !departureAirport ? "" : departureAirport;
        dateFrom = !dateFrom ? "" : dateFrom;
        dateTo = !dateTo ? "" : dateTo;
        const getWish = await addWish.findAll({
          where: {
            destination: destination,
            departureAirport: departureAirport,
            userId: userId,
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        });

        // eslint-disable-next-line no-empty
        if (getWish.length > 0) {
        } else {
          const payload = {
            departureAirport,
            destination,
            dateFrom,
            dateTo,
            userId,
          };

          await addWish.create(payload);
        }
      }

      if (allRecords.length <= 0)
        return res.send({ message: "no data available" });

      const profileImage = [];
      for (const data of allRecords) {
        profileImage.push(
          userProfile.findOne({
            where: { userId: data.userId },
            attributes: ["profileImage"],
          })
        );
      }
      let [profile] = await Promise.all(profileImage);

      profile = !profile ? "" : profile.dataValues;

      allRecords.forEach((a) => {
        a = profile;
        return a;
      });
      allRecords = allRecords.map((a) => a).reverse();

      const groupedByMonthAndYear = allRecords.reduce((result, item) => {
        const year = item.departureDate.substring(6, 10);
        const month = item.departureDate.substring(5, 3);

        const day = item.departureDate.substring(0, 2);
        const key = `${year}-${month}`;

        if (!result[key]) {
          result[key] = {};
        }

        if (!result[key][day]) {
          result[key][day] = [];
        }

        result[key][day].push(item);

        return result;
      }, {});

      res.status(200).send(groupedByMonthAndYear);
    };
    const wishListSearch = async () => {
      const wishlist = Modals.UserModels.AddWishListModel;
      let getAllWish = await wishlist.findAll({ where: { userId: userId } });
      const profileImage = [];
      for (const data of getAllWish) {
        profileImage.push(
          userProfile.findOne({
            where: { userId: data.userId },
            attributes: ["profileImage"],
          })
        );
      }
      let [profile] = await Promise.all(profileImage);

      profile = !profile ? "" : profile.dataValues;

      getAllWish.forEach((a) => {
        a = profile;
        return a;
      });
      getAllWish = getAllWish.map((a) => a).reverse();

      const groupedByMonthAndYear = getAllWish.reduce((result, item) => {
        const year = item.dateFrom.substring(6, 10);
        const month = item.dateFrom.substring(5, 3);

        const day = item.dateFrom.substring(0, 2);
        const key = `${year}-${month}`;

        if (!result[key]) {
          result[key] = {};
        }

        if (!result[key][day]) {
          result[key][day] = [];
        }

        result[key][day].push(item);

        return result;
      }, {});

      res.status(200).send(groupedByMonthAndYear);
    };
    if (searchType === "wishList") {
      wishListSearch();
    } else if (searchType === "pnrSearch") {
      PNRSearch();
    } else {
      return res.send({ message: "set searchType" });
    }
  } catch (err) {
    console.log(err);
    res.send(new Api404Error());
  }
}

export async function GetWishList(req, res) {
  const { userId } = req.params;
  try {
    const wishlist = Modals.UserModels.AddWishListModel;
    const getAllWish = await wishlist.findAll({ where: { userId: userId } });
    res.send(getAllWish);
  } catch (err) {
    console.log(err);
  }
}

export async function CreateInterestList(req, res) {
  const payload = { ...req.body };
  try {
    const addInterest = Modals.UserModels;
    const interestArr = [];
    const interest = await addInterest.InterestListModal.findOne({
      where: { userId: payload.userId },
    });
    if (!interest) {
      await addInterest.InterestListModal.create(payload);
      const interest = await addInterest.InterestListModal.findOne({
        where: { userId: payload.userId },
      });
      const interestId = interest.interestId;
      const interestListInterestId = interestId;
      for (const data of payload.interestValues) {
        const values = data.values;
        const payloads = { values, interestId, interestListInterestId };
        interestArr.push(addInterest.InterestValuesModal.create(payloads));
      }
      await Promise.all(interestArr);
    } else {
      const interestId = interest.interestId;
      for (const data of payload.interestValues) {
        const values = data.values;
        const payloads = { values, interestId };
        interestArr.push(addInterest.InterestValuesModal.create(payloads));
      }
    }
    return res.status(201).send({ message: "interest added successfully" });
  } catch (err) {
    console.log(err);
    res.send(new Api400Error());
  }
}

export async function GetAreaOfInterest(req, res) {
  const { userId } = req.params;
  try {
    const getAllInterest = Modals.UserModels.InterestListModal;
    const getInterest = await getAllInterest.findAll({
      attributes: ["interestId", "userId"],
      include: {
        model: Modals.UserModels.InterestValuesModal,
        attributes: ["interestValuesId", "values"],
      },
      where: { userId: userId },
    });
    res.send(getInterest);
  } catch (err) {
    console.log(err);
    res.send(new Api404Error());
  }
}

export async function ActivePnr(req, res) {
  const { userId } = req.params;
  try {
    const ActiveTravelerPnr = Modals.UserModels.TravelersModel;
    const getAllPnr = await ActiveTravelerPnr.findAll({
      where: { userId: userId, pnrStatus: "pending" },
    });
    const AllActivePNR = [];
    for (const data of getAllPnr) {
      AllActivePNR.push(
        await ActiveTravelerPnr.findAll({
          where: {
            airPlaneName: data.airPlaneName,
            departureDate: data.departureDate,
            destination: data.destination,
            departureAirport: data.departureAirport,
            userId: !userId,
          },
        })
      );
    }
    const matchData = await Promise.all(AllActivePNR);

    getAllPnr.forEach((a, i) => {
      a.matchData = matchData[i];
      return a;
    });

    res.send(getAllPnr);
  } catch (err) {
    console.log(err);
  }
}

// export async function AddWishList(req, res) {
//   const payload = { ...req.body };
//   try {

//     res.send({ message: "successfully added" });
//   } catch (err) {
//     console.log(err);
//   }
// }
