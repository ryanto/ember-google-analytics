Ember.FEATURES["ember-testing-lazy-routing"] = true;

App = Ember.Application.create({ rootElement: '#qunit-fixture' });

App.Router.map(function() {
  this.route('welcome');
});

App.setupForTesting();

module("Routing", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  },

  teardown: function() {
    window.ga = null;
  }
});

test("should not do anything when there is no google analytics", function() {
  visit("/");

  visit("/welcome");

  andThen(function() {
    ok(!window.ga);
  });
});

test("should not do anything if window.ga is not a function", function() {
  window.ga = 1;

  visit("/");

  visit("/welcome");

  andThen(function() {
    ok(window.ga);
  });
});

test("should trigger when a route changes", function() {
  var counter = 0;

  window.ga = function() {
    counter = counter + 1;
  };

  visit("/");

  andThen(function() {
    equal(counter, 1);
  });

  visit("/welcome");

  andThen(function() {
    equal(counter, 2);
  });
});

test("should send the current url to google analytics", function() {
  window.ga = function(command, action, data) {
    equal(data, "/welcome");
  };

  visit("/welcome");
});
