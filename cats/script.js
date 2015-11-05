'use strict'
;(function (window, document) {
  var forcedPaddingPercentage = 5
  var gameStart = false // The game has not started yet
  // Width to height (wth) ratios of the images:
  var imageWidthToHeight = [
    1050 / 700,
    1057 / 700,
    933 / 700,
    1057 / 700,
    1050 / 700,
    700 / 700,
    1050 / 700,
    700 / 700,
    878 / 700
  ]
  var highestImageID = imageWidthToHeight.length - 1
  var catDB = imageWidthToHeight.map(function (wth, id) {
    return {
      wth: wth,
      url: 'cats/' + id + '.jpg',
      id: id,
      duration: 800 - (id / highestImageID * 500),
      delay: 800 - (id / highestImageID * 500),
      width: 40 - (id / highestImageID * 25) + '%'
    }
  })
  // Force the first cat image to be extra big
  catDB[0].width = '50%'
  catDB[0].duration = 1000
  catDB[0].delay = 3000

  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  // Given an element, delay between the fade in and out (in ms), and fade in/out duration (in ms), promise to fade it out and then delete it
  var fadeInOut = function (element, delay, duration) {
    return new Promise(function (resolve) {
      element.style.opacity = 0
      var start
      // First, fadeIn, then pause, then fadeOut, and finally resolve the promise. If you just call fadeIn and make sure to set the start, everything else will be done automatically
      // fadeIn will fade the thing in eternally, until it's 100% faded in, and then pause for delay, and then fadeOut
      var fadeIn = function () {
        var msDiff = window.performance.now() - start
        var percentage = 100 - (duration - msDiff) / duration * 100
        if (percentage >= 99) {
          element.style.opacity = 1
          pause()
        } else {
          element.style.opacity = percentage / 100
          window.requestAnimationFrame(fadeIn)
        }
      }
      var pause = function () {
        setTimeout(function () {
          start = window.performance.now()
          fadeOut()
        }, delay)
      }
      var fadeOut = function () {
        var msDiff = window.performance.now() - start
        var percentage = (duration - msDiff) / duration * 100
        if (percentage <= 1) {
          resolve()
        } else {
          element.style.opacity = percentage / 100
          window.requestAnimationFrame(fadeOut)
        }
      }
      // Now kick off the actual fading
      start = window.performance.now()
      fadeIn()
    })
  }

  var catsLeft = function () {
    return document.querySelector('.cats').children.length
  }
  // Given a cat and dimensions to put it in, find a good position for it (margins from the top and left, in percentages)
  var positionCat = function (cat, totalWidth, totalHeight) {
    // widthLeftOver = how much width (percentage of the screen) will be left over after the cat is inserted
    var widthLeftOver = 100 - parseInt(cat.width, 10)
    // catActualPixelWidth stores how many pixels wide the actual image is
    // The cat.width (which is a percentage of the screen) is turned into a fraction, and then multiplied by the screen's width
    var catActualPixelWidth = parseInt(cat.width, 10) / 100 * totalWidth
    // Divide the width by the width to height ratio to find the height
    var catActualPixelHeight = catActualPixelWidth / cat.wth
    // heightLeftOver = how much height (percentage of the screen) will be left over after the cat is inserted
    var heightLeftOver = 100 - (catActualPixelHeight / totalHeight * 100)
    return {
      top: randomInt(forcedPaddingPercentage, heightLeftOver - forcedPaddingPercentage) + '%',
      left: randomInt(forcedPaddingPercentage, widthLeftOver - forcedPaddingPercentage) + '%'
    }
  }
  // Create a new cat inside of .cats
  var setupNewCat = function (cat) {
    // Set up a new img.cat with the image's src and set its width (which is a percentage of the screen)
    var catElement = document.createElement('img')
    catElement.classList.add('cat')
    catElement.setAttribute('src', cat.url)
    catElement.setAttribute('width', cat.width)
    catElement.setAttribute('style', 'user-drag: none; -moz-user-select: none; -webkit-user-drag: none;')

    catElement.style.position = 'fixed'
    var position = positionCat(cat, window.innerWidth, window.innerHeight)
    catElement.style.top = position.top
    catElement.style.left = position.left

    var onClick = function () {
      catElement.parentNode.removeChild(catElement)
      if (cat.id === 0) {
        gameStart = Date.now()
        setupNewCat(catDB[1])
        setupNewCat(catDB[1])
      } else if (cat.id + 1 < catDB.length && Math.random() > 0.3) {
        setupNewCat(catDB[cat.id + 1])
        if (Math.random() > 0.8) setupNewCat(catDB[cat.id + 1])
      } else if (cat.id !== 1 && Math.random() > 0.7) {
        setupNewCat(catDB[cat.id - 1])
      } else if (Math.random() > 0.2 || catsLeft() < 2) {
        setupNewCat(catDB[cat.id])
      }
    }
    catElement.addEventListener('click', onClick)
    catElement.addEventListener('touchstart', onClick)
    document.querySelector('.cats').appendChild(catElement)
    fadeInOut(catElement, cat.delay, cat.duration).then(function () {
      if (catElement.parentNode) {
        catElement.parentNode.removeChild(catElement)
      }
      setTimeout(checkCats, randomInt(10, 40))
    })
  }

  var checkCats = function () {
    if (catsLeft() < 1) {
      // First, make sure subsequent calls to this function are no-ops
      checkCats = function () {}
      var gameTime = gameStart ? Date.now() - gameStart : 0 // in ms
      document.querySelector('.left').textContent = 'After ' + (gameTime / 1000).toFixed(3) + 's'
      document.querySelector('.big').textContent = 'You lost!'
      document.querySelector('.right').innerHTML = `
        See <a href=https://github.com/jamescostian/jamescostian.github.io>the code</a>,<br>
        <a href="resume.pdf">my résumé</a>,<br>
        or <a href="?">go again</a>
      `
    }
  }

  window.addEventListener('load', function () {
    setTimeout(function () {
      setupNewCat(catDB[0])
    }, 3000)
  })
}(window, document))
