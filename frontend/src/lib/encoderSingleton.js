// encoderSingleton.js
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

class EncoderSingleton {
  constructor() {
    if (!EncoderSingleton.instance) {
      this.initializeEncoder();
      EncoderSingleton.instance = this;
    }
    return EncoderSingleton.instance;
  }

  async initializeEncoder() {
    await register(await connect());
  }
}

const instance = new EncoderSingleton();
Object.freeze(instance);

export default instance;
