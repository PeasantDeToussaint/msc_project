from pydub import AudioSegment
import sys

def convert_to_wav(input_path, output_path):
    try:
        audio = AudioSegment.from_file(input_path, format="webm")
        audio = audio.set_frame_rate(16000).set_channels(1)
        audio.export(output_path, format="wav")
        print("Conversion successful")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_audio.py <input_path> <output_path>")
        sys.exit(1)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    convert_to_wav(input_path, output_path)