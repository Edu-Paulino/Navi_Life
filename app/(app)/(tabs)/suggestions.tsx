import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import { Mic, CalendarPlus, ShieldCheck, Zap } from 'lucide-react-native';

const suggestions = [
  {
    icon: Mic,
    title: 'Comandos de Voz',
    description: 'Diga "Navi, qual minha próxima reunião?" para interagir.',
    color: '#3B82F6',
  },
  {
    icon: CalendarPlus,
    title: 'Blocos de Foco',
    description: 'Defina prioridades semanais e deixe a Navi bloquear horários para você.',
    color: '#10B981',
  },
  {
    icon: ShieldCheck,
    title: 'Análise de Bem-estar',
    description: 'Acompanhe seu nível de burnout e receba dicas para uma rotina mais saudável.',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'Ações Rápidas',
    description: 'Peça um Uber ou comida diretamente pela interface de voz.',
    color: '#EF4444',
  },
];

export default function SuggestionsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sugestões</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Descubra tudo que a Navi pode fazer por você.</Text>
        <View style={styles.grid}>
          {suggestions.map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <item.icon size={28} color={Colors.white} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  scrollContent: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  cardContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
