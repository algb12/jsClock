# jsClock

A dependency-free, JavaScript-based, configurable clock

## What makes jsClock the perfect clock for your website?

- Minimal extra markup required: Just include jsClock JS and CSS in your `<head>` section, an empty container `<div>` in your `<body>` section, and initialize jsClock before the end of the `<body>` section... Done and dusted!
- Configurable color: Pass any hex color to jsClock - it really fits any color scheme on any website!
- Two modes: A countdown mode and a clock mode. You can even use it as a countdown clock! Stopwatch mode planned in future releases...
- Customizable expiry text: When the countdown finishes, you can set your own message!
- Parses deadlines in any format which JavaScript's `Date.parse()` can handle!

## Installation / usage

Getting started with jsClock is easy! Create a `jsClock` directory in your `scripts` directory, and copy the downloaded `jsClock.min.css` and `jsClock.min.js` from the `src` directory into the destination directory.

In your `<head>` section, include the following markup:

```html
<link rel="stylesheet" href="/scripts/jsClock/jsClock.min.css" type="text/css" />
<script type="text/javascript" src="/scripts/jsClock/jsClock.min.js"></script>
```

Make sure to update the paths to the correct directory! This loads the files required for jsClock.

Where you want to place a clock element, include the following on your page:

```html
<div class="clockdiv" id="myClock"></div>
```

`myClock` is the ID of this clock, and `clockdiv` is the class jsClock uses to style the clocks.

To now initialize a clock, place the following right before the end of the `<body>` section:

```html
<script>
    // A regular clock
    initializeClock('myClock', 'currentTime');

    // Another regular clock
    initializeClock('myClock2', 'currentTime');

    // A blue clock
    initializeClock('myClock', 'currentTime', null, null, '#0080be');

    // A blue countdown clock to Jan 01 2020
    initializeClock('myClock', 'countdown', 'Jan 01 2020 00:00:00', 'Countdown expired!', '#0080be');
</script>
```

As you can see, jsClock is quite customizable! The syntax for `initializeClock()` is as follows:

```javascript
initializeClock(id, mode, deadline, expiryText, color)
```

Where the parameters are:

- `id`: The ID of the div containing the clock
- `mode`: Can either be `countdown` for a countdown clock or `currentTime` for a regular clock
- `deadline`: If `mode` is `countdown`, the point at which the countdown should expire (any date/time parseable by `Date.parse()`)
- `expiryText`: If `mode` is `countdown`, the message to be shown when the countdown expires
- `color`: Any hex color theming the clock, if none set, will use color from default CSS

## MODX snippet

As an avid MODX user, I have also created a snippet for jsClock which integrates it nicely with MODX. You can then insert a clock on your page simply by calling `[[!jsClock]]`!

To use the snippet, find the file `jsClock_MODX.php` and copy its contents into a new snippet called `jsClock`. If the paths to the jsClock files are different on your website, make sure to update them accordingly!

How to use the snippet is directly documented within it.

## Contributions and bugs

If you do happen to find a bug in jsClock, do not hesitate to either contact me by email (<algb12.19@gmail.com>) or open up an issue in the issues tracker!

I am also open to new ideas and feature requests.
