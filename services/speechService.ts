import * as Speech from 'expo-speech';

class SpeechService {
  speak(text: string, language: string = 'pt-BR'): Promise<void> {
    return new Promise((resolve, reject) => {
      Speech.speak(text, {
        language,
        pitch: 1.0,
        rate: 0.9,
        onDone: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  }

  stop(): void {
    Speech.stop();
  }

  isSpeaking(): Promise<boolean> {
    return Speech.isSpeakingAsync();
  }
}

export default new SpeechService();
