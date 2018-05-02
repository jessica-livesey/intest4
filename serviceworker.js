if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
          console.log('Service worker registered successfully');
        }).catch(function(err) {
          console.log('Service worker registration failed: ', err);
        });
      }


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('gih-cache').then(function(cache) {
      return cache.add('index.html');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('index.html');
    })
  );
});

