// Network-first: always fetch the newest files when online, fall back to the cache offline. Tolerant install (a missing file can no longer block updates).
const C="ilmq-v13",F=["./","index.html","style.css","engine.js","app.js","audio.js","data/questions.js","data/places.js","data/audio.js","manifest.json","icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin==location.origin){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
