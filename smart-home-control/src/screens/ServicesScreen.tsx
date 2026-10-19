import React, { useState } from 'react';
import { View, FlatList, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { initialDevices } from '../data/devices';
import { DeviceCard, SectionTitle } from '../components';
import { SmartDevice } from '../types/device';
import { useSettings } from '../context/SettingsContext';

type Props = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Services'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function ServicesScreen({ navigation }: Props) {
    const [devices, setDevices] = useState<SmartDevice[]>(initialDevices);
    const [searchQuery, setSearchQuery] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const { colors } = useSettings();

    const addDevice = () => {
        if (!newTitle.trim() || !newDesc.trim()) {
            Alert.alert('Назар аударыңыз', 'Барлық өрістерді толтыру қажет');
            return;
        }
        const newDevice: SmartDevice = {
            id: Date.now().toString(),
            title: newTitle.trim(),
            description: newDesc.trim(),
            status: false,
        };
        setDevices(current => [...current, newDevice]);
        setNewTitle('');
        setNewDesc('');
    };

    const deleteDevice = (id: string) => {
        setDevices(current => current.filter(item => item.id !== id));
    };

    const filteredDevices = devices.filter(item =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const handlePress = (device: SmartDevice) => {
        navigation.navigate('Details', {
            deviceId: device.id,
            title: device.title,
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <SectionTitle title="Құрылғылар" subtitle="Активті жүйелерді басқару панелі" />

            <TextInput
                style={[styles.searchBox, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                placeholder="🔍 Құрылғы атауы бойынша іздеу..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.formTitle, { color: colors.text }]}>Жаңа құрылғы қосу</Text>
                <TextInput
                    style={[styles.smallInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                    placeholder="Құрылғы атауы"
                    placeholderTextColor={colors.muted}
                    value={newTitle}
                    onChangeText={setNewTitle}
                />
                <TextInput
                    style={[styles.smallInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                    placeholder="Сипаттамасы"
                    placeholderTextColor={colors.muted}
                    value={newDesc}
                    onChangeText={setNewDesc}
                />
                <Pressable style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={addDevice}>
                    <Text style={styles.addButtonText}>+ Құрылғыны тіркеу</Text>
                </Pressable>
            </View>

            <FlatList
                data={filteredDevices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemWrapper}>
                        <DeviceCard device={item} onPress={handlePress} />
                        <Pressable onPress={() => deleteDevice(item.id)} style={styles.deleteBtn}>
                            <Text style={styles.deleteText}>Жою</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.muted }]}>Құрылғылар табылмады</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 54 },
    searchBox: { borderWidth: 1, padding: 15, borderRadius: 16, marginBottom: 16, fontSize: 14, fontWeight: '600' },
    formContainer: { padding: 18, borderRadius: 20, borderWidth: 1, marginBottom: 20 },
    formTitle: { fontSize: 13, fontWeight: '900', marginBottom: 12 },
    smallInput: { borderWidth: 1, padding: 13, borderRadius: 14, marginBottom: 10, fontSize: 13, fontWeight: '600' },
    addButton: { padding: 15, borderRadius: 14, alignItems: 'center', marginTop: 4 },
    addButtonText: { color: '#fff', fontWeight: '800', fontSize: 14 },
    itemWrapper: { position: 'relative' },
    deleteBtn: { position: 'absolute', top: 18, right: 18, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#FEE2E2', borderRadius: 8 },
    deleteText: { color: '#EF4444', fontSize: 11, fontWeight: '900' },
    emptyText: { textAlign: 'center', marginTop: 30, fontSize: 14, fontWeight: '600' }
});