/**
 * jsClock
 * A dependency-free, configurable JavaScript clock
 * Based on https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
 */

// Entry point of the script, initializes jsClock
function initializeClock(id, mode, deadline, expiryText, color) {
    // If there is no mode defined, default to currentTime
    if (mode === undefined || !mode) {
        mode = 'currentTime';
    }

    // Div for the clock element
    var clock = document.getElementById(id);

    // Clear contents of target div
    clock.innerHTML = '';

    // Validate hex color, if valid, use set color for clock
    var colorIsValidHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    if (colorIsValidHex) {
        clock.style.backgroundColor = color;
    }

    // Only display days if mode is set to 'countdown'
    if (mode === 'countdown') {
        var daysDiv = document.createElement('div');
        var daysSpan = document.createElement('span');
        var daysSmalltext = document.createElement('div')
        daysSpan.className = 'days';
        daysSmalltext.className = 'smalltext';
        daysSmalltext.innerHTML = 'Days'
        daysDiv.appendChild(daysSpan);
        daysDiv.appendChild(daysSmalltext)
        clock.appendChild(daysDiv);
    }

    var hoursDiv = document.createElement('div');
    var hoursSpan = document.createElement('span');
    var hoursSmalltext = document.createElement('div')
    hoursSpan.className = 'hours';
    hoursSmalltext.className = 'smalltext';
    hoursSmalltext.innerHTML = 'Hours'
    hoursDiv.appendChild(hoursSpan);
    hoursDiv.appendChild(hoursSmalltext)
    clock.appendChild(hoursDiv);

    var minutesDiv = document.createElement('div');
    var minutesSpan = document.createElement('span');
    var minutesSmalltext = document.createElement('div')
    minutesSpan.className = 'minutes';
    minutesSmalltext.className = 'smalltext';
    minutesSmalltext.innerHTML = 'Minutes'
    minutesDiv.appendChild(minutesSpan);
    minutesDiv.appendChild(minutesSmalltext)
    clock.appendChild(minutesDiv);

    var secondsDiv = document.createElement('div');
    var secondsSpan = document.createElement('span');
    var secondsSmalltext = document.createElement('div')
    secondsSpan.className = 'seconds';
    secondsSmalltext.className = 'smalltext';
    secondsSmalltext.innerHTML = 'Seconds'
    secondsDiv.appendChild(secondsSpan);
    secondsDiv.appendChild(secondsSmalltext)
    clock.appendChild(secondsDiv);

    // Fix formatting of divs in clock if mode is 'currentTime'
    if (mode === 'currentTime') {
        hoursSpan.parentNode.style.width = '33.33%';
        minutesSpan.parentNode.style.width = '33.33%';
        secondsSpan.parentNode.style.width = '33.33%';
    }

    // Executed every tick of the interval
    function updateClock() {
        var t;

        // Get current time of mode is 'currentTime'
        if (mode === 'currentTime') {
            t = getCurrentTime();
        }

        // Otherwise convert deadline to time, and get the rime remaining to it
        if (mode === 'countdown') {
            var endtime = new Date(Date.parse(deadline));

            t = getTimeRemaining(endtime);

            // Only populate days if mode is 'countdown'
            daysSpan.innerHTML = t.days;
        }

        // Populate hours, minutes, seconds
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        // If the countdown expires
        if (mode === 'countdown' && t.total <= 0) {
            // Create and format expired text div
            var expiredDiv = document.createElement('div');
            expiredDiv.style.width = '100%';

            // Create and format expired text span
            var expiredSpan = document.createElement('span');
            expiredSpan.innerHTML = expiryText;
            expiredSpan.style.width = '100%';
            expiredSpan.style.boxSizing = 'border-box';

            expiredDiv.appendChild(expiredSpan);

            // Empty clock contents, and replace with expiry text
            clock.innerHTML = '';
            clock.appendChild(expiredDiv);
            clearInterval(timeinterval);

            return;
        }
    }

    // Update clock every second (1000 milliseconds)
    var timeinterval = setInterval(updateClock, 1000);
}

// Calculates the time remaining to endtime and returns it
function getTimeRemaining(endtime) {
    // t is the raw timestamp
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

// Returns an object with the current time
function getCurrentTime() {
    // t is the raw timestamp
    var t = Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
