window.onload = init;

function init() {
    const Tweet = document.getElementById('Tweet');
    Tweet.focus();
}

function exe() {
    const Tweet = document.getElementById('Tweet');
    const topic = document.getElementById('topic');
    if (Tweet.value === '' || topic.value === '') {
        const x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    } else {
        const load = document.getElementById('load');
        load.classList.remove('d-none');

        const data = {
            tweet: Tweet.value,
            topic: topic.value
        };

        fetch("http://localhost:80/predict", {
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
            console.log("Prédiction :", result);
            const output = document.getElementById('output');
            output.textContent = `Sentiment prédit : ${result.predicted_sentiment}`;
        })
        .catch(error => {
            console.error("Erreur :", error);
            alert("Une erreur est survenue. Vérifiez votre backend.");
        })
        .finally(() => {
            // Cacher le loader après la requête
            load.classList.add('d-none');
        });
    }
}
