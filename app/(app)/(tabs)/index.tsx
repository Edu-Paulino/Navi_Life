import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, UtensilsCrossed, Plane, Hotel } from 'lucide-react-native';
import Logo from '../../../components/Logo';
import VoiceActivation from '../../../components/VoiceActivation';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import { useAuth } from '../../../context/AuthContext';

export default function HomeScreen() {
  const { profile } = useAuth();
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Logo size={80} color={Colors.white} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleNavi}>Navi</Text>
            <Text style={styles.titleLife}>Life</Text>
          </View>
          <Text style={styles.subtitle}>Olá, {profile?.full_name?.split(' ')[0]}!</Text>
        </LinearGradient>

        <View style={styles.content}>
          <VoiceActivation />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.quickActions}>
              <QuickActionCard
                icon={<Car size={32} color={Colors.primary} />}
                title="Chamar Uber"
                onPress={() => {}}
              />
              <QuickActionCard
                icon={<UtensilsCrossed size={32} color={Colors.primary} />}
                title="Pedir Comida"
                onPress={() => {}}
              />
              <QuickActionCard
                icon={<Plane size={32} color={Colors.primary} />}
                title="Buscar Voos"
                onPress={() => {}}
              />
              <QuickActionCard
                icon={<Hotel size={32} color={Colors.primary} />}
                title="Hotéis"
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Como posso ajudar?</Text>
            <View style={styles.suggestionsContainer}>
              <SuggestionChip text="Agendar reunião" />
              <SuggestionChip text="Ver minha agenda" />
              <SuggestionChip text="Análise de bem-estar" />
              <SuggestionChip text="Resumo de notícias" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickActionCard({ icon, title, onPress }: any) {
  return (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={styles.actionTitle}>{title}</Text>
    </Pressable>
  );
}

function SuggestionChip({ text }: { text: string }) {
  return (
    <Pressable style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  titleNavi: {
    fontSize: 42,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  titleLife: {
    fontSize: 42,
    fontFamily: Fonts.bold,
    color: Colors.secondary,
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.primary,
  },
});
