class MediaRecorderSingleton {
    constructor() {
      if (!MediaRecorderSingleton.instance) {
        this.mediaRecorder = null;
        MediaRecorderSingleton.instance = this;
      }
      return MediaRecorderSingleton.instance;
    }
  
    setMediaRecorder(mediaRecorder) {
      this.mediaRecorder = mediaRecorder;
    }
  
    getMediaRecorder() {
      return this.mediaRecorder;
    }
  
    clearMediaRecorder() {
      this.mediaRecorder = null;
    }
  }
  
  const instance = new MediaRecorderSingleton();
  export default instance;
  