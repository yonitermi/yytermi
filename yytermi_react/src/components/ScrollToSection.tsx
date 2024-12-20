import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface ScrollToSectionProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ScrollToSection = ({ to, children, className = "", onClick }: ScrollToSectionProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const [, section] = to.split('#');
    
    // First execute onClick to close the mobile menu
    onClick?.();
    
    // Then scroll to the section after a brief delay to allow menu closing animation
    setTimeout(() => {
      const element = section ? document.getElementById(section) : null;
      if (element) {
        const navHeight = 64; // Height of the navbar (4rem = 64px)
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300); // Delay scrolling to allow menu closing animation
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};