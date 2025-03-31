export interface DetailedSymptom {
    name: string;
    intensity: 'mild' | 'moderate' | 'severe';
    duration: string; // e.g., "< 1 day", "1-3 days", "3-7 days", "> 1 week"
} 