define([
    'jasmine',
    'streamhub-hot-collections/metrics/collection-heat-metric',
    'streamhub-sdk/collection'],
function (jasmine, HeatMetric, Collection) {

    describe('streamhub-hot-collections/metric/collection-heat-metric', function () {
        it('can be constructed', function () {
            var collection = new Collection();
            var metric = new HeatMetric({
                collection: collection
            });
            expect(metric instanceof HeatMetric).toBe(true);
        });

        describe('.getCollection', function () {
            it('returns the Collection of the HeatMetric', function () {
                var collection = new Collection();
                var metric = new HeatMetric({
                    collection: collection
                });
                expect(metric.getCollection()).toEqual(collection);
            });
        });
    });

});