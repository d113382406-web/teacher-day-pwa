const CACHE_NAME = 'teacher-card-v1';
const ASSETS_TO_CACHE = [
'./',
'./index.html',
'./manifest.json'

];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(ASSETS_TO_CACHE);
})
);
self.skipWaiting();
});

// 啟用 Service Worker
self.addEventListener('activate', (event) => {
event.waitUntil(self.clients.claim());
});

// 攔截網路請求,若無網路則讀取快取
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);

});