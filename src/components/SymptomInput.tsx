import { useState } from "react";
import { X, Plus, TrendingUp, Clock } from "lucide-react";
import { DetailedSymptom } from "../types/symptoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SymptomInputProps {
  onSymptomsChange: (symptoms: DetailedSymptom[]) => void;
  commonSymptoms?: string[];
}

const intensityOptions: DetailedSymptom['intensity'][] = ['mild', 'moderate', 'severe'];
const durationOptions = ["< 1 day", "1-3 days", "3-7 days", "> 1 week"];

const SymptomInput = ({
  onSymptomsChange,
  commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Sore throat",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Runny nose",
  ],
}: SymptomInputProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<DetailedSymptom[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [intensity, setIntensity] = useState<DetailedSymptom['intensity']>("mild");
  const [duration, setDuration] = useState<string>(durationOptions[0]);

  const handleAddSymptom = (symptomName: string, symptomIntensity: DetailedSymptom['intensity'], symptomDuration: string) => {
    const trimmedSymptom = symptomName.trim();
    if (
      trimmedSymptom &&
      !selectedSymptoms.some(s => s.name.toLowerCase() === trimmedSymptom.toLowerCase())
    ) {
      const newSymptom: DetailedSymptom = {
        name: trimmedSymptom,
        intensity: symptomIntensity,
        duration: symptomDuration,
      };
      const newSymptoms = [...selectedSymptoms, newSymptom];
      setSelectedSymptoms(newSymptoms);
      onSymptomsChange(newSymptoms);
      setInputValue("");
      setIntensity("mild");
      setDuration(durationOptions[0]);
    }
  };

  const handleRemoveSymptom = (symptomToRemove: DetailedSymptom) => {
    const newSymptoms = selectedSymptoms.filter(s => s !== symptomToRemove);
    setSelectedSymptoms(newSymptoms);
    onSymptomsChange(newSymptoms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddSymptom(inputValue, intensity, duration);
  };

  const handleCommonSymptomClick = (symptomName: string) => {
    handleAddSymptom(symptomName, "mild", durationOptions[0]);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="symptomName" className="sr-only">Symptom Name</label>
            <input
              id="symptomName"
              type="text"
              className="w-full p-3 text-sm text-charcoal bg-white border border-sandstone-dark/10 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30 focus:outline-none transition-all duration-200"
              placeholder="Type a symptom (e.g., headache)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="intensity" className="sr-only">Intensity</label>
            <Select value={intensity} onValueChange={(value) => setIntensity(value as DetailedSymptom['intensity'])}>
              <SelectTrigger id="intensity" className="w-full sm:w-[150px] h-11 bg-white border-sandstone-dark/10 shadow-inner-subtle">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-charcoal-light" />
                  <SelectValue placeholder="Intensity" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {intensityOptions.map(option => (
                  <SelectItem key={option} value={option} className="capitalize">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="duration" className="sr-only">Duration</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="w-full sm:w-[150px] h-11 bg-white border-sandstone-dark/10 shadow-inner-subtle">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-charcoal-light" />
                  <SelectValue placeholder="Duration" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            className="flex-shrink-0 bg-ayurveda hover:bg-ayurveda-dark text-white rounded-lg px-4 py-2 transition-all duration-200 h-11 flex items-center justify-center"
            aria-label="Add symptom"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>

      {selectedSymptoms.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-charcoal-light mb-2">Your symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-ayurveda/10 text-ayurveda"
              >
                {symptom.name} ({symptom.intensity}, {symptom.duration})
                <button
                  onClick={() => handleRemoveSymptom(symptom)}
                  className="ml-1.5 text-ayurveda hover:text-ayurveda-dark"
                  aria-label={`Remove ${symptom.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="text-sm text-charcoal-light mb-2">Common symptoms:</p>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptomName) => (
            <button
              key={symptomName}
              onClick={() => handleCommonSymptomClick(symptomName)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedSymptoms.some(s => s.name.toLowerCase() === symptomName.toLowerCase())
                  ? "bg-ayurveda text-white cursor-default"
                  : "bg-sandstone-dark hover:bg-sandstone-dark/80 text-charcoal"
                }`}
              disabled={selectedSymptoms.some(s => s.name.toLowerCase() === symptomName.toLowerCase())}
            >
              {symptomName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;
