import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
export default function StarRating({ rating, interactive = false, onRatingChange, size = 'md' }) {
    const [hoverRating, setHoverRating] = useState(0);
    
    const sizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl'
    };
    
    const handleClick = (newRating) => {
        if (interactive && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    const displayRating = hoverRating || rating;
    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 >= 0.5 && displayRating % 1 < 1;
    
    return (
        <div className={`flex ${sizes[size]}`}>
            {[1, 2, 3, 4, 5].map((star) => {
                if (star <= fullStars) {
                    return (
                        <FaStar 
                            key={star}
                            className={`text-yellow-400 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                            onMouseEnter={() => interactive && setHoverRating(star)}
                            onMouseLeave={() => interactive && setHoverRating(0)}
                            onClick={() => handleClick(star)}
                        />
                    );
                } else if (star === fullStars + 1 && hasHalfStar) {
                    return (
                        <FaStarHalfAlt 
                            key={star}
                            className={`text-yellow-400 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                            onMouseEnter={() => interactive && setHoverRating(star)}
                            onMouseLeave={() => interactive && setHoverRating(0)}
                            onClick={() => handleClick(star)}
                        />
                    );
                } else {
                    return (
                        <FaRegStar 
                            key={star}
                            className={`text-yellow-400 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                            onMouseEnter={() => interactive && setHoverRating(star)}
                            onMouseLeave={() => interactive && setHoverRating(0)}
                            onClick={() => handleClick(star)}
                        />
                    );
                }
            })}
        </div>
    );
}