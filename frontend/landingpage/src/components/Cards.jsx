import React, { useState } from "react";
import '../Style/Card.css'

const Cards = ({ title, imageSrc, content }) => {
  const [showContent, setShowContent] = useState(false);

  const handleMouseEnter = () => {
    setShowContent(true);
  };

  const handleMouseLeave = () => {
    setShowContent(false);
  };

  return (
    <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-image">
        <img src={imageSrc} alt={title} />
      </div>
      {showContent && (
        <div className="card-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Cards;