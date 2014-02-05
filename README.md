# Ember Google Analytics

A plugin that allows your Ember application to work with Google
Analytics. Thanks to Matthew Beale (@mixonic) for
[PR #3453](https://github.com/emberjs/ember.js/pull/3453) that made
this plugin really easy to write.

## Usage

You should include
[ember-google-analytics.js](https://github.com/ryanto/ember-google-analytics/blob/master/ember-google-analytics.js)
on your page. Since this plugin depends on Ember.js you will have to
include Ember first. You will also need to include the snipit of
JavaScript that Google Analytics gives you. Follow the directions they
provide.

### Tracking Page Views

Once included your router will automatically send a page view event to
Google Analytics everytime the URL changes.

### Tracking Additional Events

You can track custom events with this plugin. If you have a controller
action that you wish to track you can use the
``Ember.GoogleAnalyticsTrackingMixin`` like so.

```javascript
App.VideoController = Ember.Controller.extend(
  Ember.GoogleAnalyticsTrackingMixin, {

  actions: {
    play: function() {
      // ...
      //this.trackEvent('category', 'action')
      this.trackEvent('video', 'play');
      // or
      //this.trackEvent('category', 'action', 'label', value)
      this.trackEvent('video', 'play', 'youtube', 'http://youtube.com/......'');
    }
  }
});
```

The mixin can be applied to any Ember object.

## Development

This plugin is built with rake pipeline, which requires Ruby. To get
started:

```
bundle install
rackup
```

Edit code and visit [http://localhost:9292](http://localhost:9292) to
run tests.
