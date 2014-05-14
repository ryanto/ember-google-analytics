var ObjectWithMixin = Ember.Object.extend(Ember.GoogleAnalyticsTrackingMixin);

var instance;
var counter;
var emberInfoLogger = Ember.Logger.info;

module("Logging enabled", {
  setup: function() {
    counter = 0;
    window.ENV = { LOG_EVENT_TRACKING: true };
    window.logs = [];

    instance = ObjectWithMixin.create();

    Ember.Logger.info = function() {
      counter = counter + 1;
    };
  },

  teardown: function() {
    window.ENV = null;
    window.logs = null;
    Ember.Logger.info = emberInfoLogger;
    Ember.run(instance, "destroy");
  }
});

test("logTracking returns true if LOG_EVENT_TRACKING true", function() {
  expect(1);

  equal(instance.logTrackingEnabled(), true);
});

test("logs page views sent to Google Analytics", function() {
  expect(1);

  instance.trackPageView("/homepage");

  equal(counter, 1);
});

test("logs events sent to Google Analytics", function() {
  expect(1);

  instance.trackEvent('Video', 'play', 'youtube', 'http://youtube.com/somevideo');

  equal(counter, 1);
});

module("Logging disabled", {
  setup: function() {
    counter = 0;
    Ember.Logger.info = function() {
      counter = counter + 1;
    };
    window.ENV = { LOG_EVENT_TRACKING: false };

    instance = ObjectWithMixin.create();
  },

  teardown: function() {
    window.ENV = null;
    Ember.Logger.info = emberInfoLogger;
    Ember.run(instance, 'destroy');
  }
});

test("logTracking returns false if LOG_EVENT_TRACKING false", function() {
  expect(1);

  equal(instance.logTrackingEnabled(), false);
});

test("logTracking returns false if window.ENV undefined", function() {
  window.ENV = null;

  expect(1);

  equal(instance.logTrackingEnabled(), false);
});

test("does not log page views sent to Google Analytics", function() {
  expect(1);

  instance.trackPageView("/homepage");

  equal(counter, 0);
});


test("does not log events sent to Google Analytics", function() {
  expect(1);

  instance.trackEvent('Video', 'play', 'youtube', 'http://youtube.com/somevideo');


  equal(counter, 0);
});
