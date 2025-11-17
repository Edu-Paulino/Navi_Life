import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Mic, MicOff } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setListening, setActive, setTranscript, setResponse } from '../store/slices/voiceSlice';
import speechService from '../services/speechService';

export default function VoiceActivation() {
  const dispatch = useDispatch();
  const { isListening, transcript, response, isSpeaking } = useSelector(
    (state: RootState) => state.voice
  );
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handleVoicePress = () => {
    if (isListening) {
      dispatch(setListening(false));
      dispatch(setTranscript(''));
    } else {
      dispatch(setListening(true));
      dispatch(setActive(true));
      simulateVoiceRecognition();
    }
  };

  const simulateVoiceRecognition = () => {
    setTimeout(() => {
      const mockTranscript = 'Navi, agende uma reunião amanhã às 14h';
      dispatch(setTranscript(mockTranscript));
      dispatch(setListening(false));
      
      processVoiceCommand(mockTranscript);
    }, 3000);
  };

  const processVoiceCommand = async (text: string) => {
    const mockResponse = 'Entendido! Vou agendar uma reunião para amanhã às 14h. Qual é o título da reunião?';
    dispatch(setResponse(mockResponse));
    
    try {
      await speechService.speak(mockResponse);
    } catch (error) {
      console.error('Erro ao falar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.micContainer, { transform: [{ scale: pulseAnim }] }]}>
        <Pressable
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={handleVoicePress}
        >
          {isListening ? (
            <Mic size={40} color={Colors.white} />
          ) : (
            <MicOff size={40} color={Colors.white} />
          )}
        </Pressable>
      </Animated.View>

      {isListening && (
        <Text style={styles.listeningText}>Ouvindo... Diga "Navi" para ativar</Text>
      )}

      {transcript && !isListening && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>Você disse:</Text>
          <Text style={styles.transcriptText}>{transcript}</Text>
        </View>
      )}

      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Navi:</Text>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  micContainer: {
    marginBottom: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: Colors.secondary,
  },
  listeningText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 10,
  },
  transcriptContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: '100%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 5,
  },
  transcriptText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  responseContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    width: '100%',
  },
  responseLabel: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 5,
    fontWeight: '600',
  },
  responseText: {
    fontSize: 16,
    color: Colors.white,
  },
});
