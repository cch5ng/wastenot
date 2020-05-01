import http_requests from './utils/http_requests';

//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
let curRegistration;
let curPushSubscription;

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
          let email = sessionStrAr[0];
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
        //"renotify": "true",          
        "timestamp": "<Long>"
    }
    self.registration.showNotification('Food Expiration Warning', options);
}

self.addEventListener('push', function(event) {
    if (event.data) {
      console.log('This push event has data: ', event.data.text());
      sendNotification(event.data.text())
    } else {
      console.log('This push event has no data.');
    }
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

// export {
//     registerServiceWorker,
//     askPermission
// }

// module.exports = {registerServiceWorker,
//     askPermission}