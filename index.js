window.onload = init;

function init() {
    const Tweet = document.getElementById('Tweet');
    Tweet.focus();
}

// Dictionnaire pour convertir les chiffres en texte
const sentimentMapping = {
    1: "Negative",
    2: "Positive",
    3: "Neutral",
    4: "Irrelevant"
};

function toast(text) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = text;
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function exe() {
    const Tweet = document.getElementById('Tweet');
    const topic = document.getElementById('topic');
    const output = document.getElementById('output');

    if (Tweet.value === '' || topic.value === '') toast("Error: Fields are empty!");
    else {
        const load = document.getElementById('load');
        load.classList.remove('d-none');

        const data = {
            tweet: Tweet.value,
            topic: topic.value
        };

        fetch("http://localhost:4000/tweet/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'appel à l'API");
            }
            return response.json();
        })
        .then(result => {
            console.log("Prédiction reçue :", result);

            // Convertir le chiffre en texte grâce au dictionnaire
            const sentimentText = sentimentMapping[result.predicted_sentiment] || "Unknown";
            const color = sentimentText === "Negative" ? "red" : sentimentText === "Positive" ? "green" : "orange";
            output.innerHTML = `Sentiment prédit : <span style="color: ${color};">${sentimentText}</span>`;
        })
        .catch(error => {
            console.error("Erreur :", error);
            toast("Une erreur est survenue, veuillez vérifier le backend.");
        })
        .finally(() => {
            load.classList.add('d-none');
        });
    }
}
