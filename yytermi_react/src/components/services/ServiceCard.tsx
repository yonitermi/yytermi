import { motion } from 'framer-motion';
import type { Service } from '../../data/services';
interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center hover:bg-white/20 transition-all duration-300"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4 pb-2 border-b-2 border-primary-blue">
        {service.title}
      </h2>
      <p className="text-white/90 leading-relaxed">{service.description}</p>
    </motion.div>
  );
};