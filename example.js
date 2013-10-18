define(function(require) {
    var HotCollectionsApp = require('streamhub-hot-collections');

    return function(el) {
        new HotCollectionsApp({
            el: el,
            network: 'thedailybeast.fyre.co'
        });
    };
});