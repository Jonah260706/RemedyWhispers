interface Condition {
  name: string;
  symptoms: string[];
  urgency: 'low' | 'medium' | 'high';
  remedyIds?: string[];
  description: string;
  doctorRecommendation: string;
  personalizedWarning?: string; // Warning based on user's health profile
}

export const conditions: Condition[] = [
  {
    name: "Common Cold",
    symptoms: ["Runny nose", "Sore throat", "Cough", "Congestion", "Sneezing", "Mild fever"],
    urgency: "low",
    remedyIds: ["honey-lemon-tea", "eucalyptus-steam", "ginger-tea"],
    description: "A viral infection of the upper respiratory tract that typically resolves within 7-10 days.",
    doctorRecommendation: "See a doctor if symptoms last more than 10 days or are unusually severe."
  },
  {
    name: "Seasonal Allergies",
    symptoms: ["Runny nose", "Sneezing", "Itchy eyes", "Congestion", "Itchy throat"],
    urgency: "low",
    remedyIds: ["eucalyptus-steam"],
    description: "An immune response to environmental triggers like pollen, dust, or pet dander.",
    doctorRecommendation: "See a doctor if over-the-counter remedies don't provide relief or if allergies significantly impact daily life."
  },
  {
    name: "Indigestion",
    symptoms: ["Bloating", "Nausea", "Stomach pain", "Heartburn", "Gas"],
    urgency: "low",
    remedyIds: ["peppermint-tea", "ginger-tea", "apple-cider-vinegar"],
    description: "Discomfort in the upper abdomen caused by difficulty digesting food.",
    doctorRecommendation: "See a doctor if symptoms persist for more than two weeks or are accompanied by weight loss or difficulty swallowing."
  },
  {
    name: "Migraine",
    symptoms: ["Severe headache", "Nausea", "Sensitivity to light", "Sensitivity to sound", "Visual disturbances"],
    urgency: "medium",
    remedyIds: [],
    description: "A neurological condition characterized by severe, debilitating headaches often accompanied by other symptoms.",
    doctorRecommendation: "See a doctor if you experience frequent or severe migraines, or if the pattern of your headaches changes."
  },
  {
    name: "Flu (Influenza)",
    symptoms: ["High fever", "Body aches", "Fatigue", "Headache", "Cough", "Sore throat"],
    urgency: "medium",
    remedyIds: ["honey-lemon-tea", "ginger-tea"],
    description: "A contagious respiratory illness caused by influenza viruses that can cause mild to severe illness.",
    doctorRecommendation: "See a doctor if you have difficulty breathing, persistent chest pain, sudden dizziness, or severe weakness."
  },
  {
    name: "Food Poisoning",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach pain", "Fever"],
    urgency: "medium",
    remedyIds: ["ginger-tea"],
    description: "Illness caused by eating contaminated food, often resulting in gastrointestinal symptoms.",
    doctorRecommendation: "See a doctor if you have severe abdominal pain, bloody vomit or stool, signs of dehydration, or a fever above 101.5°F."
  },
  {
    name: "Appendicitis",
    symptoms: ["Sharp pain in lower right abdomen", "Nausea", "Vomiting", "Fever", "Loss of appetite"],
    urgency: "high",
    description: "Inflammation of the appendix that requires prompt medical attention and often surgical removal.",
    doctorRecommendation: "Seek immediate medical attention if you suspect appendicitis. This is a medical emergency."
  },
  {
    name: "Heart Attack",
    symptoms: ["Chest pain or pressure", "Pain in arms or jaw", "Shortness of breath", "Cold sweat", "Nausea", "Dizziness"],
    urgency: "high",
    description: "Occurs when blood flow to part of the heart is blocked, causing damage to heart muscle.",
    doctorRecommendation: "Call emergency services (911) immediately if you suspect a heart attack."
  }
];

// Map conditions that would be potentially dangerous for specific medical conditions
const conditionWarnings: Record<string, string[]> = {
  "asthma": ["Common Cold", "Flu (Influenza)", "Seasonal Allergies"],
  "diabetes": ["Flu (Influenza)", "Food Poisoning"],
  "hypertension": ["Heart Attack", "Migraine"],
  "heart disease": ["Heart Attack", "Flu (Influenza)"],
  "pregnancy": ["Food Poisoning", "Flu (Influenza)"],
  "copd": ["Common Cold", "Flu (Influenza)", "Seasonal Allergies"]
};

