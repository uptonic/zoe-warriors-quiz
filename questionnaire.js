// Create an array of our animals
const prefixes = [
  { name: "poppy", fullName: "Red Panda", emoji: "🐼" },
  { name: "mouse", fullName: "Beta Fish", emoji: "🐟" },
  { name: "hazel", fullName: "Polar Bear", emoji: "🐻" },
  { name: "minnow", fullName: "Squirrel", emoji: "🐿" },
  { name: "stream", fullName: "Osprey", emoji: "🦅" },
  { name: "stone", fullName: "Iguana", emoji: "🦎" },
  { name: "crow", fullName: "Bobcat", emoji: "🐈" },
  { name: "breeze", fullName: "Zebra", emoji: "🦓" },
  { name: "hare", fullName: "Rabbit", emoji: "🐰" },
  { name: "scorch", fullName: "Rabbit", emoji: "🐰" },
  { name: "little", fullName: "Rabbit", emoji: "🐰" },
  { name: "ivy", fullName: "Rabbit", emoji: "🐰" }
]

// Store answers as they roll in
let answerPrefixes = []
let answerSuffixes = []
let selectedPrefixes = null
let selectedSuffixes = null
let animal = null

// Click the button to tabulate your result
$(document).on("click", "[data-behavior~=tabulate-result]", function(event) {
  event.preventDefault()

  // Find selected prefix answers
  selectedPrefixes = $("input[type=radio]:checked")
  selectedSuffixes = $("input[type=radio]:checked")

  console.log(selectedPrefixes)

  // Add the selections to the answers array
  selectedPrefixes.each(function(){
    answerPrefixes.push(this.value.split(","))
  })

  // Get the most common animal across your answers
  prefix = mode([].concat.apply([], answerPrefixes))

  // Display your animal
  $("[data-role=animal-emoji]").html(getResult(prefixes, prefix).emoji)
  $("[data-role=animal-name]").html(getResult(prefixes, prefix).fullName)
  $(".zoom").fadeIn("fast")

  // Reset the form
  $('form').get(0).reset()

  // Reset the animals array
  answerPrefixes = []
})

// Click an animal
$(document).on('click', "[data-behavior~=unzoom]", function(event) {
  event.preventDefault()

  // Scroll back to the top of the quiz
  window.scrollTo(0,0)

  // Hide the dialog
  $(".zoom").fadeOut("fast")
})

// Find the full name and emoji of the selected animal
function getResult(array, result) {
  return array.find(function(obj) { return obj.name === result })
}

// Find the most frequent, unique item in the merged array
function mode(arr) {
  return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop()
}
