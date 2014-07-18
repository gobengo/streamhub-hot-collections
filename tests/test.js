require([
    'jasmine',
    'jasmine-html',
    'jquery'],
function (jasmine, jasmineHtml, $) {
    // Test!
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    // Copy jasmine globals
    ['spyOn', 'waitsFor', 'waits', 'runs', 'expect'].forEach(function (key) {
        window[key] = function () {
            var spec = jasmine.getEnv().currentSpec;
            return spec[key].apply(spec, arguments);
        };
    });
    ['beforeEach', 'afterEach', 'describe', 'it'].forEach(function (key) {
        window[key] = jasmineEnv[key].bind(jasmineEnv);
    });

    var specs = [];

    specs.push('tests/spec/main');

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