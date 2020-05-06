import http_requests from './utils/http_requests';

//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
let curRegistration;
let curPushSubscription;
let email;

export function registerServiceWorker() {
    return navigator.serviceWorker.register('./sw.js')
    .then(function(registration) {
        console.log('Service worker successfully registered.');
        console.log('registration', registration)
        curRegistration = registration
        return registration;
    })
    .then(registration => {
        askPermission();
    })
    .catch(function(err) {
        console.error('Unable to register service worker.', err);
    });
}

//export 
function askPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
        });

        if (permissionResult) {
        permissionResult.then(resolve, reject);
        }
    })
    .then(function(permissionResult) {
        console.log('permissionResult', permissionResult)
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        } else {
            subscribeUserToPush();
        }
    });
}

export function subscribeUserToPush() {
    return navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BFKDFhisj0ZdbdXBL3FvqPULSNZL0dVAh4ryEbQ_eFlyDkwmsoB6k7NZnlkqoBZFDjblfUAKoOb6oBuZz08qyPI'
        )
      };
  
      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
      curPushSubscription = pushSubscription;
      let sessionStr = sessionStorage.getItem('sessionStr');
      let sessionStrAr;
      if (sessionStr) {
          sessionStrAr = sessionStr.split('|');
          email = sessionStrAr[0];
          http_requests.Auth.postPushSubscription({email, pushSubscription: JSON.stringify(pushSubscription)})

      } else {
          alert('user is not logged in so push subscription cannotbe saved')
      }
      return pushSubscription;
    });
  }

export function unsubscribeUserFromPush() {
    if (curPushSubscription) {
        curPushSubscription.unsubscribe()
            .then(successful => {
                if (successful) {
                    console.log('pushSubscription was unsubscribed');
                }
            })
            .catch(err => console.error(`error: ${err}; pushSubscription could not be unsubscribed`))
    }
}

export function sendNotification(data) {
    const options = {
        "body": `${data}`,
        "data": data,
        "requireInteraction": "false",
        "timestamp": "<Long>"
        // actions: [
        //     {
        //       action: 'postpone-action',
        //       title: 'Remind me tomorrow.'
        //     },
        //     {
        //       action: 'stop-action',
        //       title: 'Stop this notification.'
        //     }
        // ]
    }
    self.registration.showNotification('Food Expiration Warning', options);
}

self.addEventListener('push', function(event) {
    //event.waitUntil(function() {
        let { message, list_item_id } = event.data.json();
        const options = {
            "body": `${message}`,
            "data": event.data.text(),
            "list_item_id": list_item_id,
            "requireInteraction": "false",
            "timestamp": "<Long>"//,
            // actions: [
            //     {
            //       action: 'postpone-action',
            //       title: 'Remind me tomorrow.'
            //     },
            //     {
            //       action: 'stop-action',
            //       title: 'Stop this notification.'
            //     }
            // ]
        }
    
        self.registration.showNotification('Food Expiration Warning', options);

    //})
    // if (event.data) {

    //     //TEST need to uncomment
    //     //sendNotification(message);

    //     //TODO
    //     // event.waitUntil(
    //     //     sendNotification(event.data)

    //         // self.registration.showNotification("test notification", {
    //         //     body: "New push notification",
    //         //     //icon: "/images/logo@2x.png",
    //         //     tag:  "push-notification-tag",
    //         //     data: {
    //         //     list_item_id: JSON.parse(event.data).list_item_id
    //         //     }
    //         // })
    //     //)
    // } else {
    //  console.log('This push event has no data.');
    // }
});

// self.addEventListener('notificationclick', function(event) {

//     //const promiseChain = function(event) {
//         console.log('Notification Click.');
//         const clickedNotification = event.notification;
//         clickedNotification.close();
    
//         if (!event.action) {
//           // Was a normal notification click
//           console.log('Notification Click.');
//           return;
//         }
//         console.log('event.notification', event.notification)
//         if (event.notification.data) {
//             console.log('notification data', event.notification.data)
//             console.log('notification list_item_id', JSON.parse(event.notification.data).list_item_id)
//         }
//         console.log('notification options', event.notification.options)
//         switch (event.action) {
//           case 'postpone-action':
//             console.log('user postpones notification');
//             break;
//           case 'stop-action':
//             console.log('user stops notification');
//             http_requests.Lists.putListItemNotificationSent({list_item_id})
//                 .then(resp => console.log('notification sent resp', resp))
//                 .catch(err => console.error('error', err))
    
//             break;
//           default:
//             console.log(`Unknown action clicked: '${event.action}'`);
//             break;
//         }
//     //};

//     //event.waitUntil(promiseChain);
//   });

  self.addEventListener('notificationclose', function(event) {
    console.log('notification data', event.notification.data)
    console.log('user closes notification')    
  });

/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function getCookie() {
    if (sessionStorage) {
        return sessionStorage.getItem('sessionStr');
    }
}
