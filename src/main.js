const $ = e => document.querySelectorAll(e)
const persianifyNumbers = num =>
  num
    .toString()
    .replaceAll("0", "۰")
    .replaceAll("1", "۱")
    .replaceAll("2", "۲")
    .replaceAll("3", "۳")
    .replaceAll("4", "۴")
    .replaceAll("5", "۵")
    .replaceAll("6", "۶")
    .replaceAll("7", "۷")
    .replaceAll("8", "۸")
    .replaceAll("9", "۹")
const pages = $(".page")
const gamePage = $("#🎮")[0]
const welcomePage = $("#welcome")[0]
const heading = $("#heading")[0]
const paragraph = $("#paragraph")[0]
const btn = $("#btn")[0]
let isStarted = false
let secsOfInactivity = 0
let interval = 0
const texts = {
  tip: "حالا اگه میتونی هیچ کاری نکن!",
  getCounter: secs => `تا الان ${persianifyNumbers(secs)} ثانیه هست که هیچ کاری نکردی.`,
  getReport: secs => `تونستی کلا ${persianifyNumbers(secs)} ثانیه هیچ کاری نکنی!`,
  gameOverMessage: "آخ آخ! باختی...",
  reloadBtn: "از اول",
}

btn.addEventListener("click", startGame)

function startGame() {
  isStarted = true
  btn.hidden = true
  count()
  setEventListeners()
}

function count() {
  paragraph.innerText = `${texts.tip}\n${texts.getCounter(secsOfInactivity)}`
  secsOfInactivity++
}

function setEventListeners() {
  if (isStarted) {
    gamePage.addEventListener("mousemove", gameOver)
    gamePage.addEventListener("click", gameOver)
    gamePage.addEventListener("contextmenu", gameOver)
    gamePage.addEventListener("scroll", gameOver)
    gamePage.addEventListener("touch", gameOver)
    document.addEventListener("keydown", gameOver)
    window.addEventListener("resize", gameOver)
    interval = setInterval(count, 1000)
  } else {
    gamePage.removeEventListener("mousemove", gameOver)
    gamePage.removeEventListener("click", gameOver)
    gamePage.removeEventListener("contextmenu", gameOver)
    gamePage.removeEventListener("scroll", gameOver)
    gamePage.removeEventListener("touch", gameOver)
    document.removeEventListener("keydown", gameOver)
    window.removeEventListener("resize", gameOver)
    clearInterval(interval)
  }
}

function gameOver(e) {
  if (e.target.id === "btn") return
  isStarted = false
  btn.hidden = false
  paragraph.innerText = `${texts.gameOverMessage}\n${texts.getReport(secsOfInactivity)}`
  btn.innerText = texts.reloadBtn
  btn.removeEventListener("click", startGame)
  btn.addEventListener("click", e => location.reload())
  setEventListeners()
}
