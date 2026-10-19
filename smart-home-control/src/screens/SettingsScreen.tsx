import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';

export function SettingsScreen() {
    const { theme, toggleTheme, fontScale, setFontScale, colors } = useSettings();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Баптаулар</Text>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <Ionicons name="moon-outline" size={20} color={colors.primary} />
                        <Text style={[styles.label, { color: colors.text }]}>Қараңғы режим</Text>
                    </View>
                    <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.subLabel, { color: colors.muted }]}>Қаріп өлшемі</Text>
                <View style={styles.fontRow}>
                    {(['small', 'normal', 'large'] as const).map((size) => (
                        <Pressable
                            key={size}
                            style={[
                                styles.fontBtn,
                                { backgroundColor: fontScale === size ? colors.primary : colors.background, borderColor: colors.border }
                            ]}
                            onPress={() => setFontScale(size)}
                        >
                            <Text style={[styles.fontBtnText, { color: fontScale === size ? '#FFFFFF' : colors.text }]}>
                                {size === 'small' ? 'Кіші' : size === 'normal' ? 'Орташа' : 'Үлкен'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 54 },
    headerTitle: { fontSize: 26, fontWeight: '900', letterSpacing: -0.6, marginBottom: 20 },
    card: { padding: 22, borderRadius: 24, borderWidth: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    label: { fontSize: 15, fontWeight: '700' },
    divider: { height: 1, marginVertical: 16 },
    subLabel: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5, marginBottom: 12 },
    fontRow: { flexDirection: 'row', gap: 10 },
    fontBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
    fontBtnText: { fontSize: 13, fontWeight: '800' }
});