import { useState } from "react";
import { Download, Check, FileBadge, Printer, Share2 } from "lucide-react";
import { useHealthProfile } from "../hooks/useHealthProfile";

interface DownloadableGuideProps {
    title: string;
    description: string;
    fileSize: string;
    imageUrl: string;
    fileUrl: string;
    category: string;
}

const DownloadableGuide = ({
    title,
    description,
    fileSize,
    imageUrl,
    fileUrl,
    category
}: DownloadableGuideProps) => {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const { grantAchievement } = useHealthProfile();

    const handleDownload = () => {
        setIsDownloading(true);

        // Simulate download delay
        setTimeout(() => {
            setIsDownloaded(true);
            setIsDownloading(false);

            grantAchievement('DOWNLOADED_GUIDE');

            // In a real app, we would use a proper file download mechanism
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1500);
    };

    return (
        <div className="premium-card overflow-hidden">
            <div className="flex flex-col h-full">
                <div
                    className="h-40 bg-cover bg-center rounded-t-xl mb-4"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <div className="w-full h-full flex items-center justify-center bg-charcoal/30 rounded-t-xl">
                        <FileBadge className="h-14 w-14 text-white" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="mb-auto">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-saffron/15 text-saffron-dark mb-3 inline-block">
                            {category}
                        </span>
                        <h3 className="text-lg font-serif font-medium mb-2">{title}</h3>
                        <p className="text-sm text-charcoal-light mb-4">
                            {description}
                        </p>
                    </div>

                    <div className="border-t border-sandstone-dark/10 pt-4 mt-2">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs text-charcoal-light">
                                PDF • {fileSize}
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    className="p-1.5 rounded-full bg-white border border-sandstone-dark/10 text-charcoal-light hover:bg-sandstone transition-colors"
                                    title="Print guide"
                                >
                                    <Printer className="h-4 w-4" />
                                </button>
                                <button
                                    className="p-1.5 rounded-full bg-white border border-sandstone-dark/10 text-charcoal-light hover:bg-sandstone transition-colors"
                                    title="Share guide"
                                >
                                    <Share2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={isDownloading || isDownloaded}
                            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center transition-colors ${isDownloaded
                                ? "bg-ayurveda/10 text-ayurveda"
                                : isDownloading
                                    ? "bg-saffron/20 text-saffron-dark animate-pulse cursor-wait"
                                    : "bg-saffron/20 text-saffron-dark hover:bg-saffron/30"
                                }`}
                        >
                            {isDownloaded ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Downloaded
                                </>
                            ) : isDownloading ? (
                                "Downloading..."
                            ) : (
                                <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download for Offline Use
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadableGuide; 