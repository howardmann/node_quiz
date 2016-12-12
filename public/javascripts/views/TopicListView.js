define([
  "jquery",
  "backbone",
  "handlebars",
  "views/TopicView"
], function($, Backbone, Handlebars, TopicView){

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

  return TopicListView;

});
