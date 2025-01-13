window.onload = init;

function init() {
    const Tweet = document.getElementById('Tweet');
    Tweet.focus();
}
function exe() {
    const Tweet = document.getElementById('Tweet');
    const topic = document.getElementById('topic');
    if (Tweet.value == '' || topic.value == '') {
        const x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    } else {
        const load = document.getElementById('load');
        load.classList.remove('d-none');
        setTimeout(() => {
            console.log(Tweet.value);
            console.log(topic.value);
            load.classList.add('d-none');
        }, "3000");
    }
}