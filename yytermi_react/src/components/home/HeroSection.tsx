import { motion } from 'framer-motion';
import { BrainImage } from './BrainImage';

export const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
            YYTERMI
          </span>
        </h1>
        
        <BrainImage />
        
        <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed">
          אנחנו מספקים פתרונות בינה מלאכותית מתקדמים לעסקים, לשיפור יעילות, צמיחה והגנה על נתונים. 
          ממערכות חכמות ועד לאוטומציה מותאמת אישית – אנו משנים את הדרך שבה עסקים עובדים.
        </p>
      </motion.div>
    </div>
  );
};