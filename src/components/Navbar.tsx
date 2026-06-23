import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Resume", path: "/resume" },
  { name: "Publications", path: "/publications" },
  { name: "Blogs", path: "/blogs" },
  { name: "Photography", path: "/photography" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <nav
        className={cn(
          "glass-nav mx-auto max-w-6xl 2xl:max-w-7xl px-3 sm:px-4 2xl:px-6 transition-all duration-300",
          isScrolled && "max-w-5xl 2xl:max-w-6xl shadow-glow border-primary/20"
        )}
      >
        <div className="h-14 sm:h-16 2xl:h-18 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-base sm:text-lg 2xl:text-xl font-serif font-semibold text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Praveenkumar Venkatesan</span>
            <span className="sm:hidden">PK Venkatesan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 2xl:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-pill text-sm 2xl:text-base font-medium tracking-wide",
                  location.pathname === item.path && "active"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden h-9 w-9 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 mt-1">
            <div className="py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
