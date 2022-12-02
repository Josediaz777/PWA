self.addEventListener('install', e => {
    caches.open('cache-v1')
        .then( cache => cache.addAll ([
            'index.html',
            'https://www.youtube.com/embed/7ZSsJtKMoIE',
            'https://www.youtube.com/embed/PFTLnLC18Qc',
            'https://www.youtube.com/embed/ZHYSdhV_aiI',
            'https://www.youtube.com/embed/PIUiMvsuF9E',
            'https://www.youtube.com/embed/YnBX-dXmFCQ',
            'https://www.youtube.com/embed/I6wgUgNfUiE',
            'css/index.css',
            'js/app.js',
            'js/main.js',
            'js/sw.js'
        ]));
        e.waitUntil(cacheProm);
});


self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});