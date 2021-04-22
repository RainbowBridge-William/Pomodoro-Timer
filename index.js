/**
 * Name: William Wang
 * Date: 4/22/2021
 * Section: CSE 154 AO
 *
 * This index.js counts the minutes and seconds, and updates the time container. When botton
 * is clicked, Playing audio.
 */
"use strict";

(function () {
  let minutes = 25;
  let seconds = "00";

  let click = new Audio("./resource/click.mp3");
  let bell = new Audio("./resource/bell.mp3");

  window.addEventListener("load", init);

  /**
   * Initilize minutes and seconds display,
   * call start function when play button is clicked
   */
  function init() {
    id("minutes").textContent = minutes;
    id("seconds").textContent = seconds;
    id("play").onclick = start;
    id("refresh").onclick = click.play();
  }

  /**
   * Counting down minutes and seconds
   */
  function start() {
    click.play();
    id("play").classList.add("disappear");
    if (minutes === 25) {
      minutes = 24;
      seconds = 59;
      id("minutes").textContent = minutes;
      id("seconds").textContent = seconds;
    }

    let minInt = setInterval(minuteTimer, 60000);
    let secInt = setInterval(secondTimer, 1000);

    /**
     * Counting down 1 minute and update minute display
     */
    function minuteTimer() {
      minutes--;
      id("minutes").textContent = minutes;
    }

    /**
     * Couting down 1 second and update minute display.
     * @returns {function} stop timer function to prevent further counting
     */
    function secondTimer() {
      if (seconds <= 0 && minutes > 0) {
        seconds = 60;
      } else if (minutes <= 0) {
        return stopTimer();
      }
      seconds--;
      id("seconds").textContent = seconds;
    }

    /**
     * Stop the counting and showing complete session message
     */
    function stopTimer() {
      bell.play();
      clearInterval(secInt);
      clearInterval(minInt);
      let done = gen("h2");
      done.textContent = "You completed the session!";
      id("message").appendChild(done);
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
