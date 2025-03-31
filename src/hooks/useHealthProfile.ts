import { useState, useEffect } from "react";
import { DetailedSymptom } from "../types/symptoms";

// Type for achievements (simple string keys for now)
export type AchievementKey =
    | 'FIRST_SYMPTOM_CHECK'
    | 'FIRST_FAVORITE'
    | 'VIEWED_5_REMEDIES'
    | 'TRACKED_SYMPTOMS_WEEK'
    | 'DOWNLOADED_GUIDE'
    | 'ADDED_INGREDIENT';

export interface HealthProfile {
    name: string;
    age: string;
    allergies: string[];
    conditions: string[];
    preferences: string[];
    myIngredients: string[];
    achievements: AchievementKey[];
}

export interface SymptomHistory {
    date: string;
    symptoms: DetailedSymptom[];
    notes: string;
}

export interface HealthProfileState {
    profile: HealthProfile;
    symptomHistory: SymptomHistory[];
    reminders: Reminder[];
}

export interface Reminder {
    id: string;
    title: string;
    description: string;
    time: string;
    days: string[];
    isActive: boolean;
}

const defaultHealthProfile: HealthProfileState = {
    profile: {
        name: "",
        age: "",
        allergies: [],
        conditions: [],
        preferences: [],
        myIngredients: [],
        achievements: ['FIRST_SYMPTOM_CHECK', 'FIRST_FAVORITE', 'ADDED_INGREDIENT']
    },
    symptomHistory: [],
    reminders: []
};

export function useHealthProfile() {
    const [healthProfile, setHealthProfile] = useState<HealthProfileState>(() => {
        const savedProfile = localStorage.getItem("healthProfile");
        const initialProfile = savedProfile ? JSON.parse(savedProfile) : defaultHealthProfile;
        if (!initialProfile.profile.myIngredients) {
            initialProfile.profile.myIngredients = [];
        }
        if (!initialProfile.profile.achievements) {
            initialProfile.profile.achievements = [];
        }
        return initialProfile;
    });

    useEffect(() => {
        localStorage.setItem("healthProfile", JSON.stringify(healthProfile));
    }, [healthProfile]);

    const updateProfile = (profile: Partial<HealthProfile>) => {
        setHealthProfile(prev => ({
            ...prev,
            profile: { ...prev.profile, ...profile }
        }));
    };

    const grantAchievement = (key: AchievementKey) => {
        if (!healthProfile.profile.achievements.includes(key)) {
            console.log(`Achievement unlocked: ${key}`);
            updateProfile({
                achievements: [...healthProfile.profile.achievements, key]
            });
        }
    };

    const addIngredient = (ingredient: string) => {
        if (ingredient.trim() && !healthProfile.profile.myIngredients.includes(ingredient.trim())) {
            updateProfile({
                myIngredients: [...healthProfile.profile.myIngredients, ingredient.trim()]
            });
            grantAchievement('ADDED_INGREDIENT');
        }
    };

    const removeIngredient = (ingredientToRemove: string) => {
        updateProfile({
            myIngredients: healthProfile.profile.myIngredients.filter(i => i !== ingredientToRemove)
        });
    };

    const addSymptomRecord = (record: SymptomHistory) => {
        setHealthProfile(prev => ({
            ...prev,
            symptomHistory: [...prev.symptomHistory, record]
        }));
        grantAchievement('FIRST_SYMPTOM_CHECK');
    };

    const updateProfileAndCheckAchievements = (profileUpdate: Partial<HealthProfile>) => {
        const oldPreferences = healthProfile.profile.preferences || [];
        updateProfile(profileUpdate);
        if (profileUpdate.preferences && profileUpdate.preferences.length > oldPreferences.length && oldPreferences.length === 0) {
            grantAchievement('FIRST_FAVORITE');
        }
    };

    const addReminder = (reminder: Reminder) => {
        setHealthProfile(prev => ({
            ...prev,
            reminders: [...prev.reminders, reminder]
        }));
    };

    const updateReminder = (id: string, reminderData: Partial<Reminder>) => {
        setHealthProfile(prev => ({
            ...prev,
            reminders: prev.reminders.map(reminder =>
                reminder.id === id ? { ...reminder, ...reminderData } : reminder
            )
        }));
    };

    const deleteReminder = (id: string) => {
        setHealthProfile(prev => ({
            ...prev,
            reminders: prev.reminders.filter(reminder => reminder.id !== id)
        }));
    };

    const clearAllData = () => {
        setHealthProfile(defaultHealthProfile);
        localStorage.removeItem("healthProfile");
    };

    return {
        healthProfile,
        updateProfile: updateProfileAndCheckAchievements,
        grantAchievement,
        addIngredient,
        removeIngredient,
        addSymptomRecord,
        addReminder,
        updateReminder,
        deleteReminder,
        clearAllData
    };
} 