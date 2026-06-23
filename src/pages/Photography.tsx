import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type PhotoCategory = "all" | "nature" | "urban" | "portraits" | "wildlife" | "street";

interface Photo {
  id: number;
  category: "nature" | "urban" | "portraits" | "wildlife" | "street";
  title: string;
  location?: string;
  image: string;
}

const getPhotoUrl = (path: string) => {
  if (path.startsWith("http")) {
    return path;
  }
  // Ensure path starts with / for consistency
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Remove trailing slash from BASE_URL to avoid double slashes
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${baseUrl}${normalizedPath}`;
};

const photos: Photo[] = [
  {
    id: 1,
    category: "wildlife",
    title: "Family of monkeys",
    location: "IIT Madras, Chennai, India",
    image: getPhotoUrl("/photography/monkeys_iitm.jpeg"),
  },
  {
    id: 2,
    category: "nature",
    title: "Monsoon Clouds",
    location: "Chennai, India",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    category: "urban",
    title: "City Lights",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    category: "urban",
    title: "Historic Architecture",
    location: "Chennai, India",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    category: "portraits",
    title: "Research Life",
    location: "IIT Madras",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    category: "portraits",
    title: "Street Vendor",
    location: "Tamil Nadu, India",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    category: "wildlife",
    title: "Patterns in Nature",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    category: "street",
    title: "Light and Shadow",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    category: "nature",
    title: "Snail at Tropical Forest",
    location: "Munnar, Kerala, India",
    image: getPhotoUrl("/photography/snail.jpeg"),
  },
];

const Photography = () => {
  const [activeTab, setActiveTab] = useState<PhotoCategory>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = photos.filter(
    (photo) => activeTab === "all" || photo.category === activeTab
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-4">Photography</h1>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Capturing moments through the lens — from nature's beauty to urban landscapes
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-wrap px-2">
            {["all", "nature", "urban", "portraits", "wildlife", "street"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as PhotoCategory)}
                className={cn(
                  "tab-button text-xs sm:text-sm px-3 sm:px-6 py-1.5 sm:py-2",
                  activeTab === tab && "active"
                )}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, index) => (
              <article
                key={photo.id}
                className="glass-panel-subtle overflow-hidden group animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  {photo.image ? (
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans font-semibold text-primary text-sm sm:text-base truncate">
                        {photo.title}
                      </h3>
                      {photo.location && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                          {photo.location}
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20 capitalize shrink-0">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Note */}
          <div className="glass-panel-subtle p-3 sm:p-4 text-center mt-6 sm:mt-8 animate-fade-in max-w-md mx-auto" style={{ animationDelay: "0.5s" }}>
            <p className="text-muted-foreground text-xs sm:text-sm">
              More photos coming soon...
            </p>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] w-full p-0 overflow-hidden bg-background border-border">
          {selectedPhoto && (
            <>
              <DialogTitle className="sr-only">{selectedPhoto.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {selectedPhoto.location ? `Photo taken at ${selectedPhoto.location}` : 'Photography'}
              </DialogDescription>
              <div className="relative bg-black/5 dark:bg-black/30 flex items-center justify-center">
                <img
                  src={selectedPhoto.image.replace("w=600&h=400", "w=1920&h=1280")}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-sans font-semibold text-primary">
                      {selectedPhoto.title}
                    </h3>
                    {selectedPhoto.location && (
                      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                        {selectedPhoto.location}
                      </p>
                    )}
                  </div>
                  <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-md border border-primary/20 capitalize shrink-0">
                    {selectedPhoto.category}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Photography;