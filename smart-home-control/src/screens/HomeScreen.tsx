import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { useSettings } from '../context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';

type Props = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
    const { colors } = useSettings();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: colors.muted }]}>Қайырлы күн 👋</Text>
                    <Text style={[styles.username, { color: colors.text }]}>Айдын Сұлтан</Text>
                </View>
                <Pressable style={[styles.notifyBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Ionicons name="notifications-outline" size={20} color={colors.text} />
                </Pressable>
            </View>

            <View style={[styles.banner, { backgroundColor: colors.primary }]}>
                <View style={styles.bannerInfo}>
                    <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Қауіпсіздік жүйесі қосулы</Text>
                        <Text style={styles.bannerSubtitle}>Барлық датчиктер қалыпты жұмыс істеуде</Text>
                    </View>
                </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Жылдам әрекеттер</Text>

            <View style={styles.grid}>
                <Pressable
                    style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => navigation.navigate('Services')}
                >
                    <Ionicons name="grid" size={24} color={colors.primary} />
                    <Text style={[styles.actionText, { color: colors.text }]}>Құрылғылар</Text>
                </Pressable>

                <Pressable
                    style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Ionicons name="settings" size={24} color={colors.primary} />
                    <Text style={[styles.actionText, { color: colors.text }]}>Баптаулар</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    greeting: { fontSize: 13, fontWeight: '600' },
    username: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    notifyBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    banner: { padding: 20, borderRadius: 24, marginBottom: 28, elevation: 6 },
    bannerInfo: { flexDirection: 'row', alignItems: 'center' },
    bannerTextContainer: { marginLeft: 16, flex: 1 },
    bannerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
    bannerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
    sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16, letterSpacing: -0.3 },
    grid: { flexDirection: 'row', gap: 14 },
    actionCard: { flex: 1, padding: 20, borderRadius: 20, borderWidth: 1, alignItems: 'center', gap: 12 },
    actionText: { fontSize: 14, fontWeight: '800' }
});