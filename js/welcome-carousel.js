let items = document.querySelectorAll('.welcome-carousel .item-container .item');
let controlCurrentNum = document.querySelector('.carousel-control .slide-num .current');
let controlBullets = document.querySelectorAll('.carousel-control .slide-pagination .item');
let currentItem = 0;
let targetBullet = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  controlBullets[currentItem].classList.remove('active');
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  controlBullets[currentItem].classList.add('active');
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function showSlideNum(slideNum) {
  controlCurrentNum.innerHTML = `0${slideNum}`;
  controlBullets[currentItem]
}

function switchItem(n, toDirection, fromDirection) {
  hideItem(toDirection);
  changeCurrentItem(n);
  showSlideNum(currentItem + 1);
  showItem(fromDirection);
}

document.querySelector('.control.left').addEventListener('click', function() {
  if (isEnabled) {
    switchItem(currentItem - 1, 'to-right', 'from-left');
  }
});

document.querySelector('.control.right').addEventListener('click', function() {
  if (isEnabled) {
    switchItem(currentItem + 1, 'to-left', 'from-right');
  }
});

document.querySelector('.slide-pagination').addEventListener('click', function(e) {
  if (isEnabled) {
    if (e.target.className == 'item') {
      targetBullet = Array.from(this.children).indexOf(e.target);
      if (targetBullet > currentItem) {
        switchItem(targetBullet, 'to-left', 'from-right')
      } else {
        switchItem(targetBullet, 'to-right', 'from-left');
      }
    }
  }
});


const swipedetect = (el) => {

  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapcedTime = 0;

  let threshold = 100;
  let restraint = 200;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapcedTime = new Date().getTime() - startTime;

    if (elapcedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if(isEnabled) {
            switchItem(currentItem - 1, 'to-right', 'from-left');
          }
        } else {
          if(isEnabled) {
            switchItem(currentItem + 1, 'to-left', 'from-right');
          }
        }
      }
    }

    e.preventDefault();
  });
}

let el = document.querySelector('.welcome-carousel');
swipedetect(el);