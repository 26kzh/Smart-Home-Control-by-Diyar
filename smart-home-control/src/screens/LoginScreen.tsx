import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { colors } = useSettings();

    const handleLogin = () => {
        if (!login.trim() || !password.trim()) {
            setError('Барлық өрісті толтырыңыз');
            return;
        }
        if (login.trim().length < 4) {
            setError('Логин кемінде 4 таңба болуы тиіс');
            return;
        }
        if (password.length < 6) {
            setError('Құпиясөз 6 таңбадан ұзын болуы керек');
            return;
        }
        setError('');
        navigation.replace('Main');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
                    <Text style={[styles.badgeText, { color: colors.primary }]}>SMART ECOSYSTEM</Text>
                </View>

                <Text style={[styles.title, { color: colors.text }]}>Қош келдіңіз</Text>
                <Text style={[styles.subtitle, { color: colors.muted }]}>Үй жүйесін басқару үшін тіркелгіңізге кіріңіз</Text>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.muted }]}>ЛОГИН</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: error ? '#EF4444' : colors.border }]}
                        placeholder="мысалы: admin"
                        placeholderTextColor={colors.muted}
                        autoCapitalize="none"
                        value={login}
                        onChangeText={(text) => { setLogin(text); setError(''); }}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.muted }]}>ҚҰПИЯСӨЗ</Text>
                    <View style={[styles.passwordRow, { backgroundColor: colors.background, borderColor: error ? '#EF4444' : colors.border }]}>
                        <TextInput
                            style={[styles.passwordInput, { color: colors.text }]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.muted}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => { setPassword(text); setError(''); }}
                        />
                        <Pressable onPress={() => setShowPassword(val => !val)} style={styles.showBtn}>
                            <Text style={[styles.showText, { color: colors.primary }]}>{showPassword ? 'Жасыру' : 'Көрсету'}</Text>
                        </Pressable>
                    </View>
                </View>

                {!!error && <Text style={styles.errorText}>{error}</Text>}

                <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Жүйеге кіру</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    card: { padding: 28, borderRadius: 28, borderWidth: 1, elevation: 8 },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 16 },
    badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
    title: { fontSize: 30, fontWeight: '900', letterSpacing: -0.8, marginBottom: 6 },
    subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 28 },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, marginBottom: 8 },
    input: { borderWidth: 1, padding: 16, borderRadius: 16, fontSize: 15, fontWeight: '600' },
    passwordRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
    passwordInput: { flex: 1, padding: 16, fontSize: 15, fontWeight: '600' },
    showBtn: { paddingRight: 18 },
    showText: { fontSize: 13, fontWeight: '800' },
    errorText: { color: '#EF4444', marginBottom: 16, fontSize: 13, fontWeight: '700' },
    button: { padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 8, elevation: 6 },
    buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 }
});