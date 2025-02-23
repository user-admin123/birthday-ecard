document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("ecardForm")) {
        document.getElementById("ecardForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const age = document.getElementById("age").value;
            const message = document.getElementById("message").value;
            const photoFile = document.getElementById("photo").files[0];
            let photoURL = "";
            
            if (photoFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    photoURL = e.target.result;
                    redirectToECard(name, age, message, photoURL);
                };
                reader.readAsDataURL(photoFile);
            } else {
                redirectToECard(name, age, message, photoURL);
            }
        });
    } else {
        loadECard();
    }
});

function redirectToECard(name, age, message, photoURL) {
    const params = new URLSearchParams({ name, age, message, photoURL });
    window.location.href = `ecard.html?${params.toString()}`;
}

function loadECard() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("birthdayName").innerText = `Happy Birthday, ${params.get("name")}!`;
    document.getElementById("messageContainer").innerText = params.get("message");
    const photoContainer = document.getElementById("photoContainer");
    
    if (params.get("photoURL")) {
        photoContainer.src = params.get("photoURL");
        photoContainer.classList.remove("hidden");
    }

    const age = parseInt(params.get("age"));
    const candlesContainer = document.getElementById("candlesContainer");
    for (let i = 0; i < age; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        candle.innerText = "🕯️";
        candle.addEventListener("click", function () {
            candle.innerText = "🔥";
            candle.classList.add("blown");
            checkCandles();
        });
        candlesContainer.appendChild(candle);
    }
}

function checkCandles() {
    if (document.querySelectorAll(".candle:not(.blown)").length === 0) {
        document.getElementById("giftBox").classList.remove("hidden");
        document.getElementById("giftBox").addEventListener("click", function () {
            document.getElementById("giftBox").classList.add("hidden");
            document.getElementById("messageContainer").classList.remove("hidden");
            document.getElementById("bgMusic").play();
        });
    }
}
