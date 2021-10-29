let isClicked = false;
let overlayImg = document.querySelector('.explore-img-overlay');

let slider = document.createElement('DIV');
let w = overlayImg.offsetWidth;
let h = overlayImg.offsetHeight;

overlayImg.style.width = (w / 2) + "px";

slider.setAttribute('class', 'img-comp-slider');
overlayImg.parentElement.insertBefore(slider, overlayImg);
slider.style.top = "0px";
slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

function slide(x) {
  overlayImg.style.width = x + "px";
  slider.style.left = overlayImg.offsetWidth - (slider.offsetWidth / 2) + "px";
}

function getCursorPos(e) {
  let x = 0;

  e = e || window.event;
  x = e.pageX - overlayImg.getBoundingClientRect().left;
  x = x - window.pageXOffset;
  return x;
}

function slideMove(e) {
  let position;
  if (!isClicked) return false;
  position = getCursorPos(e)
  if (position < 0) position = 0;
  if (position > w) position = w;
  slide(position);
}

function slideReady(e) {
  e.preventDefault();
  isClicked = true;
  window.addEventListener("mousemove", slideMove);
  window.addEventListener("touchmove", slideMove);
}

function slideFinish() {
  isClicked = false;
}

slider.addEventListener("mousedown", slideReady);
window.addEventListener("mouseup", slideFinish);
slider.addEventListener("touchstart", slideReady);
window.addEventListener("touchstop", slideFinish);




