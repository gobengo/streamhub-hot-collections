define([
    'jasmine',
    'streamhub-hot-collections/streams/hot-collection-to-collection',
    'streamhub-sdk/collection'],
function (jasmine, HotCollectionToCollection, Collection) {
    'use strict';

    describe('streamhub-hot-collections/streams/hot-collection-to-collection', function () {
        describe('.transform(hotCollection)', function () {
            it('transforms UAT Collections to Collection instances', function () {
                var hotCollection = {
                    "updated": "2013-09-06T13:22:38",
                    "tags": [],
                    "url": "http:\/\/www.xbox.com\/",
                    "title": "Xbox",
                    "initUrl": "\/bs3\/t402.livefyre.com\/labs-t402.fyre.co\/303827\/eGJveC0w\/init",
                    "heat": 12.0452407079,
                    "siteId": 303827,
                    "articleId": "xbox-0",
                    "id": 10732798
                };
                var collection = HotCollectionToCollection.transform(hotCollection);
                expect(collection instanceof Collection).toBe(true);
                expect(collection.id).toBe(hotCollection.id);
                expect(collection.environment).toBe('t402.livefyre.com');
                expect(collection.network).toBe('labs-t402.fyre.co');
                expect(collection.siteId).toBe(hotCollection.siteId);
                expect(collection.articleId).toBe(hotCollection.articleId);
                expect(collection.heatIndex).toBe(hotCollection.heat);
                expect(collection.url).toBe(hotCollection.url);
            });
            it('transforms UAT Collections to Collection instances', function () {
                var hotCollection = {
                    "updated": "2013-09-25T18:16:26",
                    "tags": [
                        "google plus",
                        "youtube",
                        "google"
                    ],
                    "url": "http:\/\/techcrunch.com\/2013\/09\/25\/google-plus-youtube\/",
                    "title": "Google+ May Finally Matter Thanks To YouTube\u00a0Comments",
                    "initUrl": "\/bs3\/techcrunch.fyre.co\/311145\/ODgzNTgx\/init",
                    "heat": 4.59266145647,
                    "siteId": 311145,
                    "articleId": "883581",
                    "id": 48216464
                }
                var collection = HotCollectionToCollection.transform(hotCollection);
                expect(collection instanceof Collection).toBe(true);
                expect(collection.id).toBe(hotCollection.id);
                expect(collection.environment).toBe(undefined);
                expect(collection.network).toBe('techcrunch.fyre.co');
                expect(collection.siteId).toBe(hotCollection.siteId);
                expect(collection.articleId).toBe(hotCollection.articleId);
                expect(collection.heatIndex).toBe(hotCollection.heat);
                expect(collection.url).toBe(hotCollection.url);
            });
        });
    });
});
