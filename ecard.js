document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(urlParams.get("name") || "Friend");
    const age = parseInt(urlParams.get("age")) || 1;
    const message = decodeURIComponent(urlParams.get("message") || "Happy Birthday!");
    const photoURL = urlParams.get("photoURL");

    document.getElementById("ecardTitle").textContent = `Happy ${age}th Birthday, ${name}!`;
    document.getElementById("birthdayMessage").textContent = message;

    if (photoURL) {
        const img = document.getElementById("birthdayPhoto");
        img.src = photoURL;
        img.classList.remove("hidden");
    }

    const cakeContainer = document.getElementById("cakeContainer");
    let candlesBlownOut = 0;

    for (let i = 0; i < age; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        candle.innerHTML = "🕯️";
        candle.dataset.index = i;  

        candle.addEventListener("click", function () {
            if (!candle.classList.contains("blown-out")) {
                candle.classList.add("blown-out");
                candle.innerHTML = "🕯️✨";
                candlesBlownOut++;

                if (candlesBlownOut === age) {
                    setTimeout(() => {
                        document.getElementById("giftPopup").classList.remove("hidden");
                    }, 1000);
                }
            }
        });

        cakeContainer.appendChild(candle);
    }

    document.getElementById("giftBox").addEventListener("click", function () {
        document.getElementById("giftPopup").classList.add("hidden");
        document.getElementById("finalPopup").classList.remove("hidden");
        document.getElementById("birthdayMusic").play();
    });
});
