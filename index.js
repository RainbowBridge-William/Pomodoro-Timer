/**
 * Name: William Wang
 * Date: 4/22/2021
 * Section: CSE 154 AO
 *
 * This index.js counts the minutes and seconds, and updates the time container. When botton
 * is clicked, Playing audio.
 */
"use strict";

(function() {
  const MININTERVAL = 60000;
  const SECINTERVAL = 1000;
  const MININITIAL = 25;
  const SECINITIAL = 60;
  const click = new Audio("./resource/click.mp3");
  const bell = new Audio("./resource/bell.mp3");

  window.addEventListener("load", init);

  /**
   * Initilize minutes and seconds display,
   * call start function when play button is clicked
   */
  function init() {
    id("minutes").textContent = MININITIAL;
    id("seconds").textContent = "00";
    id("play").onclick = start;
    id("refresh").onclick = click.play();
  }

  let minutes = MININITIAL; // global variable
  let seconds = SECINITIAL;

  /**
   * Counting down minutes and seconds
   */
  function start() {
    click.play();
    id("play").classList.add("disappear");

    let minInt = setInterval(minuteTimer, MININTERVAL);
    let secInt = setInterval(secondTimer, SECINTERVAL);

    /**
     * Counting down 1 minute and update minute display
     */
    function minuteTimer() {
      minutes--;
      id("minutes").textContent = minutes;
    }

    /**
     * Couting down 1 second and update minute display.
     * @returns {function} return stopTimer to prevent further counting
     */
    function secondTimer() {
      if (seconds <= 0 && minutes > 0) {
        seconds = SECINITIAL;
      } else if (minutes <= 0) {
        return stopTimer();
      }
      seconds--;
      id("seconds").textContent = seconds;
      if (minutes === MININITIAL) {
        minuteTimer();
      }
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
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
