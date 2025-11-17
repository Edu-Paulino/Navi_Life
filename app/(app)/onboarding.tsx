import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import Button from '../../components/ui/Button';
import { Calendar, Newspaper } from 'lucide-react-native';

export default function OnboardingScreen() {
  const { session, profile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [integratesCalendar, setIntegratesCalendar] = useState(profile?.integrates_calendar || false);
  const [receivesNews, setReceivesNews] = useState(profile?.receives_financial_news || false);

  const handleSave = async () => {
    if (!session) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        integrates_calendar: integratesCalendar,
        receives_financial_news: receivesNews,
        onboarding_completed: true,
      })
      .eq('id', session.user.id);

    if (error) {
      Alert.alert('Erro ao salvar', error.message);
    } else {
      router.replace('/(app)');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuração Inicial</Text>
        <Text style={styles.subtitle}>Personalize sua experiência com o Navi Life.</Text>
      </View>

      <View style={styles.content}>
        <ServiceItem
          icon={<Calendar size={24} color={Colors.primary} />}
          label="Integrar com Agenda (Google/Outlook)"
          value={integratesCalendar}
          onValueChange={setIntegratesCalendar}
        />
        <ServiceItem
          icon={<Newspaper size={24} color={Colors.primary} />}
          label="Receber notícias do Mercado Financeiro"
          value={receivesNews}
          onValueChange={setReceivesNews}
        />
      </View>

      <View style={styles.footer}>
        <Button title="Salvar e Continuar" onPress={handleSave} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const ServiceItem = ({ icon, label, value, onValueChange }: any) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: Colors.border, true: Colors.secondary }}
      thumbColor={Colors.white}
      ios_backgroundColor={Colors.border}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    flexShrink: 1,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
