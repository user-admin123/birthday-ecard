document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ecardForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = encodeURIComponent(document.getElementById("name").value);
        const age = encodeURIComponent(document.getElementById("age").value);
        const message = encodeURIComponent(document.getElementById("message").value);
        const photoFile = document.getElementById("photo").files[0];
        let photoURL = "";
        
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoURL = encodeURIComponent(e.target.result);
                generateShortLink(name, age, message, photoURL);
            };
            reader.readAsDataURL(photoFile);
        } else {
            generateShortLink(name, age, message, "");
        }
    });
});

function generateShortLink(name, age, message, photoURL) {
    const link = `https://birthday-ecard-maker.netlify.app/ecard.html?name=${name}&age=${age}&message=${message}&photoURL=${photoURL}`;
    document.getElementById("shareLink").value = link;
    document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("copyButton").addEventListener("click", function () {
    const linkField = document.getElementById("shareLink");
    linkField.select();
    navigator.clipboard.writeText(linkField.value).then(() => {
        document.getElementById("copyMessage").classList.remove("hidden");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });
});
