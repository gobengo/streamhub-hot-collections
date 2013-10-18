define([
    'streamhub-metrics/views/metric-list-view',
    'streamhub-hot-collections/streams/hot-collections',
    'streamhub-hot-collections/streams/collection-to-heat-metric'
], function (MetricListView, HotCollections, CollectionToHeatMetric) {

    var HotCollectionsApp = function (opts) {
        this._stream = new HotCollections(opts);
        this._view = opts.view || new MetricListView(opts);
    };

    HotCollectionsApp.prototype.start = function () {
        this._stream
            .pipe(new CollectionToHeatMetric())
            .pipe(this._view);
    };

    return HotCollectionsApp;
});