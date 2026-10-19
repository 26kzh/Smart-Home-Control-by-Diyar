import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

type Props = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function ProfileScreen({ navigation }: Props) {
    const { colors } = useSettings();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Профиль</Text>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                    <Ionicons name="person" size={36} color={colors.primary} />
                </View>
                <Text style={[styles.name, { color: colors.text }]}>Айдын Сұлтан</Text>
                <Text style={[styles.email, { color: colors.muted }]}>smart.home@edu.kz</Text>

                <Pressable
                    style={[styles.logoutBtn, { borderColor: '#EF4444' }]}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.logoutText}>Жүйеден шығу</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 54 },
    headerTitle: { fontSize: 26, fontWeight: '900', letterSpacing: -0.6, marginBottom: 20 },
    card: { padding: 28, borderRadius: 24, borderWidth: 1, alignItems: 'center' },
    avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    name: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
    email: { fontSize: 13, marginBottom: 24, fontWeight: '500' },
    logoutBtn: { borderWidth: 1.5, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 14 },
    logoutText: { color: '#EF4444', fontWeight: '800', fontSize: 14 }
});