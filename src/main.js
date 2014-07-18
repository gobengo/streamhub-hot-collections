define([
    'streamhub-metrics/views/metric-list-view',
    'streamhub-hot-collections/streams/hot-collections',
    'streamhub-hot-collections/streams/collection-to-heat-metric',
    'streamhub-hot-collections/package-attribute',
    'css!streamhub-hot-collections/styles/style'
], function (MetricListView, HotCollections, CollectionToHeatMetric, PackageAttribute, Css) {

    var HotCollectionsApp = function (opts) {
        opts = opts || {}
        opts.el = opts.el || document.createElement('div');

        PackageAttribute.decorate(opts.el);
        
        var viewTag = opts.el.appendChild(document.createElement('div'));
        viewOpts = Object.create(opts, { el : { value :viewTag }});

        this._stream = new HotCollections(viewOpts);
        this._view = opts.view || new MetricListView(viewOpts);
    };

    HotCollectionsApp.prototype.start = function () {
        this._stream
            .pipe(new CollectionToHeatMetric())
            .pipe(this._view);
    };

    return HotCollectionsApp;
});