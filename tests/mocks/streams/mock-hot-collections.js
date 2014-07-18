define([
    'inherits',
    'streamhub-hot-collections/streams/hot-collections',
    'streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client',
    'streamhub-sdk-tests/mocks/mock-stream'],
function (inherits, HotCollections, MockHotCollectionsClient, MockStream) {

    var MockHotCollections = function (opts) {
        opts = opts || {};
        opts.client = opts.client || new MockHotCollectionsClient();
        HotCollections.call(this, opts);
    };

    inherits(MockHotCollections, HotCollections);

    MockHotCollections.prototype.push = function (a) {
        if (a !== null) {
            var collections = Array.prototype.slice.call(arguments);
            for (var i=0; i < collections.length; i++) {
                collections[i].createUpdater = function () {
                    return new MockStream.LivefyreContent();
                }
            }
        }

        HotCollections.prototype.push.apply(this, arguments)
    };

    return MockHotCollections;
});
