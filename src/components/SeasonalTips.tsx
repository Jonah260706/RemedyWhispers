import { useState, useEffect } from 'react';
import { Sun, CloudSnow, Leaf, Sprout } from 'lucide-react';

// Define tips for each season
const seasonalTipsData = {
    spring: {
        icon: Sprout,
        tips: [
            "Support your body during allergy season with local honey or nettle tea.",
            "Incorporate fresh spring greens like spinach and asparagus into your diet.",
            "Stay hydrated as the weather warms up.",
            "Consider a gentle spring cleanse with dandelion or milk thistle."
        ]
    },
    summer: {
        icon: Sun,
        tips: [
            "Protect your skin with natural sunscreens and stay hydrated with cooling foods like cucumber and watermelon.",
            "Soothe sunburns with aloe vera gel.",
            "Enjoy seasonal fruits like berries, peaches, and melons.",
            "Stay cool with peppermint tea or hibiscus tea."
        ]
    },
    autumn: {
        icon: Leaf,
        tips: [
            "Boost your immune system for the colder months with elderberry syrup or echinacea.",
            "Enjoy warming spices like ginger, cinnamon, and turmeric.",
            "Incorporate root vegetables like sweet potatoes and carrots.",
            "Practice grounding activities as the days get shorter."
        ]
    },
    winter: {
        icon: CloudSnow,
        tips: [
            "Support your respiratory system with warming teas like ginger and thyme.",
            "Keep your skin moisturized with natural oils like coconut or jojoba.",
            "Incorporate immune-boosting foods like garlic, onions, and mushrooms.",
            "Ensure adequate Vitamin D intake, potentially through supplements."
        ]
    }
};

// Function to determine the current season (Northern Hemisphere)
const getCurrentSeason = (): keyof typeof seasonalTipsData => {
    const month = new Date().getMonth(); // 0 = January, 11 = December
    if (month >= 2 && month <= 4) return 'spring'; // March, April, May
    if (month >= 5 && month <= 7) return 'summer'; // June, July, August
    if (month >= 8 && month <= 10) return 'autumn'; // September, October, November
    return 'winter'; // December, January, February
};

const SeasonalTips = () => {
    const [currentSeason, setCurrentSeason] = useState<keyof typeof seasonalTipsData>('spring');
    const [tip, setTip] = useState<string>('');

    useEffect(() => {
        const season = getCurrentSeason();
        setCurrentSeason(season);

        // Select a random tip for the current season
        const tipsForSeason = seasonalTipsData[season].tips;
        const randomIndex = Math.floor(Math.random() * tipsForSeason.length);
        setTip(tipsForSeason[randomIndex]);
    }, []);

    if (!tip) return null;

    const SeasonIcon = seasonalTipsData[currentSeason].icon;

    return (
        <div className="premium-card bg-saffron/10 border border-saffron/20 my-8 animate-fade-in">
            <div className="flex items-start">
                <SeasonIcon className="h-7 w-7 text-saffron mr-4 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-medium mb-1 text-saffron-dark capitalize">
                        Seasonal Wellness Tip ({currentSeason})
                    </h3>
                    <p className="text-sm text-charcoal-light">
                        {tip}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SeasonalTips; 