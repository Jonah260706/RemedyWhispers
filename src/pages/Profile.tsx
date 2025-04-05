import { useState } from "react";
import {
  User, Star, Heart, Bell, History,
  Bookmark, Settings, AlertCircle, PlusCircle,
  Clipboard, X, Leaf, Award, MessageCircle
} from "lucide-react";
import { remedies } from "../data/remedies";
import RemedyCard from "../components/RemedyCard";
import { useHealthProfile, Reminder } from "../hooks/useHealthProfile";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { achievementsList, getAchievementDefinition } from "../data/achievements";
import AchievementBadge from "../components/AchievementBadge";
import ChatBot from "@/components/AIAssistant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    healthProfile,
    updateProfile,
    addIngredient,
    removeIngredient,
    addSymptomRecord,
    addReminder,
    updateReminder,
    deleteReminder,
  } = useHealthProfile();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [newReminder, setNewReminder] = useState<Reminder>({
    id: uuidv4(),
    title: "",
    description: "",
    time: "08:00",
    days: [],
    isActive: true
  });
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  // In a real app, favorites/recent would be fetched based on user ID
  const favoriteRemedies = remedies.filter(r => healthProfile.profile.preferences.includes(r.id));
  // Need a way to track recently viewed - placeholder for now
  const recentRemedies = remedies.slice(2, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      updateProfile({
        allergies: [...healthProfile.profile.allergies, newAllergy.trim()]
      });
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (allergyToRemove: string) => {
    updateProfile({
      allergies: healthProfile.profile.allergies.filter(a => a !== allergyToRemove)
    });
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      updateProfile({
        conditions: [...healthProfile.profile.conditions, newCondition.trim()]
      });
      setNewCondition("");
    }
  };

  const handleRemoveCondition = (conditionToRemove: string) => {
    updateProfile({
      conditions: healthProfile.profile.conditions.filter(c => c !== conditionToRemove)
    });
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      addIngredient(newIngredient);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    removeIngredient(ingredientToRemove);
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.title.trim() && newReminder.time) {
      addReminder({ ...newReminder, id: uuidv4() });
      setNewReminder({ id: uuidv4(), title: "", description: "", time: "08:00", days: [], isActive: true });
    }
  };

  const toggleDay = (day: string) => {
    const days = newReminder.days.includes(day)
      ? newReminder.days.filter(d => d !== day)
      : [...newReminder.days, day];
    setNewReminder({ ...newReminder, days });
  };

  const toggleReminderActive = (id: string, isActive: boolean) => {
    updateReminder(id, { isActive });
  };

  // Calculate earned achievements
  const earnedAchievements = healthProfile.profile.achievements
    .map(key => getAchievementDefinition(key))
    .filter(Boolean); // Filter out undefined in case a key doesn't match

  return (
    <div className="page-container relative pb-20">
      <header className="text-center mb-8 animate-fade-in">
        <span className="heading-badge mb-3">Your Account</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-charcoal">
          Health Profile
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          Manage your health information for personalized remedy recommendations.
        </p>
      </header>

      <div className="premium-card mb-8 animate-fade-in">
        <div className="flex overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "profile"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <User className="h-4 w-4 mr-2" />
            Health Info
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "favorites"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "history"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <History className="h-4 w-4 mr-2" />
            Recent
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "notifications"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </button>
          <button
            onClick={() => setActiveTab("symptom-tracker")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "symptom-tracker"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <Clipboard className="h-4 w-4 mr-2" />
            Symptom Tracker
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "achievements"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 mx-1 whitespace-nowrap flex items-center border-b-2 transition-colors ${activeTab === "settings"
              ? "border-ayurveda text-ayurveda font-medium"
              : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      <div className="animate-slide-up animate-delay-100">
        {activeTab === "profile" && (
          <div className="premium-card">
            <h2 className="text-xl font-serif font-medium mb-6">Your Health Information</h2>

            {isFormSubmitted ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-ayurveda/20 text-ayurveda mb-4 mx-auto">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Profile Saved!</h3>
                <p className="text-charcoal-light mb-6">
                  Your health information has been updated. We'll use this to personalize your remedy recommendations.
                </p>
                <button
                  onClick={() => setIsFormSubmitted(false)}
                  className="btn-outline"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={healthProfile.profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={healthProfile.profile.age}
                      onChange={(e) => updateProfile({ age: e.target.value })}
                      className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="Your age"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="allergies" className="block text-sm font-medium mb-2">
                    Allergies & Sensitivities
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="allergies"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      className="flex-1 p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="e.g., peanuts, dairy, gluten, etc."
                    />
                    <button
                      type="button"
                      onClick={handleAddAllergy}
                      className="ml-2 bg-ayurveda hover:bg-ayurveda-dark text-white p-3 rounded-lg"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {healthProfile.profile.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-terracotta/10 text-terracotta"
                      >
                        {allergy}
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(allergy)}
                          className="ml-1.5 text-terracotta hover:text-terracotta-dark"
                          aria-label={`Remove ${allergy}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-light mt-1">
                    We'll avoid recommending remedies with these ingredients
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="conditions" className="block text-sm font-medium mb-2">
                    Pre-existing Health Conditions
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="conditions"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="flex-1 p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="e.g., asthma, diabetes, hypertension, etc."
                    />
                    <button
                      type="button"
                      onClick={handleAddCondition}
                      className="ml-2 bg-ayurveda hover:bg-ayurveda-dark text-white p-3 rounded-lg"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {healthProfile.profile.conditions.map((condition, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-indigo/10 text-indigo"
                      >
                        {condition}
                        <button
                          type="button"
                          onClick={() => handleRemoveCondition(condition)}
                          className="ml-1.5 text-indigo hover:text-indigo-dark"
                          aria-label={`Remove ${condition}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-light mt-1">
                    Helps us provide more relevant and safe recommendations
                  </p>
                </div>

                <div className="mb-6 border-t border-sandstone-dark/10 pt-6">
                  <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
                    My Ingredients at Home
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="ingredients"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      className="flex-1 p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="e.g., honey, ginger, lemon, turmeric"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="ml-2 bg-saffron hover:bg-saffron-dark text-white p-3 rounded-lg"
                    >
                      <Leaf className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {healthProfile.profile.myIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-ayurveda/10 text-ayurveda"
                      >
                        {ingredient}
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(ingredient)}
                          className="ml-1.5 text-ayurveda hover:text-ayurveda-dark"
                          aria-label={`Remove ${ingredient}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-light mt-1">
                    Add ingredients you commonly have available for quicker remedy filtering (feature coming soon).
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-sandstone-dark/10 pt-6">
                  <p className="text-xs text-charcoal-light">
                    <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                    Your information is stored locally on your device only
                  </p>
                  <button type="submit" className="btn-primary">
                    Save Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div>
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center">
              <Bookmark className="h-5 w-5 mr-2 text-saffron" />
              Saved Remedies
            </h2>

            {favoriteRemedies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteRemedies.map((remedy) => (
                  <RemedyCard key={remedy.id} {...remedy} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-xl border border-sandstone-dark/10">
                <Bookmark className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Saved Remedies</h3>
                <p className="text-charcoal-light mb-6">
                  You haven't saved any remedies yet. Browse our collection and save your favorites!
                </p>
                <Link to="/remedies" className="btn-primary">Browse Remedies</Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center">
              <History className="h-5 w-5 mr-2 text-indigo" />
              Recently Viewed
            </h2>

            {recentRemedies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentRemedies.map((remedy) => (
                  <RemedyCard key={remedy.id} {...remedy} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-xl border border-sandstone-dark/10">
                <History className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
                <p className="text-charcoal-light mb-6">
                  You haven't viewed any remedies recently. Start exploring our collection!
                </p>
                <Link to="/remedies" className="btn-primary">Browse Remedies</Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-saffron" />
                Dosage Reminders
              </h2>
              <Link to="/education" className="text-sm text-ayurveda hover:underline">
                Learn about natural remedy schedules
              </Link>
            </div>

            <div className="premium-card mb-6">
              <h3 className="text-lg font-medium mb-4">Add New Reminder</h3>
              <form onSubmit={handleAddReminder}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="reminderTitle" className="block text-sm font-medium mb-2">
                      Reminder Title
                    </label>
                    <input
                      type="text"
                      id="reminderTitle"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      placeholder="e.g., Take Ginger Tea"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="reminderTime" className="block text-sm font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      id="reminderTime"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="reminderDescription" className="block text-sm font-medium mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    id="reminderDescription"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    className="w-full p-3 text-sm border border-sandstone-dark/20 rounded-lg shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30"
                    placeholder="Additional details about this reminder"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Repeat on Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${newReminder.days.includes(day)
                          ? "bg-ayurveda text-white"
                          : "bg-sandstone-dark text-charcoal hover:bg-sandstone-dark/80"
                          }`}
                      >
                        {day.charAt(0)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Add Reminder
                  </button>
                </div>
              </form>
            </div>

            {healthProfile.reminders.length > 0 ? (
              <div className="space-y-4">
                {healthProfile.reminders.map((reminder) => (
                  <div key={reminder.id} className="premium-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{reminder.title}</h4>
                        <p className="text-sm text-charcoal-light">{reminder.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm font-medium mr-3">{reminder.time}</span>
                          <div className="flex space-x-1">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                              <span
                                key={idx}
                                className={`w-6 h-6 text-xs flex items-center justify-center rounded-full ${reminder.days.includes(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][idx])
                                  ? "bg-ayurveda/20 text-ayurveda-dark"
                                  : "bg-sandstone-dark/30 text-charcoal-light"
                                  }`}
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleReminderActive(reminder.id, !reminder.isActive)}
                          className={`mr-2 px-3 py-1 rounded-full text-xs font-medium ${reminder.isActive
                            ? "bg-ayurveda/15 text-ayurveda"
                            : "bg-charcoal-light/10 text-charcoal-light"
                            }`}
                        >
                          {reminder.isActive ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="text-terracotta hover:text-terracotta-dark"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-xl border border-sandstone-dark/10">
                <Bell className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Reminders Set</h3>
                <p className="text-charcoal-light mb-6">
                  You haven't set any medication or remedy reminders yet.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "symptom-tracker" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-medium flex items-center">
                <Clipboard className="h-5 w-5 mr-2 text-ayurveda" />
                Symptom History
              </h2>
              <Link to="/symptom-checker" className="text-sm text-ayurveda hover:underline">
                Check symptoms now
              </Link>
            </div>

            {healthProfile.symptomHistory.length > 0 ? (
              <div className="space-y-4">
                {healthProfile.symptomHistory.map((record, index) => (
                  <div key={index} className="premium-card">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-charcoal">{new Date(record.date).toLocaleDateString()}</h4>
                      <span className="text-xs font-medium bg-sandstone-dark/30 text-charcoal-light px-2 py-1 rounded-full">
                        {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Reported Symptoms:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {record.symptoms.map((symptom, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-indigo/10 text-indigo"
                          >
                            {typeof symptom === 'string' ? symptom : `${symptom.name} (${symptom.intensity}, ${symptom.duration})`}
                          </span>
                        ))}
                      </div>
                    </div>

                    {record.notes && (
                      <div className="border-t border-sandstone-dark/10 pt-3">
                        <p className="text-sm font-medium mb-1">Notes:</p>
                        <p className="text-sm text-charcoal-light">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-xl border border-sandstone-dark/10">
                <Clipboard className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Symptom History</h3>
                <p className="text-charcoal-light mb-6">
                  You haven't recorded any symptoms yet. Use the symptom checker to start tracking your health.
                </p>
                <Link to="/symptom-checker" className="btn-primary">
                  Check Symptoms
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "achievements" && (
          <div>
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-saffron" />
              Your Achievements
            </h2>
            {earnedAchievements.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {earnedAchievements.map((achievement) => (
                  <AchievementBadge key={achievement!.key} achievement={achievement!} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-xl border border-sandstone-dark/10">
                <Award className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Achievements Yet</h3>
                <p className="text-charcoal-light mb-6">
                  Keep exploring the app to unlock badges!
                </p>
                <Link to="/remedies" className="btn-primary">
                  Explore Remedies
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="premium-card">
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-charcoal" />
              Application Settings
            </h2>
            <p className="text-charcoal-light">Settings options coming soon...</p>
          </div>
        )}
      </div>

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
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle className="text-xl">Chat with our Health Assistant</DrawerTitle>
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
          <DialogContent className="max-w-5xl max-h-[90vh] w-[90vw] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl">Chat with our Health Assistant</DialogTitle>
            </DialogHeader>
            <div className="overflow-hidden h-full max-h-[calc(90vh-80px)]">
              <ChatBot />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Profile;
