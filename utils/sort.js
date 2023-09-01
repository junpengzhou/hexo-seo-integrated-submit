// sort by date
module.exports = { sortDownDate, sortUpDate }

// desc
function sortUpDate(arr) {
  return arr.sort((a, b) => Date.parse(a) - Date.parse(b))
}

// asc
function sortDownDate(arr, value) {
  return arr.sort((a, b) => Date.parse(b[value]) - Date.parse(a[value]))
}
