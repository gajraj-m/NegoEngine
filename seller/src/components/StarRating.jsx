import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const maxStars = 5;

  // Round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex flex-row items-center">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div key={item.id}>
            {item < rating ? (
              <FaStar size={12} className="fill-primary" />
            ) : (
              <FaRegStar size={12} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
