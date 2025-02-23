document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const age = params.get("age");
    const message = params.get("message");
    const photoURL = params.get("photoURL");
    
    document.getElementById("ecardTitle").textContent = `Happy Birthday, ${name}!`;
    document.getElementById("birthdayMessage").textContent = message;
    
    if (photoURL) {
        document.getElementById("birthdayPhoto").src = photoURL;
        document.getElementById("birthdayPhoto").classList.remove("hidden");
    }
    
    const cakeContainer = document.getElementById("cakeContainer");
    for (let i = 0; i < age; i++) {
        const candle = document.createElement("div");
        candle.className = "candle";
        candle.innerHTML = "🕯";
        candle.addEventListener("click", function () {
            candle.innerHTML = "🔥";
            candle.classList.add("blown-out");
            if (document.querySelectorAll(".candle:not(.blown-out)").length === 0) {
                document.getElementById("giftBox").classList.remove("hidden");
            }
        });
        cakeContainer.appendChild(candle);
    }
    document.getElementById("giftBox").addEventListener("click", function () {
        document.getElementById("birthdayMessage").classList.remove("hidden");
        document.getElementById("birthdayMusic").play();
    });
});
