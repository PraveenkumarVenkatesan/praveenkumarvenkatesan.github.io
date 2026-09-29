import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient colour for the liquid glass to refract */}
      <div className="ambient" aria-hidden="true">
        <span className="ambient-blob ambient-blob-a" />
        <span className="ambient-blob ambient-blob-b" />
        <span className="ambient-blob ambient-blob-c" />
      </div>

      <Navbar />
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1400px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
