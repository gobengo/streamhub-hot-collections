define([
    'jasmine',
    'streamhub-hot-collections'],
function (jasmine, HotCollectionsApp) {

    describe('streamhub-hot-collections', function () {
        it('can be constructed', function () {
            var app = new HotCollectionsApp({
                network: 'techcrunch.fyre.co'
            });
        });
    });

});