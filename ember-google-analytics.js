Ember.GoogleAnalyticsTrackingMixin = Ember.Mixin.create({
  pageHasGa: function() {
    return window.ga && typeof window.ga === "function";
  },

  logTrackingEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_EVENT_TRACKING;
  },

  logTracking: function() {
    Ember.Logger.info('Tracking Google Analytics event: ', arguments);
  },

  trackPageView: function(page) {
    if (this.pageHasGa()) {
      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga('send', 'pageview', page);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking('pageview', page);
    }
  },

  trackEvent: function(category, action, label, value) {
    if (this.pageHasGa()) {
      ga('send', 'event', category, action, label, value);
    }

    if (this.logTrackingEnabled()) {
      this.logTracking('event', category, action, label, value);
    }
  }
});
Ember.Application.initializer({
  name: "googleAnalytics",

  initialize: function(registry, application) {
  }
});
Ember.Application.instanceInitializer({
  name: "googleAnalytics",

  initialize: function(instance) {
    var router = instance.container.lookup('router:main');
    router.on('didTransition', function() {
      this.trackPageView(router.rootURL.slice(0, -1) + this.get('url'));
    });
  }
});
Ember.Router.reopen(Ember.GoogleAnalyticsTrackingMixin);
