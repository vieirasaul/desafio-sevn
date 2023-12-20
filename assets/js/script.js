const slides = document.querySelectorAll(".rounds .slide");
const previousButton = document.querySelector(".navigation.prev");
const nextButton = document.querySelector(".navigation.next");

slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let maxSlide = slides.length - 1;

function moveSlide() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateNavigationButtons();
}

previousButton.addEventListener("click", function () {
    if (currentSlide === 0) {
        return;
    }
    currentSlide--;
    moveSlide();
});

nextButton.addEventListener("click", function () {
    if (currentSlide === maxSlide) {
        return;
    }
    currentSlide++;
    moveSlide();
});

function updateNavigationButtons() {
    previousButton.classList.remove("disabled");
    nextButton.classList.remove("disabled");

    if (currentSlide === 0) {
        previousButton.classList.add("disabled");
    }

    if (currentSlide === maxSlide) {
        nextButton.classList.add("disabled");
    }
}

updateNavigationButtons();
