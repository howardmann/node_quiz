define([
  "jquery",
  "backbone",
  "handlebars",
  "text!templates/TopicView.hbs"
], function($, Backbone, Handlebars, template){

  // // ====== View single
  var TopicView = Backbone.View.extend({
    className: 'col col-4 sm-col-12',

    template: Handlebars.compile(template),

    render: function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return TopicView;

});
