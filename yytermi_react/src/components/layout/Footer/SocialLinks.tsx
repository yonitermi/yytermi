import { FaLinkedin, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import React from 'react';

interface SocialLink {
  icon: typeof FaLinkedin;
  href: string;
  label: string;
}

export const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/in/yonitermi/", 
      label: "LinkedIn" 
    },
    { 
      icon: FaGithub, 
      href: "https://github.com/yonitermi", 
      label: "GitHub" 
    },
    { 
      icon: FaFacebook, 
      href: "#", 
      label: "Facebook" 
    },
    { 
      icon: FaInstagram, 
      href: "#", 
      label: "Instagram" 
    }
  ];

  return (
    <div className="flex justify-center space-x-8 space-x-reverse">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-white/80 hover:text-white transition-colors"
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <link.icon size={24} />
        </a>
      ))}
    </div>
  );
};