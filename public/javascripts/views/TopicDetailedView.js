define([
  "jquery",
  "backbone",
  "handlebars",
  "text!templates/TopicDetailedView.hbs"
], function($, Backbone, Handlebars, template){

  var TopicDetailedView = Backbone.View.extend({
    className: 'topic-detailed-view',

    initialize: function(){
      this.model.on('change', this.render, this);
    },

    events: {
      'click .reveal-answer': 'revealAnswer',
      'click .next': 'nextQuestion'
    },

    template: Handlebars.compile(template),

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
          return $target.next('.answer').fadeIn('fast');
        })
        .pipe(function(){
          return $target.closest('.question').find('.next').fadeIn('fast');
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

  return TopicDetailedView;
});
