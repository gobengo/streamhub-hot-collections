define(['streamhub-sdk/jquery'], function($) {
    'use strict';

    /**
     * A Client for requesting Hot Collections from Livefyre APIs
     */
    var HotCollectionsClient = function () {};

    /**
     * Fetches Collections from Livefyre's Hottest Collections API
     * https://github.com/Livefyre/livefyre-docs/wiki/Heat-Index-API
     * @param opts {Object}
     * @param opts.network {string} The name of the network in the livefyre platform
     * @param [opts.count] {number} The Maximum number of Collections to fetch.
     * @param [opts.siteId] {string} If provided, only return Collections in this Site
     * @param [opts.tag] {string} If provided, only return Collections with this tag
     * @param callback {function} A callback that is called upon success/failure of the
     *     bootstrap request. Callback signature is "function(error, data)'.
     */
    HotCollectionsClient.prototype.get = function(opts, callback) {
        var isLocaldev,
            queryParams;
        opts = opts || {};
        callback = callback || function() {};
        isLocaldev = opts.environment && opts.environment === 'fyre';

        var url = [
            'http://bootstrap.',
            (opts.network === 'livefyre.com') ?
                opts.environment || 'livefyre.com' :
                opts.network,
            '/api/v3.0/hottest/'
        ].join('');

        queryParams = {
            site: opts.siteId,
            tag: opts.tag,
            number: opts.count
        };

        this._get(url, queryParams, function (err, response) {
            var data = response && response.data;
            if ( ! data) {
                return callback('No data in Hot Collections response');
            }
            callback(null, data);
        });
    };

    /**
     * Perform an HTTP GET Request
     * @param url {string} URL to GET
     */
    HotCollectionsClient.prototype._get = function (url, params, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            data: params,
            dataType: 'json',
            success: function(response, status, jqXhr) {
                callback(null, response);
            },
            error: function(jqXhr, status, err) {
                callback(err);
            }
        });
    };

    return HotCollectionsClient;

});