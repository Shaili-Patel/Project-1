let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://images-json-url.com'
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer = null

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Toggle details panel
  $('#moreIndicator').click(function () {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  // Next button
  $('#nextPhoto').click(() => {
    showNextPhoto()
  })

  // Previous button
  $('#prevPhoto').click(() => {
    showPrevPhoto()
  })

  // Load the images data
  fetchJSON()
})

/* ------------------------------------------------------
   FETCH JSON
------------------------------------------------------ */
function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      data.images.forEach(img => mImages.push(img))

      // Display first image
      swapPhoto()

      // Start slideshow timer AFTER loading images
      startTimer()
    }
  })
}

/* ------------------------------------------------------
   UPDATE IMAGE + METADATA
------------------------------------------------------ */
function swapPhoto () {
  const img = mImages[mCurrentIndex]

  $('#photo').attr('src', img.imgPath)
  $('.location').text(img.imgLocation)
  $('.description').text(img.description)
  $('.date').text(img.date)
}

/* ------------------------------------------------------
   NEXT / PREVIOUS
------------------------------------------------------ */
function showNextPhoto () {
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
}

function showPrevPhoto () {
  mCurrentIndex--
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
}

/* ------------------------------------------------------
   SLIDESHOW TIMER
------------------------------------------------------ */
function startTimer () {
  if (mTimer) clearInterval(mTimer)

  mTimer = setInterval(() => {
    showNextPhoto()
  }, mWaitTime)
}


// Timer
function startTimer() {
  if (mTimer) clearInterval(mTimer)  // Clear existing timer if running

  mTimer = setInterval(() => {
    showNextPhoto()  // Advance to the next image
  }, 5000) // 5 seconds
}





