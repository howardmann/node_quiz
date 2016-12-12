require.config({
  baseUrl: '/javascripts',
  paths: {
    jquery: ['https://code.jquery.com/jquery-3.1.0.min','./lib/jquery'],
    backbone: ['https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min','./lib/backbone'],
    underscore: ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min','./lib/underscore'],
    handlebars: ['https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min','./lib/handlebars'],
    text: ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min','./lib/text']
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
