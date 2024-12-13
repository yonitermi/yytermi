import { motion } from 'framer-motion';
import { services } from '../data/services';
import { ServiceCard } from '../components/services/ServiceCard';

export const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 services-section" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">שירותי AI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};