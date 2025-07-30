import React, { useState } from "react";
// import "../assets/Styles/imageLoader.css"; // Optional: move styles here
import "../assets/Styles/imageLoader.css"

const ImageLoader = ({ defaultImageSource, source, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-loader-container ${className}`}>
      {!loaded && (
        <>
          <img
            src={defaultImageSource}
            alt="default"
            className={`loader-image default-image `}
          />
          <div className="loader-spinner" />
        </>
      )}

      <img
        src={source}
        alt={alt}
        className={`loader-image main-image ${loaded ? "visible" : "hidden"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageLoader;
