import { ScrollToSection } from '../../ScrollToSection';
import React from 'react';

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

export const NavLinks = ({ onLinkClick, className = "" }: NavLinksProps) => {
  const links = [
    { to: "/#home", text: "בית" },
    { to: "/#about", text: "קצת עליי" },
    { to: "/#services", text: "שירותי AI" },
    { to: "/#security", text: "אבטחת AI" },
    { to: "/#contact", text: "צור קשר" },
  ];

  return (
    <div className={`flex flex-col md:flex-row md:space-x-8 md:space-x-reverse ${className}`}>
      {links.map((link) => (
        <ScrollToSection
          key={link.to}
          to={link.to}
          className="text-white/90 hover:text-white transition-colors py-2 md:py-0"
          onClick={onLinkClick}
        >
          {link.text}
        </ScrollToSection>
      ))}
    </div>
  );
};