import { AchievementDefinition } from '../data/achievements';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AchievementBadgeProps {
    achievement: AchievementDefinition;
}

const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
    const Icon = achievement.icon;

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`inline-flex flex-col items-center justify-center w-24 h-24 p-2 rounded-xl border border-dashed border-current ${achievement.colorClass} text-center transition-transform hover:scale-105 cursor-default`}
                    >
                        <Icon className="h-8 w-8 mb-1 flex-shrink-0" />
                        <span className="text-xs font-medium leading-tight line-clamp-2">
                            {achievement.title}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                    <p className="text-sm font-medium mb-1">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AchievementBadge; 