const pictureInnerContainer = document.querySelector('.picture-inner-container');
let imgArr = [];
let resultStr = '';

for (let i = 1; i < 16; i++) {
  imgArr.push(`assets/img/galery/galery${i}.jpg`);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(imgArr);

imgArr.forEach(el => {
  resultStr += `<img class="gallery-img js-scroll fade-in-bottom" src="${el}" alt="Art Gallery">`
})

pictureInnerContainer.innerHTML = resultStr;

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});
