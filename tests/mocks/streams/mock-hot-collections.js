define([
    'inherits',
    'streamhub-hot-collections/streams/hot-collections',
    'streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client'],
function (inherits, HotCollections, MockHotCollectionsClient) {

    var MockHotCollections = function (opts) {
        opts = opts || {};
        opts.client = opts.client || new MockHotCollectionsClient();
        HotCollections.call(this, opts);
    };

    inherits(MockHotCollections, HotCollections);

    return MockHotCollections;
});