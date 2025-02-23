document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(urlParams.get("name"));
    const age = parseInt(urlParams.get("age"));
    const message = decodeURIComponent(urlParams.get("message"));
    const photoURL = decodeURIComponent(urlParams.get("photoURL"));

    document.getElementById("ecardTitle").textContent = `Happy ${age}th Birthday, ${name}!`;
    document.getElementById("birthdayMessage").textContent = message;

    if (photoURL) {
        const img = document.getElementById("birthdayPhoto");
        img.src = photoURL;
        img.classList.remove("hidden");
    }

    const cakeContainer = document.getElementById("cakeContainer");
    for (let i = 0; i < age; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        candle.textContent = "🕯️";
        candle.addEventListener("click", function () {
            candle.classList.add("blown-out");
            candle.textContent = "🕯️✨";
            checkAllCandlesBlown();
        });
        cakeContainer.appendChild(candle);
    }

    function checkAllCandlesBlown() {
        let candles = document.querySelectorAll(".candle");
        let allBlown = [...candles].every(candle => candle.classList.contains("blown-out"));
        if (allBlown) {
            setTimeout(() => {
                document.getElementById("giftPopup").classList.remove("hidden");
            }, 1000);
        }
    }

    document.getElementById("giftBox").addEventListener("click", function () {
        document.getElementById("giftPopup").classList.add("hidden");
        document.getElementById("finalPopup").classList.remove("hidden");
        document.getElementById("birthdayMusic").play();
    });
});
