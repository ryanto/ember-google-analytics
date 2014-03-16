Ember.GoogleAnalyticsTrackingMixin = Ember.Mixin.create({
  pageHasGa: function() {
    return window.ga && typeof window.ga === "function";
  },

  getTrackerPrefix: function () {
    var tracker = (ga.getAll && typeof ga.getAll === "function" && ga.getAll() || []).pop();
    return tracker ? tracker.get('name') + '.' : '';
  },

  trackPageView: function(page) {
    if (this.pageHasGa()) {
      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga(this.getTrackerPrefix() + 'send', 'pageview', page);
    }
  },

  trackEvent: function(category, action, label, value) {
    if (this.pageHasGa()) {
      ga(this.getTrackerPrefix() + 'send', 'event', category, action, label, value);
    }
  }
});
