import { getAudioHandler } from "./audioContextModule.js";

console.log("index.js loaded");
const auElem = document.getElementById("audioElement");
//getAudioHandler().init(auElem);
window.audioHandler = getAudioHandler(auElem)
window.audioHandler.config()

console.log(window.audioHandler.getData());

