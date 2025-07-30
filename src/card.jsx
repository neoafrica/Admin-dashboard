import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div  className={`bg-gray-100 border border-gray-300 shadow-lg rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
