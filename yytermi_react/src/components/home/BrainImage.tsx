import { motion } from 'framer-motion';
export const BrainImage = () => {
  return (
    <motion.div 
      className="flex justify-center mb-12 relative"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-96 h-96">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/30 to-primary-purple/30 rounded-full" />
        
        {/* Brain Image */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <img 
            src="https://cdn.pixabay.com/photo/2024/05/27/03/34/brain-8789959_1280.jpg"
            alt="AI Brain"
            className="w-full h-full object-cover scale-125 transform hover:scale-150 transition-transform duration-300"
            style={{ 
              imageRendering: 'crisp-edges',
              filter: 'contrast(1.1) brightness(1.1)'
            }}
          />
        </div>
        
        {/* Animated rings */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-white/20 rounded-full"
              style={{
                transform: `scale(${1 + i * 0.1})`,
                animation: `pulse ${2 + i * 0.5}s infinite`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};