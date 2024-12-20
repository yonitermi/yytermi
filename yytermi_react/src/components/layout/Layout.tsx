import { ReactNode } from 'react';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import { ParticleBackground } from '../background/ParticleBackground';
import { WaveBackground } from '../background/WaveBackground';
import { AccessibilityMenu } from '../accessibility/AccessibilityMenu';
import React from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#000033] to-black overflow-hidden">
      <ParticleBackground />
      <WaveBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>

      <AccessibilityMenu />
    </div>
  );
};