import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TypeWriter } from "@/components/TypeWriter";
import { SocialLinks } from "@/components/SocialLinks";
import { Navbar } from "@/components/Navbar";
import { NetworkBackground } from "@/components/NetworkBackground";
import heroBg from "@/assets/hero-bg.jpg";

const roles = [
  "Research Scholar @ IIT Madras",
  "Theoritical Physicist",
  "Photography Enthusiast",
  "Technophile",
];

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen background image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-[75%_center] md:bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 sm:via-background/70 sm:to-transparent" />
      </div>

      {/* Animated network backdrop — concentrated on the left half */}
      <NetworkBackground
        className="absolute inset-0 z-[1] h-full w-full opacity-80"
        widthFraction={0.5}
      />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 pt-20 sm:pt-0">
          <div className="max-w-2xl lg:max-w-3xl 2xl:max-w-4xl space-y-6 sm:space-y-8 2xl:space-y-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Research Scholar · IIT Madras
            </div>

            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold tracking-tight leading-tight">
               <span className="text-gradient">Praveenkumar Venkatesan</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl 2xl:text-2xl font-serif italic">
                (பிரவீன்குமார் வெங்கடேசன்)
              </p>
            </div>

            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-muted-foreground">
              I am a{" "}
              <TypeWriter
                words={roles}
                className="text-primary font-medium glow-text"
              />
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-lg lg:max-w-xl 2xl:max-w-2xl text-sm sm:text-base lg:text-lg 2xl:text-xl">
              Exploring the intersection of climate dynamics, complex systems, and
              computational methods to understand our complex world.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/contact" className="btn-primary group">
                Get in touch
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/publications" className="btn-ghost">
                View Publications
              </Link>
            </div>

            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;