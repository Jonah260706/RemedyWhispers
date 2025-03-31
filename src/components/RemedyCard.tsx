import { Link, useNavigate } from "react-router-dom";
import { Clock, Star, StarOff, ArrowRight, BellPlus, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useHealthProfile, Reminder } from "../hooks/useHealthProfile";
import { v4 as uuidv4 } from "uuid";

export interface RemedyCardProps {
  id: string;
  title: string;
  category: string;
  ingredients: string[];
  prepTime: string;
  effectiveness: number;
  imageUrl?: string;
}

const RemedyCard = ({
  id,
  title,
  category,
  ingredients,
  prepTime,
  effectiveness,
  imageUrl,
}: RemedyCardProps) => {
  const navigate = useNavigate();
  const { healthProfile, updateProfile, addReminder } = useHealthProfile();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = healthProfile.profile.preferences || [];
    setIsFavorite(favorites.includes(id));
  }, [healthProfile.profile.preferences, id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentFavorites = healthProfile.profile.preferences || [];
    const newFavorites = isFavorite
      ? currentFavorites.filter(favId => favId !== id)
      : [...currentFavorites, id];
    updateProfile({ preferences: newFavorites });
  };

  const handleAddReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newReminder: Reminder = {
      id: uuidv4(),
      title: `Take ${title}`,
      description: `Reminder for ${title} remedy`,
      time: "08:00",
      days: [],
      isActive: true
    };
    addReminder(newReminder);
    navigate('/profile?tab=notifications');
  };

  const defaultImage = "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <Link to={`/remedies/${id}`} className="block h-full">
      <div className="premium-card card-transition group animate-scale-in h-full flex flex-col">
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={imageUrl || defaultImage}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 heading-badge">
            {category}
          </span>
          <button
            onClick={toggleFavorite}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm transition-all duration-200 hover:bg-white hover:scale-110"
          >
            {isFavorite ? (
              <Heart className="h-5 w-5 text-pomegranate fill-pomegranate" />
            ) : (
              <Heart className="h-5 w-5 text-charcoal-light" />
            )}
          </button>
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-serif font-medium mb-2 transition-colors duration-200 group-hover:text-ayurveda-dark">
            {title}
          </h3>
          <div className="flex items-center mb-3 text-sm text-charcoal-light">
            <Clock className="h-4 w-4 mr-1" />
            <span>{prepTime}</span>
            <div className="flex ml-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < effectiveness
                      ? "text-saffron fill-saffron"
                      : "text-charcoal-light"
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-charcoal-light text-sm">
              Key ingredients:{" "}
              <span className="text-charcoal">
                {ingredients.slice(0, 3).join(", ")}
                {ingredients.length > 3 && "..."}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto border-t border-sandstone-dark/10 pt-4">
          <button
            onClick={handleAddReminder}
            title="Add Reminder"
            className="flex items-center text-sm text-charcoal-light hover:text-indigo transition-colors p-1 rounded-md hover:bg-indigo/10"
          >
            <BellPlus className="h-5 w-5 mr-1" />
            Reminder
          </button>
          <span className="text-sm font-medium text-ayurveda group-hover:underline flex items-center">
            View remedy <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RemedyCard;
