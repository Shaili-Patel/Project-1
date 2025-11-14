let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://images-json-url.com' 
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer = null

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  startTimer() // start the timer for the slideshow

  // Nore indicator click
  $('#moreIndicator').click(function () {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  // Next Photo button
  $('#nextPhoto').click(() => {
    showNextPhoto()
  })

  // Back Photo button
  $('#prevPhoto').click(() => {
    showPrevPhoto()
  })

  // Load the scenery images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      data.images.forEach(img => {
        mImages.push(img)
      })
      swapPhoto()
    }
  })
}

// Functin to swap and display the next photo in the slideshow
function swapPhoto () {
  const img = mImages[mCurrentIndex]
  $('#photo').attr('src', img.imgPath)
  $('.location').text(img.imgLocation)
  $('.description').text(img.description)
  $('.date').text(img.date)
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
}

// Goes to the previous photo, and loopss to the last photo
function showPrevPhoto () {
  mCurrentIndex--
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
}

// Starter code for the timer function
function startTimer () {
  if (mTimer) clearInterval(mTimer)
  mTimer = setInterval(() => {
    showNextPhoto()
  }, mWaitTime)
}



