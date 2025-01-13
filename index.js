window.onload = init;

function init() {
    const Tweet = document.getElementById('Tweet');
    Tweet.focus();
}
function exe() {
    const Tweet = document.getElementById('Tweet');
    const topic = document.getElementById('topic');
    console.log(Tweet.value);
    console.log(topic.value);
}