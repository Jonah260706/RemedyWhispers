import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SymptomInput from "../components/SymptomInput";
import ChatBot from "@/components/AIAssistant";
import { AlertTriangle, ArrowRight, AlertCircle, Stethoscope, Shield, Save, MessageCircle } from "lucide-react";
import { checkSymptoms, checkForEmergencySymptoms } from "../utils/symptomChecker";
import { useHealthProfile, SymptomHistory } from "../hooks/useHealthProfile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { DetailedSymptom } from "../types/symptoms";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState<DetailedSymptom[]>([]);
  const [results, setResults] = useState<any[] | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const isMobile = useIsMobile();
  const { healthProfile, addSymptomRecord } = useHealthProfile();

  const handleSymptomsChange = (newSymptoms: DetailedSymptom[]) => {
    setSymptoms(newSymptoms);
    setResults(null);
    setIsEmergency(false);
  };

  const handleCheckSymptoms = () => {
    if (symptoms.length === 0) return;
    setIsAnalyzing(true);
    const symptomNames = symptoms.map(s => s.name);
    const emergency = checkForEmergencySymptoms(symptomNames);
    setIsEmergency(emergency);
    // TODO: Update checkSymptoms logic later to use intensity/duration
    setTimeout(() => {
      const conditionResults = checkSymptoms(symptomNames, healthProfile.profile.allergies, healthProfile.profile.conditions);
      setResults(conditionResults);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Updated handleSaveSymptoms to store DetailedSymptom[] directly
  const handleSaveSymptoms = () => {
    const record: SymptomHistory = {
      date: new Date().toISOString(),
      symptoms: symptoms, // Store the detailed symptom array
      notes
    };
    addSymptomRecord(record);
    setShowSaveDialog(false);
    setNotes("");
  };

  // Effect to check for previously recorded symptoms from history
  useEffect(() => {
    if (healthProfile.symptomHistory.length > 0 && symptoms.length === 0) {
      const recentSymptomRecord = healthProfile.symptomHistory[healthProfile.symptomHistory.length - 1];
      const daysSinceLastRecord = Math.floor((Date.now() - new Date(recentSymptomRecord.date).getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceLastRecord < 14 && recentSymptomRecord.symptoms.length > 0) {
        // Now we can potentially load the data directly if it's stored correctly
      }
    }
  }, [healthProfile.symptomHistory, symptoms.length]);

  // Function to load suggested symptoms - now loads DetailedSymptom[] directly
  const loadSuggestedSymptoms = () => {
    const recentSymptomRecord = healthProfile.symptomHistory[healthProfile.symptomHistory.length - 1];
    // Ensure the loaded symptoms are valid DetailedSymptom objects
    const validSymptoms = recentSymptomRecord.symptoms.filter(
      s => s && typeof s === 'object' && s.name && s.intensity && s.duration
    );
    // If the stored data isn't in the expected format, this might load an empty array or partial data.
    // Consider adding migration logic if old string-based history exists.
    setSymptoms(validSymptoms);
  }

  // Simplify symptom names array for display comparison
  const symptomNamesOnly = symptoms.map(s => s.name.toLowerCase());

  // Helper function to format history symptoms for display
  const formatHistorySymptoms = (historySymptoms: DetailedSymptom[] | string[]): string => {
    if (historySymptoms.length === 0) return "None";
    // Check if the first item is a string (old format) or object (new format)
    if (typeof historySymptoms[0] === 'string') {
      return (historySymptoms as string[]).join(', ');
    } else {
      return (historySymptoms as DetailedSymptom[])
        .map(s => `${s.name} (${s.intensity}, ${s.duration})`)
        .join(', ');
    }
  };

  return (
    <div className="page-container relative pb-20">
      <header className="text-center mb-8 animate-fade-in">
        <span className="heading-badge mb-3">Health Tool</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-charcoal">
          Symptom Checker
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          Enter your symptoms with intensity and duration for more accurate results.
        </p>
      </header>

      {healthProfile.symptomHistory.length > 0 && symptoms.length === 0 && (
        <div className="premium-card mb-6 animate-fade-in animate-delay-100">
          <div className="flex items-start">
            <MessageCircle className="h-6 w-6 text-ayurveda mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Recent Symptoms</h3>
              <p className="text-sm text-charcoal-light mb-3">
                You previously reported: {formatHistorySymptoms(healthProfile.symptomHistory[healthProfile.symptomHistory.length - 1].symptoms)}
              </p>
              <button
                onClick={loadSuggestedSymptoms}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-ayurveda/10 text-ayurveda hover:bg-ayurveda/20 transition-colors"
              >
                Load these symptoms <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="premium-card mb-8 animate-fade-in">
        <h2 className="text-xl font-serif font-medium mb-4">Select Your Symptoms</h2>
        <SymptomInput onSymptomsChange={handleSymptomsChange} />

        <div className="mt-6">
          <button
            onClick={handleCheckSymptoms}
            disabled={symptoms.length === 0 || isAnalyzing}
            className={`btn-primary w-full ${symptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${isAnalyzing ? 'animate-pulse' : ''}`}
          >
            {isAnalyzing ? 'Analyzing symptoms...' : 'Check Symptoms'}
          </button>
        </div>

        <p className="text-xs text-charcoal-light italic mt-4">
          <strong>Disclaimer:</strong> This tool provides information for educational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>

      {isEmergency && (
        <div className="bg-pomegranate/10 border border-pomegranate/20 rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-pomegranate mr-3 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-medium text-pomegranate mb-2">
                Seek Medical Attention Immediately
              </h2>
              <p className="mb-4">
                Your symptoms may indicate a serious medical condition that requires immediate professional care. Please contact emergency services or go to the nearest emergency room.
              </p>
              <p className="text-sm font-medium">
                Call emergency services (911) if you experience:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Difficulty breathing or shortness of breath</li>
                <li>Severe chest or upper abdominal pain or pressure</li>
                <li>Sudden dizziness, weakness, or changes in vision</li>
                <li>Sudden severe headache</li>
                <li>Uncontrolled bleeding</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Possible Conditions</h2>
            {symptoms.length > 0 && (
              <button
                onClick={() => setShowSaveDialog(true)}
                className="btn-outline-sm flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save to History
              </button>
            )}
          </div>
          <p className="section-subtitle">
            Based on your symptoms, here are some possible conditions to consider:
          </p>

          <div className="space-y-4 mb-8">
            {results.map((condition, index) => (
              <div
                key={index}
                className={`premium-card ${condition.urgency === 'high' ? 'border-pomegranate/30' : condition.urgency === 'medium' ? 'border-terracotta/30' : 'border-ayurveda/30'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-serif font-medium">{condition.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${condition.urgency === 'high'
                    ? 'bg-pomegranate/15 text-pomegranate'
                    : condition.urgency === 'medium'
                      ? 'bg-terracotta/15 text-terracotta'
                      : 'bg-ayurveda/15 text-ayurveda'
                    }`}>
                    {condition.urgency === 'high'
                      ? 'Seek immediate care'
                      : condition.urgency === 'medium'
                        ? 'Consult doctor soon'
                        : 'Self-care may help'}
                  </span>
                </div>

                <p className="mb-4">{condition.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Common Symptoms for {condition.name}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {condition.symptoms.map((conditionSymptom: string, i: number) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-full text-xs ${symptomNamesOnly.some(userSymptomName =>
                          userSymptomName === conditionSymptom.toLowerCase() ||
                          conditionSymptom.toLowerCase().includes(userSymptomName) ||
                          userSymptomName.includes(conditionSymptom.toLowerCase())
                        )
                          ? 'bg-indigo/15 text-indigo font-medium'
                          : 'bg-sandstone-dark text-charcoal-light'
                          }`}
                      >
                        {conditionSymptom}
                      </span>
                    ))}
                  </div>
                </div>

                {condition.personalizedWarning && (
                  <div className="mb-4 bg-terracotta/10 p-3 rounded-lg">
                    <p className="text-sm text-terracotta">
                      <AlertCircle className="h-4 w-4 mr-1 inline-block" />
                      <span className="font-medium">Health profile alert: </span>
                      {condition.personalizedWarning}
                    </p>
                  </div>
                )}

                <div className="border-t border-sandstone-dark/20 pt-4">
                  <div className="flex items-start">
                    <Stethoscope className="h-5 w-5 text-charcoal-light mr-2 flex-shrink-0 mt-1" />
                    <p className="text-sm">
                      <span className="font-medium">Medical advice: </span>
                      {condition.doctorRecommendation}
                    </p>
                  </div>

                  {condition.remedyIds && condition.remedyIds.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Potential remedies that may help:</p>
                      <div className="flex flex-wrap gap-2">
                        {condition.remedyIds.map((remedyId, i) => (
                          <Link
                            key={i}
                            to={`/remedies/${remedyId}`}
                            className="inline-flex items-center px-3 py-1.5 bg-saffron/15 hover:bg-saffron/25 text-saffron-dark rounded-full text-sm transition-colors"
                          >
                            View Remedy <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && results.length === 0 && (
        <div className="text-center py-8 animate-fade-in">
          <AlertCircle className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
          <h2 className="text-xl font-serif font-medium mb-2">No Matches Found</h2>
          <p className="text-charcoal-light mb-6">
            We couldn't identify specific conditions based on the symptoms you provided. Try adding more symptoms or consult with a healthcare professional.
          </p>
          <button onClick={() => setResults(null)} className="btn-outline">
            Try Again
          </button>
        </div>
      )}

      <div className="premium-card text-center mt-12 animate-fade-in animate-delay-300">
        <Shield className="h-12 w-12 text-ayurveda mx-auto mb-4" />
        <h2 className="text-xl font-serif font-medium mb-2">Your Privacy Matters</h2>
        <p className="text-charcoal-light mb-6">
          All symptom information is processed locally on your device and is not stored or shared with any third parties.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/profile" className="btn-outline">
            Complete Health Profile
          </Link>
          <Link to="/remedies" className="btn-primary">
            Browse Remedies
          </Link>
        </div>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Symptoms to History</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-sm text-charcoal-light">
              Saving your symptoms helps track your health over time and provides better personalized recommendations.
            </p>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Symptoms to save:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {symptoms.map((symptom, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-indigo/10 text-indigo"
                  >
                    {symptom.name} ({symptom.intensity}, {symptom.duration})
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="symptomNotes" className="block text-sm font-medium mb-2">
                Add Notes (Optional)
              </label>
              <textarea
                id="symptomNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30 min-h-[100px]"
                placeholder="Add any additional details about these symptoms or how you're feeling"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSymptoms}
              className="btn-primary"
            >
              Save to History
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating chat button (visible only on desktop) */}
      {isMobile ? (
        <Drawer open={chatOpen} onOpenChange={setChatOpen}>
          <DrawerTrigger asChild>
            <button
              className="fixed bottom-6 right-6 z-50 bg-ayurveda text-white p-3 rounded-full shadow-elevation hover:bg-ayurveda-dark transition-colors"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Chat with our Health Assistant</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 h-full overflow-hidden">
              <ChatBot />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-ayurveda text-white p-3 rounded-full shadow-elevation hover:bg-ayurveda-dark transition-colors"
            aria-label="Open chat assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
          <DialogContent className="max-w-md max-h-[70vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Chat with our Health Assistant</DialogTitle>
            </DialogHeader>
            <div className="overflow-hidden h-full max-h-[calc(70vh-80px)]">
              <ChatBot />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SymptomChecker;
