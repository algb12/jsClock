<?php
/**
 * jsClock.
 *
 * DESCRIPTION
 *
 * This Snippet is a countdown clock for MODX, based on
 * https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
 * with modifications made by the author of this snippet
 * It uses a separate JavaScript and CSS file for the countdown timer
 *
 * PROPERTIES:
 *
 * &clockID string optional. The ID of the clock as an HTML element. Default: myClock
 * &mode string optional. The mode in which jsClock operates (either 'countdown' or 'currentTime'). Default: currentTime
 * &deadline string required if &mode is 'countdown'. The timestamp to which the countdown should count.
 * &expiryText string optional. The text to be displayed when the countdown expires. Default: 'Countdown expired!'
 * &color string optional. The color of the countdown clock. Else defaults to CSS-defined color from stylesheet
 *
 * USAGE:
 *
 * [[!jsClock? &clockID=`myClock` &mode=`countdown` &deadline=`Jan 01 2020 12:00:00` &expiryText=`Countdown expired!` &color=`#0088bb`]]
 * &deadline may be passed as any format that is parseable by JavaScript's Date.parse().]
 * &color may either be a normal hex color or shorthand, with ot without hash
 * &mode may either be 'currentTime' to display the current time, or 'countdown' for a countdown
 */
$clockID = (string) $modx->getOption('clockID', $scriptProperties, 'myClock');
$mode = (string) $modx->getOption('mode', $scriptProperties, 'currentTime');
$deadline = (string) $modx->getOption('deadline', $scriptProperties);
$expiryText = (string) $modx->getOption('expiryText', $scriptProperties, 'Countdown expired!');
$color = (string) $modx->getOption('color', $scriptProperties, null);

// For debugging:
$modx->log(modX::LOG_LEVEL_DEBUG,
    'jsClock called on page '.$modx->resource->id.' with the following properties: '
    .print_r($scriptProperties, true));

if ($mode === 'countdown' && !isset($scriptProperties['deadline'])) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[jsClock] missing required property &deadline!');

    return;
}

// Check for a hex color string and append hash if need be
if (preg_match('/^#[a-f0-9]{6}$/i', $color)) {
    // Verified hex color
    $inlineCSS = 'background-color: '.$color;
} elseif (preg_match('/^[a-f0-9]{6}$/i', $color)) {
    // Verified hex color, but append #
    $color = '#'.$color;
    $inlineCSS = 'background-color: '.$color;
} elseif (preg_match('/^#[a-f0-9]{3}$/i', $color)) {
    // Verified short hex color
    $inlineCSS = 'background-color: '.$color;
} elseif (preg_match('/^[a-f0-9]{3}$/i', $color)) {
    // Verified short hex color, but append #
    $color = '#'.$color;
    $inlineCSS = 'background-color: '.$color;
} else {
    $inlineCSS = null;
}

// Load jsClock assets
$modx->regClientCSS(MODX_ASSETS_URL.'scripts/jsClock/jsClock.min.css');
$modx->regClientStartupScript(MODX_ASSETS_URL.'scripts/jsClock/jsClock.min.js');

// Process the clockTpl chunk and generate output
$output = '<div class="clockdiv" id="jsClock-'.$clockID.'"></div>';

// Initialise the jsClock instance through JavaScript when page is loaded
$modx->regClientHTMLBlock('
<script>
    initializeClock(\'jsClock-'.$clockID.'\', \''.$mode.'\', \''.$deadline.'\', \''.$expiryText.'\', \''.$color.'\');
</script>');

// Return the output from the processed chunk
return $output;
