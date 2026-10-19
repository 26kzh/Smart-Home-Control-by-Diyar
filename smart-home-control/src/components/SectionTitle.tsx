import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = {
    title: string;
    subtitle: string;
};

export function SectionTitle({ title, subtitle }: Props) {
    const { colors } = useSettings();
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 18 },
    title: { fontSize: 24, fontWeight: '900', letterSpacing: -0.6, marginBottom: 4 },
    subtitle: { fontSize: 13, fontWeight: '500' }
});