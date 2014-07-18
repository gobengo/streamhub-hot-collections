require.config({
  paths: {
    jquery: 'lib/jquery/jquery',
    text: 'lib/requirejs-text/text',
    base64: 'lib/base64/base64',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    jasmine: 'lib/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': 'lib/jasmine/lib/jasmine-core/jasmine-html',
    'jasmine-jquery': 'lib/jasmine-jquery/lib/jasmine-jquery',
    'event-emitter': 'lib/event-emitter/src/event-emitter',
    'livefyre-package-attribute': 'lib/livefyre-package-attribute/src/main',
    inherits: 'lib/inherits/inherits',
    json: 'lib/requirejs-plugins/src/json'
  },
  packages: [{
    name: "streamhub-hot-collections",
    location: "src/"
  },{
    name: "streamhub-hot-collections-tests",
    location: "tests/"
  },{
    name: "streamhub-metrics",
    location: "lib/streamhub-metrics/src"
  },{
    name: "streamhub-sdk",
    location: "lib/streamhub-sdk/src/"
  },{
    name: 'streamhub-sdk/modal',
    location: "lib/streamhub-sdk/src/modal"
  },{
    name: 'streamhub-sdk/auth',
    location: 'lib/streamhub-sdk/src/auth'
  },{
    name: 'streamhub-sdk/collection',
    location: "lib/streamhub-sdk/src/collection"
  },{
    name: 'streamhub-sdk/content',
    location: "lib/streamhub-sdk/src/content"
  },{
    name: "stream",
    location: "lib/stream/src"
  },{
    name: "view",
    location: "lib/view/src",
    main: "view"
  },{
    name: "css",
    location: "lib/require-css",
    main: "css"
  },{
    name: "less",
    location: "lib/require-less",
    main: "less"
  }],
  css: {
    clearFileEachBuild: 'dist/streamhub-hot-collections.min.css',
    transformEach: {
      requirejs: 'lib/livefyre-package-attribute/tools/prefix-css-requirejs',
      node: 'lib/livefyre-package-attribute/tools/prefix-css-node'
    }
  },
  shim: {
    jquery: {
        exports: '$'
    },
    jasmine: {
        exports: 'jasmine'
    },
    'jasmine-html': {
        deps: ['jasmine'],
        exports: 'jasmine'
    },
    'jasmine-jquery': {
        deps: ['jquery', 'jasmine']
    },
    rework: {
      exports: 'rework'
    }
  }
});
