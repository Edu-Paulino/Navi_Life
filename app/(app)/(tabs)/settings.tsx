import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, User, Globe, Moon } from 'lucide-react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/ui/Button';

export default function SettingsScreen() {
  const { profile, signOut, updateProfile, loading } = useAuth();
  
  const [integratesCalendar, setIntegratesCalendar] = useState(profile?.integrates_calendar || false);
  const [receivesNews, setReceivesNews] = useState(profile?.receives_financial_news || false);

  const handlePreferenceChange = (key: 'integrates_calendar' | 'receives_financial_news', value: boolean) => {
    if (key === 'integrates_calendar') {
      setIntegratesCalendar(value);
    } else {
      setReceivesNews(value);
    }
    updateProfile({ [key]: value });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <SettingItem 
            icon={<User size={22} color={Colors.primary} />} 
            label={profile?.full_name || 'Usuário'}
            value={profile?.id ? 'Ver Perfil' : ''}
            onPress={() => {}} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <SettingItem icon={<Moon size={22} color={Colors.primary} />} label="Tema" onPress={() => {}} value="Claro" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrações</Text>
          <SettingToggle
            icon={<Globe size={22} color={Colors.primary} />}
            label="Integrar Agenda"
            value={integratesCalendar}
            onValueChange={(value) => handlePreferenceChange('integrates_calendar', value)}
          />
          <SettingToggle
            icon={<Globe size={22} color={Colors.primary} />}
            label="Notícias Financeiras"
            value={receivesNews}
            onValueChange={(value) => handlePreferenceChange('receives_financial_news', value)}
          />
        </View>
        
        <View style={styles.section}>
          <Button
            title="Sair da Conta"
            onPress={signOut}
            loading={loading}
            variant="secondary"
            style={{ borderColor: Colors.accent.red }}
            textStyle={{ color: Colors.accent.red }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function SettingItem({ icon, label, onPress, value }: any) {
  return (
    <Pressable style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingLeft}>
        {icon}
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {onPress && <ChevronRight size={20} color={Colors.text.secondary} />}
      </View>
    </Pressable>
  );
}

function SettingToggle({ icon, label, value, onValueChange }: any) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        {icon}
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.border, true: Colors.secondary }}
        thumbColor={Colors.white}
      />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text.secondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.primary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
});
