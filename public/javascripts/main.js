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
  template: Handlebars.compile('<h3><a href="#topics/{{id}}">{{name}}</a></h3>'),
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

  template: Handlebars.compile('<h2>Trivia: {{name}}</h2>{{#each questions}} <div class="question"><p>Q: {{question}}?</p> <p> A: <a href="#" class="reveal-answer">Click to reveal</a> <span class="answer">{{answer}}</span></p><br/><p><a href="#" class="next">Next</a></p> </div>{{/each}}'),

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
    $target.fadeOut('fast', function(){
      $target.next('.answer').fadeIn(1500, function(){
        $target.closest('.question').find('.next').fadeIn('slow');
      });
    });
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
        self.$el.append('<a href="#">Choose a new topic</a>');
      }
    });

  }
});

// ====== View collection
var TopicListView = Backbone.View.extend({
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
    "topics/:id": "topicsShow"
  },

  topicsIndex: function(){
    var view = new TopicListView({collection: app.topics});
    $('#main').html(view.render().el);
  },

  topicsShow: function(id){
    var topic = app.topics.get(id);
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
});
