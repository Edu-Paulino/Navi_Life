import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { User, Mail, Lock } from 'lucide-react-native';
import Logo from '../../components/Logo';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName) newErrors.fullName = 'Nome completo é obrigatório.';
    if (!email) newErrors.email = 'E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Formato de e-mail inválido.';
    if (!password) newErrors.password = 'Senha é obrigatória.';
    else if (password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    if (!agreedToTerms) newErrors.terms = 'Você deve aceitar a Política de Privacidade.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      Alert.alert('Erro no Cadastro', error.message);
    } else {
      Alert.alert('Cadastro realizado!', 'Verifique seu e-mail para confirmar sua conta.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Logo size={80} color={Colors.white} />
            <Text style={styles.title}>Crie sua Conta</Text>
            <Text style={styles.subtitle}>Comece sua jornada com Navi Life</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={fullName}
              onChangeText={setFullName}
              icon={<User size={20} color={Colors.text.secondary} />}
              error={errors.fullName}
            />
            <Input
              label="E-mail"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              icon={<Mail size={20} color={Colors.text.secondary} />}
              error={errors.email}
            />
            <Input
              label="Senha"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon={<Lock size={20} color={Colors.text.secondary} />}
              error={errors.password}
            />
            <Input
              label="Confirmar Senha"
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon={<Lock size={20} color={Colors.text.secondary} />}
              error={errors.confirmPassword}
            />
            
            <Checkbox
              checked={agreedToTerms}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              label={
                <Text style={styles.termsText}>
                  Eu li e aceito a <Text style={styles.linkText}>Política de Privacidade</Text>
                </Text>
              }
              error={errors.terms}
            />

            <Text style={styles.confidentialityNote}>
              Todas as informações são estritamente confidenciais e armazenadas de forma segura.
            </Text>

            <Button title="Cadastrar" onPress={handleSignUp} loading={loading} style={{ marginTop: 20 }} disabled={!agreedToTerms} />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta?</Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.loginLink}> Faça login</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text.light,
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  linkText: {
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
    textDecorationLine: 'underline',
  },
  confidentialityNote: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.text.light,
    textAlign: 'center',
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
});
