import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import colors from '../../strum-design-system/themes/timbre/colors';

interface StarRatingProps {
  stars: 1 | 2 | 3;
}

const Star: React.FC<{ className?: string }> = ({ className }) => {
  return <FontAwesomeIcon color={colors.yellow} icon={faStar} size="sm" />;
};

const StarRating: React.FC<StarRatingProps> = (props) => {
  const { stars } = props;

  // Create an array of stars based on the prop value
  const starElements = Array.from({ length: stars }, (_, index) => (
    <Star key={index} />
  ));

  return <span>{starElements}</span>;
};

export default StarRating;
