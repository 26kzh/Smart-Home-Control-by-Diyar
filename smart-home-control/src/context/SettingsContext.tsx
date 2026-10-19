import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, AppTheme } from '../theme/themes';

type ThemeType = 'light' | 'dark';
type FontScaleType = 'small' | 'normal' | 'large';

type SettingsContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    fontScale: FontScaleType;
    setFontScale: (scale: FontScaleType) => void;
    colors: AppTheme;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>('light');
    const [fontScale, setFontScale] = useState<FontScaleType>('normal');

    useEffect(() => {
        AsyncStorage.getItem('app_theme').then((saved) => {
            if (saved === 'light' || saved === 'dark') setTheme(saved);
        });
        AsyncStorage.getItem('app_font').then((saved) => {
            if (saved === 'small' || saved === 'normal' || saved === 'large') setFontScale(saved);
        });
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        AsyncStorage.setItem('app_theme', next);
    };

    const handleSetFont = (scale: FontScaleType) => {
        setFontScale(scale);
        AsyncStorage.setItem('app_font', scale);
    };

    const colors = themes[theme];

    return (
        <SettingsContext.Provider value={{ theme, toggleTheme, fontScale, setFontScale: handleSetFont, colors }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
}