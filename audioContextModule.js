let audioModuleState = null;
let audioModuleInstance = null;

export const getAudioHandler = () => {
  function getData() {
    return audioModuleState;
  }

  function init(audioElem) {
    if (!audioModuleInstance) {
      audioModuleState = {
        audioContext: new (window.AudioContext || window.webkitAudioContext)(),
        audioElement: audioElem,
        mediaStreamSrc: null,
        analyser: null
      };
      audioModuleInstance = {
        getData,
        getAmplitudeData,
        getFrequencyData
      };
      _config();
    }
  }

  function _config() {
    audioModuleState.mediaStreamSrc = audioModuleState.audioContext.createMediaElementSource(
      audioModuleState.audioElement
    );
    audioModuleState.mediaStreamSrc.connect(
      audioModuleState.audioContext.destination
    );
    audioModuleState.analyser = audioModuleState.audioContext.createAnalyser();
    audioModuleState.analyser.ampSize = 1024;
    audioModuleState.mediaStreamSrc.connect(audioModuleState.analyser);
  }

  function getAmplitudeData() {
    if (audioModuleState.analyser) {
      const data = new Uint8Array(512);
      audioModuleState.analyser.getByteTimeDomainData(data);
      const normalized = Array.from(data).map(sample => (sample / 255) - 0.5)
      window.ampData = normalized;
      return normalized;
    }
  }

  function getFrequencyData() {
    if (audioModuleState.analyser) {
      const data = new Uint8Array(512);
      audioModuleState.analyser.getByteFrequencyData(data);
      //const normalized = data.map(sample => (sample / 255))
      window.freqData = data //normalized;
      return data //normalized;
    }
  }

  function getInstance() {
    if (!audioModuleInstance) {
      throw new Error("Not initialized");
    }
    return audioModuleInstance;
  }

  return {
    init,
    getInstance,
    getData,
    getAmplitudeData,
    getFrequencyData
  };
};

