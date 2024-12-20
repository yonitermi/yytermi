import { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { SecurityFeatureItem } from './SecurityFeatureItem';
interface SecurityFeatureProps {
  icon: IconType;
  title: string;
  description: string;
  features?: string[];
  index: number;
}

export const SecurityFeature = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  index 
}: SecurityFeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white/10 rounded-xl p-8 text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icon className="text-3xl text-primary-blue flex-shrink-0" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="text-right">
        <p className="text-white/80 leading-relaxed mb-4">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-2 text-white/80">
            {features.map((feature, idx) => (
              <SecurityFeatureItem key={idx} feature={feature} />
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};