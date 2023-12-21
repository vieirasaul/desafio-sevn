const roundsSection = document.getElementById("rounds");
const roundElement = document.getElementById("round-number");
const errorElement = document.getElementById("error");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

function toggleLoader() {
    if (loader.style.display == "flex") {
        loader.style.display = "none";
    } else {
        loader.style.display = "flex";
    }
}

function showError(message) {
    errorElement.style.display = "flex";
    errorMessage.innerHTML = message;
    roundsSection.style.display = "none";
}

function gameTemplate(
    teamHomeId,
    teamHomeName,
    teamHomeScore,
    teamAwayId,
    teamAwayName,
    teamAwayScore
) {
    return `                    
            <div class="game">
            <div class="team home">
            <img class="logo" src="assets/img/${teamHomeId}.png" alt="Logo do ${teamHomeName}">
            <div class="name">${teamHomeName}</div>
            <div class="score">${teamHomeScore}</div>
            </div>
            <img class="versus" src="assets/img/versus.svg" alt="versus X icon">
            <div class="team away">
            <div class="score">${teamAwayScore}</div>
            <div class="name">${teamAwayName}</div>
            <img class="logo" src="assets/img/${teamAwayId}.png" alt="Logo do ${teamAwayName}">
            </div>
            </div>
            `;
}

const results = [];

async function getRounds() {
    try {
        toggleLoader();
        const response = await fetch("https://sevn-pleno-esportes.deno.dev");
        const rounds = await response.json();
        toggleLoader();
        rounds.forEach((el) => results.push(el));
    } catch (error) {
        showError(`${error.name} - ${error.message}`);
    }
}

window.onload = async () => {
    await getRounds();

    const slider = document.getElementById("rounds-slider");

    results?.map(function (round) {
        let slideElement = document.createElement("div");
        slideElement.classList.add("slide");
        slider.appendChild(slideElement);
        round.games.map(function (game) {
            slideElement.insertAdjacentHTML(
                "beforeend",
                gameTemplate(
                    game.team_home_id,
                    game.team_home_name,
                    game.team_home_score,
                    game.team_away_id,
                    game.team_away_name,
                    game.team_away_score
                )
            );
        });
    });

    const slides = Array.from(slider.getElementsByClassName("slide"));
    const previousButton = document.querySelector(".navigation.prev");
    const nextButton = document.querySelector(".navigation.next");

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    let currentSlide = 0;
    let maxSlide = slides.length - 1;
    let roundNumber = 1;

    function moveSlide() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${
                100 * (index - currentSlide)
            }%)`;
        });
        roundElement.innerHTML = roundNumber;
        updateNavigationButtons();
    }

    previousButton.addEventListener("click", function () {
        if (currentSlide === 0) {
            return;
        }
        roundNumber--;
        currentSlide--;
        moveSlide();
    });

    nextButton.addEventListener("click", function () {
        if (currentSlide === maxSlide) {
            return;
        }
        roundNumber++;
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
};
