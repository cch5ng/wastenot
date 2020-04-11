//sw.js

//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

export function registerServiceWorker() {
    return navigator.serviceWorker.register('./sw.js')
    .then(function(registration) {
        console.log('Service worker successfully registered.');
        return registration;
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
        if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
        }
    });
}

// export {
//     registerServiceWorker,
//     askPermission
// }

// module.exports = {registerServiceWorker,
//     askPermission}