require.config({
  baseUrl: '/javascripts',
  paths: {
    jquery: './lib/jquery',
    backbone: './lib/backbone',
    underscore: './lib/underscore',
    handlebars: './lib/handlebars',
    text: './lib/text'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    jquery: {
      exports: '$'
    }
  }
});

require(["main"]);
