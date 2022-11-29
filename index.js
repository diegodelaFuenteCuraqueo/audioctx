import { getAudioHandler } from "./audioContextModule.js";

console.log("index.js loaded");

const auElem = document.getElementById("audioElement");
getAudioHandler().init(auElem);
window.audioHandler = getAudioHandler().getInstance();

console.log(window.audioHandler.getData());

