//pushMessage.js

const webpush = require('web-push');

const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
};

const triggerPushMsg = function(subscription, dataToSend) {
    webpush.setVapidDetails(
        process.env.VAPID_EMAIL,
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    return webpush.sendNotification(subscription, dataToSend)
        .catch((err) => {
            if (err.statusCode === 404 || err.statusCode === 410) {
            console.log('Subscription has expired or is no longer valid: ', err);
            //return deleteSubscriptionFromDatabase(subscription._id);
            return
            } else {
                console.error('err', err);
            }
        });
};

module.exports = {triggerPushMsg};