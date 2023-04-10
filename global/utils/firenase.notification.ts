// import * as admin from "firebase-admin";

// import * as serviceAccount from "../utils/";
// const FIREBASE_DATABASE_URL = "";

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: FIREBASE_DATABASE_URL,
// });

// exports.notification = async (title, message, userId, type) => {
//   const registrationToken =
//     "cEZWzaUQQcaS6vtVe7xhfV:APA91bE1JvrY2xt6v00x3i-rpQWWS4Md0Oaftlk1r9jAlx_eEC6OsM0j5hX2UEpeH2huiS2HVRhQEeEIc8_j-g0n3VebA2359JTSYBHRWbWr472zdhBHCg1MBCIsFZp-7yxwMxvZoFR2";

//   const messageData = {
//     notification: { title: title, body: message, type: type },
//     data: {
//       Intellijobs: "Intellijobs",
//       click_action: "FLUTTER_NOTIFICATION_CLICK",
//     },
//   };

//   const options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24,
//   };

//   admin
//     .messaging()
//     .sendToTopic(`${userId}`, messageData, options)
//     //.sendToDevice(registrationToken, messageData, options)
//     .then((response) => {
//       // res.send(response);
//       //console.log("success", response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
