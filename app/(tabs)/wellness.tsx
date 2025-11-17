import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, TrendingUp, Coffee, Clock } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export default function WellnessScreen() {
  const burnoutScore = 35;
  const burnoutLevel = burnoutScore < 30 ? 'Baixo' : burnoutScore < 60 ? 'Moderado' : 'Alto';
  const burnoutColor =
    burnoutScore < 30 ? Colors.accent.green : burnoutScore < 60 ? Colors.accent.yellow : Colors.accent.red;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bem-estar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.burnoutCard}>
          <View style={styles.burnoutHeader}>
            <Heart size={32} color={burnoutColor} />
            <Text style={styles.burnoutTitle}>Análise de Burnout</Text>
          </View>
          <View style={styles.burnoutScoreContainer}>
            <Text style={[styles.burnoutScore, { color: burnoutColor }]}>{burnoutScore}</Text>
            <Text style={styles.burnoutScoreLabel}>/ 100</Text>
          </View>
          <Text style={[styles.burnoutLevel, { color: burnoutColor }]}>Nível: {burnoutLevel}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${burnoutScore}%`, backgroundColor: burnoutColor },
              ]}
            />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard icon={<Clock size={24} color={Colors.primary} />} label="Horas Trabalhadas" value="42h" />
          <StatCard icon={<TrendingUp size={24} color={Colors.primary} />} label="Reuniões" value="18" />
          <StatCard icon={<Coffee size={24} color={Colors.primary} />} label="Pausas Feitas" value="12" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sugestões de Bem-estar</Text>
          <SuggestionCard
            title="Adicionar Pausa"
            description="Considere adicionar uma pausa de 15 minutos entre a Reunião com Cliente e o Bloco de Foco."
            type="break"
          />
          <SuggestionCard
            title="Reunião para Adiar"
            description="A reunião 'Planejamento Trimestral' pode ser adiada, pois tem prioridade baixa."
            type="postpone"
          />
          <SuggestionCard
            title="Exercício Recomendado"
            description="Faça uma caminhada de 10 minutos após o almoço para reduzir o estresse."
            type="exercise"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <View style={styles.statCard}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SuggestionCard({ title, description, type }: any) {
  return (
    <View style={styles.suggestionCard}>
      <View
        style={[
          styles.suggestionIndicator,
          {
            backgroundColor:
              type === 'break'
                ? Colors.accent.blue
                : type === 'postpone'
                ? Colors.accent.yellow
                : Colors.accent.green,
          },
        ]}
      />
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionTitle}>{title}</Text>
        <Text style={styles.suggestionDescription}>{description}</Text>
      </View>
    </View>
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
    padding: 15,
  },
  burnoutCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  burnoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  burnoutTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  burnoutScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  burnoutScore: {
    fontSize: 64,
    fontFamily: Fonts.bold,
  },
  burnoutScoreLabel: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  burnoutLevel: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    textAlign: 'center',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
