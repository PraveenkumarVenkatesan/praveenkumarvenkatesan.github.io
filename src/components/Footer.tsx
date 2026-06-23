export const Footer = () => {
  return (
    <footer className="relative z-10 py-4 2xl:py-6 border-t border-border/20 mt-auto">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 text-center">
        <p className="text-muted-foreground text-xs 2xl:text-sm">
          © {new Date().getFullYear()} <span className="text-foreground font-medium">Praveenkumar Venkatesan</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
