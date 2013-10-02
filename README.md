# streamhub-hot-collections

streamhub-hot-collections provides JavaScript modules to fetch the Hottest (trending) Collections in a Livefyre StreamHub Network. This can be used in conjunction with [streamhub-metrics](https://github.com/Livefyre/streamhub-metrics) to visualize the Hot Collections.

![Example Hot Collections Widget](http://i.imgur.com/I8oOcO2.png)

## Usage

### HotCollections Stream
`streamhub-hot-collections/streams/hot-collections`

An implementation of `stream/readable` that reads out `streamhub-sdk/collection` instances that correspond to the Hottest Collections in a Livefyre StreamHub Network or Site.

Example construction:

    var HotCollections = require('streamhub-hot-collections/streams/hot-collections');
    
    var myHotCollections = new HotCollections({
        network: 'techcrunch.fyre.co'
    });

Construction options:

* `network` (required) - The Livefyre StreamHub Network to fetch Hot Collections for
* `siteId` - Only return Collections in this StreamHub Site
* `tag` - Only return Collections with this Collection Tag

HotCollections Streams can be read from just like any other `stream/readable`, including `.read()`, and `.pipe()`. If you just want to get all the HotCollections results, do:

    myHotCollections.on('data', function (collection) {
        // do something with `collection`
    })

### CollectionHeatMetric
`streamhub-hot-collections/metrics/collection-heat-metric`

An implementation of `streamhub-metrics/metric` that represents the Heat Index of a Collection. Use this to cast a Collection into a Metric so it can be used with any `streamhub-metrics/views`.

Example construction:

    var HeatMetric = require('streamhub-hot-collections/metrics/collection-heat-metric');
    
    var myHeatMetric = new HeatMetric({
    	collection: collection
    });

Like other Metrics, CollectionHeatMetric implements the following interface:

* `getValue()` - Returns the `.heatIndex` of the provided Collection
* `getLabel()` - If the HeatMetric was constructed with `opts.label`, return that, else return the `.title` of the provided Collection

### CollectionToHeatMetric
`streamhub-hot-collections/streams/collection-to-heat-metric`

A `stream/transform` that transforms any written Collections, and reads out corresponding CollectionHeatMetrics. Pipe a HotCollections Stream through this to get a corresponding Stream of HeatMetrics, which can itself be piped to a `streamhub-metrics/views/metric-list-view`.

    var CollectionToHeatMetric = require('streamhub-hot-collections/streams/collection-to-heat-metric');
    
    myHotCollections
        .pipe(new CollectionToHeatMetric())
        .pipe(myMetricListView);

The transformation logic can also be used via the static method `CollectionToHeatMetric.transform(collection)`.

### HotCollectionsClient
`streamhub-hot-collections/clients/hot-collections-client`

A simple client that can fetch StreamHub's Heat Index API. The HotCollections stream makes use of this.

    var HotCollectionsClient = require('streamhub-hot-collections/clients/hot-collections-client');
    
    var client = new HotCollectionsClient();
    
    client.get({ network: 'livefyre.com' }, function (err, response) {
        // do something with response
    });

## Local Development

You may wish to fork, develop on the repo locally, or include it in your existing JavaScript application.

Clone this repo

    git clone https://github.com/Livefyre/streamhub-hot-collections

Development dependencies are managed by [npm](https://github.com/isaacs/npm), which you should install first.

With npm installed, install streamhub-hot-collection's dependencies. This will also download [Bower](https://github.com/bower/bower) and use it to install browser dependencies.

    cd streamhub-hot-collections
    npm install

This repository's package.json includes a helpful script to launch a web server for development

    npm start

You can now visit [http://localhost:8080/examples/main](http://localhost:8080/examples/main) to see an example loaded via RequireJS.

# StreamHub

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is used by the world's biggest brands and publishers to power their online Content Communities. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. Want StreamHub? [Contact Livefyre](http://www.livefyre.com/contact/).
