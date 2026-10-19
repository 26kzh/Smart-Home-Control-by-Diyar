export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Details: { deviceId: string; title: string };
};

export type MainTabParamList = {
    Home: undefined;
    Services: undefined;
    Settings: undefined;
    Profile: undefined;
}; export const themes = {
    light: {
        background: '#F1F5F9',
        card: '#FFFFFF',
        text: '#090D16',
        primary: '#4F46E5', // Indigo
        accent: '#DB2777', // Rose Pink
        muted: '#64748B',
        border: '#E2E8F0',
        cardShadow: 'rgba(79, 70, 229, 0.08)',
    },
    dark: {
        background: '#07090E',
        card: '#121824',
        text: '#F8FAFC',
        primary: '#6366F1',
        accent: '#F472B6',
        muted: '#94A3B8',
        border: '#1E293B',
        cardShadow: 'rgba(0, 0, 0, 0.4)',
    },
};

export type AppTheme = typeof themes.light;