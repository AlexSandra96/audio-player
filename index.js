// Variables
const player = document.querySelector('.player-container')
const audio = document.querySelector('.audio')
const img = document.querySelector('.background-img')
const cover = document.querySelector('.song-image')
const buttonPlay = document.querySelector('.play-song');
const buttonNext = document.querySelector('.next-song')
const buttonBack = document.querySelector('.back-song')
const artist = document.querySelector('.artist')
const title = document.querySelector('.title')
const durationTime = document.querySelector('.duration-time')
const currTime = document.querySelector('.current-time')
const playerBar = document.querySelector('.player-bar')
const imgSrc = document.querySelector('.img-src')

// Titles and Artists
const songs = ['Enemy', 'Getting Along', 'Wellerman', 'Rescue me', 'Monster', 'Get Lucky',];
const artists = ['Imagen Dragons', 'Royal Republic', 'Nathan Evans', 'One Repulic', 'Imagen Dragons', 'Halestorm'];
// Default song
let songIndex = 0;

// Init
function loadSong() {
  title.innerHTML = songs[songIndex]
  artist.innerHTML = artists[songIndex]
  audio.src= `./assets/audio/${songs[songIndex]}.mp3`
  img.src = `./assets/img/cover${songIndex + 1}.jpeg`
  cover.src = `./assets/img/cover${songIndex + 1}.jpeg`
}
loadSong([songIndex])

//Play 
function playSong() {
  player.classList.add('play')
  imgSrc.src = './assets/svg/pause.png'
  audio.play()
}

// Pause
function pauseSong() {
  player.classList.remove('play')
  imgSrc.src = './assets/svg/play.png'
  audio.pause()
}

buttonPlay.addEventListener('click', () => {
  const isPlay = player.classList.contains('play')
  if (isPlay) {
    pauseSong()
  } else {
    playSong()
  }
})

//Next Song
function nextSong () {
  songIndex++
  if(songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong([songIndex])
  playSong()
  
}

buttonNext.addEventListener('click', nextSong)

// Prev Song
function prevSong () {
  songIndex--
  if(songIndex < 0) {
    songIndex = songs.length -1
  }
  loadSong([songIndex])
  playSong()
  
}

buttonBack.addEventListener('click', prevSong)

//Progress Bar

function updateProgress() {
  let min = Math.floor(audio.currentTime / 60);
  if (min < 10) {
    min = '0' + min;
  }
  let sec = Math.floor(audio.currentTime % 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  currTime.innerHTML = `${min}:${sec}`
  setTimeout (() => {
    playerBar.max = audio.duration
    durationTime.innerHTML = formatTime(audio.duration);
  }, 300)
  playerBar.value = audio.currentTime;
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress() {
  audio.currentTime = playerBar.value 
}
playerBar.addEventListener('change', setProgress)

function formatTime(time) {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = '0' + min;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  return `${min}:${sec}`
}

