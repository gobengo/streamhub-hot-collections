require([
    'jasmine-html',
    'jasmine-jquery',
    'jquery'],
function (jasmine, jasmineJQuery, $) {
    // Test!
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('tests/spec/metrics/collection-heat-metric');

    specs.push('tests/spec/clients/hot-collections-client');

    specs.push('tests/spec/streams/hot-collections');
    specs.push('tests/spec/streams/hot-collection-to-collection');
    specs.push('tests/spec/streams/collection-to-heat-metric');

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});