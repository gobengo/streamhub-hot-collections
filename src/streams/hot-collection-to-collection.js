define(['streamhub-sdk/collection'], function (Collection) {
    'use strict';


    var HotCollectionToCollection = function () {};


    /**
     * Transform an Object from StreamHub's Hot Collection endpoint into a
     * streamhub-sdk/collection model
     * @param hotCollection {object}
     */
    HotCollectionToCollection.transform = function (hotCollection) {
        var collection = new Collection({
            network: networkFromHotCollection(hotCollection),
            siteId: hotCollection.siteId,
            articleId: hotCollection.articleId,
            id: hotCollection.id,
            environment: environmentFromHotCollection(hotCollection)
        });
        collection.heatIndex = hotCollection.heat;
        collection.title = hotCollection.title;
        return collection;
    };


    var NETWORK_IN_INITURL = /([^.\/]+\.fyre\.co|livefyre\.com)\/\d+\//;

    function networkFromHotCollection(hotCollection) {
        var initUrl = hotCollection.initUrl;
        var match = initUrl.match(NETWORK_IN_INITURL);
        if ( ! match) {
            return;
        }
        return match[1];
    }


    var ENVIRONMENT_IN_INITURL = /\/bs3\/([^\/]+)\/[^\/]+\/\d+\//;

    function environmentFromHotCollection(hotCollection) {
        var initUrl = hotCollection.initUrl;
        var match = initUrl.match(ENVIRONMENT_IN_INITURL);
        if ( ! match) {
            return;
        }
        return match[1];
    }

    return HotCollectionToCollection;
});