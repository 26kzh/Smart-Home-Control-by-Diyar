import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { SmartDevice } from '../types/device';
import { useSettings } from '../context/SettingsContext';

type Props = {
    device: SmartDevice;
    onPress: (device: SmartDevice) => void;
};

export function DeviceCard({ device, onPress }: Props) {
    const { colors, fontScale } = useSettings();
    const fontSizeMap = { small: 13, normal: 15, large: 18 };
    const currentFontSize = fontSizeMap[fontScale];

    return (
        <Pressable
            onPress={() => onPress(device)}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.statusIndicator, { backgroundColor: device.status ? '#10B981' : '#EF4444' }]} />
                <Text style={[styles.statusText, { color: device.status ? '#10B981' : '#EF4444' }]}>
                    {device.status ? 'ҚОСУЛЫ' : 'ӨШІРУЛІ'}
                </Text>
            </View>
            <Text style={[styles.title, { color: colors.text, fontSize: currentFontSize + 3 }]}>
                {device.title}
            </Text>
            <Text style={[styles.desc, { color: colors.muted, fontSize: currentFontSize - 1 }]}>
                {device.description}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: { padding: 22, borderRadius: 20, borderWidth: 1, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 3 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
    statusText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    title: { fontWeight: '800', letterSpacing: -0.4, marginBottom: 4 },
    desc: { lineHeight: 20, fontWeight: '500' }
});