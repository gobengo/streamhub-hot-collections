define(['inherits', 'streamhub-metrics/metric'],
function (inherits, Metric) {

    var HeatMetric = function (opts) {
        Metric.apply(this, arguments);
        this._collection = opts.collection;
    };

    HeatMetric.prototype.getValue = function () {
        return this._collection.heatIndex;
    };

    HeatMetric.prototype.getLabel = function () {
        var label = Metric.prototype.getLabel.apply(this, arguments);
        return label || this._collection.title;
    };

    return HeatMetric;
});