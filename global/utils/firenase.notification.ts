// import * as admin from "firebase-admin";

// import * as serviceAccount from "../utils/";
// const FIREBASE_DATABASE_URL = "";

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: FIREBASE_DATABASE_URL,
// });

// exports.notification = async (title, message, userId, type) => {
//   const registrationToken =
//   
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
