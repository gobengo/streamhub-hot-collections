define(function(require) {
    var HotCollectionsApp = require('streamhub-hot-collections');

    return function(el) {
        return new HotCollectionsApp({
            el: el,
            network: 'thedailybeast.fyre.co'
        }).start();
    };
});