import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NetworkBackground } from "./NetworkBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-hero opacity-50" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Animated network backdrop */}
      <NetworkBackground className="fixed inset-0 z-0 h-full w-full opacity-70" />

      <Navbar />
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1400px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
