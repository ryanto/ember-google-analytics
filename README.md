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
      this.trackEvent('video', 'play', 'youtube', 1);
    }
  }
});
```

The mixin can be applied to any Ember object.

### Categories, Actions, and Labels

There are four parts to an Event. Each individual Event you want to track must be tagged with at least two of these parts; the other two are optional but recommended.

- **Category (required)**: The category is at the top of the hierarchy. It’s a way to bundle user activity together. "Slideshow", "Videos", and "Downloads" are good examples of categories, though you can be as specific or broad as your content requires.
- **Action (required)**: The action is literally what the user does. For a video player example, potential actions might be: play, pause, share, get embed link, etc.
- **Label (optional)**: Provides a bit more information about the user's action. For example, if you are using events to track a video player you might record the movie name as the label when an action occurs. That provides more context to what the user is doing.
- **Value (optional)**: Any ``positive integer value``. It’s a number. You can use it to count things, like dollars or seconds. If you choose to use your event as a goal, then you can specify that Google Analytics use the event value as the goal value.

## Logging

To enable console logging any events or page views sent to Google Analytics:

```
window.ENV = window.ENV || {};
window.ENV.LOG_EVENT_TRACKING = true;
```

## Development

This plugin is built with rake pipeline, which requires Ruby. To get
started:

```
bundle install
rackup
```

Edit code and visit [http://localhost:9292](http://localhost:9292) to
run tests.
