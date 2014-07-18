define([
    'stream/readable',
    'streamhub-hot-collections/clients/hot-collections-client',
    'streamhub-hot-collections/streams/hot-collection-to-collection',
    'streamhub-sdk/jquery',
    'inherits'
], function (Readable, HotCollectionsClient, HotCollectionToCollection, $,
inherits) {


    /**
     * A Readable Stream that emits StreamHub Collections that are "hot"
     * (trending)
     * @param opts {object}
     * @param opts.network {string} The StreamHub Network to find hot
     *     Collections in
     * @param [opts.siteId] {string} Only return Collections in this Site
     * @param [opts.tag] {string} Only return Collections with this tag
     */
    var HotCollections = function (opts) {
        opts = opts || {};

        if ( ! opts.network) {
            throw "HotCollections must be constructed with opts.network";
        }

        this._client = opts.client || new HotCollectionsClient();
        this._network = opts.network;
        this._siteId = opts.siteId;
        this._tag = opts.tag;
        this._count = opts.count;

        this._madeRequest = false;

        Readable.apply(this, arguments);
    };

    inherits(HotCollections, Readable);


    HotCollections.prototype._read = function () {
        var self = this;
        var clientOptions = {
            network: this._network,
            siteId: this._siteId,
            tag: this._tag,
            count: this._count
        };

        // If we've already requested once, we're done
        if (this._madeRequest) {
            return this.push(null);
        }

        // Fetch Hot Collections from StreamHub
        this._client.get(clientOptions, function (err, hotCollections) {
            if (err) {
                return self.emit('error', err);
            }

            self._madeRequest = true;

            // Transform the JSON objects to Collection objects
            var collections = $.map(hotCollections, HotCollectionToCollection.transform);

            // If there were none, end the stream
            if ( ! collections.length) {
                self.push(null);
            }

            // Else push
            self.push.apply(self, collections);
        });
    };


    return HotCollections;
});