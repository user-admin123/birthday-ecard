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
                    generateShortLink(name, age, message, photoURL);
                };
                reader.readAsDataURL(photoFile);
            } else {
                generateShortLink(name, age, message, photoURL);
            }
        });
    }
});

function generateShortLink(name, age, message, photoURL) {
    const params = new URLSearchParams({ name, age, message, photoURL });
    const link = `${window.location.origin}/ecard.html?${params.toString()}`;
    document.getElementById("shareLink").value = link;
    document.getElementById("shareLinkContainer").classList.remove("hidden");
}

function copyLink() {
    const linkField = document.getElementById("shareLink");
    linkField.select();
    document.execCommand("copy");
    document.getElementById("copyMessage").classList.remove("hidden");
}
