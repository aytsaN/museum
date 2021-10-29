const videoContainer = document.querySelector('.video-container');
const video = videoContainer.querySelector('#video');
const controls = videoContainer.querySelector('.video-controls');
const btnPlayPause = videoContainer.querySelector('#play');
const btnBigPlay = videoContainer.querySelector('.playback-animation');
const progressBar = videoContainer.querySelector('.progress');
const btnVolume = videoContainer.querySelector('.volume-button');
const volumeBar = videoContainer.querySelector('.volume');
const btnFullScreen = videoContainer.querySelector('.fullscreen-button');
const playbackRate = document.querySelector('.video-playbackRate');

let isPlaying = false;
let isVolumeOn = true;

function drawGradient(value) {
  return `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
}

function updateButton(btn) {
  let btnArr = btn.querySelectorAll('use');
  btnArr.forEach(icon => icon.classList.toggle('hidden'));
}

function playPauseVideo() {
  if(video.paused) {
    video.play();
    updateButton(btnPlayPause);
    updateButton(btnBigPlay);
    isPlaying = true;
  } else {
    video.pause();
    updateButton(btnPlayPause);
    updateButton(btnBigPlay);
    isPlaying = false;
  }
}

function stopVideo() {
  if (isPlaying) {
    updateButton(btnPlayPause);
    updateButton(btnBigPlay);
    video.currentTime = 0;
    isPlaying = false;
  } else {
    video.currentTime = 0;
  }
}

function updateProgress() {
  let progressValue = Math.round((video.currentTime * 100) / video.duration) || 0;
  progressBar.value = progressValue;
  progressBar.style.background = drawGradient(progressValue);
}

function toggleVolume() {
  if (isVolumeOn) {
    video.muted = true;
    isVolumeOn = false;
    updateButton(btnVolume);
    volumeBar.value = 0;
    volumeBar.style.background = drawGradient(0);
  } else if (video.volume > 0) {
    video.muted = false;
    isVolumeOn = true;
    updateButton(btnVolume);
    volumeBar.value = video.volume * 10;
    volumeBar.style.background = drawGradient(video.volume * 100);
  }
}

function updateVolume() {
  let newVolumeValue = this.value / 10;
  if ((video.volume === 0 || video.muted) && newVolumeValue > 0) {
    video.muted = false;
    updateButton(btnVolume);
    isVolumeOn = true;
  }
  if (newVolumeValue === 0) {
    updateButton(btnVolume);
    isVolumeOn = false;
  }
  video.volume = newVolumeValue;
  this.style.background = drawGradient(this.value * 10);
}

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    updateButton(btnFullScreen);
  } else {
    videoContainer.requestFullscreen();
    updateButton(btnFullScreen);
  }
}

function changePlaybackRate(newRate) {
   if (newRate > 0.4 && newRate <= 2) {
    video.playbackRate = newRate;
    playbackRate.innerHTML = video.playbackRate;
    playbackRate.classList.remove('hidden');
    setTimeout(() => playbackRate.classList.add('hidden'), 2000);
   }
}

function onKeyElementClick(e) {
  if (Math.abs(video.getBoundingClientRect().top) <= (window.innerHeight || document.documentElement.clientHeight) / 2
    && !document.querySelector('.order-popup:target')) {
    e.preventDefault();
    if (e.code === 'Space') {
      playPauseVideo();
    }
    if (e.code === 'KeyM') {
      toggleVolume();
    }
    if (e.code === 'KeyF') {
      toggleFullScreen();
    }
    if (e.key === '>' || e.key === 'Ю') {
      changePlaybackRate(video.playbackRate + 0.5);
    }
    if (e.key === '<' || e.key === 'Б') {
      changePlaybackRate(video.playbackRate - 0.5);
    }
  }
}

function initializeVideo() {
  video.currentTime = 0;
  progressBar.setAttribute('max', 100);
  progressBar.style.background = drawGradient(0)
  updateProgress();
  video.volume = 0.2;
  volumeBar.style.background = drawGradient(video.volume * 100);
}

btnPlayPause.addEventListener('click', playPauseVideo);
video.addEventListener('click', playPauseVideo);
btnBigPlay.addEventListener('click', playPauseVideo);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('ended', stopVideo);
progressBar.addEventListener('input', function() {
  let newProgressValue = (this.value * video.duration) / 100;
  video.currentTime = newProgressValue;
  this.style.background = drawGradient(newProgressValue);
})

btnVolume.addEventListener('click', toggleVolume);
volumeBar.addEventListener('input', updateVolume);

btnFullScreen.addEventListener('click', toggleFullScreen);

document.addEventListener('keydown', onKeyElementClick);

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
  video.removeAttribute('controls');
  initializeVideo();
}