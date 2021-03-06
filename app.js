let speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

let isSpeaking = false;
document.querySelector("#start").addEventListener("click", e => {
  isSpeaking = true;
  e.preventDefault();
  recognition.start();
});

document.querySelector("#stop").addEventListener("click", e => {
  e.preventDefault();
  isSpeaking = false;
  recognition.stop();
});

recognition.onend = () => {
  if (isSpeaking) {
    recognition.start();
  }
};
recognition.onresult = e => {
  if (e.results[0][0].transcript === "stop") {
    isSpeaking = false;
    recognition.stop();
  } else if (e.results[0][0].transcript === "reset") {
    document.querySelector("ul").innerHTML = "";
  } else if (e.results[0][0].transcript === "book a movie ticket") {
    window.open("http://www.bookmyshow.com");
  } else if (e.results[0][0].transcript == "who is Chintu") {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = "Chintu is don";
    document.querySelector("ul").append(li);
  } else {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = e.results[0][0].transcript;
    document.querySelector("ul").append(li);
  }
};
