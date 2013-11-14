Ember.GoogleAnalyticsTrackingMixin = Ember.Mixin.create({
  pageHasGa: function() {
    return !Ember.isNone(window.ga);
  },

  trackPageView: function(page) {
    if (this.pageHasGa()) {
      if (!page) {
        loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga('send', 'pageview', page);
    }
  },

  trackEvent: function(category, action) {
    if (this.pageHasGa()) {
      ga('send', 'event', category, action);
    }
  }
});
