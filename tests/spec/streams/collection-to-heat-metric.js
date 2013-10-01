define([
    'jasmine',
    'streamhub-hot-collections/streams/collection-to-heat-metric',
    'streamhub-hot-collections/metrics/collection-heat-metric',
    'streamhub-sdk/collection',
    'stream/transform'],
function (jasmine, CollectionToHeatMetric, HeatMetric, Collection, Transform) {

    describe('streamhub-hot-collections/streams/collection-to-heat-metric', function () {

        describe('.transform', function () {
            it('can transform a Collection to a CollectionHeatMetric', function () {
                var collection = new Collection();
                collection.heatIndex = 12345;
                var metric = CollectionToHeatMetric.transform(collection);
                expect(metric instanceof HeatMetric).toBe(true);
                expect(metric.getValue()).toBe(collection.heatIndex);
            });
        });

        describe('instance', function () {
            it('is instanceof Transform', function () {
                var transform = new CollectionToHeatMetric();
                expect(transform instanceof Transform).toBe(true);
            });
            it('can .write in Collections, and .read out HeatMetrics', function () {
                var transform = new CollectionToHeatMetric();
                var collection = new Collection();
                collection.heatIndex = 141;
                transform.write(collection);
                var metric = transform.read();
                expect(metric instanceof HeatMetric).toBe(true);
                expect(metric.getValue()).toBe(collection.heatIndex)
            });
        });

    });

});