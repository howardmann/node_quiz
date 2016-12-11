var app = app || {};

// ======= Models
var Topic = Backbone.Model.extend({
  urlRoot: '/topics'
});

// ======= Collections
var Topics = Backbone.Collection.extend({
  url: '/topics',
  model: Topic
});

// ====== View single
var TopicView = Backbone.View.extend({
  className: 'col col-4 sm-col-12',

  template: Handlebars.compile('<a href="#topics/{{name}}"><div class="card {{name}} flex-valign center"><p>{{name}}</p></div></a>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var TopicDetailedView = Backbone.View.extend({
  className: 'topic-detailed-view',

  initialize: function(){
    this.model.on('change', this.render, this);
  },

  events: {
    'click .reveal-answer': 'revealAnswer',
    'click .next': 'nextQuestion'
  },

  template: Handlebars.compile('<div class="card-question  {{name}} center"><p class="card-topic col col-11 offset-1 left">{{name}}</p>{{#each questions}} <div class="question col sm-col-12 col-8 offset-2"><p>Q: {{question}}?</p> <p> <a href="#" class="reveal-answer btn">Reveal</a> <span class="answer">{{answer}}</span></p><span><a href="#" class="next btn">Next</a></span> </div>{{/each}}</div>'),

  render: function(){
    var $this = this.$el
    $this.html(this.template(this.model.attributes));
    // Hide all questions except the first
    $this.find('.question').not(":first").hide();
    return this;
  },

  revealAnswer: function(e){
    e.preventDefault();
    var $target = $(e.target);

    // Refactored using jQuery promise and pipe vs. callback hell
    $target.fadeOut('fast').promise()
      .pipe(function(){
        return $target.next('.answer').fadeIn(1500);
      })
      .pipe(function(){
        return $target.closest('.question').find('.next').fadeIn('slow');
      })
  },

  nextQuestion: function(e){
    e.preventDefault();
    var self = this;
    var $target = $(e.target);
    var $nextQ = $target.closest('.question').next('.question');
    $target.closest('.question').fadeOut('fast', function(){
      if ($nextQ.length > 0) {
        $nextQ.fadeIn();
      } else {
        self.$el.append('<a href="#" class="new-topic btn">New topic</a>');
      }
    });

  }
});

// ====== View collection
var TopicListView = Backbone.View.extend({
  className: 'card-holder row',

  initialize: function(){
    this.collection.on('add', this.addOne, this);
  },

  addOne: function(topic) {
    var view = new TopicView({model: topic});
    this.$el.append(view.render().el);
  },

  render: function(){
    this.collection.each(this.addOne, this);
    return this;
  }
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



$(document).ready(function(){
  console.log('ready');
  app.topics = new Topics();
  app.topics.fetch().then(function(){
    app.Router = new Router();
    Backbone.history.start();
  });

  // Cache jQuery selectors
  var $header = $('header');
  var $banner = $('#banner');
  var $main = $('#main');
  var $pencil = $banner.find('.pencil');
  var $caption = $('#caption');

  if ($('.new-express').length > 0) {
    $banner.fadeOut();
  }

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

  // ========= PLAY NAVIGATION
  $('nav a').on('click', function(e){
    $banner.fadeOut();
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
