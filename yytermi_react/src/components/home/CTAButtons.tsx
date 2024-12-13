import { motion } from 'framer-motion';
import { ScrollToSection } from '../ScrollToSection';

export const CTAButtons = () => {
  const buttons = [
    { text: 'למדו עוד', to: '/#about', delay: 0 },
    { text: 'צרו קשר', to: '/#contact', delay: 0.1 },
    { text: 'התחילו עכשיו', to: '/#services', delay: 0.2 },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {buttons.map((button) => (
        <motion.div
          key={button.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: button.delay, duration: 0.5 }}
        >
          <ScrollToSection
            to={button.to}
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {button.text}
          </ScrollToSection>
        </motion.div>
      ))}
    </div>
  );
};