define([
    'jasmine',
    'streamhub-sdk/collection',
    'streamhub-hot-collections/streams/hot-collections',
    'streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client'],
function (jasmine, Collection, HotCollections, MockHotCollectionsClient) {
    'use strict';

    describe('streamhub-hot-collections/streams/hot-collections', function () {
        var hotCollections,
            network;
        beforeEach(function () {
            network = 'labs-t402.fyre.co';
            hotCollections = new HotCollections({
                network: network,
                client: new MockHotCollectionsClient()
            });
        });

        it('throws if constructed without opts.network', function () {
            expect(function () {
                new HotCollections();
            }).toThrow();
            expect(function () {
                new HotCollections({});
            }).toThrow();
        });

        it('can be passed opts.hotCollectionsClient on construction', function () {
            var customClient = {};
            var hotCollections = new HotCollections({
                network: network,
                client: customClient
            });
            expect(hotCollections._client).toBe(customClient);
        });

        it('is a stream/readable', function () {
            expect(hotCollections.readable).toBe(true);
        });

        it('emits error if there was a problem fetching hot collections', function () {
            var hotCollections = new HotCollections({
                network: network,
                client: {
                    get: function (opts, errback) {
                        // Always pass an error to the errback
                        errback('OH NOOOOO');
                    }
                }
            });
            var onError = jasmine.createSpy('onError');
            hotCollections.on('error', onError);
            hotCollections.read(0);
            waitsFor(function () {
                return onError.callCount;
            }, 'error to be emitted');
        });

        it('emits readable and can be read from', function () {
            var collections = [];
            var onReadable = jasmine.createSpy('onReadable').andCallFake(function () {
                var collection = hotCollections.read();
                if (collection) {
                    collections.push(collection);
                }
            });
            hotCollections.on('readable', onReadable);
            waitsFor(function () {
                return onReadable.callCount;
            }, 'HotCollections to emit readable');
            runs(function () {
                expect(collections[0] instanceof Collection).toBe(true);
            });
        });

        it('emits end when there are no more hot collections to fetch', function () {
            var collections = [];
            var onEnd = jasmine.createSpy('onEnd');
            hotCollections.on('end', onEnd);
            hotCollections.on('data', function (collection) {
                collections.push(collection);
            });
            waitsFor(function () {
                return onEnd.callCount;
            }, 'end to be emitted');
            runs(function () {
                var numCollectionsInMock = MockHotCollectionsClient.mockResponse.data.length;
                expect(collections.length).toBe(numCollectionsInMock);
            });
        });
    });
});
