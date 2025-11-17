let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://images-json-url.com' 
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer = null

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Remove startTimer() from here!

  // More indicator click
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
      data.images.forEach(img => mImages.push(img))

      // Display first image
      swapPhoto()

      // Now start the timer after images are loaded
      startTimer()
    }
  })
}




