import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ route }: Props) {
    const { title, deviceId } = route.params;
    const { colors } = useSettings();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.idText, { color: colors.muted }]}>Құрылғы ID: {deviceId}</Text>
                <Text style={[styles.desc, { color: colors.text }]}>Бұл құрылғы штаттық режимде жұмыс істеп тұр. Параметрлерін өзгерту үшін батырмаларды қолданыңыз.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    card: { padding: 24, borderRadius: 24, borderWidth: 1 },
    title: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
    idText: { fontSize: 12, fontWeight: '700', marginBottom: 16 },
    desc: { fontSize: 14, lineHeight: 22, fontWeight: '500' }
});