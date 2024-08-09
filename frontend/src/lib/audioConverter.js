import WavEncoder from 'wav-encoder';
import AudioBufferUtils from 'audio-buffer-utils';

export async function convertWebmToWav(webmBlob) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Decode the audio data from the Blob
  const arrayBuffer = await webmBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Prepare channel data
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const channelData = new Array(numberOfChannels).fill(0).map((_, i) => audioBuffer.getChannelData(i));

  // Encode the audio buffer to WAV format
  const wavArrayBuffer = await WavEncoder.encode({
    sampleRate,
    channelData
  });
  
  // Create a WAV Blob from the encoded array buffer
  const wavBlob = new Blob([wavArrayBuffer], { type: 'audio/wav' });

  return wavBlob;
}
