const cacheName = 'SuperTems-V1'
const staticAssets = [
    './manifest.webmanifest',

]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
    return self.skipWaiting()
})

self.addEventListener('activate', e => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    } catch (e) {
        const cached = await cache.match(req)
        return cached
    }
}




// var CACHENAME = "SuperTems-V2";
// var FILES = [
//     './manifest.webmanifest',
//     './static'
// ];

// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHENAME).then(function(cache) {
//       return cache.addAll(FILES);
//     })
//   );
// }); 

// self.addEventListener('activate', function(event) {
//   var version = 'V2';
//   event.waitUntil(
//     caches.keys()
//       .then(cacheNames =>
//         Promise.all(
//           cacheNames
//             .map(c => c.split('-'))
//             .filter(c => c[0] === 'cachestore')
//             .filter(c => c[1] !== version)
//             .map(c => caches.delete(c.join('-')))
//         )
//       )
//   );
// });

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//       fetch(event.request)
//     );
//   });