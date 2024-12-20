import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface SecurityFeatureItemProps {
  feature: string;
}

export const SecurityFeatureItem = ({ feature }: SecurityFeatureItemProps) => {
  return (
    <li className="flex items-center gap-2">
      <FontAwesomeIcon icon={faStar} className="text-primary-blue" />
      {feature}
    </li>
  );
};