define(function(require) {
    var HotCollectionsApp = require('streamhub-hot-collections');

    return function(el) {
        var app = new HotCollectionsApp({
            el: el,
            network: 'thedailybeast.fyre.co'
        });

        // Make wobbling Bars
        var view = app._view;
        var ogCreateMetricView = view._createMetricView;
        view._createMetricView = function (metric) {
            var barView = ogCreateMetricView.apply(this, arguments);
            barView._wobble({
                maxMultiplier: 0.1
            });
            return barView;
        };

        app.start();
    };
});