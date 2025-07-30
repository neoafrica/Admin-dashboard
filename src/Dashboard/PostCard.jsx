import React from "react";
import { BsFillTagsFill, BsBookmark } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
// import './PostCard.css';
import "../assets/Styles/postCard.css";
import ImageLoader from "./ImageLoader";
import DefaultImage from "../assets/ImgPlaceholder.jpg";

import { Link } from "react-router-dom";

function PostCard({
  id,
  username,
  profileImage,
  date,
  title,
  body,
  bookmarks,
  body2,
  body3,
  category,
  caseImage,
  comments,
  typeOfAnimal,
}) 

{
  return (
    <Link to={`/post/${id}`} className="post-card-link">
      <div className="post-card-container">
        <div className="post-card-header">
          <img src={profileImage} alt="author" className="author-image" />
          <div className="author-details">
            <p className="username">{username}</p>
            <p className="date">{date}</p>
          </div>
        </div>

        {caseImage && (
          <div className="image-container">
            {/* {console.log(caseImage[0].url)} */}
            {/* <img src={caseImage[1]?.url} alt="case" className="image-container"/> */}
            <ImageLoader
              defaultImageSource={DefaultImage}
              source={caseImage[0]?.url}
              alt="Post Image"
              className="image-container"
            />
          </div>
        )}

        <div className="post-card-body">
          <h3 className="title">
            {title?.length > 30 ? title?.slice(0, 30) + "..." : title}
          </h3>
          <p className="body">
            {/* {body
            ? body?.length > 80
              ? body.slice(0, 80) + "..."
              : body
            : body2?.length > 80
            ? body2.slice(0, 80) + "..."
            : body2
            } */}

            {body
              ? body.length > 80
                ? body.slice(0, 80) + "..."
                : body
              : body2
              ? body2.length > 80
                ? body2.slice(0, 80) + "..."
                : body2
              : body3
              ? body3.length > 80
                ? body3.slice(0, 80) + "..."
                : body3
              : null}
          </p>

          <div className="post-card-footer">
            <span className="footer-item">
              <BsFillTagsFill /> {category}
            </span>
            <span className="footer-item">
              <BsBookmark /> {bookmarks}
            </span>
            <span className="footer-item">
              <TfiCommentAlt /> {comments}
            </span>
          </div>
          <span className="animal">
            <p>#{typeOfAnimal?.toUpperCase()}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
