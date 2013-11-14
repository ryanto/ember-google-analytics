Ember.Application.initializer({
  name: "googleAnalytics",

  initialize: function(container, application) {
    var router = container.lookup('router:main');
    router.on('didTransition', function() {
      this.trackPageView(this.get('url'));
    });
  }
});
