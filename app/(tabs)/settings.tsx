import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, User, Bell, Globe, Moon, LogOut } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setVoiceEnabled, setNotificationsEnabled } from '../../store/slices/settingsSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { voiceEnabled, notificationsEnabled } = useSelector((state: RootState) => state.settings);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <SettingItem icon={<User size={22} color={Colors.primary} />} label="Perfil" onPress={() => {}} />
          <SettingItem icon={<LogOut size={22} color={Colors.primary} />} label="Sair" onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <SettingToggle
            icon={<Bell size={22} color={Colors.primary} />}
            label="Notificações"
            value={notificationsEnabled}
            onValueChange={(value) => dispatch(setNotificationsEnabled(value))}
          />
          <SettingToggle
            icon={<Globe size={22} color={Colors.primary} />}
            label="Assistente de Voz"
            value={voiceEnabled}
            onValueChange={(value) => dispatch(setVoiceEnabled(value))}
          />
          <SettingItem icon={<Moon size={22} color={Colors.primary} />} label="Tema" onPress={() => {}} value="Claro" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrações</Text>
          <SettingItem
            icon={<Globe size={22} color={Colors.primary} />}
            label="Google Agenda"
            onPress={() => {}}
            value="Conectado"
          />
          <SettingItem
            icon={<Globe size={22} color={Colors.primary} />}
            label="Outlook"
            onPress={() => {}}
            value="Não Conectado"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <SettingItem icon={<Globe size={22} color={Colors.primary} />} label="Versão" value="1.0.0" />
          <SettingItem icon={<Globe size={22} color={Colors.primary} />} label="Termos de Uso" onPress={() => {}} />
          <SettingItem
            icon={<Globe size={22} color={Colors.primary} />}
            label="Política de Privacidade"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingItem({ icon, label, onPress, value }: any) {
  return (
    <Pressable style={styles.settingItem} onPress={onPress}>
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
