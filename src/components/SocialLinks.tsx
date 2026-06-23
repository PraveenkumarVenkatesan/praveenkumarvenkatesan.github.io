import { Linkedin, Mail, Instagram, GraduationCap } from "lucide-react";

// Custom ResearchGate icon - official RG logo
const ResearchGateIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.586 0c-1.738 0-2.885.386-4.025 1.206l-.085.063c-.644.48-1.234 1.027-1.753 1.64-.5.593-.924 1.24-1.26 1.938-.34.707-.596 1.454-.749 2.221-.154.779-.232 1.576-.233 2.371a11.74 11.74 0 0 0 .232 2.371c.153.768.41 1.514.748 2.222.337.698.76 1.345 1.26 1.938.52.613 1.109 1.16 1.753 1.64l.085.063c1.14.82 2.287 1.206 4.025 1.206.967 0 1.811-.148 2.543-.416.732-.27 1.347-.66 1.85-1.168.503-.508.887-1.129 1.15-1.86.263-.733.396-1.559.396-2.487 0-.887-.133-1.685-.396-2.4-.263-.716-.647-1.327-1.15-1.833-.503-.506-1.118-.896-1.85-1.168-.732-.271-1.576-.418-2.543-.418h-.994v2.21h.994c.559 0 1.043.082 1.451.247.41.165.75.398 1.022.7.271.3.474.66.607 1.08.133.418.2.876.2 1.374 0 .478-.067.927-.2 1.348-.133.42-.336.787-.607 1.098a2.705 2.705 0 0 1-1.022.727c-.41.173-.893.26-1.451.26-.967 0-1.738-.22-2.313-.661-.575-.442-1.038-.998-1.389-1.668a8.467 8.467 0 0 1-.769-2.246 12.293 12.293 0 0 1-.226-2.4c-.006-.81.067-1.619.226-2.4.159-.783.419-1.53.769-2.247.351-.67.814-1.226 1.389-1.667.575-.442 1.346-.662 2.313-.662.559 0 1.043.073 1.451.22.41.146.75.356 1.022.63.271.273.474.6.607.98.133.38.2.796.2 1.248h2.543c0-.887-.133-1.693-.396-2.42-.263-.728-.647-1.358-1.15-1.89-.503-.532-1.118-.943-1.85-1.234-.732-.291-1.576-.437-2.543-.437zm-12.93.49H1.12v17.33h2.543V9.674h2.476l3.166 8.146h2.763l-3.5-8.682c.635-.203 1.181-.504 1.638-.903.457-.399.833-.885 1.127-1.457.294-.573.512-1.222.655-1.948.143-.726.214-1.516.214-2.371 0-.855-.071-1.639-.214-2.352a5.79 5.79 0 0 0-.655-1.827c-.294-.518-.67-.954-1.127-1.308-.457-.354-1.003-.617-1.638-.79-.635-.173-1.369-.26-2.202-.26H6.656zm-.1 2.21h.1c.508 0 .948.05 1.32.15.372.1.68.258.924.473.244.215.425.494.544.836.119.342.178.749.178 1.22 0 .472-.06.877-.178 1.215-.119.339-.3.614-.544.826-.244.213-.552.367-.924.462-.372.095-.812.143-1.32.143h-.1V2.7z"/>
  </svg>
);

// Custom ORCID icon
const OrcidIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
  </svg>
);

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/praveenkumar-venkatesan-418b8b290", label: "LinkedIn" },
  { icon: Mail, href: "mailto:praveen2vsp@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://www.instagram.com/photographies_de_physicien", label: "Instagram" },
  { icon: GraduationCap, href: "https://scholar.google.com/citations?user=BdknCrEAAAAJ&hl=en&authuser=1", label: "Google Scholar" },
  { icon: ResearchGateIcon, href: "https://www.researchgate.net/profile/Praveenkumar-Venkatesan-2?ev=hdr_xprf", label: "ResearchGate", isCustom: true },
  { icon: OrcidIcon, href: "https://orcid.org/my-orcid?orcid=0000-0002-0631-7119", label: "ORCID", isCustom: true },
];

export const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3 2xl:gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="social-icon 2xl:w-12 2xl:h-12"
          target="_blank"
          rel="noopener noreferrer"
        >
          <link.icon className="w-5 h-5 2xl:w-6 2xl:h-6" />
        </a>
      ))}
    </div>
  );
};
