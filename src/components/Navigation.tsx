
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Stethoscope, User, Microscope } from "lucide-react";

interface NavigationProps {
  orientation: "horizontal" | "vertical";
}

const Navigation = ({ orientation = "horizontal" }: NavigationProps) => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/remedies", icon: BookOpen, label: "Remedies" },
    { to: "/symptom-checker", icon: Stethoscope, label: "Symptoms" },
    { to: "/education", icon: Microscope, label: "Learn" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  if (orientation === "vertical") {
    return (
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${isActive
                ? 'text-ayurveda font-xl bg-ayurveda/10 font-semibold'
                : 'text-charcoal hover:text-charcoal-dark hover:bg-sandstone-dark/10'
              }`
            }
            end={item.to === "/"}
          >
            <item.icon size={20} className="mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav className="mobile-nav animate-slide-up">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            end={item.to === "/"}
          >
            <item.icon size={20} strokeWidth={2} />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
