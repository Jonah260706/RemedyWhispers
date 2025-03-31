import { AchievementKey } from "./hooks/useHealthProfile";
import { CheckSquare, Heart, Star, ClipboardCheck, Download, Leaf, LucideIcon } from "lucide-react";

export interface AchievementDefinition {
    key: AchievementKey;
    title: string;
    description: string;
    icon: LucideIcon;
    colorClass: string; // Tailwind classes for color
}

export const achievementsList: AchievementDefinition[] = [
    {
        key: 'FIRST_SYMPTOM_CHECK',
        title: "Health Detective",
        description: "Used the Symptom Checker for the first time.",
        icon: CheckSquare,
        colorClass: "bg-indigo/10 text-indigo"
    },
    {
        key: 'FIRST_FAVORITE',
        title: "Saved a Gem",
        description: "Added your first remedy to Favorites.",
        icon: Heart,
        colorClass: "bg-pomegranate/10 text-pomegranate"
    },
    {
        key: 'ADDED_INGREDIENT',
        title: "Pantry Stocker",
        description: "Added your first ingredient to \'My Ingredients\'.",
        icon: Leaf,
        colorClass: "bg-ayurveda/10 text-ayurveda"
    },
    {
        key: 'DOWNLOADED_GUIDE',
        title: "Offline Ready",
        description: "Downloaded your first offline guide.",
        icon: Download,
        colorClass: "bg-saffron/10 text-saffron-dark"
    },
    {
        key: 'VIEWED_5_REMEDIES',
        title: "Remedy Explorer",
        description: "Viewed the details of 5 different remedies.",
        icon: Star,
        colorClass: "bg-amber-400/10 text-amber-600"
    },
    {
        key: 'TRACKED_SYMPTOMS_WEEK',
        title: "Consistent Tracker",
        description: "Tracked symptoms at least once for 7 days.",
        icon: ClipboardCheck,
        colorClass: "bg-blue-400/10 text-blue-600"
    }
    // Add more achievements here
];

// Helper to get a specific achievement definition by key
export const getAchievementDefinition = (key: AchievementKey): AchievementDefinition | undefined => {
    return achievementsList.find(ach => ach.key === key);
}; 