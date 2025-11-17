let mCurrentIndex = 0;
let mImages = [];
const mUrl = 'images.json';
const mWaitTime = 5000;
let mTimer = null;

$(document).ready(() => {
  // Hide details initially
  $('.details').hide();

  // Toggle details on click
  $('.moreIndicator').click(function () {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle();
  });

  // Next/Prev buttons
  $('#nextPhoto').click(() => {
    showNextPhoto();
    resetTimer(); // reset timer when user manually navigates
  });
  $('#prevPhoto').click(() => {
    showPrevPhoto();
    resetTimer();
  });

  // Load JSON
  fetchJSON();
});

/* ------------------------------
   Load JSON
------------------------------ */
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;

      if (mImages.length > 0) {
        swapPhoto();  // Show first image
        startTimer(); // Start slideshow timer
      }
    },
    error: function () {
      console.error('Failed to load JSON.');
    }
  });
}

/* ------------------------------
   Swap Photo & Update Details
------------------------------ */
function swapPhoto() {
  const img = mImages[mCurrentIndex];
  if (!img) return;

  $('#photo').attr('src', img.imgPath);
  $('.location').text("Location: " + img.imgLocation);
  $('.description').text("Description: " + img.description);
  $('.about').text("About: " + img.about); // updated line
}


/* ------------------------------
   Navigation
------------------------------ */
function showNextPhoto() {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
  swapPhoto();
}

function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto();
}

/* ------------------------------
   Timer
------------------------------ */
function startTimer() {
  if (mTimer) clearInterval(mTimer);

  mTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}

// Reset timer when user manually navigates
function resetTimer() {
  clearInterval(mTimer);
  startTimer();
}


