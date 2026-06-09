function pad(n) {
  return String(n).padStart(2, '0')
}

function formatDateCN(date = new Date()) {
  return `${date.getFullYear()}/${pad(
    date.getMonth() + 1
  )}/${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

module.exports = {
  formatDateCN,
}
