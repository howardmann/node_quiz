var app = app || {};

define([
  "jquery",
  "underscore",
  "backbone",
  "handlebars",
  "views/TopicListView",
  "views/TopicDetailedView"
], function(
  $, _, Backbone, Handlebars, TopicListView, TopicDetailedView){

  // ======= Models
  var Topic = Backbone.Model.extend({
    urlRoot: '/topics'
  });

  // ======= Collections
  var Topics = Backbone.Collection.extend({
    url: '/topics',
    model: Topic
  });

  // ====== Router
  var Router = Backbone.Router.extend({
    routes: {
      "": "topicsIndex",
      "topics/:topic": "topicsShow"
    },

    topicsIndex: function(){
      var view = new TopicListView({collection: app.topics});
      $('#main').html(view.render().el);
    },

    topicsShow: function(topic){
      var topic = app.topics.findWhere({'name':topic});
      var view = new TopicDetailedView({model: topic});
      $('#main').html(view.render().el);
    }
  });

  // ========= EXECUTE CODE
  $(document).ready(function(){
    console.log('ready');

    // ========= FETCH AND INITIALIZE BACKBONE
    app.topics = new Topics();
    app.topics.fetch().then(function(){
      app.Router = new Router();
      Backbone.history.start();
    });

    // ======== JQUERY VISUAL ANIMATIONS
    // Cache jQuery selectors
    var $header = $('header');
    var $banner = $('#banner');
    var $main = $('#main');
    var $pencil = $banner.find('.pencil');
    var $caption = $('#caption');


    // ==== FADE OUT BANNER WHEN CLICK PLAY
    $('nav a').on('click', function(e){
      $banner.fadeOut();
    });

    // ========== PENCIL ANIMATION
    $pencil.on('click', function(){
      $(this).addClass('active');
      var $newCaption = $('<p>Scroll down</p>');
      $newCaption.hide().appendTo($banner);
      $caption.fadeOut(function(){
        $newCaption.fadeIn();
      });
      $pencil.css('cursor', 'auto');
      $(this).off('click');
    });

    $('.logo').hover(function(){
      $pencil.toggleClass('spin');
    });

    // ========== STICKYHEADER
    $(window).on('scroll', function(){
      if ($(window).scrollTop() > ($banner.height() - 5)) {
        $header.addClass('active');
        $main.addClass('active');
        $banner.hide();
        $('html,body').scrollTop(0);
        $(window).off('scroll');
      }
    });
  });
});
