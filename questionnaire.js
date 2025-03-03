// Store answers as they roll in
let answerPrefixes = []
let answerSuffixes = []
let selectedPrefixes = null
let selectedSuffixes = null
let animal = null

// Click the button to tabulate your result
$(document).on("click", "[data-behavior~=tabulate-result]", function(event) {
  event.preventDefault()

  // Find all selected answers
  selectedPrefixes = $("input[type=radio][data-clan-prefix]:checked")
  selectedSuffixes = $("input[type=radio][data-clan-suffix]:checked")

  // Find selected prefixes
  selectedPrefixes.each(function(){
    answerPrefixes.push(this.value.split(","))
  })

  // Find selected suffixes
  selectedSuffixes.each(function(){
    answerSuffixes.push(this.value.split(","))
  })

  // Get the most common prefix and suffix across your answers
  prefix = mode([].concat.apply([], shuffle(answerPrefixes)))
  suffix = mode([].concat.apply([], shuffle(answerSuffixes)))

  // Display your warrior name
  $("[data-role=warrior-name]").html(capitalizeFirstLetter(prefix + "" + suffix))
  $(".zoom").fadeIn("fast")

  answerPrefixes = []
  answerSuffixes = []

  // Reset the form
  $('form').get(0).reset()
})

// Click the overlay
$(document).on('click', "[data-behavior~=unzoom]", function(event) {
  event.preventDefault()

  // Scroll back to the top of the quiz
  window.scrollTo(0,0)

  // Hide the dialog
  $(".zoom").fadeOut("fast")
})

// Find the most frequent, unique item in the merged array
function mode(arr) {
  return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop()
}

// Capitalize
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Suffle the arrays
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
