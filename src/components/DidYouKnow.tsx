import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const healthTips = [
    "Ginger can help reduce nausea and muscle soreness.",
    "Turmeric has powerful anti-inflammatory effects.",
    "Drinking enough water daily is crucial for overall health.",
    "Chamomile tea may promote sleep quality and relaxation.",
    "Peppermint can aid digestion and relieve headaches.",
    "Garlic is known for its immune-boosting properties.",
    "Honey has natural antibacterial properties (don't give to infants!).",
    "Lemon is a great source of Vitamin C.",
    "Mindful breathing for a few minutes can reduce stress.",
    "Regular, moderate exercise supports a healthy immune system."
];

const DidYouKnow = () => {
    const [tip, setTip] = useState('');

    useEffect(() => {
        // Select a random tip when the component mounts
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        setTip(healthTips[randomIndex]);
    }, []);

    if (!tip) return null; // Don't render if no tip is selected yet

    return (
        <div className="premium-card bg-indigo/10 border border-indigo/20 my-8 animate-fade-in">
            <div className="flex items-start">
                <Lightbulb className="h-6 w-6 text-indigo mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-medium mb-1 text-indigo">Did You Know?</h3>
                    <p className="text-sm text-charcoal-light">
                        {tip}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DidYouKnow; 