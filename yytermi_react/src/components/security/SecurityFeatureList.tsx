import { SecurityFeature } from './SecurityFeature';
import { securityFeatures } from '../../data/securityFeatures';
export const SecurityFeatureList = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {securityFeatures.map((feature, index) => (
        <SecurityFeature
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          features={feature.features}
          index={index}
        />
      ))}
    </div>
  );
};