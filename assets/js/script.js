const slider = document.getElementById("rounds-slider");

(async function getRounds() {
    try {
        const response = await fetch("https://sevn-pleno-esportes.deno.dev");
        const rounds = await response.json();

        rounds.map(function (round) {
            let slideElement = document.createElement("div");
            slideElement.classList.add("slide");
            slider.appendChild(slideElement);
            round.games.map(function (game) {
                slideElement.insertAdjacentHTML(
                    "beforeend",
                    `                    
                    <div class="game">
                        <div class="team home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none" class="logo">
                            <path d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z" fill="url(#paint0_linear_1_28)"/>
                            <defs>
                                <linearGradient id="paint0_linear_1_28" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FF0000"/>
                                    <stop offset="1" stop-color="#E96565" stop-opacity="0.3"/>
                                </linearGradient>
                            </defs>
                            </svg>
                            <div class="name">${game.team_home_name}</div>
                            <div class="score">${game.team_home_score}</div>
                        </div>
                        <img class="versus" src="assets/img/versus.svg" alt="versus X icon">
                        <div class="team away">
                            <div class="score">${game.team_away_score}</div>
                            <div class="name">${game.team_away_name}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none" class="logo">
                            <path d="M16 0C14.8835 1.49628 14.1602 4.31649 9.54496 5.01371C9.11253 5.07638 8.70368 5.10772 8.31056 5.10772C5.38575 5.10772 3.61671 3.51743 3.61671 3.51743L0 7.31688C0 7.31688 5.59803 9.10302 1.11646 25.1156C-1.91843 35.9577 14.5926 37.6028 16 40C17.3995 37.6028 33.9106 35.9577 30.8835 25.1156C26.4098 9.10302 32 7.31688 32 7.31688L28.3754 3.51743C28.3754 3.51743 26.6064 5.10772 23.6816 5.10772C23.2885 5.10772 22.8796 5.07638 22.4472 5.01371C17.8398 4.32432 17.1165 1.49628 15.9921 0L16 0Z" fill="url(#paint0_linear_1_28)"/>
                            <defs>
                                <linearGradient id="paint0_linear_1_28" x1="16" y1="0" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FF0000"/>
                                    <stop offset="1" stop-color="#E96565" stop-opacity="0.3"/>
                                </linearGradient>
                            </defs>
                            </svg>
                        </div>
                    </div>
                `
                );
            });
        });

        const slidesTeste = slider.getElementsByClassName("slide");
        const slides = Array.from(slidesTeste);
        const previousButton = document.querySelector(".navigation.prev");
        const nextButton = document.querySelector(".navigation.next");

        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });

        let currentSlide = 0;
        let maxSlide = slides.length - 1;

        function moveSlide() {
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${
                    100 * (index - currentSlide)
                }%)`;
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
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
})();