// Map ingredients that could potentially cause reactions
const allergyWarnings: Record<string, string[]> = {
  "honey": ["honey-lemon-tea"],
  "lemon": ["honey-lemon-tea", "apple-cider-vinegar"],
  "ginger": ["ginger-tea", "honey-lemon-tea"],
  "peppermint": ["peppermint-tea"],
  "eucalyptus": ["eucalyptus-steam"],
  "apple": ["apple-cider-vinegar"],
  "dairy": [],
  "gluten": []
};

export const checkSymptoms = (
  userSymptoms: string[],
  userAllergies: string[] = [],
  userConditions: string[] = []
): Condition[] => {
  // Convert all symptoms to lowercase for case-insensitive matching
  const normalizedUserSymptoms = userSymptoms.map(s => s.toLowerCase());

  // Calculate matches for each condition
  const matches = conditions.map(condition => {
    const normalizedConditionSymptoms = condition.symptoms.map(s => s.toLowerCase());

    // Count how many symptoms match
    const matchCount = normalizedUserSymptoms.filter(userSymptom =>
      normalizedConditionSymptoms.some(conditionSymptom =>
        conditionSymptom.includes(userSymptom) || userSymptom.includes(conditionSymptom)
      )
    ).length;

    // Calculate a match score as a percentage of condition symptoms matched
    const matchScore = matchCount / condition.symptoms.length;

    // Create a copy of the condition to potentially add personalized warnings
    const conditionWithWarnings = { ...condition };

    // Check if user has medical conditions that would warrant extra caution for this condition
    const matchingConditions = userConditions.filter(userCondition => {
      const userConditionLower = userCondition.toLowerCase();
      return Object.keys(conditionWarnings).some(c =>
        c.toLowerCase() === userConditionLower &&
        conditionWarnings[c].includes(condition.name)
      );
    });

    if (matchingConditions.length > 0) {
      conditionWithWarnings.personalizedWarning = `Based on your health profile (${matchingConditions.join(", ")}), this condition requires additional medical attention. Please consult your healthcare provider.`;
    }

    // Check if remedies for this condition contain allergens the user is allergic to
    if (condition.remedyIds && condition.remedyIds.length > 0 && userAllergies.length > 0) {
      const allergyConflicts = userAllergies.filter(userAllergy =>
        Object.keys(allergyWarnings).some(allergen =>
          allergen.toLowerCase().includes(userAllergy.toLowerCase()) &&
          condition.remedyIds!.some(remedyId =>
            allergyWarnings[allergen].includes(remedyId)
          )
        )
      );

      if (allergyConflicts.length > 0) {
        const warningText = conditionWithWarnings.personalizedWarning ?
          ` Also, some suggested remedies may contain ingredients you're allergic to (${allergyConflicts.join(", ")}).` :
          `Some suggested remedies may contain ingredients you're allergic to (${allergyConflicts.join(", ")}). Please avoid these or consult your healthcare provider.`;

        conditionWithWarnings.personalizedWarning = (conditionWithWarnings.personalizedWarning || "") + warningText;
      }
    }

    return {
      condition: conditionWithWarnings,
      matchScore,
      matchCount
    };
  });

  // Filter conditions with at least one matching symptom and sort by match score
  const relevantMatches = matches
    .filter(match => match.matchCount > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  // Return the conditions in order of relevance
  return relevantMatches.map(match => match.condition);
};

export const getEmergencySymptoms = (): string[] => {
  const emergencyConditions = conditions.filter(condition => condition.urgency === 'high');
  const symptoms = new Set<string>();

  emergencyConditions.forEach(condition => {
    condition.symptoms.forEach(symptom => symptoms.add(symptom));
  });

  return Array.from(symptoms);
};

export const checkForEmergencySymptoms = (userSymptoms: string[]): boolean => {
  const emergencySymptoms = getEmergencySymptoms();
  const normalizedUserSymptoms = userSymptoms.map(s => s.toLowerCase());
  const normalizedEmergencySymptoms = emergencySymptoms.map(s => s.toLowerCase());

  return normalizedUserSymptoms.some(userSymptom =>
    normalizedEmergencySymptoms.some(emergencySymptom =>
      emergencySymptom.includes(userSymptom) || userSymptom.includes(emergencySymptom)
    )
  );
};
