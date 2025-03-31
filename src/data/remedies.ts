
import { RemedyCardProps } from "../components/RemedyCard";

interface RemedyDetail extends RemedyCardProps {
  description: string;
  instructions: string[];
  benefits: string[];
  precautions: string[];
  scientificEvidence: string;
  sources: string[];
}

export const remedies: RemedyDetail[] = [
  {
    id: "honey-lemon-tea",
    title: "Honey Lemon Tea",
    category: "Sore Throat",
    ingredients: ["Honey", "Lemon", "Hot water", "Ginger (optional)"],
    prepTime: "5 minutes",
    effectiveness: 4,
    imageUrl: "https://www.cookingwithnart.com/wp-content/uploads/2020/03/Honey-and-Lemon-Tea-03.jpg",
    description: "A soothing and healing tea that helps relieve sore throat and cough. The combination of honey's antimicrobial properties and lemon's vitamin C makes this an effective remedy.",
    instructions: [
      "Boil 1 cup of water",
      "Squeeze half a lemon into the hot water",
      "Add 1-2 tablespoons of raw honey (after water has cooled slightly)",
      "Stir well and sip slowly",
      "Repeat 2-3 times daily for best results"
    ],
    benefits: [
      "Soothes irritated throat tissues",
      "Honey coats the throat and has natural antibacterial properties",
      "Lemon provides vitamin C to boost immunity",
      "Helps thin mucus and reduce congestion"
    ],
    precautions: [
      "Do not give honey to children under 1 year old due to risk of botulism",
      "If you have diabetes, consider using less honey or consult your doctor",
      "If symptoms persist for more than 5 days, consult a healthcare professional"
    ],
    scientificEvidence: "Studies have shown that honey is effective in reducing nighttime cough frequency and severity in children with upper respiratory infections. Vitamin C from lemon may help reduce the duration of cold symptoms.",
    sources: [
      "Journal of Family Practice: 'Effect of honey on nocturnal cough and sleep quality'",
      "Mayo Clinic: 'Cold remedies: What works, what doesn't'"
    ]
  },
  {
    id: "ginger-tea",
    title: "Ginger Tea",
    category: "Nausea",
    ingredients: ["Fresh ginger root", "Hot water", "Honey (optional)", "Lemon (optional)"],
    prepTime: "10 minutes",
    effectiveness: 5,
    imageUrl: "https://images.unsplash.com/photo-1603567043148-0b5240ba7ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "A warm and spicy tea that helps relieve nausea, motion sickness, and digestive discomfort. Ginger contains natural compounds that help calm the stomach and reduce inflammation.",
    instructions: [
      "Peel and thinly slice 1-2 inches of fresh ginger root",
      "Bring 2 cups of water to a boil",
      "Add ginger slices and reduce heat to simmer for 5-10 minutes",
      "Strain the tea and add honey or lemon to taste if desired",
      "Sip slowly while warm"
    ],
    benefits: [
      "Relieves nausea and upset stomach",
      "May help with morning sickness during pregnancy",
      "Reduces inflammation and aids digestion",
      "Warms the body and may help with cold symptoms"
    ],
    precautions: [
      "Consult your doctor if you're taking blood thinners as ginger may enhance their effects",
      "Start with small amounts if you have gallstones",
      "If pregnant, limit to 1 gram of ginger per day",
      "May cause mild heartburn in some people"
    ],
    scientificEvidence: "Multiple clinical studies have confirmed ginger's effectiveness for nausea, especially for pregnancy-related morning sickness, motion sickness, and chemotherapy-induced nausea.",
    sources: [
      "Journal of the American Board of Family Medicine: 'A Comprehensive Review of the Benefits of Ginger'",
      "National Center for Complementary and Integrative Health: 'Ginger'"
    ]
  },
  {
    id: "turmeric-milk",
    title: "Golden Turmeric Milk",
    category: "Inflammation",
    ingredients: ["Turmeric powder", "Milk or plant-based milk", "Black pepper", "Honey", "Cinnamon (optional)"],
    prepTime: "10 minutes",
    effectiveness: 4,
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9a84ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Also known as 'golden milk,' this ancient Ayurvedic remedy helps reduce inflammation, boost immunity, and improve digestion. Curcumin in turmeric has powerful anti-inflammatory properties.",
    instructions: [
      "Warm 1 cup of milk in a saucepan over medium heat",
      "Add 1 teaspoon of turmeric powder and a pinch of black pepper",
      "Add a small piece of cinnamon or ¼ teaspoon of cinnamon powder (optional)",
      "Simmer on low heat for 5 minutes, stirring occasionally",
      "Remove from heat and add honey to taste",
      "Strain if desired and drink while warm"
    ],
    benefits: [
      "Reduces inflammation throughout the body",
      "Black pepper enhances absorption of curcumin by up to 2000%",
      "May help relieve joint pain and arthritis symptoms",
      "Supports immune system function"
    ],
    precautions: [
      "Turmeric may interact with blood thinners and diabetes medications",
      "May cause digestive discomfort in large amounts",
      "Consult your doctor before regular use if you have gallbladder disease",
      "Can stain clothing and countertops easily"
    ],
    scientificEvidence: "Research shows that curcumin in turmeric has anti-inflammatory properties comparable to some pharmaceutical drugs but with fewer side effects. Black pepper significantly increases its bioavailability.",
    sources: [
      "Foods: 'Curcumin: A Review of Its Effects on Human Health'",
      "Journal of Alternative and Complementary Medicine: 'Influence of piperine on the pharmacokinetics of curcumin'"
    ]
  },
  {
    id: "peppermint-tea",
    title: "Peppermint Tea",
    category: "Digestion",
    ingredients: ["Peppermint leaves (fresh or dried)", "Hot water", "Honey (optional)"],
    prepTime: "5 minutes",
    effectiveness: 4,
    imageUrl: "https://images.unsplash.com/photo-1565887756948-7a3e36d5e155?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "A refreshing and soothing tea that helps relieve digestive issues including bloating, gas, and indigestion. Peppermint relaxes digestive tract muscles and improves bile flow.",
    instructions: [
      "Boil 1 cup of water",
      "Add 1 tablespoon of dried peppermint leaves or 5-6 fresh leaves",
      "Steep for 5-7 minutes",
      "Strain and add honey if desired",
      "Sip slowly after meals to aid digestion"
    ],
    benefits: [
      "Relieves indigestion, bloating, and gas",
      "May help with irritable bowel syndrome (IBS) symptoms",
      "Relieves nausea and stomach cramps",
      "Contains menthol which can help clear congestion"
    ],
    precautions: [
      "Avoid if you have gastroesophageal reflux disease (GERD) as it may worsen symptoms",
      "May interact with medications that reduce stomach acid",
      "Not recommended for infants and very young children in concentrated forms",
      "Consult your doctor if you have a hiatal hernia"
    ],
    scientificEvidence: "Clinical trials have shown that peppermint oil (which is concentrated in peppermint tea) can significantly improve symptoms of IBS. The menthol in peppermint has antispasmodic effects on the digestive tract.",
    sources: [
      "BMJ (British Medical Journal): 'Peppermint oil for irritable bowel syndrome: a systematic review and meta-analysis'",
      "American Family Physician: 'Herbal and Dietary Supplements for Treatment of Anxiety Disorders'"
    ]
  },
  {
    id: "apple-cider-vinegar",
    title: "Apple Cider Vinegar Tonic",
    category: "Digestion",
    ingredients: ["Apple cider vinegar", "Water", "Honey", "Lemon juice (optional)"],
    prepTime: "2 minutes",
    effectiveness: 3,
    imageUrl: "https://images.unsplash.com/photo-1595165305017-0a8ed676fee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "A tart and invigorating tonic that may help with digestion, blood sugar control, and weight management. The acetic acid in apple cider vinegar has various health benefits.",
    instructions: [
      "Mix 1-2 tablespoons of apple cider vinegar in 8 oz of water",
      "Add 1-2 teaspoons of honey to taste",
      "Add a squeeze of lemon juice if desired",
      "Stir well and drink before meals"
    ],
    benefits: [
      "May help regulate blood sugar levels",
      "Aids digestion and may reduce bloating",
      "Contains beneficial bacteria for gut health",
      "May help with weight management as part of a healthy diet"
    ],
    precautions: [
      "Always dilute apple cider vinegar as it is highly acidic",
      "May erode tooth enamel if not properly diluted",
      "Can interact with certain medications, especially diabetes medications and diuretics",
      "May aggravate acid reflux in some people"
    ],
    scientificEvidence: "Some small studies suggest that apple cider vinegar may help lower blood sugar levels after meals and aid in weight loss. However, more research is needed to confirm many of the claimed benefits.",
    sources: [
      "Journal of Evidence-Based Integrative Medicine: 'Apple Cider Vinegar: a review'",
      "Diabetes Care: 'Vinegar Improves Insulin Sensitivity to a High-Carbohydrate Meal'"
    ]
  },
  {
    id: "eucalyptus-steam",
    title: "Eucalyptus Steam Inhalation",
    category: "Congestion",
    ingredients: ["Eucalyptus essential oil", "Hot water", "Towel"],
    prepTime: "5 minutes",
    effectiveness: 4,
    imageUrl: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "A clearing and refreshing steam treatment that helps relieve nasal and chest congestion. Eucalyptus contains compounds that help open airways and reduce mucus.",
    instructions: [
      "Boil 2-3 cups of water",
      "Pour into a large, heat-safe bowl",
      "Add 3-5 drops of eucalyptus essential oil",
      "Place your face about 12 inches from the bowl (not too close)",
      "Drape a towel over your head and the bowl to create a tent",
      "Breathe deeply through your nose for 5-10 minutes",
      "Take breaks if needed"
    ],
    benefits: [
      "Opens nasal passages and relieves congestion",
      "Soothes irritated sinus membranes",
      "The warm, moist air helps loosen mucus",
      "Provides temporary relief from cold and sinus symptoms"
    ],
    precautions: [
      "Not suitable for children under 7 years",
      "Keep eyes closed to avoid irritation",
      "Use caution with hot water to avoid burns",
      "Not recommended for people with asthma without medical advice",
      "Do not ingest eucalyptus oil"
    ],
    scientificEvidence: "Studies show that eucalyptol (the main component in eucalyptus oil) has antimicrobial properties and can help break up mucus. Steam therapy itself helps moisten dry nasal passages and throat.",
    sources: [
      "Journal of Ethnopharmacology: 'Eucalyptus essential oil: Biological properties and their applications'",
      "American Journal of Rhinology & Allergy: 'Steam inhalation therapy: severe scalds as an adverse side effect'"
    ]
  }
];

export const getRemedyById = (id: string): RemedyDetail | undefined => {
  return remedies.find(remedy => remedy.id === id);
};

export const getRemediesByCategory = (category: string): RemedyDetail[] => {
  return remedies.filter(remedy => remedy.category.toLowerCase() === category.toLowerCase());
};

export const getRemediesByIngredient = (ingredient: string): RemedyDetail[] => {
  return remedies.filter(remedy =>
    remedy.ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase()))
  );
};

export const getAllCategories = (): string[] => {
  const categories = new Set(remedies.map(remedy => remedy.category));
  return Array.from(categories);
};

export const getAllIngredients = (): string[] => {
  const ingredients = new Set<string>();
  remedies.forEach(remedy =>
    remedy.ingredients.forEach(ingredient => ingredients.add(ingredient))
  );
  return Array.from(ingredients);
};
