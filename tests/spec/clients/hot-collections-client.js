define([
    'jasmine',
    'streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client'],
function (jasmine, HotCollectionsClient) {
    'use strict';

    describe('streamhub-hot-collections/clients/hot-collections-client', function () {
        var client;

        beforeEach(function () {
            client = new HotCollectionsClient();
        });

        it('can be constructed with no options', function () {
            expect(client instanceof HotCollectionsClient).toBe(true);
        });

        describe('.get(opts)', function () {
            var opts;
            beforeEach(function () {
                opts = {
                    network: 'labs-t402.fyre.co',
                    siteId: '303827',
                    tag: 'myTag',
                    count: 17
                };
            });
            it('can be passed only a network', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallThrough();
                client.get({
                    network: opts.network
                }, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var requestedUrl = client._get.mostRecentCall.args[0];
                    expect(requestedUrl)
                        .toBe('http://bootstrap.labs-t402.fyre.co/api/v3.0/hottest/');
                });
            });
            it('can be optionally passed a siteId', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallThrough();
                client.get({
                    network: opts.network,
                    siteId: opts.siteId
                }, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var requestedUrl = client._get.mostRecentCall.args[0];
                    var queryParams = client._get.mostRecentCall.args[1];
                    expect(requestedUrl)
                        .toBe('http://bootstrap.labs-t402.fyre.co/api/v3.0/hottest/');
                    expect(queryParams.site).toBe(opts.siteId);
                });
            });
            it('can be optionally passed a tag', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallThrough();
                client.get({
                    network: opts.network,
                    tag: opts.tag
                }, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var requestedUrl = client._get.mostRecentCall.args[0];
                    var queryParams = client._get.mostRecentCall.args[1];
                    expect(requestedUrl)
                        .toBe('http://bootstrap.labs-t402.fyre.co/api/v3.0/hottest/');
                    expect(queryParams.tag).toBe(opts.tag);
                });
            });
            it('can be optionally passed a count', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallThrough();
                client.get({
                    network: opts.network,
                    count: opts.count
                }, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var requestedUrl = client._get.mostRecentCall.args[0];
                    var queryParams = client._get.mostRecentCall.args[1];
                    expect(requestedUrl)
                        .toBe('http://bootstrap.labs-t402.fyre.co/api/v3.0/hottest/');
                    expect(queryParams.number).toBe(opts.count);
                });
            });
            it('passes an err to errback if the request fails', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallFake(function (url, params, errback) {
                    errback('Yeah so I failed');
                });
                client.get(opts, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var err = spy.mostRecentCall.args[0];
                    expect(err).toBeTruthy();
                });
            });
            it('passes an err to errback if the response succeeds but contains'+
               'no response.data', function () {
                var spy = jasmine.createSpy('onHotCollections');
                spyOn(client, '_get').andCallFake(function (url, params, errback) {
                    errback(null, {
                        status: 'ok',
                        data: undefined
                    });
                });
                client.get(opts, spy);
                waitsFor(function () {
                    return spy.callCount;
                });
                runs(function () {
                    var err = spy.mostRecentCall.args[0];
                    expect(err).toBeTruthy();
                });
            });
        });
    });
});
