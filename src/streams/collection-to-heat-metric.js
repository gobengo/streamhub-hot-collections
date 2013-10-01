define([
    'stream/transform',
    'inherits',
    'streamhub-hot-collections/metrics/collection-heat-metric'
], function (Transform, inherits, HeatMetric) {

    var CollectionToHeatMetric = function (opts) {
        Transform.apply(this, arguments);
    };

    inherits(CollectionToHeatMetric, Transform);

    CollectionToHeatMetric.prototype._transform = function (collection, done) {
        var metric = CollectionToHeatMetric.transform(collection);
        this.push(metric);
        done();
    };

    CollectionToHeatMetric.transform = function (collection) {
        var metric = new HeatMetric({
            collection: collection
        });
        return metric;
    };

    return CollectionToHeatMetric;
});